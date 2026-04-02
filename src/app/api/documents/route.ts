import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth/auth-options";
import { db } from "@/lib/db";
import { documents } from "@/lib/db/schema";
import { logApiError, isDbConnectionError } from "@/lib/api-errors";
import { desc } from "drizzle-orm";
import { seedDocuments } from "@/lib/db/docs-mock";

export async function GET(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);

    if (!session || session.user.role !== "admin") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
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
    const session = await getServerSession(authOptions);

    if (!session || session.user.role !== "admin") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
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
