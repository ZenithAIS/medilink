"use server";

import { z } from "zod";
import { createAppDbServiceClient } from "@/app/lib/app-db/server";
import { CLINIC_TYPES } from "@/app/lib/clinic-types";
import { siteUrl } from "@/app/lib/site";
import { latinDigits, sendTelegramMessage, sendTelegramSticker } from "@/app/lib/telegram";


const LeadSchema = z.object({
  name: z.string().trim().min(2, "نام را کامل وارد کنید").max(100),
  clinicType: z.enum(CLINIC_TYPES, { message: "نوع کلینیک را انتخاب کنید" }),
  phone: z
    .string()
    .trim()
    .regex(/^[0-9۰-۹+\-\s()]{7,20}$/, "شماره تماس معتبر نیست"),
  message: z.string().trim().max(2000).optional().or(z.literal("")),
});

type FieldName = "name" | "clinicType" | "phone" | "message";

export type LeadState = {
  status: "idle" | "success" | "error";
  message?: string;
  fieldErrors?: Partial<Record<FieldName, string>>;
};

export async function submitLead(
  _prev: LeadState,
  formData: FormData
): Promise<LeadState> {
  const parsed = LeadSchema.safeParse({
    name: formData.get("name"),
    clinicType: formData.get("clinicType"),
    phone: formData.get("phone"),
    message: formData.get("message"),
  });

  if (!parsed.success) {
    const fieldErrors: LeadState["fieldErrors"] = {};
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

  const { name, clinicType, phone, message } = parsed.data;

  // مثل فرم دمو: با موفق‌شدنِ ثبت یا اعلانِ تلگرام، درخواست از دست نمی‌رود.
  let saved = false;
  try {
    const supabase = createAppDbServiceClient();
    const { error } = await supabase.from("leads").insert({
      name,
      clinic_type: clinicType,
      phone,
      message: message || null,
    });
    if (error) console.error("[submitLead] insert failed:", error.message);
    else saved = true;
  } catch (err) {
    console.error("[submitLead]", err);
  }

  await sendTelegramSticker(`${siteUrl}/images/telegram-sticker.webp`);
  const notified = await sendTelegramMessage(
    `درخواست جدید از فرم سایت\n\nنام: ${name}\nشماره تماس: ${latinDigits(phone)}\nنوع کلینیک: ${clinicType}${
      message ? `\nپیام: ${message}` : ""
    }`
  );

  if (!saved && !notified) {
    return {
      status: "error",
      message: "ثبت درخواست ناموفق بود. لطفاً دوباره تلاش کنید.",
    };
  }

  return { status: "success" };
}
