import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { sql } from "drizzle-orm";

export async function GET(request: Request) {
  try {
    const url = new URL(request.url);
    if (url.searchParams.get("token") !== "ssk-unblock-db" && process.env.NODE_ENV === "production") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // 0. RESET (Drop all tables EXCEPT users to keep admin logins)
    await db.execute(sql`
      DROP TABLE IF EXISTS "applications" CASCADE;
      DROP TABLE IF EXISTS "jobs" CASCADE;
      DROP TABLE IF EXISTS "tasks" CASCADE;
      DROP TABLE IF EXISTS "presentation_slides" CASCADE;
      DROP TABLE IF EXISTS "presentations" CASCADE;
      DROP TABLE IF EXISTS "solutions" CASCADE;
      DROP TABLE IF EXISTS "solution_sectors" CASCADE;
      DROP TABLE IF EXISTS "services" CASCADE;
      DROP TABLE IF EXISTS "service_categories" CASCADE;
      DROP TABLE IF EXISTS "crm_accounts" CASCADE;
      DROP TABLE IF EXISTS "audit_logs" CASCADE;
      DROP TABLE IF EXISTS "backup_records" CASCADE;
      DROP TABLE IF EXISTS "system_settings" CASCADE;
      DROP TABLE IF EXISTS "website_analytics" CASCADE;
      DROP TABLE IF EXISTS "documents" CASCADE;
      DROP TABLE IF EXISTS "contacts" CASCADE;
      DROP TABLE IF EXISTS "cms_sections" CASCADE;
    `);

    // 1. CREATE ENUMS INDIVIDUALLY TO AVOID BLOCK CANCELLATION
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
        // Manually format string into raw SQL object, or use drizzle sql.raw()
        await db.execute(sql.raw(`DO $$ BEGIN ${enumQuery} EXCEPTION WHEN duplicate_object THEN null; END $$;`));
      } catch (e) {
        console.warn("Enum creation skipped", e);
      }
    }

    // 2. CREATE BASE TABLES WITHOUT FOREIGN KEYS OR WITH SAFE FKs
    await db.execute(sql`
      CREATE TABLE IF NOT EXISTS "users" (
        "id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
        "name" varchar(150),
        "email" varchar(255) NOT NULL UNIQUE,
        "password_hash" text NOT NULL,
        "role" "user_role" DEFAULT 'viewer' NOT NULL,
        "is_active" boolean DEFAULT true NOT NULL,
        "two_factor_enabled" boolean DEFAULT false,
        "created_at" timestamp with time zone DEFAULT now() NOT NULL,
        "updated_at" timestamp with time zone DEFAULT now() NOT NULL
      );
    `);

    await db.execute(sql`
      CREATE TABLE IF NOT EXISTS "documents" (
        "id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
        "category" varchar(150) NOT NULL,
        "name" varchar(255) NOT NULL,
        "purpose" text NOT NULL,
        "status" "gov_doc_status" DEFAULT 'missing' NOT NULL,
        "path" text,
        "owner" varchar(150),
        "priority" "gov_doc_priority" DEFAULT 'medium' NOT NULL,
        "required_for_go_live" boolean DEFAULT false NOT NULL,
        "notes" text,
        "created_at" timestamp with time zone DEFAULT now() NOT NULL,
        "updated_at" timestamp with time zone DEFAULT now() NOT NULL
      );
    `);

    await db.execute(sql`
      CREATE TABLE IF NOT EXISTS "cms_sections" (
        "id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
        "page" "cms_page" DEFAULT 'home' NOT NULL,
        "lang" "language" DEFAULT 'en' NOT NULL,
        "section_key" varchar(120) NOT NULL,
        "title" varchar(255),
        "subtitle" text,
        "body" text,
        "sort_order" integer DEFAULT 0 NOT NULL,
        "is_published" boolean DEFAULT true NOT NULL,
        "created_at" timestamp with time zone DEFAULT now() NOT NULL,
        "updated_at" timestamp with time zone DEFAULT now() NOT NULL
      );
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
      CREATE TABLE IF NOT EXISTS "jobs" (
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
      CREATE TABLE IF NOT EXISTS "applications" (
        "id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
        "job_id" uuid REFERENCES "jobs"("id") ON DELETE CASCADE,
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
      CREATE TABLE IF NOT EXISTS "system_settings" (
        "key" varchar(150) PRIMARY KEY NOT NULL,
        "value" text,
        "is_encrypted" boolean DEFAULT false NOT NULL,
        "description" text,
        "updated_at" timestamp with time zone DEFAULT now() NOT NULL,
        "updated_by" uuid REFERENCES "users"("id") ON DELETE SET NULL
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
        "user_id" uuid REFERENCES "users"("id") ON DELETE SET NULL,
        "created_at" timestamp with time zone DEFAULT now() NOT NULL
      );
    `);

    await db.execute(sql`
      CREATE TABLE IF NOT EXISTS "crm_accounts" (
        "id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
        "company_name" varchar(255) NOT NULL,
        "industry" varchar(100),
        "sector" varchar(100),
        "annual_revenue" varchar(100),
        "assigned_manager_id" uuid REFERENCES "users"("id") ON DELETE SET NULL,
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

    await db.execute(sql`
      CREATE TABLE IF NOT EXISTS "service_categories" (
        "id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
        "name_en" varchar(255) NOT NULL,
        "name_ar" varchar(255) NOT NULL,
        "description_en" text,
        "description_ar" text,
        "created_at" timestamp with time zone DEFAULT now() NOT NULL
      );
    `);

    await db.execute(sql`
      CREATE TABLE IF NOT EXISTS "services" (
        "id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
        "category_id" uuid REFERENCES "service_categories"("id") ON DELETE CASCADE,
        "title_en" varchar(255) NOT NULL,
        "title_ar" varchar(255) NOT NULL,
        "description_en" text,
        "description_ar" text,
        "is_active" boolean DEFAULT true,
        "created_at" timestamp with time zone DEFAULT now() NOT NULL
      );
    `);

    await db.execute(sql`
      CREATE TABLE IF NOT EXISTS "solution_sectors" (
        "id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
        "name_en" varchar(255) NOT NULL,
        "name_ar" varchar(255) NOT NULL,
        "created_at" timestamp with time zone DEFAULT now() NOT NULL
      );
    `);

    await db.execute(sql`
      CREATE TABLE IF NOT EXISTS "solutions" (
        "id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
        "sector_id" uuid REFERENCES "solution_sectors"("id") ON DELETE CASCADE,
        "title_en" varchar(255) NOT NULL,
        "title_ar" varchar(255) NOT NULL,
        "content_en" text,
        "content_ar" text,
        "is_active" boolean DEFAULT true,
        "created_at" timestamp with time zone DEFAULT now() NOT NULL
      );
    `);

    await db.execute(sql`
      CREATE TABLE IF NOT EXISTS "presentations" (
        "id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
        "title" varchar(255) NOT NULL,
        "description" text,
        "author_id" uuid REFERENCES "users"("id") ON DELETE SET NULL,
        "created_at" timestamp with time zone DEFAULT now() NOT NULL,
        "updated_at" timestamp with time zone DEFAULT now() NOT NULL
      );
    `);

    await db.execute(sql`
      CREATE TABLE IF NOT EXISTS "presentation_slides" (
        "id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
        "presentation_id" uuid REFERENCES "presentations"("id") ON DELETE CASCADE,
        "order" integer DEFAULT 0 NOT NULL,
        "title" varchar(255),
        "content" text,
        "layout" varchar(100) DEFAULT 'standard',
        "created_at" timestamp with time zone DEFAULT now() NOT NULL
      );
    `);

    await db.execute(sql`
      CREATE TABLE IF NOT EXISTS "tasks" (
        "id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
        "title" varchar(255) NOT NULL,
        "description" text,
        "status" "task_status" DEFAULT 'todo' NOT NULL,
        "assigned_to" uuid REFERENCES "users"("id") ON DELETE SET NULL,
        "deadline" timestamp with time zone,
        "created_at" timestamp with time zone DEFAULT now() NOT NULL,
        "updated_at" timestamp with time zone DEFAULT now() NOT NULL
      );
    `);

    return NextResponse.json({ success: true, message: "CRITICAL TABLES AND CONSTRAINTS CREATED SUCCESSFULLY AND SECURED" });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error?.message || String(error) }, { status: 500 });
  }
}
