"use server";

import { redirect } from "next/navigation";
import { createAppDbSessionClient } from "@/app/lib/app-db/server";

export type AuthState = { message: string } | undefined;

/**
 * ورود به پنل ادمین سایت با همان حساب ادمین پنل اپ (Supabase اپ، جدول platform_admins).
 * ثبت‌نام عمومی وجود ندارد.
 */
export async function login(_prev: AuthState, formData: FormData): Promise<AuthState> {
  const email = String(formData.get("email") ?? "").trim();
  const password = String(formData.get("password") ?? "");

  if (!email || !password) {
    return { message: "ایمیل و رمز عبور را وارد کنید." };
  }

  const supabase = await createAppDbSessionClient();
  const { error } = await supabase.auth.signInWithPassword({ email, password });
  if (error) {
    return { message: "ایمیل یا رمز عبور اشتباه است." };
  }

  const { data: isAdmin } = await supabase.rpc("is_platform_admin");
  if (isAdmin !== true) {
    await supabase.auth.signOut();
    return { message: "این حساب دسترسی ادمین ندارد." };
  }

  redirect("/admin");
}

export async function logout() {
  const supabase = await createAppDbSessionClient();
  await supabase.auth.signOut();
  redirect("/admin/login");
}
