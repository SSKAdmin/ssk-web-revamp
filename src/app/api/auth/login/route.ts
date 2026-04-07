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

    // 3. Database Authentication Query
    const [userRecord] = await db
      .select({
        id: users.id,
        email: users.email,
        passwordHash: users.passwordHash,
        role: users.role,
        name: users.name
      })
      .from(users)
      .where(eq(users.email, email));

    if (!userRecord) {
       // Check for emergency static fallback bypass for initial dev only if it matches admin credentials
       if (email === "Fmeshal@ssksaudi.com" && password === "SSK@123") {
           const payloadUser = { id: "admin-static", email, role: "super_admin", name: "Fmeshal Fallback" };
           await createSession({
             userId: payloadUser.id,
             email: payloadUser.email,
             role: payloadUser.role,
           });
           return NextResponse.json({ success: true, redirectUrl: "/ssk-admin-portal" });
       }
       console.warn(`[AUTH ENGINE] Failed login attempt for non-existent ${email}`);
       return NextResponse.json({ error: "Invalid credentials or locked account" }, { status: 401 });
    }

    // 4. Verify Password (assuming bcrypt was used to hash passwords when created)
    let isPasswordValid = false;
    if (userRecord.passwordHash === password) {
       isPasswordValid = true; // Fallback for raw text seed passwords
    } else {
       isPasswordValid = await bcrypt.compare(password, userRecord.passwordHash);
    }

    if (!isPasswordValid) {
      console.warn(`[AUTH ENGINE] Failed login attempt for ${email} (Invalid password)`);
      return NextResponse.json({ error: "Invalid credentials or locked account" }, { status: 401 });
    }

    const payloadUser = {
      id: userRecord.id,
      email: userRecord.email,
      role: userRecord.role || "admin",
      name: userRecord.name || "Administrator"
    };

    // 5. Issue stateless JWT Session
    await createSession({
      userId: payloadUser.id,
      email: payloadUser.email,
      role: payloadUser.role,
    });

    // 6. Log the business action
    try {
      await db.insert(schema.auditLogs).values({
        action: "LOGIN",
        userId: payloadUser.id,
        ipAddress: ip,
        userAgent: req.headers.get("user-agent")?.substring(0, 200) || "none",
        tableMutated: "users"
      });
    } catch (e) {
      console.warn("Failed to capture audit log for login", e);
    }

    return NextResponse.json({ success: true, redirectUrl: "/ssk-admin-portal" });
  } catch (error) {
    console.error("Login route error:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
