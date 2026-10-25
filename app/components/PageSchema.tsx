"use client";

import { usePathname } from "next/navigation";
import { jsonLdScriptProps } from "../lib/json-ld";
import { pageSchema } from "../lib/page-schema";

// BreadcrumbList + WebPage برای هر مسیر (سرور هم رندر می‌کند، پس در HTML خام هست). منطق در app/lib/page-schema.ts است.
export default function PageSchema() {
  const path = usePathname() || "/";
  if (path.startsWith("/admin")) return null;
  return <script {...jsonLdScriptProps(pageSchema(path))} />;
}
