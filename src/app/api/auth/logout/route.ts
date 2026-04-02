import { NextResponse } from "next/server";
import { clearSession } from "@/lib/security/jwt";

export async function POST() {
  await clearSession();
  return NextResponse.json({ success: true });
}
