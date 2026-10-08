import { NextResponse, type NextRequest } from "next/server";
import { legacyAdminTarget } from "./app/lib/legacy-admin-redirect";
import { panelUrl } from "./app/lib/site";

// پنلِ ادمینِ «سایت» بازنشسته شده: تنها رابطِ مدیریتی، Admin Hub در اپ (panelUrl/admin) است و احرازِ هویتِ ادمین هم آن‌جاست.
// هر درخواست به /admin/** پیش از هر چیزِ دیگری (و بدونِ هیچ Auth/Supabase ای در سایت) به مسیرِ معادل در اپ Redirect می‌شود.
// بقیه‌ی سایت (عمومی) اصلاً از این Proxy رد نمی‌شود (matcher فقط /admin).
const NOINDEX = { "X-Robots-Tag": "noindex, nofollow" };

export function proxy(request: NextRequest) {
  // فقط GET/HEAD Redirect می‌شوند. درخواستِ نوشتنیِ قدیمی (مثلاً Server Action یا POSTِ فرمِ ادمینِ قبلی) هرگز با بدنه‌اش به
  // دامنه‌ی اپ بازپخش نمی‌شود؛ با 405 رد می‌شود.
  if (request.method !== "GET" && request.method !== "HEAD") {
    return new NextResponse(null, { status: 405, headers: { Allow: "GET, HEAD", ...NOINDEX } });
  }

  const { pathname, search, origin } = request.nextUrl;
  const target = new URL(legacyAdminTarget(pathname, search), panelUrl);

  // محافظِ حلقه: اگر به‌اشتباه panelUrl با دامنه‌ی خودِ سایت یکی تنظیم شده باشد، Redirect نمی‌کنیم (وگرنه حلقه‌ی بی‌پایان).
  if (target.origin === origin) return new NextResponse(null, { status: 404, headers: NOINDEX });

  const response = NextResponse.redirect(target, 307);
  response.headers.set("X-Robots-Tag", NOINDEX["X-Robots-Tag"]);
  return response;
}

export const config = {
  matcher: ["/admin/:path*"],
};
