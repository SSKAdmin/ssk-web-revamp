"use server";

import { db, schema } from "@/lib/db";
import { eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth/auth-options";

export async function getSystemSetting(key: string): Promise<string | null> {
  try {
    const setting = await db.query.systemSettings.findFirst({
      where: eq(schema.systemSettings.key, key),
    });
    return setting?.value || null;
  } catch (error) {
    console.error(`Failed to retrieve setting ${key}:`, error);
    // In dev mode or without DB, fallback gracefully
    if (key === "OPENAI_API_KEY") return process.env.OPENAI_API_KEY || null;
    return null;
  }
}

export async function updateSystemSetting(key: string, value: string, description?: string) {
  const session = await getServerSession(authOptions);
  
  if (!session || (session.user as { role?: string }).role !== "admin") {
    throw new Error("Unauthorized: Only administrators can modify system settings");
  }

  try {
    await db.insert(schema.systemSettings).values({
      key,
      value,
      description,
      isEncrypted: key.includes("KEY") || key.includes("SECRET"),
    }).onConflictDoUpdate({
      target: schema.systemSettings.key,
      set: {
        value,
        description,
        updatedAt: new Date(),
      }
    });

    revalidatePath("/[lang]/dashboard/settings", "page");
    return { success: true };
  } catch (error) {
    console.error(`Failed to update setting ${key}:`, error);
    return { success: false, error: "Database transaction failed" };
  }
}

export async function getAllSystemSettings() {
  try {
    const settings = await db.query.systemSettings.findMany({
      orderBy: (settings, { asc }) => [asc(settings.key)]
    });
    return settings;
  } catch (error) {
    console.error("Failed to retrieve all settings:", error);
    return []; // Return empty array gracefully if DB is offline
  }
}

export async function deleteSystemSetting(key: string) {
  const session = await getServerSession(authOptions);
  
  if (!session || (session.user as { role?: string }).role !== "admin") {
    throw new Error("Unauthorized: Only administrators can modify system settings");
  }

  try {
    await db.delete(schema.systemSettings).where(eq(schema.systemSettings.key, key));
    revalidatePath("/[lang]/dashboard/settings", "page");
    return { success: true };
  } catch (error) {
    console.error(`Failed to delete setting ${key}:`, error);
    return { success: false, error: "Database deletion failed" };
  }
}
