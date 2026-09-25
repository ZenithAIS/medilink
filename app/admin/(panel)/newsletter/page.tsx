import { createAdminClient } from "@/app/lib/supabase/admin";

export const dynamic = "force-dynamic";

export default async function AdminNewsletterPage() {
  const supabase = createAdminClient();
  const { data: subscribers, error } = await supabase
    .from("newsletter_subscribers")
    .select("id, email, created_at")
    .order("created_at", { ascending: false })
    .limit(500);

  return (
    <div>
      <h1 className="text-2xl font-black text-ink-900 mb-6">خبرنامه</h1>

      {error && (
        <div className="bg-bad-50 border border-bad-200 text-bad-600 text-sm rounded-xl px-4 py-3 mb-4">
          خطا در خواندن اعضا: {error.message}
        </div>
      )}

      <div className="bg-white rounded-2xl border border-cream-200 shadow-sm overflow-x-auto">
        <table className="w-full min-w-[480px] text-right">
          <thead>
            <tr className="border-b border-cream-200 bg-cream-100 text-xs text-ink-400">
              <th className="p-3 font-bold">تاریخ عضویت</th>
              <th className="p-3 font-bold">ایمیل</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-cream-100">
            {subscribers?.map((sub) => (
              <tr key={sub.id} className="text-sm">
                <td className="p-3 text-ink-400 whitespace-nowrap">
                  {new Date(sub.created_at).toLocaleDateString("fa-IR")}
                </td>
                <td className="p-3 text-ink-700" dir="ltr">
                  {sub.email}
                </td>
              </tr>
            ))}
            {subscribers?.length === 0 && (
              <tr>
                <td colSpan={2} className="p-8 text-center text-ink-400">
                  هنوز عضوی ثبت نشده است.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
