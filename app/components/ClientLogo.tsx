import Image from "next/image";
import type { Client } from "@/app/lib/clients";

/**
 * لوگوی مشتری. تا وقتی فایل لوگو اضافه نشده، نام کلینیک را متنی نشان می‌دهد
 * تا چیدمان خالی نماند.
 */
export default function ClientLogo({
  client,
  className = "",
}: {
  client: Client;
  className?: string;
}) {
  if (!client.logo) {
    return (
      <span
        className={`flex items-center justify-center text-sm font-medium text-gray-400 ${className}`}
      >
        {client.name}
      </span>
    );
  }

  return (
    <span className={`relative block ${className}`}>
      <Image
        src={client.logo}
        alt={client.name}
        fill
        sizes="160px"
        className="object-contain"
      />
    </span>
  );
}
