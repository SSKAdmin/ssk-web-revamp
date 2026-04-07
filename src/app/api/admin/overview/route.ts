import { NextResponse } from "next/server";
import { db, schema } from "@/lib/db";
import { desc, count, countDistinct, sum, sql, eq } from "drizzle-orm";
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

    // 2. Aggregate Telemetry Summaries
    const [totalSessionsResult] = await db.select({ total: count() }).from(schema.websiteAnalytics);
    const [uniqueIpsResult] = await db.select({ total: countDistinct(schema.websiteAnalytics.ipAddress) }).from(schema.websiteAnalytics);
    const totalSessions = totalSessionsResult?.total || 0;
    const uniqueIps = uniqueIpsResult?.total || 0;

    // 3. Business Aggregates (Leads & Candidates)
    const [leadsCountResult] = await db.select({ total: count() }).from(schema.contacts);
    const [appsCountResult] = await db.select({ total: count() }).from(schema.applications);
    const totalLeads = leadsCountResult?.total || 0;
    const totalApplications = appsCountResult?.total || 0;

    // 4. Generate 14-day engagement activity trend
    // To do this simply, we get dates of contacts & applications from last 14 days and group locally
    const last14Days = Array.from({length: 14}).map((_, i) => {
      const d = new Date();
      d.setDate(d.getDate() - (13 - i));
      return d.toISOString().split("T")[0];
    });

    const recentContacts = await db.select({ createdAt: schema.contacts.createdAt }).from(schema.contacts);
    const recentApps = await db.select({ createdAt: schema.applications.createdAt }).from(schema.applications);
    const recentVisits = await db.select({ createdAt: schema.websiteAnalytics.visitedAt }).from(schema.websiteAnalytics);

    const trendData = last14Days.map(date => {
       const eng = recentContacts.filter(c => new Date(c.createdAt).toISOString().startsWith(date)).length 
                + recentApps.filter(a => new Date(a.createdAt).toISOString().startsWith(date)).length;
       const trf = recentVisits.filter(v => new Date(v.createdAt).toISOString().startsWith(date)).length;
       return { date, engagements: eng, traffic: trf };
    });

    // 5. Unify ledgers (Leads and Security)
    const recentLeads = await db.select().from(schema.contacts).orderBy(desc(schema.contacts.createdAt)).limit(10);
    const recentTalent = await db.select().from(schema.applications).orderBy(desc(schema.applications.createdAt)).limit(10);

    const recentAuditLogs = await db
      .select()
      .from(schema.auditLogs)
      .orderBy(desc(schema.auditLogs.createdAt))
      .limit(20);

    const securityEvents = recentAuditLogs.filter(log => log.action.includes('FAILED') || log.action.includes('SECURITY') || log.action === 'LOGIN');
    
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

    const activeJobs = await db.select({ views: schema.jobs.views, shares: schema.jobs.shares }).from(schema.jobs).where(eq(schema.jobs.status, "published"));
    const totalJobViews = activeJobs.reduce((acc, job) => acc + (job.views || 0), 0);
    const totalJobShares = activeJobs.reduce((acc, job) => acc + (job.shares || 0), 0);

    return NextResponse.json({
      business: {
         totalLeads,
         totalApplications,
         conversionActions: totalLeads + totalApplications,
         trends: trendData,
         jobViews: totalJobViews,
         jobShares: totalJobShares
      },
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
      businessRecords: {
         leads: recentLeads,
         talent: recentTalent
      },
      audits: recentAuditLogs,
      securityThreats: securityEvents.length,
    });
  } catch (error) {
    logApiError("ADMIN_OVERVIEW_GET", error);
    if (isDbConnectionError(error)) {
        return NextResponse.json({
            business: { totalLeads: 0, totalApplications: 0, conversionActions: 0, trends: [] },
            traffic: { totalSessions: 0, uniqueIps: 0 },
            devices: { desktop: 0, mobile: 0, tablet: 0 },
            ipRecords: [],
            businessRecords: { leads: [], talent: [] },
            audits: [],
            securityThreats: 0,
            simulated: true
        });
    }
    return NextResponse.json({ error: "Internal Server Error", detail: (error as any)?.message || String(error) }, { status: 500 });
  }
}
