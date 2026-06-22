import type { TimelineCategory } from "@/data/civicData";

export const NEWS_REVALIDATE_SECONDS = 600;

/** Strict legal news reference structure for timeline display and AI grounding. */
export type NewsFeedItem = {
  id: string;
  title: string;
  eventDate: string;
  summary: string;
  source: string;
  sourceUrl: string;
  category: TimelineCategory | "news";
};

const SEARCH_QUERIES = [
  "Bharat Tiwari Bhojpur",
  "Bhojpur encounter Bihar",
  "Bihar judicial probe Bhojpur",
  "Bihar government Bhojpur official",
  "Bihar flood relief grievance district",
  "site:gov.in Bhojpur Bihar",
  "site:pib.gov.in Bihar",
] as const;

const TRUSTED_MEDIA_PATTERNS = [
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
  /hindustan\s*times/i,
  /economic\s*times/i,
  /deccan\s*herald/i,
  /telegraph/i,
  /outlook/i,
  /scroll\.in/i,
  /the\s*wire/i,
  /bbc/i,
  /cnn\s*news18/i,
  /zee\s*news/i,
  /abp\s*news/i,
];

const OFFICIAL_SOURCE_PATTERNS = [
  /gov\.in/i,
  /pib\.gov/i,
  /nic\.in/i,
  /bihar\.gov/i,
  /government/i,
  /official/i,
  /gazette/i,
  /department\s+bulletin/i,
  /home\s+department/i,
  /disaster\s+management/i,
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

function stripHtml(value: string): string {
  return value
    .replace(/<[^>]+>/g, " ")
    .replace(/&nbsp;|&amp;|&lt;|&gt;|&quot;/gi, " ")
    .replace(/\s+/g, " ")
    .trim();
}

function isOfficialSource(title: string, sourceLabel: string, link: string): boolean {
  const haystack = `${title} ${sourceLabel} ${link}`;
  return OFFICIAL_SOURCE_PATTERNS.some((pattern) => pattern.test(haystack));
}

function isTrustedMediaSource(
  title: string,
  sourceLabel: string,
  link: string,
): boolean {
  const haystack = `${title} ${sourceLabel} ${link}`;
  return TRUSTED_MEDIA_PATTERNS.some((pattern) => pattern.test(haystack));
}

function isVerifiedLegalSource(
  title: string,
  sourceLabel: string,
  link: string,
): boolean {
  return (
    isOfficialSource(title, sourceLabel, link) ||
    isTrustedMediaSource(title, sourceLabel, link)
  );
}

function inferPublisherName(sourceLabel: string, link: string): string {
  if (sourceLabel.trim()) {
    return sourceLabel.trim();
  }

  try {
    const hostname = new URL(link).hostname.replace(/^www\./, "");
    if (/gov\.in|nic\.in|pib\.gov/i.test(hostname)) {
      return "Official Bihar Government Gazette";
    }

    const segment = hostname.split(".")[0] ?? hostname;
    return segment.charAt(0).toUpperCase() + segment.slice(1);
  } catch {
    return "Verified press syndication";
  }
}

function formatSourceAttribution(
  title: string,
  sourceLabel: string,
  link: string,
): string {
  const publisher = inferPublisherName(sourceLabel, link);

  if (isOfficialSource(title, sourceLabel, link)) {
    if (/official|gazette|government|gov\.in|department bulletin/i.test(publisher)) {
      return `Sourced via ${publisher}`;
    }

    return `Sourced via Official ${publisher}`;
  }

  return `Sourced via ${publisher}`;
}

function buildNeutralSummary(title: string, rawDescription: string): string {
  const cleaned = stripHtml(rawDescription);
  const sentenceMatch = cleaned.match(/^[^.!?]+[.!?]?/);
  const firstSentence = sentenceMatch?.[0]?.trim();

  if (firstSentence && firstSentence.length >= 24) {
    const normalized = firstSentence.replace(/\s+/g, " ");
    return normalized.endsWith(".") ? normalized : `${normalized}.`;
  }

  const neutralTitle = stripHtml(title).replace(/\s+/g, " ").slice(0, 160);
  return `Public report syndicated regarding ${neutralTitle}.`;
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

export function normalizeNewsFeedItem(item: NewsFeedItem): NewsFeedItem {
  return {
    id: item.id,
    title: item.title.trim(),
    eventDate: item.eventDate,
    summary: item.summary.trim(),
    source: item.source.trim(),
    sourceUrl: item.sourceUrl.trim(),
    category: item.category,
  };
}

export function isValidNewsFeedItem(item: NewsFeedItem): boolean {
  return Boolean(
    item.id &&
      item.title &&
      item.eventDate &&
      item.summary &&
      item.source &&
      item.sourceUrl &&
      item.source.toLowerCase().startsWith("sourced via"),
  );
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

      if (!isVerifiedLegalSource(item.title, item.sourceLabel, item.link)) {
        continue;
      }

      seen.add(item.link);

      const normalized = normalizeNewsFeedItem({
        id: `news-${slugify(item.title)}-${slugify(item.link).slice(-8)}`,
        title: stripHtml(item.title),
        eventDate: toIsoDate(item.pubDate),
        summary: buildNeutralSummary(item.title, item.description),
        source: formatSourceAttribution(
          item.title,
          item.sourceLabel,
          item.link,
        ),
        sourceUrl: item.link,
        category: "news",
      });

      if (isValidNewsFeedItem(normalized)) {
        feed.push(normalized);
      }
    }
  }

  return feed.sort(
    (left, right) =>
      new Date(right.eventDate).getTime() - new Date(left.eventDate).getTime(),
  );
}
