import type { TimelineCategory } from "@/data/civicData";

export const NEWS_REVALIDATE_SECONDS = 600;

export type NewsFeedItem = {
  id: string;
  date: string;
  title: string;
  description: string;
  source: string;
  sourceUrl: string;
  category: TimelineCategory | "news";
};

const SEARCH_QUERIES = [
  "Bharat Tiwari Bhojpur",
  "Bhojpur encounter Bihar",
  "Bihar judicial probe Bhojpur",
] as const;

const TRUSTED_SOURCE_PATTERNS = [
  /aaj\s*tak/i,
  /jagran/i,
  /dainik/i,
  /amar\s*ujala/i,
  /bhaskar/i,
  /ndtv/i,
  /the\s*hindu/i,
  /indian\s*express/i,
  /times\s*of\s*india/i,
  /republic/i,
  /news18/i,
  /livehindustan/i,
  /prabhat\s*khabar/i,
];

type ParsedRssItem = {
  title: string;
  link: string;
  pubDate: string;
  description: string;
  sourceLabel: string;
};

function extractTag(block: string, tag: string): string {
  const cdata = new RegExp(
    `<${tag}[^>]*><!\\[CDATA\\[([\\s\\S]*?)\\]\\]><\\/${tag}>`,
    "i",
  ).exec(block);
  if (cdata?.[1]) {
    return cdata[1].trim();
  }

  const plain = new RegExp(`<${tag}[^>]*>([\\s\\S]*?)<\\/${tag}>`, "i").exec(
    block,
  );
  return plain?.[1]?.replace(/<[^>]+>/g, "").trim() ?? "";
}

function parseRssXml(xml: string): ParsedRssItem[] {
  const items: ParsedRssItem[] = [];
  const itemRegex = /<item>([\s\S]*?)<\/item>/gi;
  let match = itemRegex.exec(xml);

  while (match) {
    const block = match[1];
    const title = extractTag(block, "title");
    const link = extractTag(block, "link");
    const pubDate = extractTag(block, "pubDate");
    const description = extractTag(block, "description");
    const sourceLabel = extractTag(block, "source");

    if (title && link) {
      items.push({ title, link, pubDate, description, sourceLabel });
    }

    match = itemRegex.exec(xml);
  }

  return items;
}

function toIsoDate(pubDate: string): string {
  const parsed = new Date(pubDate);
  if (Number.isNaN(parsed.getTime())) {
    return new Date().toISOString().slice(0, 10);
  }

  return parsed.toISOString().slice(0, 10);
}

function slugify(value: string): string {
  return value
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .slice(0, 48);
}

function isTrustedSource(title: string, sourceLabel: string, link: string): boolean {
  const haystack = `${title} ${sourceLabel} ${link}`;
  return TRUSTED_SOURCE_PATTERNS.some((pattern) => pattern.test(haystack));
}

async function fetchQueryFeed(query: string): Promise<ParsedRssItem[]> {
  const url = `https://news.google.com/rss/search?q=${encodeURIComponent(query)}&hl=hi-IN&gl=IN&ceid=IN:hi`;

  const response = await fetch(url, {
    next: { revalidate: NEWS_REVALIDATE_SECONDS },
  });

  if (!response.ok) {
    return [];
  }

  const xml = await response.text();
  return parseRssXml(xml);
}

export async function fetchNewsFeed(): Promise<NewsFeedItem[]> {
  const results = await Promise.all(
    SEARCH_QUERIES.map((query) => fetchQueryFeed(query)),
  );

  const seen = new Set<string>();
  const feed: NewsFeedItem[] = [];

  for (const batch of results) {
    for (const item of batch) {
      if (seen.has(item.link)) {
        continue;
      }

      if (!isTrustedSource(item.title, item.sourceLabel, item.link)) {
        continue;
      }

      seen.add(item.link);

      const sourceName = item.sourceLabel || "Verified press syndication";
      feed.push({
        id: `news-${slugify(item.title)}-${slugify(item.link).slice(-8)}`,
        date: toIsoDate(item.pubDate),
        title: item.title,
        description:
          item.description ||
          "Syndicated report surfaced via public RSS search. Open the source link for full coverage.",
        source: sourceName,
        sourceUrl: item.link,
        category: "news",
      });
    }
  }

  return feed.sort(
    (left, right) =>
      new Date(right.date).getTime() - new Date(left.date).getTime(),
  );
}
