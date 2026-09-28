import "server-only";
import { cookies } from "next/headers";
import { createServerClient } from "@supabase/ssr";
import { createClient } from "@supabase/supabase-js";
import { appDbPublishableKey, appDbServiceRoleKey, appDbUrl } from "./env";

/** نشست کاربر (ادمین) با کوکی؛ همه‌ی کوئری‌ها زیر RLS دیتابیس اپ اجرا می‌شوند. */
export async function createAppDbSessionClient() {
  const cookieStore = await cookies();

  return createServerClient(appDbUrl(), appDbPublishableKey(), {
    cookies: {
      getAll() {
        return cookieStore.getAll();
      },
      setAll(cookiesToSet) {
        try {
          for (const { name, value, options } of cookiesToSet) {
            cookieStore.set(name, value, options);
          }
        } catch {
          // از Server Component صدا زده شده؛ proxy نشست را تازه می‌کند.
        }
      },
    },
  });
}

/** خواندن عمومی (مثلاً مقالات منتشرشده) بدون کوکی تا صفحه قابل کش ماند. */
export function createAppDbPublicClient() {
  return createClient(appDbUrl(), appDbPublishableKey(), {
    auth: { persistSession: false, autoRefreshToken: false },
  });
}

/** فقط برای ثبت سفارش خریدار ناشناس و تأیید پرداخت — RLS را دور می‌زند. */
export function createAppDbServiceClient() {
  return createClient(appDbUrl(), appDbServiceRoleKey(), {
    auth: { persistSession: false, autoRefreshToken: false },
  });
}
