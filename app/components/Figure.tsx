import Image from "next/image";

type Props = {
  /** مسیر تصویر از ریشه‌ی public، مثلاً "/images/products/ai-assistant.png".
   *  اگر تعریف نشده باشد، جای‌نگهدار نمایش داده می‌شود. */
  src?: string;
  alt: string;
  /** متن جای‌نگهدار وقتی تصویر هنوز اضافه نشده. */
  placeholder: string;
  /** کلاس‌های ظرف؛ باید نسبت ابعاد را تعیین کند (مثلاً aspect-[16/9]). */
  className?: string;
  /** برای تصاویر بالای صفحه که باید زودتر بارگذاری شوند. */
  priority?: boolean;
  sizes?: string;
};

/**
 * ظرف تصویر با جای‌نگهدار.
 *
 * تا وقتی فایل تصویر اضافه نشده، همان بلوک خاکستری قبلی را نشان می‌دهد؛
 * به‌محض اینکه src مقدار بگیرد، تصویر بهینه‌شده جای آن را می‌گیرد.
 * این باعث می‌شود تصاویر را بتوان یکی‌یکی اضافه کرد بدون شکستن بیلد.
 */
export default function Figure({
  src,
  alt,
  placeholder,
  className = "",
  priority = false,
  sizes = "(max-width: 768px) 100vw, 50vw",
}: Props) {
  if (!src) {
    return (
      <div
        className={`relative bg-cream-200 flex items-center justify-center ${className}`}
        role="img"
        aria-label={alt}
      >
        <span className="text-xs text-ink-400 px-3 text-center">
          {placeholder}
        </span>
      </div>
    );
  }

  return (
    <div className={`relative overflow-hidden bg-cream-200 ${className}`}>
      <Image
        src={src}
        alt={alt}
        fill
        sizes={sizes}
        priority={priority}
        className="object-cover"
      />
    </div>
  );
}
