import "server-only";
import { createClient } from "@supabase/supabase-js";
import { appDbPublishableKey, appDbServiceRoleKey, appDbUrl } from "./env";

// کلاینتِ «نشستِ کاربر/ادمین» (کوکی‌محور) از این‌جا برداشته شد: ادمینِ سایت بازنشسته است و مدیریت فقط در پنلِ اپ انجام می‌شود.
// سایت فقط دو کلاینتِ بدونِ نشست دارد: خواندنِ عمومی (publishable) و درجِ سروری (service_role).

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
