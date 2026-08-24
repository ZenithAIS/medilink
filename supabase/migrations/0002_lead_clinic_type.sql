-- فرم به «درخواست دمو» تغییر کرد (بند ۴ بریف): نام، تلفن، نوع کلینیک، پیام.
-- نام آزاد کلینیک جای خود را به نوع کلینیک از یک فهرست ثابت داد.

alter table public.leads
  add column if not exists clinic_type text
    check (clinic_type in (
      'پوست و زیبایی',
      'دندانپزشکی',
      'چشم‌پزشکی',
      'پلی‌کلینیک / چندشعبه‌ای',
      'مطب تخصصی',
      'سایر'
    ));

-- ردیف‌های قدیمی هنوز clinic دارند؛ ستون را اختیاری می‌کنیم تا درج‌های جدید نشکند.
alter table public.leads alter column clinic drop not null;
