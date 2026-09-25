# مدیلینک (Medilink)

وب‌سایت **مدیلینک** — ارائه‌دهنده‌ی سیستم‌های هوش مصنوعی و اتوماسیون برای کلینیک‌ها و مراکز پزشکی.
سایتی چندصفحه‌ای فارسی/RTL که محصولات را معرفی می‌کند و مدیران کلینیک را به «درخواست دمو» هدایت می‌کند.

ساختار صفحات بر اساس `Medilink-Website-Brief.docx` (نسخه ۱٫۰) پیاده شده است.

## پشته فناوری

| لایه | فناوری |
| --- | --- |
| فریم‌ورک | Next.js 16 (App Router) + React 19 |
| استایل | Tailwind CSS v4 |
| دیتابیس | Supabase (Postgres + RLS) |
| اعتبارسنجی | Zod |
| فونت | Shabnam از طریق `next/font/local` (self-hosted، لایسنس OFL) |

## راه‌اندازی

۱. نصب پکیج‌ها:

```bash
npm install
```

۲. یک پروژه Supabase بسازید و فایل محیطی را از نمونه کپی کنید:

```bash
cp .env.example .env.local
```

سپس مقادیر را از مسیر Supabase › Project Settings › API Keys پر کنید:

- `NEXT_PUBLIC_SUPABASE_URL`
- `NEXT_PUBLIC_SUPABASE_ANON_KEY`
- `SUPABASE_SERVICE_ROLE_KEY` — **فقط سمت سرور.** هرگز پیشوند `NEXT_PUBLIC_` نگیرد و در گیت کامیت نشود.
- `NEXT_PUBLIC_SITE_URL` — دامنه سایت، برای تگ‌های canonical و Open Graph (اختیاری؛ پیش‌فرض `https://medilink.ir`).

- `NEXT_PUBLIC_WHATSAPP_NUMBER` — شماره‌ی دکمه‌ی شناور واتساپ، فرمت بین‌المللی بدون `+` (اختیاری).

۳. مایگریشن‌های دیتابیس را اجرا کنید. فایل‌های `supabase/migrations/` را به ترتیب در SQL Editor داشبورد Supabase اجرا کنید، یا با CLI:

```bash
supabase db push
```

۴. سرور توسعه:

```bash
npm run dev
```

سایت روی [http://localhost:3000](http://localhost:3000) بالا می‌آید.

## دستورها

```bash
npm run dev        # سرور توسعه
npm run build      # بیلد پروداکشن
npm run start      # اجرای بیلد پروداکشن
npm run lint       # ESLint
npm run typecheck  # بررسی تایپ‌ها با tsc
```

## نقشه‌ی سایت

| مسیر | صفحه |
| --- | --- |
| `/` | خانه |
| `/products` | فهرست محصولات |
| `/products/[slug]` | صفحه‌ی اختصاصی هر محصول (۵ محصول) |
| `/pricing` | تعرفه‌ها و پلن‌ها |
| `/about` | درباره‌ی ما |
| `/clients` | نمونه‌کارها و مشتریان |
| `/blog` و `/blog/[slug]` | بلاگ و منابع |
| `/faq` | سوالات متداول |
| `/contact` | تماس و درخواست دمو |
| `/privacy` و `/terms` | صفحات حقوقی |

`sitemap.xml` و `robots.txt` به‌صورت پویا از همین داده‌ها ساخته می‌شوند.

## ساختار پروژه

```
app/
  actions/
    leads.ts              # Server Action فرم دمو (اعتبارسنجی Zod + درج در دیتابیس)
    newsletter.ts         # Server Action عضویت خبرنامه
  components/             # کامپوننت‌های مشترک و سکشن‌های صفحات
  lib/
    site.ts               # اطلاعات تماس، منوی ناوبری، آدرس سایت
    products.ts           # داده‌ی ۵ محصول (منبع مشترک صفحات و sitemap)
    pricing.ts            # پلن‌ها، جدول مقایسه و افزودنی‌ها
    blog.ts               # مقالات بلاگ
    faq.ts                # سوالات متداول
    clinic-types.ts       # فهرست انواع کلینیک برای فرم دمو
  lib/supabase/
    env.ts                # خواندن متغیرهای محیطی با خطای شفاف
    client.ts             # کلاینت مرورگر (کلید anon، محدود به RLS)
    server.ts             # کلاینت سرور مبتنی بر کوکی نشست
    admin.ts             # کلاینت service_role — server-only، RLS را دور می‌زند
  layout.tsx              # هدر، فوتر و دکمه‌ی واتساپ مشترک همه‌ی صفحات
  sitemap.ts, robots.ts   # سئو
supabase/migrations/      # اسکیمای دیتابیس
```

> محتوای فعلی (تعرفه‌ها، مقالات، کیس‌استادی‌ها، اعضای تیم) و همه‌ی تصاویر **placeholder** هستند
> و با کامنت‌های `TODO(asset)`، `TODO(content)` و `TODO(legal)` در کد علامت‌گذاری شده‌اند.

## نکات امنیتی

- جدول‌های `leads`، `newsletter_subscribers` و `orders` با RLS فعال‌اند و **هیچ policy‌ای برای نقش `anon` تعریف نشده**؛ یعنی از مرورگر نه خواندنی ممکن است و نه نوشتنی.
- درج داده فقط در Server Action و با کلید `service_role` انجام می‌شود که RLS را دور می‌زند. فایل `app/lib/supabase/admin.ts` با `server-only` علامت‌گذاری شده تا اگر تصادفاً از یک کامپوننت کلاینتی import شود، بیلد خطا بدهد.
- پیام خطای دیتابیس هرگز به کاربر برگردانده نمی‌شود؛ فقط در لاگ سرور ثبت می‌شود.

## خرید آنلاین (زرین‌پال)

بسته‌های قابل‌خرید (اتوماسیون مطب، طراحی سایت، سئو) و قیمت‌هایشان در `app/lib/packages.ts` تعریف شده‌اند — منبع واقعیِ قیمت است، نه صفحه‌ی `/pricing`. جریان خرید: `/checkout` سفارش را در جدول `orders` ثبت می‌کند، کاربر را به درگاه زرین‌پال می‌فرستد، و `/checkout/verify` (Route Handler، مقصد callback زرین‌پال) پرداخت را verify و وضعیت سفارش را به‌روز می‌کند.

نکته‌ی مهم: زرین‌پال شارژ خودکارِ دوره‌ای (subscription) ندارد — API استاندارد فقط پرداخت لحظه‌ای است. بسته‌های ماهانه فعلاً فقط دوره‌ی اول را از همین مسیر می‌گیرند؛ تمدید خودکار واقعی نیاز به سرویس جداگانه‌ی «پیمان» (direct debit، قرارداد جدا با بانک) دارد.

نیاز به `ZARINPAL_MERCHANT_ID` (از پنل merchant.zarinpal.com) دارد؛ `ZARINPAL_SANDBOX=true` برای تست بدون تراکنش واقعی.

## پنل ادمین

مسیر `/admin` (محافظت‌شده با Supabase Auth، در `proxy.ts` + `app/lib/supabase/middleware.ts`) سفارش‌ها، درخواست‌های دمو و اعضای خبرنامه را نشان می‌دهد. این سایت ثبت‌نام عمومی ندارد — حساب ادمین را دستی در **Supabase Dashboard › Authentication › Users › Add user** بسازید.

## دیپلوی

روی Vercel: مخزن را وصل کنید و متغیرهای محیطی بالا (Supabase + زرین‌پال) را در تنظیمات پروژه ثبت کنید.
