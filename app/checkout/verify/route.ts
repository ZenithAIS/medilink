import { NextRequest, NextResponse } from "next/server";
import { createAppDbServiceClient } from "@/app/lib/app-db/server";
import { verifyPayment } from "@/app/lib/zarinpal";

export async function GET(req: NextRequest) {
  const { searchParams, origin } = new URL(req.url);
  const orderId = searchParams.get("order");
  const authority = searchParams.get("Authority");
  const status = searchParams.get("Status");

  if (!orderId || !authority) {
    return NextResponse.redirect(`${origin}/checkout/failed`);
  }

  const supabase = createAppDbServiceClient();
  const { data: order } = await supabase
    .from("orders")
    .select("id, amount_toman, status, zarinpal_authority")
    .eq("id", orderId)
    .single();

  if (!order || order.zarinpal_authority !== authority) {
    return NextResponse.redirect(`${origin}/checkout/failed`);
  }

  if (order.status === "paid") {
    return NextResponse.redirect(`${origin}/checkout/success?order=${order.id}`);
  }

  if (status !== "OK") {
    await supabase.from("orders").update({ status: "canceled" }).eq("id", order.id);
    return NextResponse.redirect(`${origin}/checkout/failed`);
  }

  try {
    const result = await verifyPayment({ amountToman: order.amount_toman, authority });

    if (!result.ok) {
      await supabase.from("orders").update({ status: "failed" }).eq("id", order.id);
      return NextResponse.redirect(`${origin}/checkout/failed`);
    }

    await supabase
      .from("orders")
      .update({
        status: "paid",
        zarinpal_ref_id: result.refId ?? null,
        paid_at: new Date().toISOString(),
      })
      .eq("id", order.id);

    return NextResponse.redirect(`${origin}/checkout/success?order=${order.id}`);
  } catch (err) {
    console.error("[checkout/verify]", err);
    return NextResponse.redirect(`${origin}/checkout/failed`);
  }
}
