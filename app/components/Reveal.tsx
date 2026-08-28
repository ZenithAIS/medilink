import type { ReactNode } from "react";

type Props = {
  children: ReactNode;
  /** تأخیر شروع انیمیشن بر حسب میلی‌ثانیه، برای پشت‌سرهم ظاهر شدن آیتم‌های یک گرید. */
  delay?: number;
  className?: string;
  as?: "div" | "li";
};

/**
 * محو و بالاآمدن یک عنصر موقع اولین رندر — با CSS خالص (`@starting-style`ی
 * تیلویند، بدون هیچ جاوااسکریپت).
 *
 * نسخه‌ی اول این کامپوننت با IntersectionObserver پیاده شده بود: پیش‌فرض
 * opacity-0 بود و فقط با اسکرول به داخل دید، JS آن را opacity-100 می‌کرد.
 * در تست معلوم شد وقتی افکت‌های ترنزیشن/ترنسفرم روی لایه‌ی کامپوزیت گیر
 * می‌کنند (که در برخی مرورگرها/تب‌های پس‌زمینه رخ می‌دهد)، عنصر برای
 * همیشه opacity:0 و نامرئی می‌ماند — یعنی خرابیِ پیش‌فرض به‌سمت «دیده
 * نشدن» بود، که برای سایتی که کارش جذب مشتری است غیرقابل‌قبول است.
 *
 * اینجا برعکس شده: حالت عادی و پایدار، دیده‌شدن است؛ فقط لحظه‌ی اول
 * رندر (via @starting-style) محو/پایین‌تر شروع می‌شود. اگر این ویژگی در
 * مرورگری پشتیبانی نشود یا هر مشکلی پیش بیاید، عنصر همان حالت نهایی و
 * دیده‌شده را دارد — نه برعکس.
 */
export default function Reveal({
  children,
  delay = 0,
  className = "",
  as = "div",
}: Props) {
  const cls = `${className} opacity-100 translate-y-0 transition-all duration-700 ease-out motion-safe:starting:opacity-0 motion-safe:starting:translate-y-5`;
  const style = { transitionDelay: `${delay}ms` };

  if (as === "li") {
    return (
      <li className={cls} style={style}>
        {children}
      </li>
    );
  }

  return (
    <div className={cls} style={style}>
      {children}
    </div>
  );
}
