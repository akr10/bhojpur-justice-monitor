import {
  fetchNewsFeed,
  isValidNewsFeedItem,
  NEWS_REVALIDATE_SECONDS,
  type NewsFeedItem,
} from "@/lib/news-feed";

export const revalidate = 600;

function validateFeedItems(items: NewsFeedItem[]): NewsFeedItem[] {
  return items.filter(isValidNewsFeedItem);
}

export async function GET() {
  try {
    const items = validateFeedItems(await fetchNewsFeed());

    return Response.json(
      {
        items,
        fetchedAt: new Date().toISOString(),
        revalidateSeconds: NEWS_REVALIDATE_SECONDS,
        complianceNote:
          "Each item includes title, eventDate, neutral summary, and explicit Sourced via attribution from verified media or official government portals.",
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
