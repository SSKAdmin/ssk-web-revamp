import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { documents } from "@/lib/db/schema";
import { logApiError, isDbConnectionError } from "@/lib/api-errors";
import { eq } from "drizzle-orm";
import { cookies } from "next/headers";
import { jwtVerify } from "jose";

const ADMIN_JWT_SECRET = process.env.ADMIN_JWT_SECRET || "fallback-secret-for-development-only";
const encodedAdminKey = new TextEncoder().encode(ADMIN_JWT_SECRET);

export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get("ssk_admin_session")?.value;

    if (!token) {
      return NextResponse.json({ error: "Unauthorized access" }, { status: 401 });
    }

    try {
       const { payload } = await jwtVerify(token, encodedAdminKey, { algorithms: ["HS256"] });
       if (payload.role !== "admin" && payload.role !== "super_admin") {
          return NextResponse.json({ error: "Unauthorized access" }, { status: 403 });
       }
    } catch {
       return NextResponse.json({ error: "Session invalid" }, { status: 401 });
    }

    const { id } = await params;
    const body = await request.json();

    const allowedUpdates: any = {};
    if (body.status !== undefined) allowedUpdates.status = body.status;
    if (body.notes !== undefined) allowedUpdates.notes = body.notes;
    if (body.path !== undefined) allowedUpdates.path = body.path;
    if (body.owner !== undefined) allowedUpdates.owner = body.owner;
    allowedUpdates.updatedAt = new Date();

    const updatedDoc = await db
      .update(documents)
      .set(allowedUpdates)
      .where(eq(documents.id, id))
      .returning();

    if (!updatedDoc.length) {
      return NextResponse.json({ error: "Document not found" }, { status: 404 });
    }

    return NextResponse.json(updatedDoc[0]);

  } catch (error) {
    logApiError("PATCH /api/documents/[id]", error);
    if (isDbConnectionError(error)) {
      return NextResponse.json({ error: "Service Unavailable" }, { status: 503 }); // DB fallback
    }
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
