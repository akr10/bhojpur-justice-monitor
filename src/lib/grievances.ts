import type { ReliefStatus } from "@/data/civicData";
import { getKv, isKvConfigured } from "@/lib/kv-client";

export const GRIEVANCE_KV_KEY = "community_grievances" as const;

export type CommunityGrievance = {
  id: string;
  familyId: string;
  villageArea: string;
  grievanceType: string;
  grievanceDetails: string;
  evidenceLink: string | null;
  reliefStatus: ReliefStatus;
  submittedAt: string;
};

export type GrievanceSubmissionInput = {
  villageArea: string;
  grievanceDetails: string;
  evidenceLink?: string;
};

const memoryGrievances: CommunityGrievance[] = [];

function generateAnonymousId(): string {
  const token = crypto.randomUUID().replace(/-/g, "").slice(0, 8).toUpperCase();
  return `CMY-${token}`;
}

export function validateGrievanceInput(
  body: unknown,
): GrievanceSubmissionInput | null {
  if (!body || typeof body !== "object") {
    return null;
  }

  const record = body as Record<string, unknown>;
  const villageArea =
    typeof record.villageArea === "string" ? record.villageArea.trim() : "";
  const grievanceDetails =
    typeof record.grievanceDetails === "string"
      ? record.grievanceDetails.trim()
      : "";
  const evidenceLink =
    typeof record.evidenceLink === "string"
      ? record.evidenceLink.trim()
      : undefined;

  if (villageArea.length < 2 || villageArea.length > 120) {
    return null;
  }

  if (grievanceDetails.length < 10 || grievanceDetails.length > 2000) {
    return null;
  }

  if (evidenceLink && evidenceLink.length > 500) {
    return null;
  }

  if (evidenceLink && !/^https?:\/\//i.test(evidenceLink)) {
    return null;
  }

  return {
    villageArea,
    grievanceDetails,
    evidenceLink: evidenceLink || undefined,
  };
}

async function readFromKv(): Promise<CommunityGrievance[]> {
  const kv = await getKv();
  const stored = await kv.get<CommunityGrievance[]>(GRIEVANCE_KV_KEY);
  return Array.isArray(stored) ? stored : [];
}

async function writeToKv(records: CommunityGrievance[]): Promise<void> {
  const kv = await getKv();
  await kv.set(GRIEVANCE_KV_KEY, records);
}

export async function getCommunityGrievances(): Promise<CommunityGrievance[]> {
  if (isKvConfigured()) {
    try {
      return await readFromKv();
    } catch {
      return [...memoryGrievances];
    }
  }

  return [...memoryGrievances];
}

export async function saveCommunityGrievance(
  input: GrievanceSubmissionInput,
): Promise<CommunityGrievance> {
  const entry: CommunityGrievance = {
    id: `cm-${crypto.randomUUID()}`,
    familyId: generateAnonymousId(),
    villageArea: input.villageArea,
    grievanceType: input.grievanceDetails.slice(0, 80),
    grievanceDetails: input.grievanceDetails,
    evidenceLink: input.evidenceLink ?? null,
    reliefStatus: "Pending verification",
    submittedAt: new Date().toISOString(),
  };

  if (isKvConfigured()) {
    try {
      const existing = await readFromKv();
      await writeToKv([entry, ...existing].slice(0, 500));
      return entry;
    } catch {
      memoryGrievances.unshift(entry);
      return entry;
    }
  }

  memoryGrievances.unshift(entry);
  return entry;
}

export function toAccountabilityRow(grievance: CommunityGrievance) {
  return {
    id: grievance.id,
    familyId: grievance.familyId,
    villageArea: grievance.villageArea,
    grievanceType: grievance.grievanceType,
    reliefStatus: grievance.reliefStatus,
    evidenceLink: grievance.evidenceLink,
    isCommunitySubmission: true as const,
  };
}
