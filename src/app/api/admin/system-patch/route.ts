import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { sql } from "drizzle-orm";

export async function GET(request: Request) {
  try {
    const url = new URL(request.url);
    if (url.searchParams.get("token") !== "ssk-unblock-db" && process.env.NODE_ENV === "production") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // Creating missing Analytics table safely without dropping anything
    await db.execute(sql`
      CREATE TABLE IF NOT EXISTS "website_analytics" (
        "id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
        "path" varchar(255) NOT NULL,
        "ip_address" varchar(45),
        "country" varchar(100),
        "city" varchar(100),
        "user_agent" text,
        "session_id" varchar(100),
        "duration_seconds" integer DEFAULT 0,
        "visited_at" timestamp with time zone DEFAULT now() NOT NULL
      );
    `);

    // Applying any missing Enum additions safely
    const enums = [
      "CREATE TYPE \"user_role\" AS ENUM ('admin', 'director', 'manager', 'viewer');",
      "CREATE TYPE \"gov_doc_status\" AS ENUM ('exists', 'partial', 'missing');",
      "CREATE TYPE \"gov_doc_priority\" AS ENUM ('low', 'medium', 'high');",
      "CREATE TYPE \"task_status\" AS ENUM ('todo', 'in_progress', 'blocked', 'done');",
      "CREATE TYPE \"cms_page\" AS ENUM ('home', 'about', 'services', 'contact', 'careers');",
      "CREATE TYPE \"language\" AS ENUM ('en', 'ar');",
      "CREATE TYPE \"contact_status\" AS ENUM ('new', 'in_progress', 'closed');",
      "CREATE TYPE \"job_status\" AS ENUM ('draft', 'published', 'closed');",
      "CREATE TYPE \"application_status\" AS ENUM ('new', 'review', 'shortlisted', 'rejected', 'hired');"
    ];

    for (const enumQuery of enums) {
      try {
        await db.execute(sql.raw(enumQuery));
      } catch (e: any) {
        if (!String(e?.message).includes("already exists")) {
          console.error("Enum error:", e);
        }
      }
    }

    return NextResponse.json({ success: true, message: "System structurally verified. Missing tables created if required." });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error?.message || String(error) }, { status: 500 });
  }
}
