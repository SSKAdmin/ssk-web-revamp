import { NextResponse } from "next/server";
import { db, schema } from "@/lib/db";
import { z } from "zod";
import { rateLimit } from "@/lib/security/rate-limit";
import { safeApiErrorResponse, logApiError } from "@/lib/api-errors";
import { sendInstitutionalMail } from "@/lib/mail/transporter";

const applicationSchema = z.object({
  jobId: z.string().optional(), // Removed UUID constraint to allow "GENERAL"
  name: z.string().optional().default("Anonymous Candidate"),
  email: z.string().email("Invalid email format"),
  phone: z.string().regex(/^05\d{8}$/, "Invalid Saudi phone format").optional().or(z.literal("")),
  cvUrl: z.string().url("Valid CV upload required").optional().or(z.literal("")),
  coverLetter: z.string().optional(),
});

export async function POST(request: Request) {
  let json: any = {};
  try {
    const ip = request.headers.get("x-forwarded-for") || "unknown";
    const { success, message: rateLimitMsg } = await rateLimit(`apply_${ip}`);
    
    if (!success) {
      return NextResponse.json({ error: rateLimitMsg }, { status: 429 });
    }

    json = await request.json();
    
    // 1. Zod Validation
    const result = applicationSchema.safeParse(json);
    
    if (!result.success) {
      return NextResponse.json(
        { error: "Validation Failed", details: result.error.flatten().fieldErrors },
        { status: 400 }
      );
    }

    const { jobId, name, email, phone, cvUrl, coverLetter } = result.data;

    // Remove jobId if it's GENERAL (case-insensitive) to prevent foreign key errors
    const normalizedJobId = jobId ? jobId.toUpperCase() : undefined;
    const payloadJobId = normalizedJobId && normalizedJobId !== "GENERAL" ? jobId : undefined;

    // 2. Database Insertion (Without ipAddress/userAgent until production db:push is completed)
    const [newApplication] = await db
      .insert(schema.applications)
      .values({
        jobId: payloadJobId as any,
        name,
        email,
        phone,
        cvUrl,
        coverLetter,
      })
      .returning({ id: schema.applications.id });

    const referenceId = `SSK-APP-${newApplication && newApplication.id ? newApplication.id.split('-')[0].toUpperCase() : Math.random().toString(36).substring(2, 8).toUpperCase()}`;

    // 3. Try to dispatch mail (Catch if it fails so it doesn't block submission)
    try {
      await sendInstitutionalMail({
        to: process.env.SUPPORT_EMAIL || "hr@ssk.sa",
        subject: `[${referenceId}] New Career Application: ${name}`,
        html: `
          <h2>New Job Application: ${referenceId}</h2>
          <p><strong>Name:</strong> ${name}</p>
          <p><strong>Email:</strong> ${email}</p>
          <p><strong>Phone:</strong> ${phone || "N/A"}</p>
          <p><strong>Job Reference ID:</strong> ${payloadJobId || "GENERAL"}</p>
          <p><strong>CV Data URI:</strong> Attached securely in the Admin Dashboard.</p>
        `,
      });
    } catch (smtpError) {
      console.warn("SMTP failure, ignoring so DB insertion persists", smtpError);
    }

    return NextResponse.json({ success: true, message: "Application submitted successfully" }, { status: 201 });
  } catch (error) {
    logApiError("APPLICATION_POST", error);
    return safeApiErrorResponse(error);
  }
}
