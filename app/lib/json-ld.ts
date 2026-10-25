/**
 * سریال‌سازیِ امن برای JSON-LD داخل <script type="application/ld+json">.
 *
 * محتوای داخل <script> را مرورگر «HTML parse» می‌کند و فقط به‌دنبال رشته‌ی `</script` می‌گردد؛ پس `JSON.stringify`ِ ساده
 * وقتی مقدارِ متنی `</script><script>…` داشته باشد (عنوان/متن مقاله، یا قطعه‌ی URL) تگ را می‌بندد و کد تزریق می‌شود.
 * اینجا همه‌ی `<`، `>`، `&` و جداکننده‌های U+2028/U+2029 به escapeِ یونیکدِ JSON تبدیل می‌شوند؛ نتیجه همچنان JSON معتبر است و
 * JSON.parse دقیقاً همان مقدارِ اصلی را برمی‌گرداند، ولی هیچ `<` خامی در خروجی نمی‌ماند.
 */
const ESCAPES: Record<string, string> = {
  "<": "\\u003c",
  ">": "\\u003e",
  "&": "\\u0026",
  "\u2028": "\\u2028",
  "\u2029": "\\u2029",
};

export function serializeJsonLd(data: unknown): string {
  const json = JSON.stringify(data) ?? "null";
  return json.replace(/[<>&\u2028\u2029]/g, (c) => ESCAPES[c]);
}

/** propهای آماده برای `<script {...jsonLdScriptProps(data)} />`؛ تنها راهِ مجازِ ساختِ JSON-LD در این سایت. */
export function jsonLdScriptProps(data: unknown) {
  return {
    type: "application/ld+json",
    dangerouslySetInnerHTML: { __html: serializeJsonLd(data) },
  } as const;
}
