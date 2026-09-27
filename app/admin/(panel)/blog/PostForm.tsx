"use client";

import { useActionState } from "react";
import { savePost } from "@/app/actions/blog";

export type EditablePost = {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  category: string;
  content: string;
  cover_image: string | null;
  published: boolean;
};

const inputClass =
  "w-full border border-cream-300 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-brand-300 transition-colors disabled:opacity-60";

function Field({ label, hint, children }: { label: string; hint?: string; children: React.ReactNode }) {
  return (
    <label className="block">
      <span className="block text-sm font-medium text-ink-700 mb-1">{label}</span>
      {children}
      {hint && <span className="block mt-1 text-xs text-ink-400">{hint}</span>}
    </label>
  );
}

export default function PostForm({ post, categories }: { post?: EditablePost; categories: string[] }) {
  const [state, formAction, pending] = useActionState(savePost, undefined);

  return (
    <form action={formAction} className="space-y-5 bg-white rounded-2xl border border-cream-200 shadow-sm p-6">
      {post && <input type="hidden" name="id" value={post.id} />}

      <Field label="عنوان">
        <input name="title" required defaultValue={post?.title} disabled={pending} className={inputClass} />
      </Field>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        <Field label="نامک (آدرس صفحه)" hint="فقط حروف انگلیسی کوچک، عدد و خط تیره؛ مثلاً clinic-no-show">
          <input name="slug" required dir="ltr" defaultValue={post?.slug} disabled={pending} className={inputClass} />
        </Field>
        <Field label="دسته‌بندی">
          <input
            name="category"
            required
            list="blog-categories"
            defaultValue={post?.category}
            disabled={pending}
            className={inputClass}
          />
          <datalist id="blog-categories">
            {categories.map((c) => (
              <option key={c} value={c} />
            ))}
          </datalist>
        </Field>
      </div>

      <Field label="خلاصه" hint="زیر عنوان و در نتایج گوگل نمایش داده می‌شود (۱۰ تا ۴۰۰ حرف).">
        <textarea name="excerpt" required rows={2} defaultValue={post?.excerpt} disabled={pending} className={`${inputClass} resize-y`} />
      </Field>

      <Field label="متن مقاله" hint="پاراگراف‌ها را با یک خط خالی از هم جدا کنید.">
        <textarea
          name="content"
          required
          rows={16}
          defaultValue={post?.content}
          disabled={pending}
          className={`${inputClass} resize-y leading-loose`}
        />
      </Field>

      <Field label="تصویر شاخص" hint="JPG، PNG یا WebP تا ۵ مگابایت. بدون تصویر، کاور رنگی دسته‌بندی نمایش داده می‌شود.">
        {post?.cover_image && (
          // eslint-disable-next-line @next/next/no-img-element -- پیش‌نمایش ساده در پنل؛ بهینه‌سازی تصویر لازم نیست
          <img src={post.cover_image} alt="" className="mb-2 h-32 rounded-lg border border-cream-200 object-cover" />
        )}
        <input name="cover" type="file" accept="image/jpeg,image/png,image/webp" disabled={pending} className="block text-sm" />
      </Field>
      {post?.cover_image && (
        <label className="flex items-center gap-2 text-sm text-ink-700">
          <input type="checkbox" name="removeCover" disabled={pending} /> حذف تصویر فعلی
        </label>
      )}

      <label className="flex items-center gap-2 text-sm font-medium text-ink-900">
        <input type="checkbox" name="published" defaultChecked={post?.published ?? false} disabled={pending} />
        منتشر شود (روی سایت نمایش داده شود)
      </label>

      {state?.message && (
        <div role="alert" className="bg-bad-50 border border-bad-200 text-bad-600 text-sm rounded-xl px-4 py-3">
          {state.message}
        </div>
      )}

      <button
        type="submit"
        disabled={pending}
        className="gradient-primary text-white px-8 py-3 rounded-xl font-bold hover:opacity-90 transition-opacity shadow-md disabled:opacity-60"
      >
        {pending ? "در حال ذخیره..." : "ذخیره"}
      </button>
    </form>
  );
}
