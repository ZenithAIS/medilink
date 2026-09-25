import "server-only";

/**
 * کلاینت نازک درگاه زرین‌پال (REST API نسخه‌ی ۴).
 * مستندات: https://docs.zarinpal.com
 *
 * مبلغ همه‌جا به تومان است (currency: "IRT")؛ خودِ زرین‌پال ریال/تومان را
 * بر اساس این فیلد تفسیر می‌کند، پس نیازی به ضرب در ۱۰ نیست.
 */

function isSandbox() {
  return process.env.ZARINPAL_SANDBOX === "true";
}

function merchantId() {
  const id = process.env.ZARINPAL_MERCHANT_ID;
  if (!id) {
    throw new Error(
      "متغیر محیطی ZARINPAL_MERCHANT_ID تنظیم نشده است. مقدار آن را از پنل زرین‌پال بگیرید."
    );
  }
  return id;
}

function requestUrl() {
  return isSandbox()
    ? "https://sandbox.zarinpal.com/pg/v4/payment/request.json"
    : "https://payment.zarinpal.com/pg/v4/payment/request.json";
}

function verifyUrl() {
  return isSandbox()
    ? "https://sandbox.zarinpal.com/pg/v4/payment/verify.json"
    : "https://payment.zarinpal.com/pg/v4/payment/verify.json";
}

export function startPayUrl(authority: string) {
  const base = isSandbox()
    ? "https://sandbox.zarinpal.com/pg/StartPay"
    : "https://www.zarinpal.com/pg/StartPay";
  return `${base}/${authority}`;
}

type ZarinpalRequestResponse = {
  data: { code: number; authority: string; message: string; fee_type?: string; fee?: number };
  errors: unknown[] | Record<string, unknown>;
};

type ZarinpalVerifyResponse = {
  data: {
    code: number;
    ref_id?: number;
    card_pan?: string;
    message?: string;
  };
  errors: unknown[] | Record<string, unknown>;
};

export async function requestPayment(params: {
  amountToman: number;
  description: string;
  callbackUrl: string;
  mobile?: string;
  email?: string;
}) {
  const res = await fetch(requestUrl(), {
    method: "POST",
    headers: { "Content-Type": "application/json", Accept: "application/json" },
    body: JSON.stringify({
      merchant_id: merchantId(),
      amount: params.amountToman,
      currency: "IRT",
      description: params.description,
      callback_url: params.callbackUrl,
      metadata: {
        mobile: params.mobile,
        email: params.email,
      },
    }),
  });

  const json = (await res.json()) as ZarinpalRequestResponse;

  if (!res.ok || json.data?.code !== 100) {
    throw new Error(
      `درخواست پرداخت زرین‌پال ناموفق بود: ${JSON.stringify(json.errors ?? json)}`
    );
  }

  return { authority: json.data.authority, payUrl: startPayUrl(json.data.authority) };
}

export async function verifyPayment(params: { amountToman: number; authority: string }) {
  const res = await fetch(verifyUrl(), {
    method: "POST",
    headers: { "Content-Type": "application/json", Accept: "application/json" },
    body: JSON.stringify({
      merchant_id: merchantId(),
      amount: params.amountToman,
      authority: params.authority,
    }),
  });

  const json = (await res.json()) as ZarinpalVerifyResponse;

  // ۱۰۰ = پرداخت تازه تأیید شد. ۱۰۱ = قبلاً تأیید شده (درخواست تکراری وریفای).
  const ok = json.data?.code === 100 || json.data?.code === 101;

  return {
    ok,
    code: json.data?.code,
    refId: json.data?.ref_id ? String(json.data.ref_id) : undefined,
    cardPan: json.data?.card_pan,
  };
}
