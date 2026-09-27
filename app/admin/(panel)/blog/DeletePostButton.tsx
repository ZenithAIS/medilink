"use client";

export default function DeletePostButton() {
  return (
    <button
      type="submit"
      onClick={(e) => {
        if (!window.confirm("این مقاله برای همیشه حذف شود؟")) e.preventDefault();
      }}
      className="text-sm text-bad-500 hover:underline"
    >
      حذف کامل این مقاله
    </button>
  );
}
