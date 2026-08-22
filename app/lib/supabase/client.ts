import { createBrowserClient } from "@supabase/ssr";
import { supabaseAnonKey, supabaseUrl } from "./env";

// کلاینت مرورگر — فقط با کلید anon، محدود به قوانین RLS
export function createClient() {
  return createBrowserClient(supabaseUrl(), supabaseAnonKey());
}
