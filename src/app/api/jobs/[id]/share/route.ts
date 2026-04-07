import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import * as schema from "@/lib/db/schema";
import { eq, sql } from "drizzle-orm";
import { getJobById } from "@/lib/db/queries";

export const dynamic = "force-dynamic";

export async function POST(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const job = await getJobById(id);

    if (!job) {
      return NextResponse.json({ error: "Job sequence not found" }, { status: 404 });
    }

    // Tick the metric
    await db
      .update(schema.jobs)
      .set({ shares: sql`${schema.jobs.shares} + 1` })
      .where(eq(schema.jobs.id, job.id));

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("[JOB_SHARE_METRIC]", error);
    return NextResponse.json({ error: "Telemetry failed" }, { status: 500 });
  }
}
