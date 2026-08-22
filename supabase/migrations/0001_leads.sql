-- جدول لیدهای فرم تماس مدیلینک

create table if not exists public.leads (
  id          uuid primary key default gen_random_uuid(),
  name        text not null check (char_length(trim(name)) between 2 and 100),
  clinic      text not null check (char_length(trim(clinic)) between 2 and 120),
  phone       text not null check (char_length(trim(phone)) between 7 and 20),
  message     text          check (char_length(message) <= 2000),
  created_at  timestamptz not null default now()
);

create index if not exists leads_created_at_idx on public.leads (created_at desc);

alter table public.leads enable row level security;

-- هیچ نقش عمومی‌ای اجازه SELECT / UPDATE / DELETE ندارد.
-- درج فقط از سمت سرور با کلید service_role انجام می‌شود که RLS را دور می‌زند،
-- بنابراین عمداً هیچ policy‌ای برای anon تعریف نشده است.
-- (اگر بعداً پنل ادمین ساختید، اینجا یک policy مبتنی بر auth.uid() اضافه کنید.)
