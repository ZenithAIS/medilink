import "server-only";

// دیتابیس اپ (medilink-app): مرکز سفارش‌ها، اشتراک‌ها، بلاگ و حساب ادمین‌های پلتفرم.
// دیتابیس خود سایت (app/lib/supabase) فقط لیدها و خبرنامه را نگه می‌دارد.
function required(name: string) {
  const value = process.env[name];
  if (!value) {
    throw new Error(`متغیر محیطی ${name} تنظیم نشده است (نمونه: .env.example).`);
  }
  return value;
}

export const appDbUrl = () => required("APP_SUPABASE_URL");
export const appDbAnonKey = () => required("APP_SUPABASE_ANON_KEY");
export const appDbServiceRoleKey = () => required("APP_SUPABASE_SERVICE_ROLE_KEY");
