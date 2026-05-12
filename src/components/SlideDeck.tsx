import { useEffect, useRef, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

export type Slide = {
  title: string;
  body: string;
  emoji: string;
  bg: string; // tailwind gradient classes
};

export function SlideDeck({ slides, onComplete }: { slides: Slide[]; onComplete?: () => void }) {
  const [i, setI] = useState(0);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const onScroll = () => {
      const w = el.clientWidth;
      const idx = Math.round(el.scrollLeft / w);
      setI(idx);
      if (idx === slides.length - 1) onComplete?.();
    };
    el.addEventListener("scroll", onScroll, { passive: true });
    return () => el.removeEventListener("scroll", onScroll);
  }, [slides.length, onComplete]);

  const go = (dir: -1 | 1) => {
    const el = ref.current;
    if (!el) return;
    const next = Math.max(0, Math.min(slides.length - 1, i + dir));
    el.scrollTo({ left: next * el.clientWidth, behavior: "smooth" });
  };

  return (
    <div className="relative">
      <div
        ref={ref}
        className="flex overflow-x-auto snap-x snap-mandatory no-scrollbar rounded-2xl shadow-soft overscroll-x-contain touch-pan-x"
        style={{ scrollSnapType: "x mandatory" }}
      >
        {slides.map((s, idx) => (
          <article
            key={idx}
            className={`min-w-full snap-center aspect-[4/5] flex flex-col justify-end p-6 text-white ${s.bg}`}
          >
            <div className="text-6xl mb-4 drop-shadow-lg">{s.emoji}</div>
            <h3 className="text-2xl font-bold leading-tight">{s.title}</h3>
            <p className="mt-2 text-sm text-white/90 leading-relaxed">{s.body}</p>
            <div className="mt-4 text-[11px] font-semibold uppercase tracking-widest text-white/70">
              Step {idx + 1} of {slides.length}
            </div>
          </article>
        ))}
      </div>

      <button
        aria-label="Previous"
        onClick={() => go(-1)}
        disabled={i === 0}
        className="absolute left-2 top-1/2 -translate-y-1/2 h-10 w-10 grid place-items-center rounded-full bg-white/95 shadow-pop tap-press disabled:opacity-40"
      >
        <ChevronLeft className="h-5 w-5 text-primary" />
      </button>
      <button
        aria-label="Next"
        onClick={() => go(1)}
        disabled={i === slides.length - 1}
        className="absolute right-2 top-1/2 -translate-y-1/2 h-10 w-10 grid place-items-center rounded-full bg-accent shadow-pop tap-press disabled:opacity-40"
      >
        <ChevronRight className="h-5 w-5 text-white" />
      </button>

      <div className="mt-3 flex justify-center gap-1.5">
        {slides.map((_, idx) => (
          <span
            key={idx}
            className={`h-1.5 rounded-full transition-all ${
              idx === i ? "w-6 bg-accent" : "w-1.5 bg-border"
            }`}
          />
        ))}
      </div>
    </div>
  );
}
