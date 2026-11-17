import Reveal from "./Reveal";

const VIDEO_HASH = "ukw1qab";

export default function ProductVideo() {
  return (
    <section id="video" className="py-20 bg-white">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2 className="text-3xl md:text-4xl font-black text-ink-900 mb-3">
          مدیلینک را در یک دقیقه ببینید
        </h2>
        <p className="text-ink-400 text-base leading-relaxed mb-8">
          از ثبت نوبت تا پیگیری بیمار، همان چیزی که منشی شما هر روز می‌بیند.
        </p>
        <Reveal className="overflow-hidden rounded-2xl border border-cream-300 shadow-xl">
          <div className="relative aspect-video">
            <iframe
              src={`https://www.aparat.com/video/video/embed/videohash/${VIDEO_HASH}/vt/frame`}
              title="ویدیوی معرفی مدیلینک"
              loading="lazy"
              allowFullScreen
              className="absolute inset-0 h-full w-full border-0"
            />
          </div>
        </Reveal>
      </div>
    </section>
  );
}
