# فونت محلی (self-hosted)

سایت فعلاً روی **Vazirmatn** از `next/font/google` است. برای تعویض به یک فونت
هندسی/گرد مثل **Shabnam** یا **Sahel**، فایل‌ها را اینجا بگذارید.

## ۱. دانلود

- Shabnam — https://github.com/rastikerdar/shabnam-font/releases
- Sahel — https://github.com/rastikerdar/sahel-font/releases

هر دو با لایسنس **OFL** منتشر شده‌اند؛ استفاده‌ی تجاری آزاد است.

از فایل zip، پوشه‌ی `WebFonts` یا فایل‌های `.woff2` را بردارید.

## ۲. فایل‌های لازم

این چهار فایل را دقیقاً با همین نام در همین پوشه قرار دهید:

```
app/fonts/Shabnam-Light.woff2      (وزن 300)
app/fonts/Shabnam.woff2            (وزن 400)
app/fonts/Shabnam-Medium.woff2     (وزن 500)
app/fonts/Shabnam-Bold.woff2       (وزن 700)
app/fonts/Shabnam-Black.woff2      (وزن 900)
```

> نام فایل‌ها در ریلیزهای مختلف فرق می‌کند (مثلاً `Shabnam-Bold-FD.woff2`).
> اگر نام‌ها متفاوت بود، فقط فایل‌ها را بگذارید و بگویید — مسیرها را تطبیق می‌دهم.

## ۳. فعال‌سازی

پس از قرار دادن فایل‌ها بگویید تا `app/layout.tsx` و `app/globals.css` را
به `next/font/local` سوییچ کنم. کد آماده است و فقط یک ویرایش لازم دارد.

معادل نهایی چیزی شبیه این خواهد بود:

```ts
import localFont from "next/font/local";

const shabnam = localFont({
  src: [
    { path: "./fonts/Shabnam-Light.woff2",  weight: "300", style: "normal" },
    { path: "./fonts/Shabnam.woff2",        weight: "400", style: "normal" },
    { path: "./fonts/Shabnam-Medium.woff2", weight: "500", style: "normal" },
    { path: "./fonts/Shabnam-Bold.woff2",   weight: "700", style: "normal" },
    { path: "./fonts/Shabnam-Black.woff2",  weight: "900", style: "normal" },
  ],
  display: "swap",
  variable: "--font-shabnam",
});
```
