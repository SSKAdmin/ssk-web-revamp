import { NextResponse } from "next/server";
import { db, schema } from "@/lib/db";
import { z } from "zod";
import { rateLimit } from "@/lib/security/rate-limit";
import { sendInstitutionalMail } from "@/lib/mail/transporter";
import { safeApiErrorResponse, logApiError, isDbConnectionError } from "@/lib/api-errors";
import fs from "fs";
import path from "path";

const contactSchema = z.object({
  name: z.string().optional().default("Anonymous Client"),
  email: z.string().email("Invalid email format"),
  phone: z.string().regex(/^05\d{8}$/, "Invalid phone format").optional().or(z.literal("")),
  organization: z.string().optional(),
  message: z.string().optional(),
  honeypot: z.string().max(0, "Bot detected").optional(),
});

export async function POST(request: Request) {
  let json: any = {};
  try {
    const ip = request.headers.get("x-forwarded-for") || "unknown";
    const userAgent = request.headers.get("user-agent") || "unknown";
    const { success, message: rateLimitMsg } = await rateLimit(`contact_${ip}`);
    
    if (!success) {
      return NextResponse.json({ error: rateLimitMsg }, { status: 429 });
    }

    json = await request.json();
    
    // 1. Zod Validation
    const result = contactSchema.safeParse(json);
    
    if (!result.success) {
      const errors = result.error.flatten().fieldErrors;
      return NextResponse.json(
        { error: "Validation Failed", details: errors },
        { status: 400 }
      );
    }

    const { name, email, phone, organization, message } = result.data;
    const finalMessage = message && message.trim() !== "" ? message : "No message provided";

    // 2. Database Insertion
    const [newContact] = await db
      .insert(schema.contacts)
      .values({
        name,
        email,
        phone,
        organization,
        message: finalMessage,
      })
      .returning();

    const referenceId = `SSK-REQ-${newContact && newContact.id ? newContact.id.split('-')[0].toUpperCase() : Math.random().toString(36).substring(2, 8).toUpperCase()}`;

    // 3. Try to dispatch mail (Catch if it fails so it doesn't block submission)
    try {
      await sendInstitutionalMail({
        to: process.env.SUPPORT_EMAIL || "info@ssk.sa",
        subject: `[${referenceId}] New Engagement: ${organization || name}`,
        html: `
          <h2>New Contact Request: ${referenceId}</h2>
          <p><strong>Name:</strong> ${name}</p>
          <p><strong>Email:</strong> ${email}</p>
          <p><strong>Phone:</strong> ${phone || "N/A"}</p>
          <p><strong>Organization:</strong> ${organization || "N/A"}</p>
          <p><strong>Message:</strong></p>
          <blockquote style="border-left: 4px solid #0ABAB5; padding-left: 10px;">${finalMessage}</blockquote>
        `,
      });

      await sendInstitutionalMail({
        to: email,
        subject: `SSK Engagement Request Received - [${referenceId}]`,
        html: `
          <div style="font-family: sans-serif; color: #0B1F3A;">
            <h2>Request Successfully Submitted</h2>
            <p>Dear ${name},</p>
            <p>We have received your engagement request. Your reference ID is: <strong>${referenceId}</strong>.</p>
            <p>Best regards,<br/><strong>SSK: Sovereign Strategy & Knowledge</strong></p>
          </div>
        `,
      });
    } catch (smtpError) {
      console.warn("SMTP failure, ignoring so DB insertion persists", smtpError);
    }

    return NextResponse.json({ success: true, message: "Contact registered successfully" }, { status: 201 });
  } catch (error) {
    logApiError("CONTACT_POST", error);
    return safeApiErrorResponse(error);
  }
}
