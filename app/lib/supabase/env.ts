function required(name: string): string {
  const value = process.env[name];
  if (!value) {
    throw new Error(
      `متغیر محیطی ${name} تنظیم نشده است. مقدار آن را در .env.local قرار دهید (نمونه: .env.example).`
    );
  }
  return value;
}

export const supabaseUrl = () => required("NEXT_PUBLIC_SUPABASE_URL");
export const supabaseAnonKey = () => required("NEXT_PUBLIC_SUPABASE_ANON_KEY");
export const supabaseServiceRoleKey = () =>
  required("SUPABASE_SERVICE_ROLE_KEY");
