export function isKvConfigured(): boolean {
  return Boolean(
    process.env.KV_REST_API_URL && process.env.KV_REST_API_TOKEN,
  );
}

export async function getKv() {
  const { kv } = await import("@vercel/kv");
  return kv;
}
