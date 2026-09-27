function missing(name: string): never {
  throw new Error(
    `متغیر محیطی ${name} تنظیم نشده است. مقدار آن را در .env.local قرار دهید (نمونه: .env.example).`
  );
}

// دیتابیس خود سایت: فقط لیدها و خبرنامه، فقط از سمت سرور (admin.ts).
export const supabaseUrl = () =>
  process.env.NEXT_PUBLIC_SUPABASE_URL ?? missing("NEXT_PUBLIC_SUPABASE_URL");

export const supabaseServiceRoleKey = () =>
  process.env.SUPABASE_SERVICE_ROLE_KEY ?? missing("SUPABASE_SERVICE_ROLE_KEY");
