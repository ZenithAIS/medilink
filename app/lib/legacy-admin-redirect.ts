// مسیرهای قدیمیِ پنلِ ادمینِ «سایت» (/admin/**) → مسیرِ معادل در پنلِ ادمینِ اپ (Admin Hub). ادمینِ سایت بازنشسته شده و تنها
// رابطِ مدیریتی، پنلِ ادمینِ اپ است؛ این‌جا فقط «نگاشتِ مسیر» است و هیچ احرازِ هویت/دسترسی‌ای انجام نمی‌شود.
//
// امنیتِ نگاشت: خروجی همیشه یک «مسیرِ نسبی» است که با /admin شروع می‌شود (هرگز host/scheme از ورودی نمی‌آید)، و تنها بخشِ
// متغیر، شناسه‌ی مقاله با الگوی بسیار محدودِ [A-Za-z0-9-] است؛ پس با ترکیبِ آن با panelUrl نمی‌شود به دامنه‌ی دیگری Redirect کرد.

const EXACT = new Map<string, string>([
  ["/admin", "/admin"],
  ["/admin/login", "/admin/login"],
  ["/admin/orders", "/admin/payments"],
  ["/admin/blog", "/admin/site/blog"],
  ["/admin/blog/new", "/admin/site/blog/new"],
  ["/admin/leads", "/admin/site/leads"],
  ["/admin/newsletter", "/admin/site/newsletter"],
]);

const BLOG_ID = /^\/admin\/blog\/([A-Za-z0-9-]{1,64})$/;

/** هر مسیرِ قدیمیِ ناشناخته (یا شناسه‌ی نامعتبر) به خانه‌ی ادمین می‌رود. */
export const LEGACY_ADMIN_FALLBACK = "/admin";

const MAX_SEARCH_LENGTH = 2048;

/**
 * @param pathname مسیرِ درخواست (مثلاً /admin/blog/abc-123)
 * @param search   رشته‌ی کوئری با «?» یا خالی؛ فقط برای مسیرهای نگاشت‌شده حفظ می‌شود
 * @returns مسیرِ نسبیِ معادل در پنلِ اپ (همیشه با /admin شروع می‌شود)
 */
export function legacyAdminTarget(pathname: string, search: string): string {
  const path = pathname.length > 1 ? pathname.replace(/\/+$/, "") : pathname;
  const keep = search.startsWith("?") && search.length > 1 && search.length <= MAX_SEARCH_LENGTH ? search : "";

  const exact = EXACT.get(path);
  if (exact) return exact + keep;

  const blog = BLOG_ID.exec(path);
  if (blog) return `/admin/site/blog/${blog[1]}${keep}`;

  return LEGACY_ADMIN_FALLBACK;
}
