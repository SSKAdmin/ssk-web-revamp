import nodemailer from "nodemailer";

/**
 * Institutional Mail Architecture
 * Note: Requires 'npm install nodemailer'
 * For now, this acts as a logger for development/protocol verification.
 */

export async function sendInstitutionalMail({
  to,
  subject,
  html,
}: {
  to: string;
  subject: string;
  html: string;
}) {
  const isDev = process.env.NODE_ENV === "development";

  if (isDev) {
    console.log("--- SECURED MAIL PROTOCOL INITIALIZED ---");
    console.log(`TO: ${to}`);
    console.log(`SUBJECT: ${subject}`);
    console.log("--- CONTENT START ---");
    console.log(html);
    console.log("--- CONTENT END ---");
    return { success: true, messageId: "dev-mock-id" };
  }

  // PRODUCTION LOGIC (Uncomment after npm install nodemailer)
  const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST || "smtp.gmail.com",
    port: Number(process.env.SMTP_PORT) || 587,
    secure: process.env.SMTP_SECURE === "true",
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS,
    },
  });

  return await transporter.sendMail({
    from: `"SSK Support Desk" <${process.env.SMTP_USER}>`,
    to,
    subject,
    html,
  });

  return { success: false, error: "SMTP Transporter not initialized" };
}
