import { NextRequest, NextResponse } from "next/server";
import { createAdminClient } from "@/app/lib/supabase/admin";
import { verifyPayment } from "@/app/lib/zarinpal";
import { siteUrl } from "@/app/lib/site";

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const orderId = searchParams.get("order");
  const authority = searchParams.get("Authority");
  const status = searchParams.get("Status");

  if (!orderId || !authority) {
    return NextResponse.redirect(`${siteUrl}/checkout/failed`);
  }

  const supabase = createAdminClient();
  const { data: order } = await supabase
    .from("orders")
    .select("id, amount_toman, status, zarinpal_authority")
    .eq("id", orderId)
    .single();

  if (!order || order.zarinpal_authority !== authority) {
    return NextResponse.redirect(`${siteUrl}/checkout/failed`);
  }

  if (order.status === "paid") {
    return NextResponse.redirect(`${siteUrl}/checkout/success?order=${order.id}`);
  }

  if (status !== "OK") {
    await supabase.from("orders").update({ status: "canceled" }).eq("id", order.id);
    return NextResponse.redirect(`${siteUrl}/checkout/failed`);
  }

  try {
    const result = await verifyPayment({ amountToman: order.amount_toman, authority });

    if (!result.ok) {
      await supabase.from("orders").update({ status: "failed" }).eq("id", order.id);
      return NextResponse.redirect(`${siteUrl}/checkout/failed`);
    }

    await supabase
      .from("orders")
      .update({
        status: "paid",
        zarinpal_ref_id: result.refId ?? null,
        paid_at: new Date().toISOString(),
      })
      .eq("id", order.id);

    return NextResponse.redirect(`${siteUrl}/checkout/success?order=${order.id}`);
  } catch (err) {
    console.error("[checkout/verify]", err);
    return NextResponse.redirect(`${siteUrl}/checkout/failed`);
  }
}
