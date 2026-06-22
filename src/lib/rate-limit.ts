const WINDOW_MS = 60_000;
const MAX_REQUESTS = 10;

type Bucket = {
  count: number;
  resetAt: number;
};

const memoryBuckets = new Map<string, Bucket>();

function isKvConfigured(): boolean {
  return Boolean(
    process.env.KV_REST_API_URL && process.env.KV_REST_API_TOKEN,
  );
}

function rateLimitInMemory(key: string): boolean {
  const now = Date.now();
  const bucketKey = `chat:${key}`;
  let bucket = memoryBuckets.get(bucketKey);

  if (!bucket || now >= bucket.resetAt) {
    bucket = { count: 0, resetAt: now + WINDOW_MS };
    memoryBuckets.set(bucketKey, bucket);
  }

  bucket.count += 1;
  return bucket.count <= MAX_REQUESTS;
}

async function rateLimitWithKv(key: string): Promise<boolean> {
  const { kv } = await import("@vercel/kv");
  const bucketKey = `rate_limit:chat:${key}`;
  const count = await kv.incr(bucketKey);

  if (count === 1) {
    await kv.expire(bucketKey, Math.ceil(WINDOW_MS / 1000));
  }

  return count <= MAX_REQUESTS;
}

export async function checkChatRateLimit(clientIp: string): Promise<boolean> {
  const key = clientIp || "unknown";

  if (isKvConfigured()) {
    try {
      return await rateLimitWithKv(key);
    } catch {
      return rateLimitInMemory(key);
    }
  }

  return rateLimitInMemory(key);
}

export const CHAT_RATE_LIMIT = {
  windowMs: WINDOW_MS,
  maxRequests: MAX_REQUESTS,
} as const;
