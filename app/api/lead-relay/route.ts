import { timingSafeEqual } from "node:crypto";
import { sendTelegramMessage } from "@/app/lib/telegram";

// رله‌ی اعلانِ سرنخ برای سایت‌های دیگرِ مجموعه (زنیت، سفیر). توکنِ بات فقط همین‌جا در محیطِ سرور می‌ماند؛
// سایتِ فرستنده فقط LEAD_RELAY_SECRET را دارد و متنِ آماده را می‌فرستد.
export async function POST(req: Request) {
  const secret = process.env.LEAD_RELAY_SECRET;
  const given = req.headers.get("x-relay-secret") ?? "";
  if (!secret || given.length !== secret.length || !timingSafeEqual(Buffer.from(given), Buffer.from(secret))) {
    return Response.json({ ok: false }, { status: 401 });
  }
  let body: { text?: unknown };
  try {
    body = await req.json();
  } catch {
    return Response.json({ ok: false }, { status: 400 });
  }
  const text = typeof body.text === "string" ? body.text.trim().slice(0, 3500) : "";
  if (!text) return Response.json({ ok: false }, { status: 400 });
  const ok = await sendTelegramMessage(text);
  return Response.json({ ok }, { status: ok ? 200 : 502 });
}
