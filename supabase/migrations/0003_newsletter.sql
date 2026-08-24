-- عضویت خبرنامه (بند ۳ بریف: عضویت در خبرنامه در فوتر)

create table if not exists public.newsletter_subscribers (
  id          uuid primary key default gen_random_uuid(),
  email       text not null unique check (position('@' in email) > 1),
  created_at  timestamptz not null default now()
);

alter table public.newsletter_subscribers enable row level security;

-- مانند جدول leads: درج فقط از سمت سرور با کلید service_role انجام می‌شود،
-- بنابراین عمداً هیچ policy‌ای برای anon تعریف نشده است.
