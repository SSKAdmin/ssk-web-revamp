import { NextResponse } from "next/server";
import { db, schema } from "@/lib/db";
import { eq, and, gte } from "drizzle-orm";

export async function POST(req: Request) {
  try {
    const { path, sessionId } = await req.json();

    if (!path) {
      return NextResponse.json({ error: "Path missing" }, { status: 400 });
    }

    // Capture precise telemetry directly from Vercel's global edge network headers
    const ip = req.headers.get("x-forwarded-for") || req.headers.get("x-real-ip") || "unknown";
    const country = req.headers.get("x-vercel-ip-country") || "Local/Unknown Region";
    const city = req.headers.get("x-vercel-ip-city") || "Unknown City";
    const userAgent = req.headers.get("user-agent") || "Unknown Browser";

    // Capture all analytics to PostgreSQL, including local development runs.
    // If the database is missing or unreachable, the error is swallowed below
    // to preserve UX, but we want all real testing telemetry captured.

    // Consolidate Sessions to avoid DB bloat: Search if this IP + Path + Session occurred in the last hour
    const oneHourAgo = new Date(Date.now() - 60 * 60 * 1000);
    
    const existingSession = await db
      .select({ id: schema.websiteAnalytics.id })
      .from(schema.websiteAnalytics)
      .where(
        and(
          eq(schema.websiteAnalytics.ipAddress, ip),
          eq(schema.websiteAnalytics.path, path),
          gte(schema.websiteAnalytics.visitedAt, oneHourAgo)
        )
      )
      .limit(1);

    if (existingSession.length > 0) {
      // Update duration instead of spamming new rows
      await db
        .update(schema.websiteAnalytics)
        .set({ durationSeconds: 60 }) // We just bump duration if they are still pinging
        .where(eq(schema.websiteAnalytics.id, existingSession[0].id));
    } else {
      // It's a fresh session/page view hit
      await db.insert(schema.websiteAnalytics).values({
        path,
        ipAddress: ip,
        country,
        city,
        userAgent,
        sessionId: sessionId || "unknown",
        durationSeconds: 0,
      });
    }

    return NextResponse.json({ success: true, timestamp: new Date().toISOString() });
  } catch (error) {
    // Silently fail to not disrupt user experience
    console.error("[ANALYTICS_INGEST_ERROR]", error);
    return NextResponse.json({ success: false }, { status: 500 });
  }
}
