"use server";
import fs from 'fs';
import path from 'path';

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
export async function getInbox() { return readDb().inbox || []; }
export async function archiveMessage(id: string) {
  const db = readDb();
  const m = db.inbox.find((m: any) => m.id === id);
  if(m) { m.archived = true; m.unread = false; }
  writeDb(db);
  return { success: true };
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
export async function getJobs() { return readDb().jobs || []; }
export async function addJob(job: any) {
  const db = readDb();
  if(!db.jobs) db.jobs = [];
  db.jobs.push({ 
     ...job, 
     id: "SSK-JOB-" + Date.now(), 
     active: true, 
     createdAt: new Date().toISOString().split('T')[0] 
  });
  writeDb(db);
  return { success: true };
}
export async function toggleJob(id: string) {
  const db = readDb();
  if(!db.jobs) return { success: false };
  const j = db.jobs.find((x: any) => x.id === id);
  if(j) j.active = !j.active;
  writeDb(db);
  return { success: true };
}
export async function deleteJob(id: string) {
  const db = readDb();
  if(!db.jobs) return { success: false };
  db.jobs = db.jobs.filter((j: any) => j.id !== id);
  writeDb(db);
  return { success: true };
}
