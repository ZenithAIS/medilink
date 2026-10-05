// Google Tag Manager — تنها منبعِ شناسه‌ی کانتینر و قطعه‌ی رسمیِ head. هم app/layout.tsx (رندر سمتِ سرور داخلِ <head>)
// و هم GtmFallback (فقط وقتی قطعه‌ی سرور اجرا نشد) از همین ثابت‌ها استفاده می‌کنند؛ پس نه شناسه‌ای تکرار می‌شود و نه کدی.
export const GTM_ID = "GTM-K47MTWQ7";

// قطعه‌ی رسمیِ Google Tag Manager (بخش head) — «بدون هیچ تغییری» جز جایگزینیِ شناسه‌ی کانتینر.
export const GTM_HEAD_SNIPPET = `(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
})(window,document,'script','dataLayer','${GTM_ID}');`;
