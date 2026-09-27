import "server-only";
import { redirect } from "next/navigation";
import { createAppDbSessionClient } from "./server";

// لایه‌ی اول؛ RLS دیتابیس اپ هم مستقلاً فقط به ادمین پلتفرم اجازه می‌دهد.
export async function requireSiteAdmin() {
  const supabase = await createAppDbSessionClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) redirect("/admin/login");

  const { data: isAdmin } = await supabase.rpc("is_platform_admin");
  if (isAdmin !== true) redirect("/admin/login");

  return { supabase, user };
}
