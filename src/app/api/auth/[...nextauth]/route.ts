import NextAuth from "next-auth";
import { authOptions } from "@/lib/auth/auth-options";
import { NextRequest } from "next/server";

async function auth(req: NextRequest, ctx: any) {
  // Force dynamic evaluation of NextAuth URL to prevent 500 Host Mismatch errors on local/tunnels
  const host = req.headers.get("host");
  const protocol = host?.includes("localhost") ? "http" : "https";
  if (host) {
    process.env.NEXTAUTH_URL = `${protocol}://${host}`;
  }
  
  return NextAuth(authOptions)(req, ctx);
}

export { auth as GET, auth as POST };
