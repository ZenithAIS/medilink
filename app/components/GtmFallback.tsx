"use client";

import { useEffect } from "react";
import { GTM_HEAD_SNIPPET } from "../lib/gtm";

// تورِ ایمنی برای «صفحه‌ی خطای Next» (<html id="__next_error__">)، مثلاً ۴۰۴ِ یک /blog/[slug] ناموجود: سرور فقط یک
// پوسته‌ی خالی می‌فرستد و React کلِ سند را سمتِ مرورگر می‌سازد؛ <script>ای که React خودش بسازد را مرورگر هرگز اجرا نمی‌کند،
// پس قطعه‌ی head در آن صفحه‌ها بی‌اثر می‌ماند.
//
// این‌جا همان قطعه‌ی رسمی «فقط وقتی» اجرا می‌شود که قطعه‌ی head اجرا نشده باشد. تشخیص: قطعه‌ی رسمی همان لحظه‌ی اجرا
// رویدادِ gtm.js را در dataLayer می‌گذارد (حتی اگر Ad-blocker دانلودِ gtm.js را ببندد). در صفحه‌های عادیِ سرورمحور این
// رویداد از قبل هست و این کامپوننت هیچ کاری نمی‌کند؛ پس در هیچ صفحه‌ای GTM دوبار بارگذاری نمی‌شود.
export default function GtmFallback() {
  useEffect(() => {
    const dataLayer = (window as unknown as { dataLayer?: unknown[] }).dataLayer;
    const alreadyStarted =
      Array.isArray(dataLayer) &&
      dataLayer.some((entry) => typeof entry === "object" && entry !== null && (entry as { event?: unknown }).event === "gtm.js");
    if (alreadyStarted) return;

    const script = document.createElement("script");
    script.text = GTM_HEAD_SNIPPET;
    document.head.appendChild(script);
  }, []);

  return null;
}
