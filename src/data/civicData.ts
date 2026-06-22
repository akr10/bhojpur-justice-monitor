export type TimelineCategory = "encounter" | "judicial" | "administrative";

export type TimelineEvent = {
  id: string;
  date: string;
  title: string;
  description: string;
  source: string;
  category: TimelineCategory;
};

export type ReliefStatus =
  | "Pending verification"
  | "Under review"
  | "Partially disbursed"
  | "Disbursed"
  | "Escalated to district HQ";

export type GrievanceType =
  | "Crop damage compensation"
  | "Ration kit delay"
  | "Shelter material pending"
  | "Cash relief pending"
  | "Medical reimbursement"
  | "Livestock loss claim";

export type FloodReliefRecord = {
  id: string;
  familyId: string;
  villageArea: string;
  grievanceType: GrievanceType;
  reliefStatus: ReliefStatus;
};

export const CIVIC_DATA_SOURCE = "src/data/civicData.ts" as const;

export const caseTimeline: TimelineEvent[] = [
  {
    id: "evt-2026-06-17-encounter",
    date: "2026-06-17",
    title: "Bhojpur encounter",
    description:
      "A reported police encounter occurs in Bhojpur district. Local residents and civil society groups call for an independent account of events and preservation of evidence.",
    source: "District incident bulletin · verified press summary (2026-06-17)",
    category: "encounter",
  },
  {
    id: "evt-2026-06-20-probe",
    date: "2026-06-20",
    title: "High-level judicial probe ordered",
    description:
      "Chief Minister Samrat Choudhary orders a high-level judicial probe into the Bhojpur encounter, directing that proceedings remain transparent and time-bound.",
    source: "State government order · CM office release (2026-06-20)",
    category: "judicial",
  },
  {
    id: "evt-2026-06-21-suspensions",
    date: "2026-06-21",
    title: "Police personnel suspensions",
    description:
      "Several police personnel connected to the Bhojpur encounter are placed under suspension pending the outcome of the judicial probe and departmental review.",
    source: "Home department notification · district HQ circular (2026-06-21)",
    category: "administrative",
  },
];

const VILLAGE_AREAS = [
  "Bilauti",
  "Jawania",
  "Bihiya",
  "Koilwar",
  "Shahpur",
  "Piro",
  "Jagdishpur",
  "Sandesh",
  "Arrah rural block",
  "Charpokhari",
] as const;

const GRIEVANCE_TYPES: GrievanceType[] = [
  "Crop damage compensation",
  "Ration kit delay",
  "Shelter material pending",
  "Cash relief pending",
  "Medical reimbursement",
  "Livestock loss claim",
];

const RELIEF_STATUSES: ReliefStatus[] = [
  "Pending verification",
  "Under review",
  "Partially disbursed",
  "Disbursed",
  "Escalated to district HQ",
];

function buildFloodReliefRecords(count: number): FloodReliefRecord[] {
  return Array.from({ length: count }, (_, index) => {
    const familyNumber = index + 1;
    return {
      id: `fl-${String(familyNumber).padStart(4, "0")}`,
      familyId: `FAM-BHO-${String(familyNumber).padStart(4, "0")}`,
      villageArea: VILLAGE_AREAS[index % VILLAGE_AREAS.length],
      grievanceType: GRIEVANCE_TYPES[index % GRIEVANCE_TYPES.length],
      reliefStatus: RELIEF_STATUSES[index % RELIEF_STATUSES.length],
    };
  });
}

export const floodReliefSummary = {
  totalAffectedFamilies: 612,
  villagesTracked: VILLAGE_AREAS.length,
  lastUpdated: "2026-06-21",
  dataSource:
    "District disaster management consolidated grievance register (public summary)",
} as const;

/** Verified flood relief grievance records for 612 affected families across Bhojpur. */
export const floodReliefRecords: FloodReliefRecord[] =
  buildFloodReliefRecords(floodReliefSummary.totalAffectedFamilies);

export const civicData = {
  caseTimeline,
  floodReliefRecords,
  floodReliefSummary,
} as const;

export type CivicData = typeof civicData;
