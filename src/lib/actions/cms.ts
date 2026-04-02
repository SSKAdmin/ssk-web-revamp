"use server";

import fs from "fs/promises";
import path from "path";
import { revalidatePath } from "next/cache";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth/auth-options";

export async function getDictionaryContent(lang: "en" | "ar") {
  try {
    const filePath = path.join(process.cwd(), "src/dictionaries", `${lang}.json`);
    const fileContents = await fs.readFile(filePath, "utf8");
    return JSON.parse(fileContents);
  } catch (error) {
    console.error(`Failed to read dictionary file for ${lang}:`, error);
    throw new Error("Unable to load content dictionary.");
  }
}

export async function updateDictionaryContent(lang: "en" | "ar", newContent: Record<string, any>) {
  const session = await getServerSession(authOptions);
  
  if (!session || (session.user as { role?: string }).role !== "admin") {
    throw new Error("Unauthorized: Only administrators can modify platform content");
  }

  try {
    const filePath = path.join(process.cwd(), "src/dictionaries", `${lang}.json`);
    
    // Create a backup before overwriting
    const backupPath = path.join(process.cwd(), "src/dictionaries", `${lang}_backup_${Date.now()}.json`);
    const currentContent = await fs.readFile(filePath, "utf8");
    await fs.writeFile(backupPath, currentContent, "utf8");

    // Overwrite the actual dictionary
    await fs.writeFile(filePath, JSON.stringify(newContent, null, 2), "utf8");

    revalidatePath("/", "layout"); // Revalidate entire app to reflect text changes
    
    return { success: true };
  } catch (error) {
    console.error(`Failed to update dictionary file for ${lang}:`, error);
    return { success: false, error: "Failed to write to file system." };
  }
}
