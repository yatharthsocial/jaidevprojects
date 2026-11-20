"use client";

import Image from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";
import Brand from "@/components/Brand";
import BrochureDownload from "@/components/BrochureDownload";
import { PinIcon } from "@/components/icons";
import { DIRECTIONS_URL, NAV, SITE } from "@/lib/site";

// Renders of the project. The exterior opens the site; the card's arrows then
// step through the rest.
const SHOTS = [
  { src: "/hero/final.jpg", label: "Exterior", focus: "42% 40%" },
  { src: "/hero/pic1.jpg", label: "Lobby" },
  { src: "/hero/pic2.jpg", label: "Reception" },
  { src: "/hero/pic3.jpg", label: "Corridors" },
  { src: "/hero/pic4.jpg", label: "Lodging suite" },
];

// The logo holds for at least MIN_SPLASH_MS so it registers, and the intro
// never waits longer than MAX_WAIT_MS for the opening image.
const MIN_SPLASH_MS = 2500;
const MAX_WAIT_MS = 3000;
// One continuous move: the logo fades while the photo, already in its final
// place, opens out from the centre. Text follows once it has mostly settled.
// Everything here animates only transform and opacity, which the browser can
// hand to the GPU, so the motion stays smooth even on large photos.
const OPEN_MS = 2200;
const OPEN_DELAY_MS = 450;
const TEXT_AFTER_MS = 1900;
const OPEN_EASE = "cubic-bezier(0.45, 0, 0.15, 1)";

// Corner radius of the image card, shared by the cut-out panels so the curves
// line up.
const RADIUS = 28;

type Phase = "splash" | "open" | "ready";

export default function Hero() {
  const [phase, setPhase] = useState<Phase>("splash");
  const [shot, setShot] = useState(0);
  const [imageReady, setImageReady] = useState(false);
  const [menu, setMenu] = useState(false);

  const gate = useRef({ image: false, min: false });

  // The frame opens once the image is in and the logo has had its moment.
  const markReady = useCallback((key: "image" | "min") => {
    gate.current[key] = true;
    if (key === "image") setImageReady(true);
    if (gate.current.image && gate.current.min) setPhase((p) => (p === "splash" ? "open" : p));
  }, []);

  // A cached image can finish before React attaches onLoad, so also check
  // `complete` when the element mounts.
  const firstImage = useCallback(
    (img: HTMLImageElement | null) => {
      if (img?.complete && img.naturalWidth > 0) markReady("image");
    },
    [markReady],
  );

  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const min = setTimeout(() => (reduce ? setPhase("ready") : markReady("min")), reduce ? 0 : MIN_SPLASH_MS);
    const max = setTimeout(() => markReady("image"), MAX_WAIT_MS);
    return () => {
      clearTimeout(min);
      clearTimeout(max);
    };
  }, [markReady]);

  useEffect(() => {
    if (phase === "open") {
      const t = setTimeout(() => setPhase("ready"), TEXT_AFTER_MS);
      return () => clearTimeout(t);
    }
  }, [phase]);

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

  useEffect(() => {
    if (!menu) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setMenu(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [menu]);

  const opened = phase !== "splash";
  const ready = phase === "ready";
  const step = (d: number) => setShot((s) => (s + d + SHOTS.length) % SHOTS.length);

  return (
    <div className="h-svh min-h-[620px] overflow-hidden">
      <section
        className="relative flex h-full w-full flex-col overflow-hidden bg-[var(--page)] px-5 pb-5 text-neutral-900 [--page:#ebeae5] sm:px-5 sm:pb-5"
      >
        {/* Splash: the company lockup with a loading line, shown while the
            opening image loads. */}
        <div
          aria-hidden={opened}
          className="pointer-events-none absolute inset-0 z-30 flex flex-col items-center justify-center gap-8"
          style={{
            opacity: opened ? 0 : 1,
            transform: opened ? "translateY(-24px)" : "translateY(0)",
            transition: `opacity 900ms ease-in-out, transform 1400ms ${SETTLE}`,
          }}
        >
          <Brand size="splash" animate />
          <span className="relative block h-px w-24 animate-[fade-up_800ms_ease-out_both] overflow-hidden bg-neutral-900/15 [animation-delay:1000ms]">
            <span
              className="absolute inset-y-0 left-0 bg-neutral-900"
              style={{
                width: opened ? "100%" : imageReady ? "85%" : "60%",
                transition: `width ${opened ? 300 : MIN_SPLASH_MS}ms ease-out`,
              }}
            />
          </span>
          <p className="animate-[fade-up_800ms_ease-out_both] px-6 text-center text-[11px] font-medium text-neutral-500 uppercase [animation-delay:1150ms]" style={{ letterSpacing: "0.24em", marginRight: "-0.24em" }}>
            Presents {SITE.name}
          </p>
        </div>

        <header className="relative z-40 flex items-center justify-between gap-6 py-4 sm:py-5 md:px-2" style={reveal(ready, 0)}>
          <a href="#" aria-label={`${SITE.developer}, back to top`}>
            <Brand />
          </a>
          <nav aria-label="Primary" className="hidden lg:block">
            <ul className="flex items-center gap-8 text-sm text-neutral-600">
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
              Book a site visit
            </a>
            <button
              type="button"
              onClick={() => setMenu((m) => !m)}
              aria-expanded={menu}
              aria-controls="mobile-menu"
              aria-label={menu ? "Close menu" : "Open menu"}
              className="flex h-10 w-10 flex-col items-center justify-center gap-[6px] rounded-full border border-neutral-300 bg-[var(--page)] lg:hidden"
            >
              <span className="block h-px w-4 bg-neutral-900 transition-transform duration-300" style={{ transform: menu ? "translateY(3.5px) rotate(45deg)" : "" }} />
              <span className="block h-px w-4 bg-neutral-900 transition-transform duration-300" style={{ transform: menu ? "translateY(-3.5px) rotate(-45deg)" : "" }} />
            </button>
          </div>
        </header>

        <MobileMenu open={menu} onClose={() => setMenu(false)} />

        {/* Narrow screens: no room for the corner panel, so the headline sits
            above the card instead. */}
        <div className="pt-1 pb-5 md:hidden" style={reveal(ready, 150)}>
          <h1 className="font-serif text-[clamp(2.25rem,10vw,3rem)] leading-[0.95] tracking-[-0.02em]">
            <Headline />
          </h1>
          <HeroActions className="mt-4" />
        </div>

        {/* The image card, in its final place from the start. It opens out
            from the centre (a scale, not a resize), so nothing reflows. */}
        <div
          className="relative z-20 min-h-[240px] flex-1 overflow-hidden [--tl:28px] md:[--tl:0px]"
          style={{
            // Corners hidden under the cut-out panels are squared off so no
            // anti-aliased arc shows through them.
            borderRadius: `var(--tl) ${RADIUS}px 0 ${RADIUS}px`,
            transform: opened ? "scale(1)" : "scale(0.62)",
            opacity: opened ? 1 : 0,
            transition: [
              `transform ${OPEN_MS}ms ${OPEN_EASE} ${OPEN_DELAY_MS}ms`,
              `opacity 1000ms ease-out ${OPEN_DELAY_MS}ms`,
            ].join(", "),
            willChange: "transform, opacity",
          }}
        >
          {SHOTS.map((item, i) => (
            <div
              key={item.src}
              className="absolute inset-0"
              style={{
                opacity: i === shot ? 1 : 0,
                transition: "opacity 600ms cubic-bezier(0.4, 0, 0.2, 1)",
              }}
              aria-hidden={i !== shot}
            >
              <Image
                ref={i === 0 ? firstImage : undefined}
                src={item.src}
                alt={`${SITE.name}, ${item.label.toLowerCase()} (artist's impression)`}
                fill
                sizes="(min-width: 640px) 90vw, 100vw"
                priority={i === 0}
                loading={i === 0 ? "eager" : "lazy"}
                onLoad={i === 0 ? () => markReady("image") : undefined}
                className="object-cover"
                style={{
                  objectPosition: item.focus,
                  transform: opened ? "scale(1)" : "scale(1.25)",
                  transition: `transform ${OPEN_MS + 1200}ms ${SETTLE} ${OPEN_DELAY_MS}ms`,
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

function MobileMenu({ open, onClose }: { open: boolean; onClose: () => void }) {
  return (
    <div
      id="mobile-menu"
      className="absolute inset-x-3 top-[76px] z-40 overflow-hidden rounded-[22px] border border-neutral-900/10 bg-white shadow-[0_24px_60px_rgb(0_0_0/0.14)] transition-[opacity,transform] duration-300 sm:inset-x-5 lg:hidden"
      style={{
        opacity: open ? 1 : 0,
        transform: open ? "translateY(0)" : "translateY(-8px)",
        pointerEvents: open ? "auto" : "none",
        visibility: open ? "visible" : "hidden",
      }}
    >
      <ul className="divide-y divide-neutral-900/8 px-6 py-2">
        {NAV.map((item) => (
          <li key={item.href}>
            <a href={item.href} onClick={onClose} className="flex items-center justify-between py-4 font-serif text-2xl">
              {item.label}
              <span aria-hidden className="text-base text-neutral-400">&rarr;</span>
            </a>
          </li>
        ))}
      </ul>
      <div className="grid grid-cols-2 gap-2 border-t border-neutral-900/8 p-3">
        <a href="#contact" onClick={onClose} className="rounded-full bg-neutral-900 py-3 text-center text-sm font-medium text-white">
          Book a site visit
        </a>
        <a href={DIRECTIONS_URL} target="_blank" rel="noopener noreferrer" className="rounded-full border border-neutral-900/15 py-3 text-center text-sm font-medium">
          Get directions
        </a>
      </div>
    </div>
  );
}

function Headline() {
  return (
    <>
      Where Udupi <br />
      <span className="italic">meets</span> Manipal
    </>
  );
}

function HeroActions({ className = "" }: { className?: string }) {
  return (
    <div className={`flex flex-wrap items-stretch gap-2 ${className}`}>
      <a
        href={DIRECTIONS_URL}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex flex-1 items-center justify-center gap-2 rounded-full border border-neutral-900 bg-neutral-900 px-3.5 py-2.5 text-[12.5px] font-medium whitespace-nowrap text-white transition-colors hover:bg-neutral-700 md:flex-none md:py-2"
      >
        <PinIcon /> Get directions
      </a>
      <BrochureDownload className="inline-flex flex-1 items-center gap-2 rounded-full border border-neutral-900/20 px-3.5 py-2.5 text-[12.5px] font-medium whitespace-nowrap transition-colors hover:border-neutral-900 hover:bg-white md:flex-none md:py-2" />
    </div>
  );
}

// Wide screens: a compact headline panel cut into the card's top-left
// corner, mirroring the info card. Kept small so the building stays clear.
function TitleCard({ ready }: { ready: boolean }) {
  const curve = `radial-gradient(circle at 100% 100%, transparent ${RADIUS - 0.5}px, var(--page) ${RADIUS}px)`;
  return (
    <div
      className="absolute top-0 left-0 hidden bg-[var(--page)] pr-6 pb-5 md:block"
      style={{ borderBottomRightRadius: RADIUS, ...growFrom("top left", ready, 0) }}
    >
      <span aria-hidden className="absolute top-0 left-[calc(100%-1px)]" style={{ width: RADIUS, height: RADIUS, background: curve }} />
      <span aria-hidden className="absolute top-[calc(100%-1px)] left-0" style={{ width: RADIUS, height: RADIUS, background: curve }} />
      <h1
        className="font-serif text-[clamp(2rem,3.2vw,3.25rem)] leading-[0.95] tracking-[-0.02em]"
        style={reveal(ready, 350)}
      >
        <Headline />
      </h1>
      <div style={reveal(ready, 500)}>
        <HeroActions className="mt-4" />
      </div>
    </div>
  );
}

// Cut into the card's bottom-right corner, in the page colour, with two small
// squares painting the inverse curves where it meets the photo.
function InfoCard({ ready, shot, onStep }: { ready: boolean; shot: number; onStep: (d: number) => void }) {
  const curve = `radial-gradient(circle at 0 0, transparent ${RADIUS - 0.5}px, var(--page) ${RADIUS}px)`;
  return (
    <div
      className="absolute right-0 bottom-0 w-[min(70%,280px)] bg-[var(--page)] pt-3 pl-3 sm:w-[min(34%,320px)] sm:pt-4 sm:pl-4"
      style={{ borderTopLeftRadius: RADIUS, ...growFrom("bottom right", ready, 150) }}
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
        <h2 className="mt-1 font-serif text-lg leading-tight sm:text-[22px]">{SITE.name}</h2>
        <div className="mt-3 flex items-center justify-between gap-3">
          <p className="text-[11px] text-neutral-500">Artist&rsquo;s impression</p>
          <div className="flex items-center gap-1.5">
            <button
              type="button"
              onClick={() => onStep(-1)}
              disabled={!ready}
              aria-label="Previous image"
              className="flex h-9 w-9 items-center justify-center rounded-full border border-neutral-200 text-sm transition-colors hover:bg-neutral-100"
            >
              <span aria-hidden>&larr;</span>
            </button>
            <button
              type="button"
              onClick={() => onStep(1)}
              disabled={!ready}
              aria-label="Next image"
              className="flex h-9 w-9 items-center justify-center rounded-full bg-neutral-900 text-sm text-white transition-colors hover:bg-neutral-700"
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

// Text and controls drift up into place.
function reveal(visible: boolean, delay: number): React.CSSProperties {
  return {
    opacity: visible ? 1 : 0,
    transform: visible ? "translateY(0)" : "translateY(18px)",
    transition: [`opacity 1200ms ease-out ${delay}ms`, `transform 1600ms ${SETTLE} ${delay}ms`].join(", "),
  };
}

// The cut-out panels grow out of their own corner of the photo.
function growFrom(origin: string, visible: boolean, delay: number): React.CSSProperties {
  return {
    transformOrigin: origin,
    opacity: visible ? 1 : 0,
    transform: visible ? "scale(1)" : "scale(0.55)",
    transition: `opacity 1000ms ease-out ${delay}ms, transform 1600ms ${SETTLE} ${delay}ms`,
  };
}
