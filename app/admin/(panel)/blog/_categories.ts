import type { SupabaseClient } from "@supabase/supabase-js";

/** دسته‌بندی‌های موجود برای پیشنهاد در فرم، تا نسخه‌های املایی مختلف از یک دسته ساخته نشود. */
export async function existingCategories(supabase: SupabaseClient) {
  const { data } = await supabase.from("blog_posts").select("category");
  return Array.from(new Set(((data ?? []) as { category: string }[]).map((r) => r.category)));
}
