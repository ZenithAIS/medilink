"use server";

import { z } from "zod";
import { createAdminClient } from "@/app/lib/supabase/admin";

const EmailSchema = z
  .string()
  .trim()
  .toLowerCase()
  .email("ایمیل معتبر وارد کنید")
  .max(200);

export type NewsletterState = {
  status: "idle" | "success" | "error";
  message?: string;
};

export async function subscribeNewsletter(
  _prev: NewsletterState,
  formData: FormData
): Promise<NewsletterState> {
  const parsed = EmailSchema.safeParse(formData.get("email"));

  if (!parsed.success) {
    return { status: "error", message: parsed.error.issues[0].message };
  }

  try {
    const supabase = createAdminClient();
    const { error } = await supabase
      .from("newsletter_subscribers")
      .insert({ email: parsed.data });

    // 23505 = تکراری بودن ایمیل؛ از دید کاربر همان موفقیت است.
    if (error && error.code !== "23505") {
      console.error("[subscribeNewsletter]", error.message);
      return { status: "error", message: "ثبت نشد. دوباره تلاش کنید." };
    }
  } catch (err) {
    console.error("[subscribeNewsletter]", err);
    return { status: "error", message: "سرویس در دسترس نیست." };
  }

  return { status: "success", message: "عضویت شما ثبت شد." };
}
