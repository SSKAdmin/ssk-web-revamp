import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { documents } from "@/lib/db/schema";
import { logApiError, isDbConnectionError } from "@/lib/api-errors";
import { desc } from "drizzle-orm";
import { seedDocuments } from "@/lib/db/docs-mock";
import { cookies } from "next/headers";
import { jwtVerify } from "jose";

const ADMIN_JWT_SECRET = process.env.ADMIN_JWT_SECRET || "fallback-secret-for-development-only";
const encodedAdminKey = new TextEncoder().encode(ADMIN_JWT_SECRET);

export async function GET(request: NextRequest) {
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

    const allDocs = await db.select().from(documents).orderBy(desc(documents.updatedAt));
    return NextResponse.json({ data: allDocs });

  } catch (error) {
    logApiError("GET /api/documents", error);
    if (isDbConnectionError(error)) {
      console.warn("[API_FALLBACK] Database offline. Returning static Documentation Reserve.");
      return NextResponse.json({ data: seedDocuments }, { status: 200 }); // DB fallback
    }
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
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

    const body = await request.json();

    const newDoc = await db
      .insert(documents)
      .values({
        category: body.category,
        name: body.name,
        purpose: body.purpose,
        status: body.status || "missing",
        path: body.path,
        owner: body.owner,
        priority: body.priority || "medium",
        requiredForGoLive: body.requiredForGoLive || false,
        notes: body.notes,
      })
      .returning();

    return NextResponse.json(newDoc[0], { status: 201 });

  } catch (error) {
    logApiError("POST /api/documents", error);
    if (isDbConnectionError(error)) {
      return NextResponse.json({ error: "Service Unavailable" }, { status: 503 }); // DB fallback
    }
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
