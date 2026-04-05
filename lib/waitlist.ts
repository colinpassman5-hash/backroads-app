import { mkdir, readFile, writeFile } from "node:fs/promises";
import path from "node:path";

const dataDir = path.join(process.cwd(), "data");
const waitlistFile = path.join(dataDir, "waitlist.json");

export type WaitlistSubmission = {
  email: string;
  source?: string;
  productInterest?: string;
  submittedAt: string;
  utm: {
    source?: string;
    medium?: string;
    campaign?: string;
    content?: string;
    term?: string;
  };
};

export function isValidEmail(email: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

async function readSubmissions(): Promise<WaitlistSubmission[]> {
  try {
    const contents = await readFile(waitlistFile, "utf8");
    return JSON.parse(contents) as WaitlistSubmission[];
  } catch (error) {
    const nodeError = error as NodeJS.ErrnoException;

    if (nodeError.code === "ENOENT") {
      return [];
    }

    throw error;
  }
}

export async function saveSubmission(submission: WaitlistSubmission) {
  await mkdir(dataDir, { recursive: true });

  const existing = await readSubmissions();
  const normalizedEmail = submission.email.toLowerCase();
  const alreadyExists = existing.some((entry) => entry.email.toLowerCase() === normalizedEmail);

  if (alreadyExists) {
    return { created: false };
  }

  existing.push(submission);
  await writeFile(waitlistFile, JSON.stringify(existing, null, 2));

  return { created: true };
}
