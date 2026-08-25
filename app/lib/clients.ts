export type Client = {
  name: string;
  /** لوگو در public/images/clients/ — مثلاً "/images/clients/arta.svg".
   *  تا اضافه نشدن، نام کلینیک به‌صورت متنی نمایش داده می‌شود. */
  logo?: string;
};

/* TODO(asset): لوگوی کلینیک‌های مشتری (SVG یا PNG شفاف) — بند ۵ بریف */
export const clients: Client[] = [
  { name: "کلینیک آرتا" },
  { name: "مرکز درمانی نوین" },
  { name: "کلینیک سپید" },
  { name: "پلی‌کلینیک پارسیان" },
  { name: "دندانپزشکی مهر" },
  { name: "کلینیک چشم‌پزشکی دید" },
  { name: "مرکز زیبایی رها" },
  { name: "پلی‌کلینیک سلامت" },
];
