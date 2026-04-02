import { NextResponse } from "next/server";
import { asc, desc, eq } from "drizzle-orm";
import { db, schema } from "@/lib/db";
import { getAuthSession } from "@/lib/auth/session";
import { safeApiErrorResponse, isDbConnectionError, logApiError } from "@/lib/api-errors";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const page = searchParams.get("page") || "home";

  try {
    const sections = await db
      .select()
      .from(schema.cmsSections)
      .where(eq(schema.cmsSections.page, page as "home" | "about" | "services" | "contact"))
      .orderBy(asc(schema.cmsSections.sortOrder), desc(schema.cmsSections.createdAt));

    return NextResponse.json(sections);
  } catch (error) {
    logApiError("CMS_GET", error);
    if (isDbConnectionError(error)) {
      return NextResponse.json([], { status: 200 }); // Graceful fallback
    }
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}

export async function POST(request: Request) {
  const session = await getAuthSession();

  if (!session || session.user.role !== "admin") {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const body = await request.json();

  try {
    const inserted = await db
      .insert(schema.cmsSections)
      .values({
        page: body.page || "home",
        sectionKey: body.sectionKey,
        title: body.title || null,
        subtitle: body.subtitle || null,
        body: body.body || null,
        sortOrder: body.sortOrder ?? 0,
        isPublished: body.isPublished ?? true,
      })
      .returning();

    return NextResponse.json(inserted[0], { status: 201 });
  } catch (error) {
    logApiError("CMS_POST", error);
    return safeApiErrorResponse(error);
  }
}
