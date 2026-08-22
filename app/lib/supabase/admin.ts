import "server-only";
import { createClient } from "@supabase/supabase-js";
import { supabaseServiceRoleKey, supabaseUrl } from "./env";

// ⚠️ این کلاینت تمام قوانین RLS را دور می‌زند.
// فقط در کد سمت سرور و فقط وقتی واقعاً لازم است استفاده شود.
export function createAdminClient() {
  return createClient(supabaseUrl(), supabaseServiceRoleKey(), {
    auth: { persistSession: false, autoRefreshToken: false },
  });
}
