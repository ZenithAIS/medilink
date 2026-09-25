"use server";

import { redirect } from "next/navigation";
import { createClient } from "@/app/lib/supabase/server";

export type AuthState = { message: string } | undefined;

/**
 * ورود به پنل ادمین. کاربر ادمین از قبل در Supabase Auth دستی ساخته
 * می‌شود (Dashboard › Authentication › Users) — این سایت ثبت‌نام عمومی
 * ندارد، برخلاف پنل کلینیک که مشتری خودش حساب می‌سازد.
 */
export async function login(_prev: AuthState, formData: FormData): Promise<AuthState> {
  const email = String(formData.get("email") ?? "").trim();
  const password = String(formData.get("password") ?? "");

  if (!email || !password) {
    return { message: "ایمیل و رمز عبور را وارد کنید." };
  }

  const supabase = await createClient();
  const { error } = await supabase.auth.signInWithPassword({ email, password });

  if (error) {
    return { message: "ایمیل یا رمز عبور اشتباه است." };
  }

  redirect("/admin");
}

export async function logout() {
  const supabase = await createClient();
  await supabase.auth.signOut();
  redirect("/admin/login");
}
