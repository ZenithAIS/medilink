import { createAdminClient } from "@/app/lib/supabase/admin";

export const dynamic = "force-dynamic";

export default async function AdminLeadsPage() {
  const supabase = createAdminClient();
  const { data: leads, error } = await supabase
    .from("leads")
    .select("id, name, clinic_type, phone, message, created_at")
    .order("created_at", { ascending: false })
    .limit(200);

  return (
    <div>
      <h1 className="text-2xl font-black text-ink-900 mb-6">درخواست‌های دمو</h1>

      {error && (
        <div className="bg-bad-50 border border-bad-200 text-bad-600 text-sm rounded-xl px-4 py-3 mb-4">
          خطا در خواندن درخواست‌ها: {error.message}
        </div>
      )}

      <div className="bg-white rounded-2xl border border-cream-200 shadow-sm overflow-x-auto">
        <table className="w-full min-w-[760px] text-right">
          <thead>
            <tr className="border-b border-cream-200 bg-cream-100 text-xs text-ink-400">
              <th className="p-3 font-bold">تاریخ</th>
              <th className="p-3 font-bold">نام</th>
              <th className="p-3 font-bold">نوع کلینیک</th>
              <th className="p-3 font-bold">تماس</th>
              <th className="p-3 font-bold">پیام</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-cream-100">
            {leads?.map((lead) => (
              <tr key={lead.id} className="text-sm align-top">
                <td className="p-3 text-ink-400 whitespace-nowrap">
                  {new Date(lead.created_at).toLocaleDateString("fa-IR")}
                </td>
                <td className="p-3 text-ink-900 font-medium whitespace-nowrap">{lead.name}</td>
                <td className="p-3 text-ink-700 whitespace-nowrap">{lead.clinic_type ?? "—"}</td>
                <td className="p-3 text-ink-700 whitespace-nowrap" dir="ltr">
                  {lead.phone}
                </td>
                <td className="p-3 text-ink-700">{lead.message || "—"}</td>
              </tr>
            ))}
            {leads?.length === 0 && (
              <tr>
                <td colSpan={5} className="p-8 text-center text-ink-400">
                  هنوز درخواستی ثبت نشده است.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
