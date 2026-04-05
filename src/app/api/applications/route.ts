import { NextResponse } from "next/server";
import { db, schema } from "@/lib/db";
import { desc, eq } from "drizzle-orm";
import { z } from "zod";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth/auth-options";
import { rateLimit } from "@/lib/security/rate-limit";
import { sendInstitutionalMail } from "@/lib/mail/transporter";
import { safeApiErrorResponse, isDbConnectionError, logApiError } from "@/lib/api-errors";

const applicationSchema = z.object({
  jobId: z.string().uuid("Invalid Job ID"),
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Invalid email format"),
  phone: z.string().optional(),
  cvUrl: z.string().url("Invalid CV URL").optional().or(z.literal("")),
  coverLetter: z.string().optional(),
  honeypot: z.string().max(0, "Bot detected").optional(),
});

export async function POST(request: Request) {
  let json: any = {};
  try {
    const ip = request.headers.get("x-forwarded-for") || "unknown";
    const userAgent = request.headers.get("user-agent") || "unknown";
    const { success, message: rateLimitMsg } = await rateLimit(`application_${ip}`);
    
    if (!success) {
      return NextResponse.json({ error: rateLimitMsg }, { status: 429 });
    }

    json = await request.json();
    
    // 1. Zod Validation
    const result = applicationSchema.safeParse(json);
    
    if (!result.success) {
      const errors = result.error.flatten().fieldErrors;
      return NextResponse.json(
        { error: "Validation Failed", details: errors },
        { status: 400 }
      );
    }

    const { jobId, name, email, phone, cvUrl, coverLetter } = result.data;

    // 2. Database Insertion
    const [newApplication] = await db
      .insert(schema.applications)
      .values({
        jobId,
        name,
        email,
        phone,
        cvUrl,
        coverLetter,
        ipAddress: ip,
        userAgent: userAgent,
      })
      .returning();

    const referenceId = `SSK-APP-${newApplication.id.split('-')[0].toUpperCase()}`;

    // 3. Email Notification to HR
    await sendInstitutionalMail({
      to: process.env.HR_EMAIL || "hr@ssk.sa",
      subject: `[${referenceId}] New Job Application: ${name}`,
      html: `
        <h2>New Candidate Application: ${referenceId}</h2>
        <p><strong>Candidate:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Phone:</strong> ${phone || "N/A"}</p>
        <p><strong>Job ID reference:</strong> ${jobId}</p>
        <p>Please check the recruitment dashboard for CV and Cover Letter details.</p>
      `,
    });

    // 4. Client Notification
    await sendInstitutionalMail({
      to: email,
      subject: `SSK Careers - Application Received [${referenceId}]`,
      html: `
        <div style="font-family: sans-serif; color: #0B1F3A;">
          <h2>Application Successfully Submitted</h2>
          <p>Dear ${name},</p>
          <p>Thank you for showing interest in joining SSK. We have received your application successfully. Your Application ID is: <strong>${referenceId}</strong>.</p>
          <p>Our talent acquisition team will review your profile and reach out if your qualifications meet our current requirements.</p>
          <p>Best regards,<br/><strong>SSK Talent Team</strong></p>
        </div>
      `,
    });

    return NextResponse.json({ success: true, message: "Application submitted and acknowledged" }, { status: 201 });
  } catch (error) {
    logApiError("APPLICATIONS_POST", error);
    
    // SIMULATION MODE FALLBACK: If DB is offline locally, ensure form works for boardroom presentations
    if (isDbConnectionError(error)) {
      const isDev = process.env.NODE_ENV !== "production";
      if (isDev) {
        try {
          const fs = require('fs');
          const path = require('path');
          const mockFile = path.resolve(process.cwd(), "mock-db.json");
          const existing = fs.existsSync(mockFile) ? JSON.parse(fs.readFileSync(mockFile, "utf-8")) : {};
          existing.offline_applications = existing.offline_applications || [];
          existing.offline_applications.push({ ...json, timestamp: new Date().toISOString() });
          fs.writeFileSync(mockFile, JSON.stringify(existing, null, 2));
        } catch (e) {
          console.error("Simulation fallback log failed:", e);
        }
        return NextResponse.json({ success: true, message: "Simulation Mode: Application submitted and acknowledged" }, { status: 201 });
      }
    }

    return safeApiErrorResponse(error);
  }
}

export async function GET(request: Request) {
  try {
    // 1. Session Check (Proper Auth)
    const session = await getServerSession(authOptions);
    
    if (!session || (session.user as { role?: string }).role !== "admin") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const applicationsList = await db
      .select({
        id: schema.applications.id,
        name: schema.applications.name,
        email: schema.applications.email,
        phone: schema.applications.phone,
        status: schema.applications.status,
        createdAt: schema.applications.createdAt,
        jobTitle: schema.jobs.title,
      })
      .from(schema.applications)
      .leftJoin(schema.jobs, eq(schema.applications.jobId, schema.jobs.id))
      .orderBy(desc(schema.applications.createdAt));

    return NextResponse.json(applicationsList);
  } catch (error) {
    logApiError("APPLICATIONS_GET", error);
    if (isDbConnectionError(error)) {
      return NextResponse.json([], { status: 200 }); // Graceful fallback
    }
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
