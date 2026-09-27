import { type NextRequest } from "next/server";
import { updateSession } from "./app/lib/app-db/middleware";

export function proxy(request: NextRequest) {
  return updateSession(request);
}

export const config = {
  matcher: ["/admin/:path*"],
};
