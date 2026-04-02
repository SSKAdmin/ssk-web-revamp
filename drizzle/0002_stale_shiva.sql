CREATE TYPE "public"."gov_doc_priority" AS ENUM('low', 'medium', 'high');--> statement-breakpoint
CREATE TYPE "public"."gov_doc_status" AS ENUM('exists', 'partial', 'missing');--> statement-breakpoint
ALTER TABLE "document_versions" DISABLE ROW LEVEL SECURITY;--> statement-breakpoint
DROP TABLE "document_versions" CASCADE;--> statement-breakpoint
ALTER TABLE "documents" DROP CONSTRAINT "documents_slug_unique";--> statement-breakpoint
ALTER TABLE "documents" DROP CONSTRAINT "documents_owner_id_users_id_fk";
--> statement-breakpoint
ALTER TABLE "documents" ALTER COLUMN "status" DROP DEFAULT;--> statement-breakpoint
ALTER TABLE "documents" ALTER COLUMN "status" SET DATA TYPE "public"."gov_doc_status" USING "status"::text::"public"."gov_doc_status";--> statement-breakpoint
ALTER TABLE "documents" ALTER COLUMN "status" SET DEFAULT 'missing';--> statement-breakpoint
ALTER TABLE "documents" ADD COLUMN "category" varchar(150) NOT NULL;--> statement-breakpoint
ALTER TABLE "documents" ADD COLUMN "name" varchar(255) NOT NULL;--> statement-breakpoint
ALTER TABLE "documents" ADD COLUMN "purpose" text NOT NULL;--> statement-breakpoint
ALTER TABLE "documents" ADD COLUMN "path" text;--> statement-breakpoint
ALTER TABLE "documents" ADD COLUMN "owner" varchar(150);--> statement-breakpoint
ALTER TABLE "documents" ADD COLUMN "priority" "gov_doc_priority" DEFAULT 'medium' NOT NULL;--> statement-breakpoint
ALTER TABLE "documents" ADD COLUMN "required_for_go_live" boolean DEFAULT false NOT NULL;--> statement-breakpoint
ALTER TABLE "documents" ADD COLUMN "notes" text;--> statement-breakpoint
ALTER TABLE "documents" DROP COLUMN "title";--> statement-breakpoint
ALTER TABLE "documents" DROP COLUMN "slug";--> statement-breakpoint
ALTER TABLE "documents" DROP COLUMN "type";--> statement-breakpoint
ALTER TABLE "documents" DROP COLUMN "current_version";--> statement-breakpoint
ALTER TABLE "documents" DROP COLUMN "owner_id";--> statement-breakpoint
DROP TYPE "public"."document_status";--> statement-breakpoint
DROP TYPE "public"."document_type";