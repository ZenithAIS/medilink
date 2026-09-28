import { createServerClient } from "@supabase/ssr";
import { NextResponse, type NextRequest } from "next/server";
import { appDbPublishableKey, appDbUrl } from "./env";

// تنها بخش محافظت‌شده‌ی سایت، پنل ادمین است (حساب از دیتابیس اپ). بقیه‌ی سایت (خانه، محصولات،
// خدمات، چک‌اوت و ...) کاملاً عمومی می‌ماند و نیازی به نشست ندارد.
const ADMIN_PREFIX = "/admin";
const GUEST_ONLY_ROUTE = "/admin/login";

export async function updateSession(request: NextRequest) {
  let response = NextResponse.next({ request });

  const supabase = createServerClient(appDbUrl(), appDbPublishableKey(), {
    cookies: {
      getAll() {
        return request.cookies.getAll();
      },
      setAll(cookiesToSet) {
        for (const { name, value } of cookiesToSet) {
          request.cookies.set(name, value);
        }
        response = NextResponse.next({ request });
        for (const { name, value, options } of cookiesToSet) {
          response.cookies.set(name, value, options);
        }
      },
    },
  });

  const path = request.nextUrl.pathname;
  if (!path.startsWith(ADMIN_PREFIX)) {
    return response;
  }

  const {
    data: { user },
  } = await supabase.auth.getUser();

  const isGuestOnlyRoute = path === GUEST_ONLY_ROUTE;
  // فقط ادمین پلتفرم؛ کاربر عادی اپ (مالک کلینیک) هم نشست معتبر دارد ولی ادمین نیست.
  const isAdmin = user ? (await supabase.rpc("is_platform_admin")).data === true : false;

  if (!isAdmin && !isGuestOnlyRoute) {
    const url = request.nextUrl.clone();
    url.pathname = GUEST_ONLY_ROUTE;
    const redirectResponse = NextResponse.redirect(url);
    for (const cookie of response.cookies.getAll()) {
      redirectResponse.cookies.set(cookie);
    }
    return redirectResponse;
  }

  if (isAdmin && isGuestOnlyRoute) {
    const url = request.nextUrl.clone();
    url.pathname = ADMIN_PREFIX;
    const redirectResponse = NextResponse.redirect(url);
    for (const cookie of response.cookies.getAll()) {
      redirectResponse.cookies.set(cookie);
    }
    return redirectResponse;
  }

  return response;
}
