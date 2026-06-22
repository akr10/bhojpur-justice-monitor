import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import { checkChatRateLimit } from "@/lib/rate-limit";

export const config = {
  matcher: "/api/chat",
};

function getClientIp(request: NextRequest): string {
  const forwardedFor = request.headers.get("x-forwarded-for");
  if (forwardedFor) {
    return forwardedFor.split(",")[0]?.trim() || "unknown";
  }

  return request.headers.get("x-real-ip")?.trim() || "unknown";
}

export async function middleware(request: NextRequest) {
  if (request.method !== "POST") {
    return NextResponse.next();
  }

  const clientIp = getClientIp(request);
  const allowed = await checkChatRateLimit(clientIp);

  if (!allowed) {
    return NextResponse.json(
      { error: "Too many requests. Please try again later." },
      { status: 429 },
    );
  }

  return NextResponse.next();
}
