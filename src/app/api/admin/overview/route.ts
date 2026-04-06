import { NextResponse } from "next/server";
import { db, schema } from "@/lib/db";
import { desc, count, countDistinct, sum, sql } from "drizzle-orm";
import { cookies } from "next/headers";
import { jwtVerify } from "jose";
import { isDbConnectionError, logApiError } from "@/lib/api-errors";

const ADMIN_JWT_SECRET = process.env.ADMIN_JWT_SECRET || "fallback-secret-for-development-only";
const encodedAdminKey = new TextEncoder().encode(ADMIN_JWT_SECRET);

export async function GET() {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get("ssk_admin_session")?.value;

    if (!token) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    try {
       const { payload } = await jwtVerify(token, encodedAdminKey, { algorithms: ["HS256"] });
       if (payload.role !== "admin" && payload.role !== "super_admin") {
          return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
       }
    } catch (e) {
       return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // 1. Detailed Website Analytics / IP Visitors Record
    // Retrieve the last 100 sessions
    const analyticsLogs = await db
      .select({
        ipAddress: schema.websiteAnalytics.ipAddress,
        country: schema.websiteAnalytics.country,
        city: schema.websiteAnalytics.city,
        userAgent: schema.websiteAnalytics.userAgent,
        sessionCount: count(schema.websiteAnalytics.sessionId),
        duration: sum(schema.websiteAnalytics.durationSeconds),
        lastVisit: sql<string>`max(${schema.websiteAnalytics.visitedAt})`,
      })
      .from(schema.websiteAnalytics)
      .groupBy(
        schema.websiteAnalytics.ipAddress, 
        schema.websiteAnalytics.country, 
        schema.websiteAnalytics.city, 
        schema.websiteAnalytics.userAgent
      )
      .orderBy(desc(sql`max(${schema.websiteAnalytics.visitedAt})`))
      .limit(50);

    // 2. Aggregate Summaries
    const [totalSessionsResult] = await db.select({ total: count() }).from(schema.websiteAnalytics);
    const [uniqueIpsResult] = await db.select({ total: countDistinct(schema.websiteAnalytics.ipAddress) }).from(schema.websiteAnalytics);
    const totalSessions = totalSessionsResult?.total || 0;
    const uniqueIps = uniqueIpsResult?.total || 0;

    // 3. Security Details and Attack Recognitions (Fetched from Audit Logs)
    const recentAuditLogs = await db
      .select()
      .from(schema.auditLogs)
      .orderBy(desc(schema.auditLogs.createdAt))
      .limit(20);

    // Filter threats (e.g., Failed Auth or specific Actions). Since auditLogs might only have standard logins,
    // we also synthesize "Failed Auth" if any rate limit blocks were logged inside the DB (future addition).
    const securityEvents = recentAuditLogs.filter(log => log.action.includes('FAILED') || log.action.includes('SECURITY'));
    
    // We construct Mobile vs PC telemetry on the fly from the database records
    let desktop = 0, mobile = 0, tablet = 0;
    const [uaQuery] = await db.select({
      all: sql`string_agg(${schema.websiteAnalytics.userAgent}, ',')`
    }).from(schema.websiteAnalytics);

    const uaStr = (uaQuery?.all as string) || "";
    const occurrences = uaStr.toLowerCase();
    mobile = (occurrences.match(/mobi|android|iphone/g) || []).length;
    tablet = (occurrences.match(/tablet|ipad/g) || []).length;
    desktop = totalSessions - mobile - tablet;
    if (desktop < 0) desktop = 0;

    return NextResponse.json({
      traffic: {
        totalSessions,
        uniqueIps,
      },
      devices: {
        desktop,
        mobile,
        tablet
      },
      ipRecords: analyticsLogs,
      audits: recentAuditLogs,
      securityThreats: securityEvents.length,
    });
  } catch (error) {
    logApiError("ADMIN_OVERVIEW_GET", error);
    if (isDbConnectionError(error)) {
        // Return structured mock data for strictly simulation boardrooms
        return NextResponse.json({
            traffic: { totalSessions: 0, uniqueIps: 0 },
            devices: { desktop: 0, mobile: 0, tablet: 0 },
            ipRecords: [],
            audits: [],
            securityThreats: 0,
            simulated: true
        });
    }
    return NextResponse.json({ error: "Internal Server Error", detail: (error as any)?.message || String(error) }, { status: 500 });
  }
}
