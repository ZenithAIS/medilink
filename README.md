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

سپس مقادیر را از Supabaseِ پروژه‌ی **اپ** (Project Settings › API Keys) پر کنید:

- `NEXT_PUBLIC_SITE_URL` — دامنه سایت، برای تگ‌های canonical و Open Graph (اختیاری؛ پیش‌فرض `https://medilinkapp.online`).
- `NEXT_PUBLIC_PANEL_URL` — آدرس پنل کلینیک (اختیاری؛ پیش‌فرض `https://app.medilinkapp.online`).
- `APP_SUPABASE_URL`، `APP_SUPABASE_PUBLISHABLE_KEY` (کلید publishable، `sb_publishable_…`)، `APP_SUPABASE_SERVICE_ROLE_KEY` (کلید secret) — **فقط سمت سرور.** هرگز پیشوند `NEXT_PUBLIC_` نگیرند و در گیت کامیت نشوند.
- `ZARINPAL_MERCHANT_ID`، `ZARINPAL_SANDBOX` — درگاه پرداخت.

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
    checkout.ts           # ثبت سفارش و انتقال به زرین‌پال
  checkout/               # فرم خرید، تأیید پرداخت، صفحات نتیجه
  components/             # کامپوننت‌های مشترک و سکشن‌های صفحات
  lib/
    site.ts               # اطلاعات تماس، منوی ناوبری، آدرس سایت
    products.ts           # داده‌ی ۵ محصول (منبع مشترک صفحات و sitemap)
    packages.ts           # بسته‌ها و قیمت‌های قابل خرید (منبع واقعی قیمت)
    pricing.ts            # سوالات مالی صفحه‌ی تعرفه
    blog.ts               # خواندن مقالات منتشرشده از دیتابیس اپ
    zarinpal.ts           # کلاینت درگاه زرین‌پال
    faq.ts                # سوالات متداول
    clinic-types.ts       # فهرست انواع کلینیک برای فرم دمو
    legacy-admin-redirect.ts  # نگاشتِ مسیرهای قدیمیِ /admin/** به پنلِ ادمین اپ (فقط Redirect؛ از proxy.ts)
  lib/app-db/             # دیتابیس اپ (سفارش، بلاگ، لید، خبرنامه)
    server.ts             # کلاینت عمومی (publishable) و service_role — بدونِ نشستِ کاربر
  layout.tsx              # هدر، فوتر و دکمه‌ی واتساپ مشترک همه‌ی صفحات
  sitemap.ts, robots.ts   # سئو
```

> تصاویر محصول هنوز ماکاپ برداری‌اند؛ اسکرین‌شات واقعی را در `public/images/products/` بگذارید.

## نکات امنیتی

- همه‌ی جدول‌ها با RLS فعال‌اند و نقش `anon` جز خواندن مقالات منتشرشده به هیچ‌چیز دسترسی ندارد؛ خواندن لید، سفارش و خبرنامه فقط برای ادمین پلتفرم است.
- درج داده فقط در Server Action و با کلید `service_role` انجام می‌شود که RLS را دور می‌زند. فایل‌های `app/lib/app-db/` با `server-only` علامت‌گذاری شده‌اند تا اگر تصادفاً از یک کامپوننت کلاینتی import شود، بیلد خطا بدهد.
- پیام خطای دیتابیس هرگز به کاربر برگردانده نمی‌شود؛ فقط در لاگ سرور ثبت می‌شود.

## دیتابیس

سایت دیتابیس جداگانه ندارد و فقط به **دیتابیس اپ** وصل است: سفارش‌ها، بلاگ، لیدهای فرم دمو، خبرنامه و حساب ادمین‌ها. اسکیما در ریپوی `medilink-app` است (`supabase/migrations/0022`، `0023`، `0024`). پرداخت «اتوماسیون مطب» مستقیم به اشتراک همان کلینیک وصل می‌شود و یک حساب ادمین هر دو پنل را باز می‌کند.

## خرید آنلاین (زرین‌پال)

بسته‌ها و قیمت‌ها در `app/lib/packages.ts` تعریف شده‌اند — منبع واقعی قیمت است. `/checkout` سفارش را در جدول `orders` دیتابیس اپ ثبت می‌کند.

**تا وقتی `ZARINPAL_MERCHANT_ID` ست نشده** (وضعیتِ فعلی، چون مرچنتِ زرین‌پال هنوز تأیید نشده): خریدار به هیچ درگاهی فرستاده نمی‌شود — سفارش با وضعیتِ `pending` ثبت می‌شود («ثبتِ سفارش») و تیم برای هماهنگیِ پرداخت (کارت‌به‌کارت/فاکتور) تماس می‌گیرد؛ ادمین از پنلِ اپ (`/admin/payments`) آن را دستی «پرداخت شد» می‌کند و به کلینیک وصل می‌کند. هیچ اشتراکی خودکار تمدید نمی‌شود.

با ست‌شدنِ `ZARINPAL_MERCHANT_ID`: خریدار به زرین‌پال فرستاده می‌شود؛ `/checkout/verify` پرداخت را تأیید می‌کند (Idempotent — Callback دوباره خطرناک نیست). آدرس بازگشت از درگاه از خود درخواست ساخته می‌شود، پس روی هر دامنه‌ای درست کار می‌کند. زرین‌پال شارژ خودکار دوره‌ای ندارد؛ هر دوره‌ی ماهانه جدا پرداخت می‌شود و ادمین از پنل اپ اشتراک را تمدید می‌کند.

فعال‌سازیِ نهاییِ Production (بعد از تأییدِ مرچنت):
```
ZARINPAL_MERCHANT_ID=<merchant id واقعی>
ZARINPAL_SANDBOX=false
```
برای تستِ Sandbox (بدون تراکنشِ واقعی، پیش از تأیید یا برای QA):
```
ZARINPAL_MERCHANT_ID=<merchant id سازگار با sandbox>
ZARINPAL_SANDBOX=true
```

## دوره‌ی آزمایشی

دکمه‌های «۱۴ روز رایگان» به `/signup` پنل (`NEXT_PUBLIC_PANEL_URL`) می‌روند. خود دوره در دیتابیس اپ ساخته و اعمال می‌شود (تریگر `start_clinic_trial`).

## مدیریت (فقط در پنل اپ)

این ریپو دیگر رابطِ ادمین ندارد. سفارش‌ها، **بلاگ** (نوشتن، ویرایش، انتشار، تصویر شاخص)، درخواست‌های دمو و خبرنامه همه در Admin Hub اپ مدیریت می‌شوند: `https://app.medilinkapp.online/admin` (با حساب ادمین پلتفرم در دیتابیس اپ). لینکِ «ورود مدیریت» در فوتر سایت مستقیم به همان‌جا می‌رود.

آدرس‌های قدیمیِ `/admin/**` در سایت فقط Redirect هستند (`proxy.ts` + `app/lib/legacy-admin-redirect.ts`): GET/HEAD به مسیرِ معادل در پنل اپ می‌رود (`/admin/orders` ← `/admin/payments`، `/admin/blog` ← `/admin/site/blog`، `/admin/leads` ← `/admin/site/leads`، `/admin/newsletter` ← `/admin/site/newsletter`، بقیه ← `/admin`) و هر درخواستِ غیر GET/HEAD با 405 رد می‌شود. سایت هیچ احرازِ هویتِ ادمینی انجام نمی‌دهد.

مقاله‌هایی که از پنلِ اپ منتشر می‌شوند، چون اپ نمی‌تواند Cache سایت را مستقیم باطل کند، با تأخیر روی سایت دیده می‌شوند: صفحه‌های `/blog` تا حدود ۵ دقیقه (`revalidate = 300`) و `sitemap.xml` تا حدود ۱ ساعت.

ساختِ حسابِ ادمین (دیتابیس اپ):

1. Supabase اپ › Authentication › Users › Add user (ایمیل و رمز).
2. در SQL Editor: `insert into public.platform_admins (user_id) select id from auth.users where email = 'ایمیل@ادمین';`

## دیپلوی

روی Vercel: متغیرهای محیطی بالا (دیتابیس اپ + زرین‌پال) را در تنظیمات پروژه ثبت کنید. دامنه: `medilinkapp.online` (سایت) و `app.medilinkapp.online` (پنل).
