"use server";

import { z } from "zod";
import { redirect } from "next/navigation";
import { createAdminClient } from "@/app/lib/supabase/admin";
import { requestPayment } from "@/app/lib/zarinpal";
import { getPackage, getTier, isBuyable } from "@/app/lib/packages";
import { siteUrl } from "@/app/lib/site";

const CheckoutSchema = z.object({
  packageKey: z.string().min(1),
  tierKey: z.string().min(1),
  contactName: z.string().trim().min(2, "نام را کامل وارد کنید").max(100),
  clinicName: z.string().trim().min(2, "نام کلینیک یا مطب را وارد کنید").max(120),
  phone: z
    .string()
    .trim()
    .regex(/^[0-9۰-۹+\-\s()]{7,20}$/, "شماره تماس معتبر نیست"),
  email: z
    .string()
    .trim()
    .email("ایمیل معتبر نیست")
    .optional()
    .or(z.literal("")),
});

type FieldName = "contactName" | "clinicName" | "phone" | "email";

export type CheckoutState = {
  status: "idle" | "error";
  message?: string;
  fieldErrors?: Partial<Record<FieldName, string>>;
};

export async function startCheckout(
  _prev: CheckoutState,
  formData: FormData
): Promise<CheckoutState> {
  const parsed = CheckoutSchema.safeParse({
    packageKey: formData.get("packageKey"),
    tierKey: formData.get("tierKey"),
    contactName: formData.get("contactName"),
    clinicName: formData.get("clinicName"),
    phone: formData.get("phone"),
    email: formData.get("email"),
  });

  if (!parsed.success) {
    const fieldErrors: CheckoutState["fieldErrors"] = {};
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

  const pkg = getPackage(parsed.data.packageKey);
  const tier = getTier(parsed.data.packageKey, parsed.data.tierKey);

  if (!pkg || !tier || !isBuyable(tier)) {
    return {
      status: "error",
      message: "این بسته آنلاین قابل خرید نیست. لطفاً از فرم تماس استفاده کنید.",
    };
  }

  const supabase = createAdminClient();
  const { data: order, error: insertError } = await supabase
    .from("orders")
    .insert({
      package_key: pkg.key,
      tier_key: tier.key,
      package_label: `${pkg.title} — ${tier.label}`,
      billing_type: tier.billing,
      amount_toman: tier.amountToman,
      contact_name: parsed.data.contactName,
      clinic_name: parsed.data.clinicName,
      phone: parsed.data.phone,
      email: parsed.data.email || null,
    })
    .select("id")
    .single();

  if (insertError || !order) {
    console.error("[startCheckout] insert failed:", insertError?.message);
    return {
      status: "error",
      message: "ثبت سفارش ناموفق بود. لطفاً دوباره تلاش کنید.",
    };
  }

  let payUrl: string;
  try {
    const payment = await requestPayment({
      amountToman: tier.amountToman,
      description: `${pkg.title} — ${tier.label} — مدیلینک`,
      callbackUrl: `${siteUrl}/checkout/verify?order=${order.id}`,
      mobile: parsed.data.phone,
      email: parsed.data.email || undefined,
    });

    await supabase
      .from("orders")
      .update({ zarinpal_authority: payment.authority })
      .eq("id", order.id);

    payUrl = payment.payUrl;
  } catch (err) {
    console.error("[startCheckout] zarinpal request failed:", err);
    await supabase.from("orders").update({ status: "failed" }).eq("id", order.id);
    return {
      status: "error",
      message: "اتصال به درگاه پرداخت برقرار نشد. لطفاً دوباره تلاش کنید.",
    };
  }

  redirect(payUrl);
}
