import { SignJWT, jwtVerify } from "jose";
import { cookies } from "next/headers";

const secretKey = process.env.ADMIN_JWT_SECRET || "fallback-secret-for-development-only";
const encodedKey = new TextEncoder().encode(secretKey);

interface AdminSessionPayload {
  userId: string;
  email: string;
  role: string;
  [key: string]: any;
}

export async function createSession(payload: AdminSessionPayload) {
  const cookieStore = await cookies();
  const sessionToken = await new SignJWT(payload)
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime("2h") // Session valid for 2 hours
    .sign(encodedKey);

  cookieStore.set("ssk_admin_session", sessionToken, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: 60 * 60 * 2, // 2 hours
  });
}

export async function getSession(): Promise<AdminSessionPayload | null> {
  const cookieStore = await cookies();
  const sessionToken = cookieStore.get("ssk_admin_session")?.value;

  if (!sessionToken) return null;

  try {
    const { payload } = await jwtVerify(sessionToken, encodedKey, {
      algorithms: ["HS256"],
    });

    return payload as AdminSessionPayload;
  } catch (error) {
    return null;
  }
}

export async function clearSession() {
  const cookieStore = await cookies();
  cookieStore.delete("ssk_admin_session");
}
