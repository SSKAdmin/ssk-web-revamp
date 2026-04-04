import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { users } from "@/lib/db/schema";
import { eq } from "drizzle-orm";
import bcrypt from "bcryptjs";
import { createSession } from "@/lib/security/jwt";
import { rateLimit } from "@/lib/security/rate-limit";

// Mock Validation for Turnstile until an actual key is passed
async function verifyTurnstile(token: string) {
  const secretKey = process.env.TURNSTILE_SECRET_KEY;
  if (!secretKey) return true; // mock validation if not deployed
  
  try {
    const res = await fetch("https://challenges.cloudflare.com/turnstile/v0/siteverify", {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: `secret=${secretKey}&response=${token}`,
    });
    const outcome = await res.json();
    return outcome.success;
  } catch (error) {
    return false;
  }
}

export async function POST(req: Request) {
  try {
    const ip = req.headers.get("x-forwarded-for") || "127.0.0.1";
    
    // 1. Anti-Bot / Rate Limiting (Brute force: 5 attempts per 15 minutes)
    const rateLimitStatus = await rateLimit(`login_${ip}`, 5, 15 * 60 * 1000);
    if (!rateLimitStatus.success) {
      return NextResponse.json({ error: rateLimitStatus.message }, { status: 429 });
    }

    const body = await req.json();
    const { email, password, turnstileToken } = body;

    if (!email || !password) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    // 2. Cloudflare Turnstile evaluation
    const isBotFree = await verifyTurnstile(turnstileToken);
    if (!isBotFree) {
      return NextResponse.json({ error: "Anti-bot verification failed" }, { status: 403 });
    }

    // 3. Static High-Clearance Users Bypass
    const STATIC_USERS = [
      {
        email: "Fmeshal@ssksaudi.com",
        password: "SSK@123",
        userObj: { id: "admin-1", email: "Fmeshal@ssksaudi.com", role: "super_admin", name: "Admin" }
      },
      {
        email: "HR@ssksaudi.com",
        password: "SSK@123",
        userObj: { id: "hr-1", email: "HR@ssksaudi.com", role: "admin", name: "HR" }
      },
      {
        email: "Sales@ssksaudi.com",
        password: "SSK@123",
        userObj: { id: "sales-1", email: "Sales@ssksaudi.com", role: "admin", name: "Sales" }
      }
    ];

    const matchedStaticProfile = STATIC_USERS.find(
      (u) => u.email.toLowerCase() === email.toLowerCase() && u.password === password
    );

    if (!matchedStaticProfile) {
      console.warn(`[AUTH ENGINE] Failed login attempt for ${email}`);
      return NextResponse.json({ error: "Invalid credentials or locked account" }, { status: 401 });
    }

    const payloadUser = matchedStaticProfile.userObj;

    // 5. Issue stateless JWT Session
    await createSession({
      userId: payloadUser.id,
      email: payloadUser.email,
      role: payloadUser.role,
    });

    return NextResponse.json({ success: true, redirectUrl: "/ssk-admin-portal" });
  } catch (error) {
    console.error("Login route error:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
