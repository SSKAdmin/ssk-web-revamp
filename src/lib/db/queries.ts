import { and, asc, desc, eq } from "drizzle-orm";
import { db, schema } from "./index";

export type CMSSection = typeof schema.cmsSections.$inferSelect;

/**
 * Fetches all published sections for a specific page, ordered by sortOrder.
 */
export async function getPageSections(page: "home" | "about" | "services" | "contact" | "careers", lang: "en" | "ar" = "en") {
  try {
    const sections = await db
      .select()
      .from(schema.cmsSections)
      .where(
        and(
          eq(schema.cmsSections.page, page),
          eq(schema.cmsSections.lang, lang),
          eq(schema.cmsSections.isPublished, true)
        )
      )
      .orderBy(asc(schema.cmsSections.sortOrder));

    // If no sections in DB, return static fallbacks
    if (sections.length === 0) {
       return getStaticFallbacks(page);
    }

    return sections.reduce((acc: Record<string, CMSSection>, section: CMSSection) => {
      acc[section.sectionKey] = section;
      return acc;
    }, {});
  } catch (error) {
    console.warn(`CMS Fetch failed for ${page}, using fallbacks.`);
    return getStaticFallbacks(page);
  }
}

function getStaticFallbacks(page: string): Record<string, any> {
   const fallbacks: Record<string, any> = {
      services: {
         'hero': { title: "Institutional Service Architecture", subtitle: "The Eight Disciplines of Controlled Execution.", body: "SSK provides a standardized suite of execution services designed for high-complexity institutional environments." },
         'service-meo': { title: "Managed Execution Office (MEO)", subtitle: "Workflow", body: "SSK's signature operating model. We don't just 'report'; we operate the execution node directly." }
      },
      about: {
         'hero': { title: "The Execution Authority.", subtitle: "Redefining the Delivery Landscape.", body: "Closing the gap between strategy and execution." }
      },
      careers: {
         'hero': { title: "Deployment & Talent.", subtitle: "Join the Ranks of National Delivery Experts.", body: "At SSK, we look for execution specialists." }
      },
      contact: {
         'hero': { title: "Initiate Strategic Engagement.", subtitle: "For Strategic Programs.", body: "Connect with our liaison office." }
      }
   };
   return fallbacks[page] || {};
}

/**
 * Helper to get a specific section by key
 */
export async function getSection(page: string, key: string) {
  const sections = await getPageSections(page as any);
  return sections[key] || null;
}

/**
 * Jobs Queries
 */
export async function getJobs(isAdmin: boolean = false) {
  try {
    if (isAdmin) {
      return await db
        .select()
        .from(schema.jobs)
        .orderBy(asc(schema.jobs.createdAt));
    }
    return await db
      .select()
      .from(schema.jobs)
      .where(eq(schema.jobs.status, "published"))
      .orderBy(asc(schema.jobs.createdAt));
  } catch (error) {
    console.error("[GET_JOBS]", error);
    return [];
  }
}

export async function getJobById(identifier: string) {
  try {
    const isUuid = /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i.test(identifier);
    const [job] = await db
      .select()
      .from(schema.jobs)
      .where(isUuid ? eq(schema.jobs.id, identifier) : eq(schema.jobs.slug, identifier));
    return job || null;
  } catch (error) {
    console.error("[GET_JOB_BY_IDENTIFIER]", error);
    return null;
  }
}

/**
 * Contact Queries
 */
export async function getContacts() {
  try {
    return await db
      .select()
      .from(schema.contacts)
      .orderBy(asc(schema.contacts.createdAt));
  } catch (error) {
    console.error("[GET_CONTACTS]", error);
    return [];
  }
}

/**
 * Application Queries
 */
export async function getApplications() {
  try {
    return await db
      .select()
      .from(schema.applications)
      .orderBy(asc(schema.applications.createdAt));
  } catch (error) {
    console.error("[GET_APPLICATIONS]", error);
    return [];
  }
}

export async function getApplicationById(id: string) {
  try {
    const [app] = await db
      .select()
      .from(schema.applications)
      .where(eq(schema.applications.id, id));
    return app || null;
  } catch (error) {
    console.error("[GET_APPLICATION_BY_ID]", error);
    return null;
  }
}

/**
 * Documents Queries (EDMS)
 */
import { seedDocuments } from "./docs-mock";

export async function getDocuments() {
  try {
    return await db
      .select()
      .from(schema.documents)
      .orderBy(desc(schema.documents.createdAt));
  } catch (error) {
    console.error("[GET_DOCUMENTS]", error);
    console.warn("[DB_FALLBACK] Database offline. Returning static Documentation Reserve.");
    return seedDocuments;
  }
}
