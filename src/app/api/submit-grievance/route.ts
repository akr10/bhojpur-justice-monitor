import {
  getCommunityGrievances,
  saveCommunityGrievance,
  toAccountabilityRow,
  validateGrievanceInput,
} from "@/lib/grievances";
import { NEWS_REVALIDATE_SECONDS } from "@/lib/news-feed";

export async function GET() {
  try {
    const grievances = await getCommunityGrievances();

    return Response.json(
      {
        records: grievances.map(toAccountabilityRow),
        count: grievances.length,
        revalidateSeconds: NEWS_REVALIDATE_SECONDS,
      },
      {
        headers: {
          "Cache-Control": `s-maxage=${NEWS_REVALIDATE_SECONDS}, stale-while-revalidate`,
        },
      },
    );
  } catch {
    return Response.json({ records: [], count: 0 }, { status: 503 });
  }
}

export async function POST(req: Request) {
  let body: unknown;

  try {
    body = await req.json();
  } catch {
    return Response.json({ error: "Invalid request body." }, { status: 400 });
  }

  const input = validateGrievanceInput(body);
  if (!input) {
    return Response.json(
      {
        error:
          "Provide villageArea (2–120 chars), grievanceDetails (10–2000 chars), and an optional https evidenceLink.",
      },
      { status: 400 },
    );
  }

  try {
    const saved = await saveCommunityGrievance(input);

    return Response.json(
      {
        ok: true,
        record: toAccountabilityRow(saved),
      },
      { status: 201 },
    );
  } catch {
    return Response.json(
      { error: "Unable to store grievance at this time." },
      { status: 503 },
    );
  }
}
