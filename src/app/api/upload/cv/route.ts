import { NextResponse } from "next/server";
import { promises as fs } from "fs";
import path from "path";
import crypto from "crypto";

const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB Limit per CIO Sec Ops
const ALLOWED_MIME_TYPES = [
  "application/pdf",
  "application/msword",
  "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
];

export async function POST(request: Request) {
  try {
    const formData = await request.formData();
    const file = formData.get("file") as File | null;

    if (!file) {
      return NextResponse.json({ error: "No CV file provided." }, { status: 400 });
    }

    // [SECURITY PATTERN 1] Exact MIME Type Validation (Hardened)
    if (!ALLOWED_MIME_TYPES.includes(file.type)) {
      console.warn(`[SECURITY] Invalid MIME upload attempt: ${file.type}`);
      return NextResponse.json(
        { error: "Invalid file format. Only PDF and Word documents are permitted." },
        { status: 415 }
      );
    }

    // [SECURITY PATTERN 2] Size Constraint Enforcement
    if (file.size > MAX_FILE_SIZE) {
      console.warn(`[SECURITY] Payload too large: ${file.size} bytes`);
      return NextResponse.json(
        { error: "File exceeds the 5MB institutional limit." },
        { status: 413 }
      );
    }

    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    // [SECURITY PATTERN 3] Path Traversal Nullification (UUID enforcement)
    const originalExt = path.extname(file.name).toLowerCase();
    
    // Explicitly reject double extension attacks
    if (![".pdf", ".doc", ".docx"].includes(originalExt)) {
       return NextResponse.json({ error: "Invalid extension masquerade." }, { status: 415 });
    }

    const secureFileName = `${crypto.randomUUID()}${originalExt}`;
    const uploadDir = path.join(process.cwd(), "public", "uploads", "cv");

    // Ensure target trajectory exists
    await fs.mkdir(uploadDir, { recursive: true });

    const finalPath = path.join(uploadDir, secureFileName);
    
    // Asynchronous atomic write commitment
    await fs.writeFile(finalPath, buffer);

    const publicUrl = `/uploads/cv/${secureFileName}`;

    return NextResponse.json({ success: true, url: publicUrl }, { status: 201 });
  } catch (error) {
    console.error("[UPLOAD_CV_POST_CRITICAL]", error);
    return NextResponse.json(
      { error: "Secure Document Gateway Fault." },
      { status: 500 }
    );
  }
}
