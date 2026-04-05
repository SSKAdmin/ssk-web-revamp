ALTER TABLE "applications" ADD COLUMN "ip_address" varchar(45);--> statement-breakpoint
ALTER TABLE "applications" ADD COLUMN "user_agent" text;--> statement-breakpoint
ALTER TABLE "contacts" ADD COLUMN "ip_address" varchar(45);--> statement-breakpoint
ALTER TABLE "contacts" ADD COLUMN "user_agent" text;