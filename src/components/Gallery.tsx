"use client";

import Image from "next/image";
import { useCallback, useEffect, useState } from "react";
import Reveal from "@/components/Reveal";

const PAGE = "#ebeae5";
const RADIUS = 28;

const PHOTOS = [
  { src: "/hero/final.jpg", title: "Exterior", place: "Street view at dusk", span: "md:col-span-7 md:row-span-2" },
  { src: "/hero/pic1.jpg", title: "Lobby", place: "Ground floor", span: "md:col-span-5" },
  { src: "/hero/pic2.jpg", title: "Reception", place: "Ground floor", span: "md:col-span-5" },
  { src: "/hero/pic3.jpg", title: "Corridor", place: "Upper floors", span: "md:col-span-5" },
  { src: "/hero/pic4.jpg", title: "Lodging suite", place: "Upper floors", span: "md:col-span-7" },
];

export default function Gallery() {
  const [open, setOpen] = useState<number | null>(null);

  return (
    <section id="gallery" className="text-neutral-900" style={{ background: PAGE }}>
      <div className="mx-auto max-w-[1400px] px-5 py-24 sm:px-8 sm:py-32">
        <div className="grid gap-8 md:grid-cols-12 md:items-end">
          <div className="md:col-span-7">
            <Reveal>
              <p className="text-[11px] font-medium tracking-[0.22em] text-neutral-500 uppercase">Gallery</p>
            </Reveal>
            <Reveal delay={100}>
              <h2 className="mt-6 font-serif text-[clamp(2.5rem,5vw,4.75rem)] leading-[0.98] tracking-[-0.015em]">
                A closer look,
                <br />
                <span className="text-neutral-400">inside and</span> out
              </h2>
            </Reveal>
          </div>
          <Reveal className="md:col-span-4 md:col-start-9 md:pb-3" delay={200}>
            <p className="text-[15px] leading-[1.7] text-neutral-600">
              Renders of the building and its interiors. Select any image to view it full screen.
            </p>
          </Reveal>
        </div>

        <div className="mt-14 grid auto-rows-[260px] gap-4 sm:mt-20 sm:auto-rows-[300px] md:grid-cols-12 md:gap-5">
          {PHOTOS.map((p, i) => (
            <Reveal key={p.src} className={p.span} delay={(i % 3) * 90}>
              <button
                type="button"
                onClick={() => setOpen(i)}
                aria-label={`View ${p.title} full screen`}
                className="group relative block h-full w-full overflow-hidden text-left"
                style={{ borderRadius: RADIUS }}
              >
                <Image
                  src={p.src}
                  alt={`${p.title}, ${p.place}`}
                  fill
                  sizes="(min-width: 768px) 60vw, 100vw"
                  className="object-cover transition-transform duration-[1200ms] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.04]"
                />
                <Tab title={p.title} index={i} />
                <span className="absolute top-4 right-4 flex h-10 w-10 scale-90 items-center justify-center rounded-full bg-white/90 text-neutral-900 opacity-0 backdrop-blur transition-all duration-500 group-hover:scale-100 group-hover:opacity-100">
                  <ExpandIcon />
                </span>
              </button>
            </Reveal>
          ))}
        </div>
      </div>

      {open !== null && <Lightbox index={open} onChange={setOpen} onClose={() => setOpen(null)} />}
    </section>
  );
}

// Label cut into the bottom-left corner, the same treatment as the hero.
function Tab({ title, index }: { title: string; index: number }) {
  const curve = `radial-gradient(circle at 100% 0, transparent 19.5px, ${PAGE} 20px)`;
  return (
    <span className="absolute bottom-0 left-0 pt-2.5 pr-2.5" style={{ background: PAGE, borderTopRightRadius: 20 }}>
      <span aria-hidden className="absolute bottom-[calc(100%-1px)] left-0" style={{ width: 20, height: 20, background: curve }} />
      <span aria-hidden className="absolute bottom-0 left-[calc(100%-1px)]" style={{ width: 20, height: 20, background: curve }} />
      <span className="flex items-baseline gap-3 rounded-[14px] bg-white px-4 py-2.5">
        <span className="text-[10px] text-neutral-400 tabular-nums">{String(index + 1).padStart(2, "0")}</span>
        <span className="font-serif text-xl leading-tight">{title}</span>
      </span>
    </span>
  );
}

function Lightbox({
  index,
  onChange,
  onClose,
}: {
  index: number;
  onChange: (i: number) => void;
  onClose: () => void;
}) {
  const [shown, setShown] = useState(false);
  const step = useCallback(
    (d: number) => onChange((index + d + PHOTOS.length) % PHOTOS.length),
    [index, onChange],
  );

  useEffect(() => {
    const root = document.documentElement;
    root.style.overflow = "hidden";
    const raf = requestAnimationFrame(() => setShown(true));
    return () => {
      cancelAnimationFrame(raf);
      root.style.overflow = "";
    };
  }, []);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowRight") step(1);
      if (e.key === "ArrowLeft") step(-1);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onClose, step]);

  const p = PHOTOS[index];

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label={`${p.title}, image ${index + 1} of ${PHOTOS.length}`}
      className="fixed inset-0 z-50 flex flex-col bg-[#141412]/95 text-white backdrop-blur-sm transition-opacity duration-500"
      style={{ opacity: shown ? 1 : 0 }}
      onClick={onClose}
    >
      <div className="flex items-center justify-between px-5 py-4 sm:px-8 sm:py-6" onClick={(e) => e.stopPropagation()}>
        <p className="text-sm text-white/60 tabular-nums">
          {String(index + 1).padStart(2, "0")} / {String(PHOTOS.length).padStart(2, "0")}
        </p>
        <button
          type="button"
          onClick={onClose}
          autoFocus
          aria-label="Close"
          className="flex h-11 w-11 items-center justify-center rounded-full border border-white/20 transition-colors hover:bg-white hover:text-neutral-900"
        >
          <svg aria-hidden viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="1.6">
            <path d="M5 5l14 14M19 5L5 19" />
          </svg>
        </button>
      </div>

      <div className="relative min-h-0 flex-1 px-5 sm:px-24" onClick={(e) => e.stopPropagation()}>
        {PHOTOS.map((ph, i) => (
          <div
            key={ph.src}
            aria-hidden={i !== index}
            className="absolute inset-0 mx-5 transition-[opacity,transform] duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] sm:mx-24"
            style={{ opacity: i === index ? 1 : 0, transform: i === index ? "scale(1)" : "scale(0.98)" }}
          >
            <Image src={ph.src} alt={`${ph.title}, ${ph.place}`} fill sizes="100vw" className="object-contain" />
          </div>
        ))}
        <NavButton dir={-1} onClick={() => step(-1)} />
        <NavButton dir={1} onClick={() => step(1)} />
      </div>

      <div className="px-5 py-5 text-center sm:py-7" onClick={(e) => e.stopPropagation()}>
        <p className="font-serif text-2xl">{p.title}</p>
        <p className="mt-1 text-[11px] tracking-[0.2em] text-white/50 uppercase">{p.place}</p>
      </div>
    </div>
  );
}

function NavButton({ dir, onClick }: { dir: 1 | -1; onClick: () => void }) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={dir === 1 ? "Next image" : "Previous image"}
      className={`absolute top-1/2 z-10 flex h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full border border-white/20 bg-black/30 backdrop-blur transition-colors hover:bg-white hover:text-neutral-900 ${
        dir === 1 ? "right-3 sm:right-8" : "left-3 sm:left-8"
      }`}
    >
      <span aria-hidden>{dir === 1 ? "→" : "←"}</span>
    </button>
  );
}

function ExpandIcon() {
  return (
    <svg aria-hidden viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round">
      <path d="M14 4h6v6M10 20H4v-6M20 4l-7 7M4 20l7-7" />
    </svg>
  );
}
