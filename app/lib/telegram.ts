import "server-only";

// ارسالِ اعلانِ سرنخ به بات تلگرامِ تیم فروش. توکن فقط در محیطِ سرور است و هرگز لاگ یا برگردانده نمی‌شود (جزئی از URL است).
// متن بدون parse_mode فرستاده می‌شود تا ورودیِ کاربر قالب‌بندی یا لینک نسازد.
export async function sendTelegramSticker(url: string): Promise<void> {
  const token = process.env.TELEGRAM_BOT_TOKEN;
  const chatId = process.env.TELEGRAM_CHAT_ID;
  if (!token || !chatId) return;
  try {
    await fetch(`https://api.telegram.org/bot${token}/sendSticker`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ chat_id: chatId, sticker: url }),
      signal: AbortSignal.timeout(8000),
    });
  } catch {
    // استیکر تزئینی است؛ شکستش نباید جلوی پیامِ سرنخ را بگیرد.
    console.error("[telegram] sticker failed");
  }
}

export async function sendTelegramMessage(text: string): Promise<boolean> {
  const token = process.env.TELEGRAM_BOT_TOKEN;
  const chatId = process.env.TELEGRAM_CHAT_ID;
  if (!token || !chatId) {
    console.error("[telegram] not configured");
    return false;
  }
  try {
    const res = await fetch(`https://api.telegram.org/bot${token}/sendMessage`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ chat_id: chatId, text, disable_web_page_preview: true }),
      signal: AbortSignal.timeout(8000),
    });
    if (!res.ok) console.error("[telegram] rejected:", res.status);
    return res.ok;
  } catch {
    console.error("[telegram] request failed");
    return false;
  }
}

export const latinDigits = (value: string) =>
  value.replace(/[۰-۹]/g, (d) => String("۰۱۲۳۴۵۶۷۸۹".indexOf(d)));
