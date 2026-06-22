/** Public intermediary grievance contact — IT Act compliance channel. */
export const GRIEVANCE_OFFICER_EMAIL = "grievance.monitor@proton.me";

/** Strip internal attribution prefix for public source badges (Copyright Act §52). */
export function formatPublisherBadge(source: string): string {
  return source.replace(/^Sourced via (Official )?/i, "").trim() || source;
}
