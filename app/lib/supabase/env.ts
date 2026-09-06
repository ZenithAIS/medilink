function missing(name: string): never {
  throw new Error(
    `متغیر محیطی ${name} تنظیم نشده است. مقدار آن را در .env.local قرار دهید (نمونه: .env.example).`
  );
}

// next.js فقط الگوی لفظی process.env.NEXT_PUBLIC_X را در باندل مرورگر
// جایگزین می‌کند؛ process.env[name] با یک متغیر برای کلاینت قابل شناسایی
// نیست و همیشه undefined می‌شود. برای همین این دو تابع (که در
// app/lib/supabase/client.ts سمت مرورگر هم صدا زده می‌شوند) باید دسترسی
// مستقیم و لفظی داشته باشند، نه یک هلپر عمومی.
export const supabaseUrl = () =>
  process.env.NEXT_PUBLIC_SUPABASE_URL ?? missing("NEXT_PUBLIC_SUPABASE_URL");
export const supabaseAnonKey = () =>
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ?? missing("NEXT_PUBLIC_SUPABASE_ANON_KEY");

// این یکی فقط سمت سرور (admin.ts) صدا زده می‌شود، پس دسترسی داینامیک اشکالی ندارد.
export const supabaseServiceRoleKey = () =>
  process.env.SUPABASE_SERVICE_ROLE_KEY ?? missing("SUPABASE_SERVICE_ROLE_KEY");
