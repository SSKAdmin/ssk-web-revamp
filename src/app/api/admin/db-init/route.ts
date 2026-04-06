import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { sql } from "drizzle-orm";

export async function GET(request: Request) {
  try {
    // Authenticate (Optional for this temporary patch, but better to protect it)
    const url = new URL(request.url);
    if (url.searchParams.get("token") !== "ssk-unblock-db") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // Explicitly create tables to bypass missing Vercel CLI migrations
    await db.execute(sql`
      DO $$ BEGIN
        CREATE TYPE "contact_status" AS ENUM ('new', 'in_progress', 'closed');
      EXCEPTION
        WHEN duplicate_object THEN null;
      END $$;
    `);

    await db.execute(sql`
      CREATE TABLE IF NOT EXISTS "contacts" (
        "id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
        "name" varchar(255) NOT NULL,
        "email" varchar(255) NOT NULL,
        "phone" varchar(50),
        "organization" varchar(255),
        "message" text NOT NULL,
        "status" "contact_status" DEFAULT 'new' NOT NULL,
        "created_at" timestamp with time zone DEFAULT now() NOT NULL
      );
    `);

    await db.execute(sql`
      DO $$ BEGIN
        CREATE TYPE "language" AS ENUM ('en', 'ar');
      EXCEPTION
        WHEN duplicate_object THEN null;
      END $$;
    `);

    await db.execute(sql`
      DO $$ BEGIN
        CREATE TYPE "job_status" AS ENUM ('draft', 'published', 'closed');
      EXCEPTION
        WHEN duplicate_object THEN null;
      END $$;
    `);

    await db.execute(sql`
      CREATE TABLE IF NOT EXISTS "jobs" (
        "id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
        "lang" "language" DEFAULT 'en' NOT NULL,
        "title" varchar(255) NOT NULL,
        "department" varchar(100) NOT NULL,
        "location" varchar(100) DEFAULT 'Riyadh, KSA' NOT NULL,
        "type" varchar(50) DEFAULT 'Full-time' NOT NULL,
        "description" text NOT NULL,
        "responsibilities" text,
        "requirements" text,
        "status" "job_status" DEFAULT 'published' NOT NULL,
        "created_at" timestamp with time zone DEFAULT now() NOT NULL
      );
    `);

    await db.execute(sql`
      DO $$ BEGIN
        CREATE TYPE "application_status" AS ENUM ('new', 'review', 'shortlisted', 'rejected', 'hired');
      EXCEPTION
        WHEN duplicate_object THEN null;
      END $$;
    `);

    await db.execute(sql`
      CREATE TABLE IF NOT EXISTS "applications" (
        "id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
        "job_id" uuid,
        "name" varchar(255) NOT NULL,
        "email" varchar(255) NOT NULL,
        "phone" varchar(50),
        "cv_url" text,
        "cover_letter" text,
        "status" "application_status" DEFAULT 'new' NOT NULL,
        "created_at" timestamp with time zone DEFAULT now() NOT NULL
      );
    `);

    return NextResponse.json({ success: true, message: "CRITICAL TABLES CREATED SUCCESSFULLY" });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error?.message || String(error) }, { status: 500 });
  }
}
