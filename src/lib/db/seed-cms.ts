import { db, schema } from "./index";
import { eq } from "drizzle-orm";

async function seed() {
  console.log("🌱 Seeding CMS content...");

  const sections = [
    // HOME PAGE
    {
      page: "home",
      sectionKey: "hero",
      title: "Strategy. Precision. Outcomes.",
      subtitle: "The Institutional Hub for Enterprise Transformation.",
      body: "We operate inside execution. SSK is the institutional layer that bridges strategy and delivery.",
      sortOrder: 1,
    },

    // SERVICES PAGE
    {
      page: "services",
      sectionKey: "hero",
      title: "Institutional Service Architecture",
      subtitle: "The Eight Disciplines of Strategic Delivery.",
      body: "SSK provides a standardized suite of execution services designed for high-complexity environments and large-scale enterprise transformation.",
      sortOrder: 1,
    },
    {
      page: "services",
      sectionKey: "service-meo",
      title: "Managed Execution Office (MEO)",
      subtitle: "Workflow", // ICON NAME
      body: "SSK's signature operating model. We don't just 'report' on projects; we operate the execution node directly. This involves full lifecycle management from requirement stabilization to final handover.",
      sortOrder: 2,
    },
    {
      page: "services",
      sectionKey: "service-rhythm",
      title: "Program Rhythm & Governance",
      subtitle: "ShieldCheck",
      body: "Instilling a deterministic operational heartbeat. We establish the governance cadence that ensures every stakeholder, vendor, and internal team moves in alignment with the master plan.",
      sortOrder: 3,
    },
    {
      page: "services",
      sectionKey: "service-intelligence",
      title: "Execution Intelligence",
      subtitle: "BarChart4",
      body: "Transforming raw program data into boardroom-ready intelligence. Real-time visibility into the exact state of delivery, risk profiles, and resource velocity.",
      sortOrder: 4,
    },
    {
      page: "services",
      sectionKey: "service-stabilization",
      title: "Requirement Stabilization",
      subtitle: "FileText",
      body: "Cleaning the baseline. We resolve ambiguity in the initial 'Scope' or 'BRD' layers before resources are committed to procurement or development.",
      sortOrder: 5,
    },
    {
      page: "services",
      sectionKey: "service-procurement",
      title: "Procurement Velocity",
      subtitle: "Zap",
      body: "Accelerating the supply chain for delivery. We manage the professional intersection between commercial integrity and execution speed.",
      sortOrder: 6,
    },
    {
      page: "services",
      sectionKey: "service-liaison",
      title: "Digital Ecosystem Liaison",
      subtitle: "Globe2",
      body: "Managing the 'System of Systems'. We ensure cross-entity compatibility in the Kingdom's vast digital transformation landscape.",
      sortOrder: 7,
    },
    {
      page: "services",
      sectionKey: "service-crisis",
      title: "Crisis Remediation",
      subtitle: "Flame",
      body: "Emergency intervention for stalled programs. We deploy a clinical execution team to recover value and restore baseline rhythm.",
      sortOrder: 8,
    },
    {
      page: "services",
      sectionKey: "service-transition",
      title: "Transition & Handover (BOT)",
      subtitle: "Flag",
      body: "Ensuring institutional sustainability. We don't just build; we operate and then transfer operational leadership back to the client entity.",
      sortOrder: 9,
    },

    // ABOUT PAGE
    {
      page: "about",
      sectionKey: "hero",
      title: "The Strategic Execution Partner.",
      subtitle: "Redefining the Delivery Landscape of the Kingdom.",
      body: "SSK was founded on a single clinical observation: The gap between strategy and execution is where most organizations fail. We exist to close that gap.",
      sortOrder: 1,
    },
    {
      page: "about",
      sectionKey: "gap-analysis",
      title: "The Strategy-Execution Gap",
      subtitle: "Scale",
      body: "Boardroom decisions require a direct data-link to ground execution. SSK provides the deterministic layer that bridges high-level vision with concrete delivery nodes.",
      sortOrder: 2,
    },

    // CAREERS PAGE
    {
      page: "careers",
      sectionKey: "hero",
      title: "Impact & Talent.",
      subtitle: "Join the Ranks of Strategic Delivery Experts.",
      body: "At SSK, we don't look for consultants. We look for execution specialists—people who understand the mechanics of scaling institutional programs.",
      sortOrder: 1,
    },

    // CONTACT PAGE
    {
      page: "contact",
      sectionKey: "hero",
      title: "Initiate Strategic Partnership.",
      subtitle: "For Private and Public Sector Transformation.",
      body: "Connect with our team to discuss high-precision institutional execution for your next major program.",
      sortOrder: 1,
    },
    {
      page: "contact",
      sectionKey: "global-hq",
      title: "Digital City, Building FD-01",
      subtitle: "MapPin",
      body: "Riyadh, Kingdom of Saudi Arabia | Global Headquarters",
      sortOrder: 2,
    }
  ];

  for (const section of sections) {
    // Check if exists
    const existing = await db
      .select()
      .from(schema.cmsSections)
      .where(eq(schema.cmsSections.sectionKey, section.sectionKey))
      .limit(1);

    if (existing.length > 0) {
      console.log(`Updating ${section.page}:${section.sectionKey}...`);
      await db
        .update(schema.cmsSections)
        .set({ ...(section as typeof schema.cmsSections.$inferInsert), updatedAt: new Date() })
        .where(eq(schema.cmsSections.sectionKey, section.sectionKey));
    } else {
      console.log(`Inserting ${section.page}:${section.sectionKey}...`);
      await db.insert(schema.cmsSections).values(section as typeof schema.cmsSections.$inferInsert);
    }
  }

  console.log("✅ CMS Seeding complete.");
  process.exit(0);
}

seed().catch((err) => {
  console.error("❌ Seeding failed:", err);
  process.exit(1);
});
