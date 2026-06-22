import { fetchNewsFeed, NEWS_REVALIDATE_SECONDS } from "@/lib/news-feed";

export const revalidate = 600;

export async function GET() {
  try {
    const items = await fetchNewsFeed();

    return Response.json(
      {
        items,
        fetchedAt: new Date().toISOString(),
        revalidateSeconds: NEWS_REVALIDATE_SECONDS,
      },
      {
        headers: {
          "Cache-Control": `s-maxage=${NEWS_REVALIDATE_SECONDS}, stale-while-revalidate`,
        },
      },
    );
  } catch {
    return Response.json(
      { items: [], fetchedAt: new Date().toISOString(), error: "Feed unavailable" },
      { status: 503 },
    );
  }
}
