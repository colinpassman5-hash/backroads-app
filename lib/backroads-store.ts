import { mkdir, readFile, writeFile } from "node:fs/promises";
import path from "node:path";
import { isValidEmail } from "@/lib/waitlist";

const dataDir = path.join(process.cwd(), "data");
const accountsFile = path.join(dataDir, "backroads-accounts.json");
const tripsFile = path.join(dataDir, "backroads-trips.json");

export type BackroadsAccount = {
  name: string;
  email: string;
  createdAt: string;
};

export type BackroadsTrip = {
  accountEmail: string;
  origin: string;
  destination: string;
  preferences?: string[];
  wanderMode?: boolean;
  scenicStop?: string;
  notes?: string;
  distanceMiles?: number;
  savedAt: string;
};

type AccountValidationResult =
  | { valid: false; error: string }
  | { valid: true; name: string; email: string };

async function readJsonFile<T>(filePath: string): Promise<T[]> {
  try {
    const raw = await readFile(filePath, "utf8");
    return JSON.parse(raw) as T[];
  } catch (error) {
    const nodeError = error as NodeJS.ErrnoException;

    if (nodeError.code === "ENOENT") {
      return [];
    }

    throw error;
  }
}

async function writeJsonFile<T>(filePath: string, payload: T[]) {
  await mkdir(dataDir, { recursive: true });
  await writeFile(filePath, JSON.stringify(payload, null, 2));
}

export function validateAccountPayload(name: string, email: string): AccountValidationResult {
  const normalizedEmail = email.trim().toLowerCase();
  const trimmedName = name.trim();

  if (trimmedName.length < 2 || trimmedName.length > 80) {
    return { valid: false, error: "Please enter your full name." };
  }

  if (!normalizedEmail || normalizedEmail.length > 254 || !isValidEmail(normalizedEmail)) {
    return { valid: false, error: "Please enter a valid email." };
  }

  return { valid: true, name: trimmedName, email: normalizedEmail };
}

export async function saveBackroadsAccount(name: string, email: string) {
  const existing = await readJsonFile<BackroadsAccount>(accountsFile);
  const duplicate = existing.some((account) => account.email === email);

  if (!duplicate) {
    existing.push({
      name,
      email,
      createdAt: new Date().toISOString()
    });

    await writeJsonFile(accountsFile, existing);
  }

  return { created: !duplicate };
}

export async function saveBackroadsTrip(trip: BackroadsTrip) {
  const existing = await readJsonFile<BackroadsTrip>(tripsFile);
  existing.push(trip);
  await writeJsonFile(tripsFile, existing);
  return { created: true };
}

export async function getBackroadsTripsByEmail(email: string) {
  const existing = await readJsonFile<BackroadsTrip>(tripsFile);
  const normalized = email.trim().toLowerCase();
  return existing.filter((trip) => trip.accountEmail.toLowerCase() === normalized);
}
