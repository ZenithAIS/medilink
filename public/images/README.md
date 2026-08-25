# تصاویر سایت

تصاویر را در همین ساختار بگذارید. **هیچ‌کدام اجباری نیستند** — تا وقتی فایلی
نباشد، جای‌نگهدار نمایش داده می‌شود و سایت نمی‌شکند. یکی‌یکی اضافه کنید.

پس از افزودن هر فایل، مسیرش را در فایل داده‌ی مربوطه ثبت کنید (ستون آخر).

## فهرست

| فایل | ابعاد پیشنهادی | کجا دیده می‌شود | کجا ثبت شود |
| --- | --- | --- | --- |
| `hero-dashboard.png` | ۱۶۰۰×۱۲۰۰ (۴:۳) | صفحه‌ی خانه، کنار تیتر اصلی | `app/components/Hero.tsx` → `heroImage` |
| `products/<slug>.png` | ۱۶۰۰×۱۲۰۰ (۴:۳) | صفحه‌ی هر محصول | `app/lib/products.ts` → `image` |
| `blog/<slug>.jpg` | ۱۶۰۰×۹۰۰ (۱۶:۹) | فهرست بلاگ و صفحه‌ی مقاله | `app/lib/blog.ts` → `cover` |
| `clients/<name>.svg` | ارتفاع ۸۰px، پس‌زمینه شفاف | نوار اعتماد و صفحه‌ی مشتریان | `app/lib/clients.ts` → `logo` |
| `team/<name>.jpg` | ۸۰۰×۸۰۰ (مربع) | صفحه‌ی درباره‌ی ما | `app/about/page.tsx` → `photo` |
| `testimonials/<name>.jpg` | ۲۰۰×۲۰۰ (مربع) | نظرات مشتریان | `app/components/Testimonials.tsx` → `photo` |

`<slug>` همان شناسه‌ی محصول یا مقاله است، مثلاً `products/ai-assistant.png`
یا `blog/patient-data-privacy.jpg`.

## مثال

فایل `public/images/products/ai-assistant.png` را گذاشتید؟ در
`app/lib/products.ts` به آن محصول اضافه کنید:

```ts
{
  slug: "ai-assistant",
  title: "ربات مشاور و پاسخ‌گوی هوشمند",
  image: "/images/products/ai-assistant.png",
  ...
}
```

## نکات

- فرمت: `.png` برای اسکرین‌شات و رابط کاربری، `.jpg` برای عکس، `.svg` برای لوگو.
- تصاویر خودکار بهینه و در اندازه‌های مختلف سرو می‌شوند؛ نسخه‌ی بزرگ را بگذارید.
- عکس پزشکان و اعضای تیم نیاز به **رضایت کتبی** دارد.

## تصویر Open Graph

`app/opengraph-image.tsx` یک تصویر ساده با نام برند و دامنه می‌سازد.
برای جایگزینی با طرح اختصاصی، فایل ۱۲۰۰×۶۳۰ را در `public/images/og.png`
بگذارید و `app/opengraph-image.tsx` را حذف کنید، سپس در متادیتای
`app/layout.tsx` مقدار `openGraph.images` را به آن اشاره دهید.
