import "server-only";
import { readFileSync, readdirSync } from "fs";
import path from "path";
import { createAppDbPublicClient } from "./app-db/server";

export type Post = {
  slug: string;
  title: string;
  excerpt: string;
  category: string;
  date: string;
  readingTime: string;
  /** URL عمومی تصویر شاخص؛ نبودنش یعنی کاور برداری دسته‌بندی نشان داده شود. */
  cover?: string;
  /** پاراگراف‌های متن مقاله. */
  body: string[];
};

type PostRow = {
  slug: string;
  title: string;
  excerpt: string;
  category: string;
  content: string;
  cover_image: string | null;
  published_at: string | null;
};

const COLUMNS = "slug, title, excerpt, category, content, cover_image, published_at";

/** مقاله‌ها از پنل ادمین سایت (جدول blog_posts در دیتابیس اپ) مدیریت می‌شوند. */
function toPost(row: PostRow): Post {
  const words = row.content.split(/\s+/).filter(Boolean).length;
  const minutes = Math.max(1, Math.round(words / 200));
  return {
    slug: row.slug,
    title: row.title,
    excerpt: row.excerpt,
    category: row.category,
    date: row.published_at ? new Date(row.published_at).toLocaleDateString("fa-IR") : "",
    readingTime: `${minutes.toLocaleString("fa-IR")} دقیقه`,
    cover: row.cover_image ?? undefined,
    body: row.content
      .split(/\n\s*\n/)
      .map((p) => p.trim())
      .filter(Boolean),
  };
}

// مقاله‌های داخل ریپو (content/blog/<slug>.json) کنار مقاله‌های پنل ادمین نمایش داده می‌شوند؛
// اگر اسلاگ تکراری بود، نسخه‌ی دیتابیس اولویت دارد.
function getFilePosts(): PostRow[] {
  const dir = path.join(process.cwd(), "content", "blog");
  try {
    return readdirSync(dir)
      .filter((f) => f.endsWith(".json"))
      .map((f) => JSON.parse(readFileSync(path.join(dir, f), "utf8")) as PostRow);
  } catch {
    return [];
  }
}

function mergeRows(dbRows: PostRow[]): PostRow[] {
  const seen = new Set(dbRows.map((r) => r.slug));
  return [...dbRows, ...getFilePosts().filter((r) => !seen.has(r.slug))].sort((a, b) =>
    (b.published_at ?? "").localeCompare(a.published_at ?? ""),
  );
}

// خطای دیتابیس نباید بیلد یا کل صفحه‌ی بلاگ را از کار بیندازد؛ فقط لاگ می‌شود.
export async function getPublishedPosts(): Promise<Post[]> {
  try {
    const { data, error } = await createAppDbPublicClient()
      .from("blog_posts")
      .select(COLUMNS)
      .eq("published", true)
      .order("published_at", { ascending: false });
    if (error) throw error;
    return mergeRows(data as PostRow[]).map(toPost);
  } catch (err) {
    console.error("[blog] reading posts failed:", err);
    return mergeRows([]).map(toPost);
  }
}

export async function getPost(slug: string): Promise<Post | null> {
  try {
    const { data, error } = await createAppDbPublicClient()
      .from("blog_posts")
      .select(COLUMNS)
      .eq("published", true)
      .eq("slug", slug)
      .maybeSingle<PostRow>();
    if (error) throw error;
    if (data) return toPost(data);
  } catch (err) {
    console.error("[blog] reading post failed:", err);
  }
  const file = getFilePosts().find((r) => r.slug === slug);
  return file ? toPost(file) : null;
}
