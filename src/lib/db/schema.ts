import {
  boolean,
  integer,
  pgEnum,
  pgTable,
  text,
  timestamp,
  uuid,
  varchar,
} from "drizzle-orm/pg-core";

export const userRoleEnum = pgEnum("user_role", [
  "admin",
  "director",
  "manager",
  "viewer",
]);

export const govDocStatusEnum = pgEnum("gov_doc_status", [
  "exists",
  "partial",
  "missing",
]);

export const govDocPriorityEnum = pgEnum("gov_doc_priority", [
  "low",
  "medium",
  "high",
]);

export const taskStatusEnum = pgEnum("task_status", [
  "todo",
  "in_progress",
  "blocked",
  "done",
]);

export const users = pgTable("users", {
  id: uuid("id").defaultRandom().primaryKey(),
  name: varchar("name", { length: 150 }),
  email: varchar("email", { length: 255 }).notNull().unique(),
  passwordHash: text("password_hash").notNull(),
  role: userRoleEnum("role").notNull().default("viewer"),
  isActive: boolean("is_active").notNull().default(true),
  twoFactorEnabled: boolean("two_factor_enabled").default(false),
  createdAt: timestamp("created_at", { withTimezone: true }).defaultNow().notNull(),
  updatedAt: timestamp("updated_at", { withTimezone: true }).defaultNow().notNull(),
});

export const documents = pgTable("documents", {
  id: uuid("id").defaultRandom().primaryKey(),
  category: varchar("category", { length: 150 }).notNull(),
  name: varchar("name", { length: 255 }).notNull(),
  purpose: text("purpose").notNull(),
  status: govDocStatusEnum("status").notNull().default("missing"),
  path: text("path"),
  owner: varchar("owner", { length: 150 }),
  priority: govDocPriorityEnum("priority").notNull().default("medium"),
  requiredForGoLive: boolean("required_for_go_live").notNull().default(false),
  notes: text("notes"),
  createdAt: timestamp("created_at", { withTimezone: true }).defaultNow().notNull(),
  updatedAt: timestamp("updated_at", { withTimezone: true }).defaultNow().notNull(),
});

export const tasks = pgTable("tasks", {
  id: uuid("id").defaultRandom().primaryKey(),
  title: varchar("title", { length: 255 }).notNull(),
  description: text("description"),
  status: taskStatusEnum("status").notNull().default("todo"),
  assignedTo: uuid("assigned_to").references(() => users.id, { onDelete: "set null" }),
  deadline: timestamp("deadline", { withTimezone: true }),
  createdAt: timestamp("created_at", { withTimezone: true }).defaultNow().notNull(),
  updatedAt: timestamp("updated_at", { withTimezone: true }).defaultNow().notNull(),
});

export const cmsPageEnum = pgEnum("cms_page", [
  "home",
  "about",
  "services",
  "contact",
  "careers",
]);

export const languageEnum = pgEnum("language", ["en", "ar"]);

export const contactStatusEnum = pgEnum("contact_status", [
  "new",
  "in_progress",
  "closed",
]);

export const jobStatusEnum = pgEnum("job_status", [
  "draft",
  "published",
  "closed",
]);

export const applicationStatusEnum = pgEnum("application_status", [
  "new",
  "review",
  "shortlisted",
  "rejected",
  "hired",
]);

export const cmsSections = pgTable("cms_sections", {
  id: uuid("id").defaultRandom().primaryKey(),
  page: cmsPageEnum("page").notNull().default("home"),
  lang: languageEnum("lang").notNull().default("en"),
  sectionKey: varchar("section_key", { length: 120 }).notNull(),
  title: varchar("title", { length: 255 }),
  subtitle: text("subtitle"),
  body: text("body"),
  sortOrder: integer("sort_order").notNull().default(0),
  isPublished: boolean("is_published").notNull().default(true),
  createdAt: timestamp("created_at", { withTimezone: true }).defaultNow().notNull(),
  updatedAt: timestamp("updated_at", { withTimezone: true }).defaultNow().notNull(),
});

export const contacts = pgTable("contacts", {
  id: uuid("id").defaultRandom().primaryKey(),
  name: varchar("name", { length: 255 }).notNull(),
  email: varchar("email", { length: 255 }).notNull(),
  phone: varchar("phone", { length: 50 }),
  organization: varchar("organization", { length: 255 }),
  message: text("message").notNull(),
  status: contactStatusEnum("status").notNull().default("new"),
  // ipAddress: varchar("ip_address", { length: 45 }),
  // userAgent: text("user_agent"),
  createdAt: timestamp("created_at", { withTimezone: true }).defaultNow().notNull(),
});

export const jobs = pgTable("jobs", {
  id: uuid("id").defaultRandom().primaryKey(),
  titleEn: varchar("title_en", { length: 255 }).notNull(),
  titleAr: varchar("title_ar", { length: 255 }).notNull(),
  department: varchar("department", { length: 100 }).notNull(),
  location: varchar("location", { length: 100 }).notNull().default("Riyadh, KSA"),
  type: varchar("type", { length: 50 }).notNull().default("Full-time"),
  descriptionEn: text("description_en").notNull(),
  descriptionAr: text("description_ar").notNull(),
  status: jobStatusEnum("status").notNull().default("published"),
  createdAt: timestamp("created_at", { withTimezone: true }).defaultNow().notNull(),
});

export const applications = pgTable("applications", {
  id: uuid("id").defaultRandom().primaryKey(),
  jobId: uuid("job_id").references(() => jobs.id, { onDelete: "cascade" }),
  name: varchar("name", { length: 255 }).notNull(),
  email: varchar("email", { length: 255 }).notNull(),
  phone: varchar("phone", { length: 50 }),
  cvUrl: text("cv_url"),
  coverLetter: text("cover_letter"),
  status: applicationStatusEnum("status").notNull().default("new"),
  // ipAddress: varchar("ip_address", { length: 45 }),
  // userAgent: text("user_agent"),
  createdAt: timestamp("created_at", { withTimezone: true }).defaultNow().notNull(),
});

export const systemSettings = pgTable("system_settings", {
  key: varchar("key", { length: 150 }).primaryKey(),
  value: text("value"),
  isEncrypted: boolean("is_encrypted").notNull().default(false),
  description: text("description"),
  updatedAt: timestamp("updated_at", { withTimezone: true }).defaultNow().notNull(),
  updatedBy: uuid("updated_by").references(() => users.id, { onDelete: "set null" }),
});

export const auditLogs = pgTable("audit_logs", {
  id: uuid("id").defaultRandom().primaryKey(),
  action: varchar("action", { length: 100 }).notNull(), // e.g., 'UPDATE_SETTING', 'LOGIN', 'DELETE_LEAD'
  tableMutated: varchar("table_mutated", { length: 100 }),
  ipAddress: varchar("ip_address", { length: 45 }),
  userAgent: text("user_agent"),
  encryptedPayload: text("encrypted_payload"), // Immutable state capture
  userId: uuid("user_id").references(() => users.id, { onDelete: "set null" }),
  createdAt: timestamp("created_at", { withTimezone: true }).defaultNow().notNull(),
});

export const crmAccounts = pgTable("crm_accounts", {
  id: uuid("id").defaultRandom().primaryKey(),
  companyName: varchar("company_name", { length: 255 }).notNull(),
  industry: varchar("industry", { length: 100 }),
  sector: varchar("sector", { length: 100 }), // Public, Private, Semi-Gov
  annualRevenue: varchar("annual_revenue", { length: 100 }),
  assignedManagerId: uuid("assigned_manager_id").references(() => users.id, { onDelete: "set null" }),
  status: varchar("status", { length: 50 }).notNull().default("prospect"), // prospect, active, churned
  createdAt: timestamp("created_at", { withTimezone: true }).defaultNow().notNull(),
  updatedAt: timestamp("updated_at", { withTimezone: true }).defaultNow().notNull(),
});

export const websiteAnalytics = pgTable("website_analytics", {
  id: uuid("id").defaultRandom().primaryKey(),
  path: varchar("path", { length: 255 }).notNull(),
  ipAddress: varchar("ip_address", { length: 45 }),
  country: varchar("country", { length: 100 }),
  city: varchar("city", { length: 100 }),
  userAgent: text("user_agent"),
  sessionId: varchar("session_id", { length: 100 }),
  durationSeconds: integer("duration_seconds").default(0),
  visitedAt: timestamp("visited_at", { withTimezone: true }).defaultNow().notNull(),
});

// Admin Command Center additions

export const backupRecords = pgTable("backup_records", {
  id: uuid("id").defaultRandom().primaryKey(),
  fileName: varchar("file_name", { length: 255 }).notNull(),
  fileSize: varchar("file_size", { length: 50 }),
  status: varchar("status", { length: 50 }).notNull().default("completed"),
  url: text("url"),
  createdAt: timestamp("created_at", { withTimezone: true }).defaultNow().notNull(),
});

export const serviceCategories = pgTable("service_categories", {
  id: uuid("id").defaultRandom().primaryKey(),
  nameEn: varchar("name_en", { length: 255 }).notNull(),
  nameAr: varchar("name_ar", { length: 255 }).notNull(),
  descriptionEn: text("description_en"),
  descriptionAr: text("description_ar"),
  createdAt: timestamp("created_at", { withTimezone: true }).defaultNow().notNull(),
});

export const services = pgTable("services", {
  id: uuid("id").defaultRandom().primaryKey(),
  categoryId: uuid("category_id").references(() => serviceCategories.id, { onDelete: "cascade" }),
  titleEn: varchar("title_en", { length: 255 }).notNull(),
  titleAr: varchar("title_ar", { length: 255 }).notNull(),
  descriptionEn: text("description_en"),
  descriptionAr: text("description_ar"),
  isActive: boolean("is_active").default(true),
  createdAt: timestamp("created_at", { withTimezone: true }).defaultNow().notNull(),
});

export const solutionSectors = pgTable("solution_sectors", {
  id: uuid("id").defaultRandom().primaryKey(),
  nameEn: varchar("name_en", { length: 255 }).notNull(),
  nameAr: varchar("name_ar", { length: 255 }).notNull(),
  createdAt: timestamp("created_at", { withTimezone: true }).defaultNow().notNull(),
});

export const solutions = pgTable("solutions", {
  id: uuid("id").defaultRandom().primaryKey(),
  sectorId: uuid("sector_id").references(() => solutionSectors.id, { onDelete: "cascade" }),
  titleEn: varchar("title_en", { length: 255 }).notNull(),
  titleAr: varchar("title_ar", { length: 255 }).notNull(),
  contentEn: text("content_en"),
  contentAr: text("content_ar"),
  isActive: boolean("is_active").default(true),
  createdAt: timestamp("created_at", { withTimezone: true }).defaultNow().notNull(),
});

export const presentations = pgTable("presentations", {
  id: uuid("id").defaultRandom().primaryKey(),
  title: varchar("title", { length: 255 }).notNull(),
  description: text("description"),
  authorId: uuid("author_id").references(() => users.id, { onDelete: "set null" }),
  createdAt: timestamp("created_at", { withTimezone: true }).defaultNow().notNull(),
  updatedAt: timestamp("updated_at", { withTimezone: true }).defaultNow().notNull(),
});

export const presentationSlides = pgTable("presentation_slides", {
  id: uuid("id").defaultRandom().primaryKey(),
  presentationId: uuid("presentation_id").references(() => presentations.id, { onDelete: "cascade" }),
  order: integer("order").notNull().default(0),
  title: varchar("title", { length: 255 }),
  content: text("content"),
  layout: varchar("layout", { length: 100 }).default("standard"),
  createdAt: timestamp("created_at", { withTimezone: true }).defaultNow().notNull(),
});
