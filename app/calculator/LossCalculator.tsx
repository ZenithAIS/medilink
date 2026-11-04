"use client";

import { useState } from "react";
import { contact } from "@/app/lib/site";

function Card({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return <div className={`rounded-2xl bg-white p-[22px] shadow-sm ${className}`}>{children}</div>;
}

// بازه‌ی محافظه‌کارانه‌ی بازگشتِ جلسه‌های ازدست‌رفته با یادآوری و پیگیریِ خودکار؛ ادعای قطعی نیست.
const RECOVERY_LOW = 0.3;
const RECOVERY_HIGH = 0.5;

const fa = (n: number) => Math.round(n).toLocaleString("fa-IR");

// ورودیِ کاربر ممکن است ارقام فارسی یا جداکننده داشته باشد.
function parseNumber(value: string) {
  const latin = value.replace(/[۰-۹]/g, (d) => String("۰۱۲۳۴۵۶۷۸۹".indexOf(d))).replace(/[^\d.]/g, "");
  const n = Number(latin);
  return Number.isFinite(n) ? n : 0;
}

function Field({
  label,
  hint,
  value,
  onChange,
}: {
  label: string;
  hint: string;
  value: string;
  onChange: (v: string) => void;
}) {
  return (
    <label className="block">
      <span className="text-sm font-extrabold text-ink-900">{label}</span>
      <input
        inputMode="numeric"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="mt-1.5 w-full rounded-[12px] border border-cream-300 bg-white px-3 py-2.5 text-base text-ink-900 outline-none focus:border-brand-300"
      />
      <span className="mt-1 block text-xs text-ink-400">{hint}</span>
    </label>
  );
}

export function LossCalculator() {
  const [sessions, setSessions] = useState("300");
  const [price, setPrice] = useState("2000000");
  const [missRate, setMissRate] = useState("8");

  const sessionsN = parseNumber(sessions);
  const priceN = parseNumber(price);
  const rate = Math.min(parseNumber(missRate), 100) / 100;

  const missedSessions = sessionsN * rate;
  const monthlyLoss = missedSessions * priceN;
  const recoveredLow = monthlyLoss * RECOVERY_LOW;
  const recoveredHigh = monthlyLoss * RECOVERY_HIGH;

  const message =
    `سلام، با ماشین‌حساب مدیلینک حساب کردم: ماهی حدود ${fa(missedSessions)} جلسه و ` +
    `${fa(monthlyLoss)} تومان از نیامدن بیمار از دست می‌دهیم. برای دمو وقت می‌خواهم.`;
  const whatsappHref = `${contact.whatsapp}?text=${encodeURIComponent(message)}`;

  return (
    <div className="space-y-4">
      <Card className="space-y-4">
        <Field
          label="تعداد جلسه‌های ماهانه"
          hint="همه‌ی جلسه‌های لیزر، پوست و درمان‌های چندجلسه‌ای در یک ماه"
          value={sessions}
          onChange={setSessions}
        />
        <Field
          label="میانگین مبلغ هر جلسه (تومان)"
          hint="مثلاً ۲٬۰۰۰٬۰۰۰"
          value={price}
          onChange={setPrice}
        />
        <Field
          label="درصد جلسه‌هایی که بیمار نمی‌آید یا دوره را رها می‌کند"
          hint="اگر دقیق نمی‌دانید، ۵ تا ۱۰ درصد برای بیشتر کلینیک‌ها واقع‌بینانه است"
          value={missRate}
          onChange={setMissRate}
        />
      </Card>

      <Card className="bg-brand-50">
        <p className="m-0 text-sm text-ink-700">ضرر ماهانه‌ی شما</p>
        <p className="mt-1 mb-0 text-3xl font-extrabold text-brand-600">{fa(monthlyLoss)} تومان</p>
        <p className="mt-2 mb-0 text-sm text-ink-700">
          یعنی حدود <b>{fa(missedSessions)}</b> جلسه در ماه و <b>{fa(monthlyLoss * 12)}</b> تومان در سال.
        </p>
      </Card>

      <Card>
        <p className="m-0 text-sm leading-7 text-ink-700">
          اگر یادآوری خودکار و پیگیری بیماران برنگشته فقط <b>۳۰ تا ۵۰ درصد</b> این جلسه‌ها را برگرداند، ماهانه
          بین <b className="text-good-600">{fa(recoveredLow)}</b> تا{" "}
          <b className="text-good-600">{fa(recoveredHigh)}</b> تومان به درآمد کلینیک برمی‌گردد.
        </p>
        <p className="mt-2 mb-0 text-xs text-ink-400">
          این عدد تخمین است، نه تضمین؛ در جلسه‌ی دمو با داده‌های واقعی کلینیک شما دقیق‌ترش می‌کنیم.
        </p>
      </Card>

      <div className="flex flex-col gap-2 sm:flex-row">
        <a
          href={whatsappHref}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex flex-1 items-center justify-center rounded-[13px] bg-brand-400 px-[18px] py-[12px] text-sm font-extrabold text-white shadow-[0_6px_16px_rgba(242,121,63,0.28)]"
        >
          رزرو دموی ۲۰ دقیقه‌ای در واتساپ
        </a>
        <a
          href={contact.phoneHref}
          className="inline-flex flex-1 items-center justify-center rounded-[13px] border border-cream-200 bg-white px-[18px] py-[12px] text-sm font-extrabold text-ink-700"
        >
          تماس: {contact.phone}
        </a>
      </div>
    </div>
  );
}
