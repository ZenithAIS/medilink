import { cookies } from "next/headers";
import { createServerClient } from "@supabase/ssr";
import { supabaseAnonKey, supabaseUrl } from "./env";

// کلاینت سرور — کوکی‌های نشست را می‌خواند/می‌نویسد
export async function createClient() {
  const cookieStore = await cookies();

  return createServerClient(supabaseUrl(), supabaseAnonKey(), {
    cookies: {
      getAll() {
        return cookieStore.getAll();
      },
      setAll(cookiesToSet) {
        try {
          for (const { name, value, options } of cookiesToSet) {
            cookieStore.set(name, value, options);
          }
        } catch {
          // از یک Server Component فراخوانی شده؛ نوشتن کوکی ممکن نیست.
          // اگر middleware نشست را تازه می‌کند، بی‌خطر است.
        }
      },
    },
  });
}
