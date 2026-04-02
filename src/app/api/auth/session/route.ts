import { NextResponse } from "next/server";
import { getSession } from "@/lib/security/jwt";

export async function GET() {
  try {
    const session = await getSession();

    if (!session) {
      return NextResponse.json({ authenticated: false }, { status: 401 });
    }

    return NextResponse.json({
      authenticated: true,
      user: {
        id: session.userId,
        email: session.email,
        role: session.role,
      },
    });
  } catch (error) {
    return NextResponse.json({ error: "Session validation failed" }, { status: 500 });
  }
}
