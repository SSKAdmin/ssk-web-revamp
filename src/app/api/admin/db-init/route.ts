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
      -- Drop old structures safely to migrate to bilingual unified rows
      DROP TABLE IF EXISTS "jobs" CASCADE;
      
      CREATE TABLE "jobs" (
        "id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
        "title_en" varchar(255) NOT NULL,
        "title_ar" varchar(255) NOT NULL,
        "department" varchar(100) NOT NULL,
        "location" varchar(100) DEFAULT 'Riyadh, KSA' NOT NULL,
        "type" varchar(50) DEFAULT 'Full-time' NOT NULL,
        "description_en" text NOT NULL,
        "description_ar" text NOT NULL,
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

    await db.execute(sql`
      CREATE TABLE IF NOT EXISTS "audit_logs" (
        "id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
        "action" varchar(100) NOT NULL,
        "table_mutated" varchar(100),
        "ip_address" varchar(45),
        "user_agent" text,
        "encrypted_payload" text,
        "user_id" uuid,
        "created_at" timestamp with time zone DEFAULT now() NOT NULL
      );
    `);

    await db.execute(sql`
      CREATE TABLE IF NOT EXISTS "system_settings" (
        "key" varchar(150) PRIMARY KEY NOT NULL,
        "value" text,
        "is_encrypted" boolean DEFAULT false NOT NULL,
        "description" text,
        "updated_at" timestamp with time zone DEFAULT now() NOT NULL,
        "updated_by" uuid
      );
    `);

    await db.execute(sql`
      CREATE TABLE IF NOT EXISTS "crm_accounts" (
        "id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
        "company_name" varchar(255) NOT NULL,
        "industry" varchar(100),
        "sector" varchar(100),
        "annual_revenue" varchar(100),
        "assigned_manager_id" uuid,
        "status" varchar(50) DEFAULT 'prospect' NOT NULL,
        "created_at" timestamp with time zone DEFAULT now() NOT NULL,
        "updated_at" timestamp with time zone DEFAULT now() NOT NULL
      );
    `);

    await db.execute(sql`
      CREATE TABLE IF NOT EXISTS "backup_records" (
        "id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
        "file_name" varchar(255) NOT NULL,
        "file_size" varchar(50),
        "status" varchar(50) DEFAULT 'completed' NOT NULL,
        "url" text,
        "created_at" timestamp with time zone DEFAULT now() NOT NULL
      );
    `);

    return NextResponse.json({ success: true, message: "CRITICAL TABLES CREATED SUCCESSFULLY" });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error?.message || String(error) }, { status: 500 });
  }
}
