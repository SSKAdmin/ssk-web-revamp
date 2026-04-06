"use server";
import fs from 'fs';
import path from 'path';
import { db, schema } from "@/lib/db";
import { desc, eq } from "drizzle-orm";

const DB_PATH = path.join(process.cwd(), 'mock-db.json');

function readDb(): any {
  try {
    return JSON.parse(fs.readFileSync(DB_PATH, 'utf-8'));
  } catch(e) {
    return {};
  }
}

function writeDb(data: any) {
  fs.writeFileSync(DB_PATH, JSON.stringify(data, null, 2));
}

// USERS
export async function getUsers() { return readDb().users || []; }
export async function addUser(user: any) {
  const db = readDb();
  db.users.push({ ...user, id: String(Date.now()), active: true });
  writeDb(db);
  return { success: true };
}
export async function deleteUser(id: string) {
  const db = readDb();
  db.users = db.users.filter((u: any) => u.id !== id);
  writeDb(db);
  return { success: true };
}

// SERVICES
export async function getServices() { return readDb().services || []; }
export async function toggleService(id: string) {
  const db = readDb();
  const s = db.services.find((s: any) => s.id === id);
  if(s) s.active = !s.active;
  writeDb(db);
  return { success: true };
}
export async function updateServiceConfig(id: string, desc: string) {
  const db = readDb();
  const s = db.services.find((s: any) => s.id === id);
  if(s) s.desc = desc;
  writeDb(db);
  return { success: true };
}

// CMS
export async function getCms() { return readDb().cms || []; }
export async function updateCms(id: string, en: string, ar: string) {
  const db = readDb();
  const c = db.cms.find((c: any) => c.id === id);
  if(c) { c.valueEn = en; c.valueAr = ar; }
  writeDb(db);
  return { success: true };
}

// INBOX
export async function getInbox() { 
  try {
     const records = await db.select().from(schema.contacts).orderBy(desc(schema.contacts.createdAt));
     return records.map(r => ({
       id: r.id,
       from: r.name,
       sub: "Engagement Request",
       comp: r.organization || "No Organization Provided",
       time: new Date(r.createdAt || Date.now()).toISOString().split('T')[0],
       unread: r.status === "new",
       archived: r.status === "closed",
       body: r.message,
       phone: r.phone,
       email: r.email
     }));
  } catch (e) {
     return readDb().inbox || []; 
  }
}

export async function archiveMessage(id: string) {
  try {
     await db.update(schema.contacts).set({ status: "closed" }).where(eq(schema.contacts.id, id));
     return { success: true };
  } catch (e) {
     const dbMock = readDb();
     const m = dbMock.inbox?.find((m: any) => m.id === id);
     if(m) { m.archived = true; m.unread = false; }
     writeDb(dbMock);
     return { success: true };
  }
}

// SETTINGS
export async function getSettings() { return readDb().settings || { maintenanceMode: false, hydration: true }; }
export async function toggleSetting(key: string) {
  const db = readDb();
  db.settings[key] = !db.settings[key];
  writeDb(db);
  return { success: true, val: db.settings[key] };
}
// KNOWLEDGE
export async function getKnowledge() { return readDb().knowledge || []; }

// JOBS (Careers)
export async function getJobs() { 
  try {
    const records = await db.select().from(schema.jobs).orderBy(desc(schema.jobs.createdAt));
    return records.map(r => ({
      id: r.id,
      titleEn: r.titleEn,
      titleAr: r.titleAr,
      department: r.department,
      location: r.location,
      type: r.type,
      descriptionEn: r.descriptionEn,
      descriptionAr: r.descriptionAr,
      status: r.status,
      active: r.status !== 'closed',
      createdAt: new Date(r.createdAt || Date.now()).toISOString().split('T')[0]
    }));
  } catch (e) {
    return [];
  }
}

export async function addJob(job: any) {
  try {
    await db.insert(schema.jobs).values({
      titleEn: job.titleEn,
      titleAr: job.titleAr,
      department: job.department,
      location: job.location || 'Riyadh, KSA',
      type: job.type || 'Full-time',
      descriptionEn: job.descriptionEn,
      descriptionAr: job.descriptionAr,
      status: 'published'
    });
    return { success: true };
  } catch (e) {
    return { success: false, error: String(e) };
  }
}

export async function toggleJob(id: string) {
  try {
    const [current] = await db.select({ status: schema.jobs.status }).from(schema.jobs).where(eq(schema.jobs.id, id));
    if (!current) return { success: false };
    
    const newStatus = current.status === 'published' ? 'closed' : 'published';
    await db.update(schema.jobs).set({ status: newStatus as any }).where(eq(schema.jobs.id, id));
    return { success: true };
  } catch (e) {
    return { success: false };
  }
}

export async function deleteJob(id: string) {
  try {
    await db.delete(schema.jobs).where(eq(schema.jobs.id, id));
    return { success: true };
  } catch (e) {
    return { success: false };
  }
}
