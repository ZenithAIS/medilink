"use server";

import { z } from "zod";
import { createAdminClient } from "@/app/lib/supabase/admin";

const LeadSchema = z.object({
  name: z.string().trim().min(2, "نام را کامل وارد کنید").max(100),
  clinic: z.string().trim().min(2, "نام کلینیک را وارد کنید").max(120),
  phone: z
    .string()
    .trim()
    .regex(/^[0-9۰-۹+\-\s()]{7,20}$/, "شماره تماس معتبر نیست"),
  message: z.string().trim().max(2000).optional().or(z.literal("")),
});

export type LeadState = {
  status: "idle" | "success" | "error";
  message?: string;
  fieldErrors?: Partial<Record<"name" | "clinic" | "phone" | "message", string>>;
};

export async function submitLead(
  _prev: LeadState,
  formData: FormData
): Promise<LeadState> {
  const parsed = LeadSchema.safeParse({
    name: formData.get("name"),
    clinic: formData.get("clinic"),
    phone: formData.get("phone"),
    message: formData.get("message"),
  });

  if (!parsed.success) {
    const fieldErrors: LeadState["fieldErrors"] = {};
    for (const issue of parsed.error.issues) {
      const key = issue.path[0] as keyof NonNullable<LeadState["fieldErrors"]>;
      if (key && !fieldErrors[key]) fieldErrors[key] = issue.message;
    }
    return {
      status: "error",
      message: "لطفاً خطاهای فرم را برطرف کنید.",
      fieldErrors,
    };
  }

  try {
    const supabase = createAdminClient();
    const { error } = await supabase.from("leads").insert({
      name: parsed.data.name,
      clinic: parsed.data.clinic,
      phone: parsed.data.phone,
      message: parsed.data.message || null,
    });

    if (error) {
      console.error("[submitLead] insert failed:", error.message);
      return {
        status: "error",
        message: "ثبت درخواست ناموفق بود. لطفاً دوباره تلاش کنید.",
      };
    }
  } catch (err) {
    console.error("[submitLead]", err);
    return {
      status: "error",
      message: "سرویس در دسترس نیست. لطفاً بعداً تلاش کنید.",
    };
  }

  return { status: "success" };
}
