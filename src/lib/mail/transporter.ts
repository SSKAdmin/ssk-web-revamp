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
  // Removed the development mock to enforce real SMTP testing as requested.

  const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST || "smtp.gmail.com",
    port: Number(process.env.SMTP_PORT) || 587,
    secure: process.env.SMTP_SECURE === "true",
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS,
    },
  });

  try {
    const info = await transporter.sendMail({
      from: `"SSK Network Node" <${process.env.SMTP_USER}>`,
      to,
      subject,
      html,
    });
    console.log("Email dispatched:", info.messageId);
    return { success: true, messageId: info.messageId };
  } catch (error) {
    console.error("SMTP Dispatch Error:", error);
    return { success: false, error };
  }
}
