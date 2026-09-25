-- سفارش‌های خرید مستقیم از سایت (اتوماسیون مطب، طراحی سایت، سئو).
-- پرداخت از طریق زرین‌پال؛ این جدول وضعیت هر تراکنش را نگه می‌دارد.

create table if not exists public.orders (
  id                 uuid primary key default gen_random_uuid(),
  package_key        text not null,
  tier_key           text not null,
  package_label      text not null check (char_length(trim(package_label)) between 2 and 160),
  billing_type       text not null check (billing_type in ('one_time', 'monthly')),
  amount_toman       bigint not null check (amount_toman > 0),
  contact_name       text not null check (char_length(trim(contact_name)) between 2 and 100),
  clinic_name        text not null check (char_length(trim(clinic_name)) between 2 and 120),
  phone              text not null check (char_length(trim(phone)) between 7 and 20),
  email              text,
  status             text not null default 'pending'
                       check (status in ('pending', 'paid', 'failed', 'canceled')),
  zarinpal_authority text unique,
  zarinpal_ref_id    text,
  created_at         timestamptz not null default now(),
  paid_at            timestamptz
);

create index if not exists orders_created_at_idx on public.orders (created_at desc);
create index if not exists orders_status_idx on public.orders (status);

alter table public.orders enable row level security;

-- مثل leads: هیچ policy‌ای برای anon تعریف نشده. درج و به‌روزرسانی فقط از
-- Server Action / Route Handler با کلید service_role انجام می‌شود.
