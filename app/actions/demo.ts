"use server";

import { z } from "zod";
import { createAppDbServiceClient } from "@/app/lib/app-db/server";
import { sendTelegramMessage } from "@/app/lib/telegram";

const DemoSchema = z.object({
  name: z.string().trim().min(2, "نام را کامل وارد کنید").max(100),
  whatsapp: z
    .string()
    .trim()
    .regex(/^[0-9۰-۹+\-\s()]{7,20}$/, "شماره واتساپ معتبر نیست"),
  email: z.string().trim().email("ایمیل معتبر نیست").max(200),
});

type FieldName = "name" | "whatsapp" | "email";

export type DemoState = {
  status: "idle" | "success" | "error";
  message?: string;
  fieldErrors?: Partial<Record<FieldName, string>>;
};

export async function submitDemoRequest(
  _prev: DemoState,
  formData: FormData
): Promise<DemoState> {
  // Honeypot: ربات‌ها این فیلدِ مخفی را پر می‌کنند؛ پاسخ موفق است تا چیزی لو نرود.
  if (formData.get("website")) return { status: "success" };

  const parsed = DemoSchema.safeParse({
    name: formData.get("name"),
    whatsapp: formData.get("whatsapp"),
    email: formData.get("email"),
  });

  if (!parsed.success) {
    const fieldErrors: DemoState["fieldErrors"] = {};
    for (const issue of parsed.error.issues) {
      const key = issue.path[0] as FieldName;
      if (key && !fieldErrors[key]) fieldErrors[key] = issue.message;
    }
    return {
      status: "error",
      message: "لطفاً خطاهای فرم را برطرف کنید.",
      fieldErrors,
    };
  }

  const { name, whatsapp, email } = parsed.data;

  // ثبت در leads پشتیبانِ تلگرام است؛ با موفق‌شدنِ هر کدام، درخواست از دست نمی‌رود.
  let saved = false;
  try {
    const supabase = createAppDbServiceClient();
    const { error } = await supabase.from("leads").insert({
      name,
      clinic_type: "سایر",
      phone: whatsapp,
      message: `درخواست دمو - ایمیل: ${email}`,
    });
    if (error) console.error("[submitDemoRequest] insert failed:", error.message);
    else saved = true;
  } catch (err) {
    console.error("[submitDemoRequest]", err);
  }

  const notified = await sendTelegramMessage(
    `درخواست دموی جدید\n\nنام: ${name}\nواتساپ: ${whatsapp}\nایمیل: ${email}`
  );

  if (!saved && !notified) {
    return {
      status: "error",
      message: "ثبت درخواست ناموفق بود. لطفاً دوباره تلاش کنید.",
    };
  }
  return { status: "success" };
}
