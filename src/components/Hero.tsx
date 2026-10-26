"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { NAV } from "@/lib/site";

const BRAND = "Jaidev";

// Played in order during the splash; the last one expands into the hero
// card. Afterwards the card's arrows step through the same set.
const SHOTS = [
  { src: "/hero/pic1.jpg", label: "Lobby" },
  { src: "/hero/pic2.jpg", label: "Reception" },
  { src: "/hero/pic3.jpg", label: "Corridors" },
  { src: "/hero/pic4.jpg", label: "Lodging suite" },
  { src: "/hero/final.jpg", label: "Exterior" },
];
const LAST = SHOTS.length - 1;


const SHUTTER_MS = 450;
const FADE_MS = 400;
const EXPAND_MS = 1400;
const EASE = "cubic-bezier(0.76, 0, 0.24, 1)";

// Corner radius of the image card, shared by the cut-out info card so the
// curves line up.
const RADIUS = 28;

type Phase = "loading" | "shutter" | "expand" | "ready";
type Rect = { top: number; left: number; width: number; height: number };

export default function Hero() {
  const [phase, setPhase] = useState<Phase>("loading");
  const [shot, setShot] = useState(0);
  const [loaded, setLoaded] = useState(0);
  const [slot, setSlot] = useState<Rect | null>(null);

  const sectionRef = useRef<HTMLElement>(null);
  const slotRef = useRef<HTMLDivElement>(null);

  // Start once every shot is decoded (or after a fallback timeout) so the
  // shutter never flashes an empty frame.
  useEffect(() => {
    if (phase !== "loading") return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const delay = reduce || loaded >= SHOTS.length ? 0 : 1500;
    const t = setTimeout(() => {
      if (reduce) {
        setShot(LAST);
        setPhase("ready");
      } else {
        setPhase("shutter");
      }
    }, delay);
    return () => clearTimeout(t);
  }, [loaded, phase]);

  useEffect(() => {
    if (phase === "shutter") {
      const t = setTimeout(() => {
        if (shot < LAST) setShot(shot + 1);
        else setPhase("expand");
      }, SHUTTER_MS);
      return () => clearTimeout(t);
    }
    if (phase === "expand") {
      const t = setTimeout(() => setPhase("ready"), EXPAND_MS - 450);
      return () => clearTimeout(t);
    }
  }, [phase, shot]);

  // Hold the page still until the intro has played, unless the visitor
  // arrived part-way down (e.g. a refresh mid-page).
  useEffect(() => {
    if (phase === "ready" || window.scrollY > 0) return;
    const root = document.documentElement;
    root.style.overflow = "hidden";
    return () => {
      root.style.overflow = "";
    };
  }, [phase]);

  // Track where the card lives in the layout so the splash frame can grow
  // into exactly that box.
  useLayoutEffect(() => {
    const el = slotRef.current;
    const section = sectionRef.current;
    if (!el || !section) return;
    const measure = () => {
      let top = 0;
      let left = 0;
      for (let n: HTMLElement | null = el; n && n !== section; n = n.offsetParent as HTMLElement | null) {
        top += n.offsetTop;
        left += n.offsetLeft;
      }
      setSlot({ top, left, width: el.offsetWidth, height: el.offsetHeight });
    };
    measure();
    const ro = new ResizeObserver(measure);
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  const expanded = (phase === "expand" || phase === "ready") && slot !== null;
  const ready = phase === "ready";
  const step = (d: number) => setShot((s) => (s + d + SHOTS.length) % SHOTS.length);

  return (
    <div className="h-svh min-h-[600px] overflow-hidden">
      <section
        ref={sectionRef}
        className="relative flex h-full w-full flex-col overflow-hidden bg-[var(--page)] px-3 pb-3 text-neutral-900 [--frame-w:min(86vw,120svh)] [--page:#ebeae5] sm:px-5 sm:pb-5 sm:[--frame-w:min(58vw,880px,110svh)]"
      >
        <header
          className="flex items-center justify-between gap-6 px-2 py-4 sm:py-5"
          style={reveal(ready, 0)}
        >
          <Link href="/" className="text-sm font-semibold tracking-[0.2em] uppercase">
            {BRAND}
          </Link>
          <nav aria-label="Primary" className="hidden md:block">
            <ul className="flex items-center gap-9 text-sm text-neutral-600">
              {NAV.map((item) => (
                <li key={item.href}>
                  <a href={item.href} className="transition-colors hover:text-neutral-900">
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
          <div className="flex items-center gap-3">
            <a
              href="#contact"
              className="hidden rounded-full bg-neutral-900 px-5 py-2.5 text-sm font-medium text-white transition-colors hover:bg-neutral-700 sm:inline-block"
            >
              Book a visit
            </a>
            <button
              type="button"
              aria-label="Open menu"
              className="flex h-10 w-10 flex-col items-center justify-center gap-[6px] rounded-full border border-neutral-300 md:hidden"
            >
              <span className="block h-px w-4 bg-neutral-900" />
              <span className="block h-px w-4 bg-neutral-900" />
            </button>
          </div>
        </header>

        {/* Narrow screens: no room for the corner panel, so the headline sits
            above the card instead. */}
        <div className="px-2 pt-2 pb-5 md:hidden" style={reveal(ready, 150)}>
          <h1 className="font-serif text-[clamp(2.4rem,10vw,3.25rem)] leading-[0.98] tracking-[-0.015em]">
            <Headline />
          </h1>
        </div>

        {/* Layout slot for the image card. The card itself is positioned
            over it so it can start life as the centred splash frame. */}
        <div ref={slotRef} className="min-h-[260px] flex-1" />

        <div
          className="absolute z-20 overflow-hidden [--tl:28px] md:[--tl:0px]"
          style={
            expanded
              ? {
                  top: slot.top,
                  left: slot.left,
                  width: slot.width,
                  height: slot.height,
                  transform: "translate(0, 0)",
                  // Corners hidden under the cut-out panels are squared off so
                  // no anti-aliased arc shows through them.
                  borderRadius: ready ? `var(--tl) ${RADIUS}px 0 ${RADIUS}px` : RADIUS,
                  transition: `top ${EXPAND_MS}ms ${EASE}, left ${EXPAND_MS}ms ${EASE}, width ${EXPAND_MS}ms ${EASE}, height ${EXPAND_MS}ms ${EASE}, transform ${EXPAND_MS}ms ${EASE}, border-radius ${EXPAND_MS}ms ${EASE}`,
                }
              : {
                  top: "50%",
                  left: "50%",
                  width: "var(--frame-w)",
                  height: "calc(var(--frame-w) / 1.5)",
                  transform: "translate(-50%, -50%)",
                  borderRadius: 6,
                }
          }
        >
          {SHOTS.map((item, i) => (
            <div
              key={item.src}
              className="absolute inset-0"
              // Each shot fades in over the ones before it, so there is never a gap.
              style={{
                opacity: i <= shot ? 1 : 0,
                transition: `opacity ${FADE_MS}ms cubic-bezier(0.4, 0, 0.2, 1)`,
              }}
              aria-hidden={i !== shot}
            >
              <Image
                src={item.src}
                alt={`K-Indrali Business Square, ${item.label.toLowerCase()}`}
                fill
                sizes="100vw"
                loading="eager"
                fetchPriority={i === 0 || i === LAST ? "high" : "auto"}
                onLoad={() => setLoaded((n) => n + 1)}
                // Keep the building in frame however the card is cropped.
                className={`object-cover ${i === LAST ? "object-[42%_40%]" : ""}`}
                // A gentle settle as each shot arrives keeps the cut from feeling static.
                style={{
                  transform: i <= shot ? "scale(1)" : "scale(1.06)",
                  transition: `transform ${SHUTTER_MS + FADE_MS}ms cubic-bezier(0.22, 1, 0.36, 1)`,
                }}
              />
            </div>
          ))}

          <TitleCard ready={ready} />
          <InfoCard ready={ready} shot={shot} onStep={step} />
        </div>
      </section>
    </div>
  );
}

function Headline() {
  return (
    <>
      <span className="text-neutral-400 italic">The</span> gateway{" "}
      <br className="hidden md:block" />
      <span className="text-neutral-400 italic">to</span> Manipal
    </>
  );
}

// Wide screens: the headline lives in a panel cut into the card's top-left
// corner, mirroring the info card. The image is anchored near its top so the
// building clears this panel.
function TitleCard({ ready }: { ready: boolean }) {
  const curve = `radial-gradient(circle at 100% 100%, transparent ${RADIUS - 0.5}px, var(--page) ${RADIUS}px)`;
  return (
    <div
      className="absolute top-0 left-0 hidden bg-[var(--page)] pr-6 pb-4 md:block"
      style={{
        borderBottomRightRadius: RADIUS,
        ...growFrom("top left", ready, 0),
      }}
    >
      <span aria-hidden className="absolute top-0 left-[calc(100%-1px)]" style={{ width: RADIUS, height: RADIUS, background: curve }} />
      <span aria-hidden className="absolute top-[calc(100%-1px)] left-0" style={{ width: RADIUS, height: RADIUS, background: curve }} />
      <h1
        className="font-serif text-[clamp(2rem,3.4vw,3.75rem)] leading-[0.95] tracking-[-0.015em]"
        style={reveal(ready, 350)}
      >
        <Headline />
      </h1>
    </div>
  );
}

// Cut into the card's bottom-right corner. It shares the page colour, and the
// two small squares paint the inverse curves where it meets the photo.
function InfoCard({
  ready,
  shot,
  onStep,
}: {
  ready: boolean;
  shot: number;
  onStep: (d: number) => void;
}) {
  const curve = `radial-gradient(circle at 0 0, transparent ${RADIUS - 0.5}px, var(--page) ${RADIUS}px)`;
  return (
    <div
      className="absolute right-0 bottom-0 w-[min(66%,280px)] bg-[var(--page)] pt-3 pl-3 sm:w-[min(32%,330px)] sm:pt-4 sm:pl-4"
      style={{
        borderTopLeftRadius: RADIUS,
        ...growFrom("bottom right", ready, 150),
      }}
    >
      <span aria-hidden className="absolute right-0 bottom-[calc(100%-1px)]" style={{ width: RADIUS, height: RADIUS, background: curve }} />
      <span aria-hidden className="absolute right-[calc(100%-1px)] bottom-0" style={{ width: RADIUS, height: RADIUS, background: curve }} />

      <div className="rounded-[16px] bg-white p-3 sm:p-4" style={reveal(ready, 500)}>
        <div className="flex items-baseline justify-between gap-4">
          <p className="text-[10px] font-medium tracking-[0.2em] text-neutral-500 uppercase">
            {SHOTS[shot].label}
          </p>
          <p className="text-[11px] text-neutral-400 tabular-nums">
            {String(shot + 1).padStart(2, "0")} / {String(SHOTS.length).padStart(2, "0")}
          </p>
        </div>
        <h2 className="mt-1 font-serif text-lg leading-tight sm:text-[22px]">K-Indrali Business Square</h2>
        <p className="mt-1 hidden text-xs leading-relaxed text-neutral-500 sm:block">
          G+4, Vastu-compliant. Between Udupi and Manipal.
        </p>
        <div className="mt-3 flex items-center justify-end gap-3 sm:justify-between">
          <span className="hidden rounded-full border border-neutral-200 px-3 py-1 text-[11px] font-medium text-neutral-700 sm:inline-block">
            Retail, offices &amp; lodging
          </span>
          <div className="flex items-center gap-1.5">
            <button
              type="button"
              onClick={() => onStep(-1)}
              disabled={!ready}
              aria-label="Previous photo"
              className="flex h-8 w-8 items-center justify-center rounded-full border border-neutral-200 text-sm transition-colors hover:bg-neutral-100"
            >
              <span aria-hidden>&larr;</span>
            </button>
            <button
              type="button"
              onClick={() => onStep(1)}
              disabled={!ready}
              aria-label="Next photo"
              className="flex h-8 w-8 items-center justify-center rounded-full bg-neutral-900 text-sm text-white transition-colors hover:bg-neutral-700"
            >
              <span aria-hidden>&rarr;</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

// Long ease-out so motion settles gently rather than stopping short.
const SETTLE = "cubic-bezier(0.16, 1, 0.3, 1)";

// Text and controls drift up out of a soft blur.
function reveal(visible: boolean, delay: number): React.CSSProperties {
  return {
    opacity: visible ? 1 : 0,
    transform: visible ? "translateY(0)" : "translateY(24px)",
    filter: visible ? "blur(0)" : "blur(8px)",
    transition: [
      `opacity 1100ms ease-out ${delay}ms`,
      `transform 1400ms ${SETTLE} ${delay}ms`,
      `filter 1100ms ease-out ${delay}ms`,
    ].join(", "),
  };
}

// The cut-out panels grow out of their own corner of the photo.
function growFrom(origin: string, visible: boolean, delay: number): React.CSSProperties {
  return {
    transformOrigin: origin,
    opacity: visible ? 1 : 0,
    transform: visible ? "scale(1)" : "scale(0.55)",
    transition: `opacity 700ms ease-out ${delay}ms, transform 1300ms ${SETTLE} ${delay}ms`,
  };
}
