-- هم‌راستاسازی اسکیما با کد اپلیکیشن.
--
-- پس از 0002 جدول leads نیمه‌مهاجرت ماند: ستون منسوخ clinic هنوز وجود داشت و
-- clinic_type اجباری نبود. این مایگریشن آن وضعیت را جمع می‌کند.
--
-- ⚠ برگشت‌ناپذیر: ستون clinic و داده‌اش حذف می‌شود.
--   این مایگریشن با فرض «جدول leads داده‌ی واقعی ندارد» نوشته شده است.
--   اگر ردیفی با clinic_type خالی وجود داشته باشد، دستور set not null شکست
--   می‌خورد و کل تراکنش برمی‌گردد — یعنی داده از دست نمی‌رود، فقط باید اول
--   ردیف‌های قدیمی را backfill یا حذف کنید.

-- ۱. ستون منسوخ نام آزاد کلینیک (جایگزین‌شده با clinic_type در 0002)
alter table public.leads drop column if exists clinic;

-- ۲. نوع کلینیک از سمت اپلیکیشن همیشه ارسال می‌شود؛ دیتابیس هم تضمینش کند.
alter table public.leads alter column clinic_type set not null;

-- ۳. اعتبارسنجی سخت‌گیرانه‌تر ایمیل خبرنامه.
--    قید قبلی فقط وجود '@' را چک می‌کرد و مقادیری مثل 'a@' را می‌پذیرفت.
alter table public.newsletter_subscribers
  drop constraint if exists newsletter_subscribers_email_check;

alter table public.newsletter_subscribers
  add constraint newsletter_subscribers_email_check
    check (email ~ '^[^@[:space:]]+@[^@[:space:]]+\.[a-zA-Z]{2,}$');

-- ۴. ایندکس برای مرتب‌سازی تاریخ‌محور، هم‌تراز با leads_created_at_idx.
create index if not exists newsletter_subscribers_created_at_idx
  on public.newsletter_subscribers (created_at desc);
