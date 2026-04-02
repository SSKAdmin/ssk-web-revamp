import type { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { eq } from "drizzle-orm";
import { db, schema } from "@/lib/db";
import { verifyPassword } from "@/lib/auth/password";
import { rateLimit } from "@/lib/security/rate-limit";
import { headers } from "next/headers";

export const authOptions: NextAuthOptions = {
  session: { strategy: "jwt" },
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        // 1. Gather Connection Identity
        const heads = await headers();
        const ip = heads.get("x-forwarded-for") || "unknown";
        const attemptEmail = credentials?.email || "unknown";

        // 2. Enforce Rate Limit internally
        // 5 attempts per 15 minutes (900000 ms) instead of 1 minute, preventing sustained brute force.
        const rateLimitStatus = await rateLimit(`login_${ip}_${attemptEmail}`, 5, 900000);
        
        if (!rateLimitStatus.success) {
          console.warn(`[SECURITY_AUDIT] LOCKOUT: Rate limit exceeded for IP ${ip} targeting ${attemptEmail}.`);
          throw new Error("Too many authentication attempts. Please try again later.");
        }

        if (!credentials?.email || !credentials?.password) {
          console.warn(`[SECURITY_AUDIT] FAILED: Missing credentials from IP ${ip}.`);
          throw new Error("Invalid credentials");
        }

        const [user] = await db
          .select()
          .from(schema.users)
          .where(eq(schema.users.email, credentials.email));

        if (!user || !user.isActive || !user.passwordHash) {
          console.warn(`[SECURITY_AUDIT] FAILED: Invalid user lookup or inactive. Email: ${attemptEmail}, IP: ${ip}.`);
          throw new Error("Invalid credentials");
        }

        const isValid = await verifyPassword(credentials.password, user.passwordHash);

        if (!isValid) {
          console.warn(`[SECURITY_AUDIT] FAILED: Password mismatch. Email: ${attemptEmail}, IP: ${ip}.`);
          throw new Error("Invalid credentials");
        }

        if (user.role !== "admin") {
          console.warn(`[SECURITY_AUDIT] FAILED: Role unauthorized (was ${user.role}). Email: ${attemptEmail}, IP: ${ip}.`);
          throw new Error("Unauthorized access block");
        }

        console.info(`[SECURITY_AUDIT] SUCCESS: Admin logged in. Email: ${attemptEmail}, IP: ${ip}.`);

        return { 
          id: user.id, 
          name: user.name, 
          email: user.email, 
          role: user.role 
        };
      },
    }),
  ],
  cookies: {
    sessionToken: {
      name: process.env.NODE_ENV === "production" ? "__Secure-next-auth.session-token" : "next-auth.session-token",
      options: {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "lax",
        path: "/",
      },
    },
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) { 
        token.role = (user as { role?: string }).role; 
        token.id = user.id; 
      }
      return token;
    },
    async session({ session, token }) {
      if (session.user) {
        (session.user as { id?: string }).id = token.id as string; 
        (session.user as { role?: string }).role = token.role as string; 
      }
      return session;
    },
  },
  pages: { signIn: "/login" },
  secret: process.env.NEXTAUTH_SECRET,
};
