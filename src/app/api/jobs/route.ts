import { NextResponse } from "next/server";
import { db, schema } from "@/lib/db";
import { eq, desc } from "drizzle-orm";
import { safeApiErrorResponse, isDbConnectionError, logApiError } from "@/lib/api-errors";
import { getAuthSession } from "@/lib/auth/session";

export async function GET(request: Request) {
  try {
    const session = await getAuthSession();
    const isAdmin = session?.user?.role === "admin";

    let jobsList;
    if (isAdmin) {
      jobsList = await db.select().from(schema.jobs).orderBy(desc(schema.jobs.createdAt));
    } else {
      jobsList = await db
        .select()
        .from(schema.jobs)
        .where(eq(schema.jobs.status, "published"))
        .orderBy(desc(schema.jobs.createdAt));
    }

    return NextResponse.json(jobsList);
  } catch (error) {
    logApiError("JOBS_GET", error);
    if (isDbConnectionError(error)) {
      return NextResponse.json([], { status: 200 }); // Graceful fallback
    }
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const session = await getAuthSession();
    if (!session || session.user.role !== "admin") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const json = await request.json();
    const { title, department, location, type, description, responsibilities, requirements } = json;

    const [newJob] = await db
      .insert(schema.jobs)
      .values({
        title,
        department,
        location,
        type,
        description,
        responsibilities,
        requirements,
        status: "published",
      })
      .returning();

    return NextResponse.json(newJob, { status: 201 });
  } catch (error) {
    logApiError("JOBS_POST", error);
    return safeApiErrorResponse(error);
  }
}
