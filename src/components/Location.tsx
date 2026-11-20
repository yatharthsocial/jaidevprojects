"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import Reveal from "@/components/Reveal";
import { PinIcon } from "@/components/icons";
import { DIRECTIONS_URL, NEARBY, SITE } from "@/lib/site";

const PAGE = "#ebeae5";

const ADDRESS = SITE.address;

const PLACES = NEARBY;

const SCALE_KM = 10;
const CYCLE_MS = 3500;

type IconName = (typeof PLACES)[number]["icon"];

// Wide screens pin the section and scrolling moves through the places. The
// pinned stretch is kept short (about 40% of a screen per place) and the
// marker on the distance line follows the scroll continuously, so the page
// never feels stuck.
const PIN_QUERY = "(min-width: 1024px) and (min-height: 640px)";

const smooth = (t: number) => t * t * (3 - 2 * t);

export default function Location() {
  const sectionRef = useRef<HTMLElement>(null);
  const [active, setActive] = useState(0);
  // Continuous scroll position through the places, 0 to PLACES.length.
  const [scrollPos, setScrollPos] = useState(0);
  const [pinned, setPinned] = useState(false);
  // Narrow screens cycle on their own until the visitor picks a place.
  const [auto, setAuto] = useState(true);

  useEffect(() => {
    const mq = window.matchMedia(PIN_QUERY);
    const sync = () => setPinned(mq.matches);
    sync();
    mq.addEventListener("change", sync);
    return () => mq.removeEventListener("change", sync);
  }, []);

  // While pinned, scroll position through the section picks the place.
  useEffect(() => {
    const section = sectionRef.current;
    if (!pinned || !section) return;
    let frame = 0;
    const update = () => {
      frame = 0;
      const rect = section.getBoundingClientRect();
      const range = rect.height - window.innerHeight;
      const p = range > 0 ? Math.min(Math.max(-rect.top / range, 0), 0.9999) : 0;
      setScrollPos(p * PLACES.length);
      setActive(Math.floor(p * PLACES.length));
    };
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, [pinned]);

  useEffect(() => {
    if (!auto || pinned) return;
    const t = setTimeout(() => setActive((a) => (a + 1) % PLACES.length), CYCLE_MS);
    return () => clearTimeout(t);
  }, [active, auto, pinned]);

  // Pinned: picking a place scrolls to it, so scroll and selection agree.
  const pick = (i: number) => {
    const section = sectionRef.current;
    if (pinned && section) {
      const range = section.offsetHeight - window.innerHeight;
      const top = section.getBoundingClientRect().top + window.scrollY;
      window.scrollTo({ top: top + ((i + 0.5) / PLACES.length) * range, behavior: "smooth" });
      return;
    }
    setAuto(false);
    setActive(i);
  };

  // Where the marker sits on the distance line. It rests on each place for
  // the middle of its stretch and glides to the next one in between.
  let markerKm: number = PLACES[active].km;
  if (pinned) {
    const t = Math.min(Math.max(scrollPos - 0.5, 0), PLACES.length - 1);
    const i = Math.min(Math.floor(t), PLACES.length - 2);
    const f = smooth(Math.min(Math.max((t - i - 0.3) / 0.4, 0), 1));
    markerKm = PLACES[i].km + (PLACES[i + 1].km - PLACES[i].km) * f;
  }
  // How far through the current place's stretch the scroll is, for the
  // underline on the active row.
  const rowFill = pinned ? Math.min(Math.max(scrollPos - active, 0), 1) : 1;

  return (
    <section
      ref={sectionRef}
      id="location"
      className="text-neutral-900 lg:[@media(min-height:640px)]:h-[300svh]"
      style={{ background: PAGE }}
    >
      <div className="mx-auto max-w-[1400px] px-5 py-24 sm:px-8 sm:py-32 lg:[@media(min-height:640px)]:sticky lg:[@media(min-height:640px)]:top-0 lg:[@media(min-height:640px)]:flex lg:[@media(min-height:640px)]:h-svh lg:[@media(min-height:640px)]:flex-col lg:[@media(min-height:640px)]:justify-center lg:[@media(min-height:640px)]:py-[5svh]">
        <div className="grid gap-8 md:grid-cols-12 md:items-end">
          <div className="md:col-span-7">
            <Reveal>
              <p className="text-[11px] font-medium tracking-[0.22em] text-neutral-500 uppercase">
                Location
              </p>
            </Reveal>
            <Reveal delay={100}>
              <h2 className="mt-6 font-serif text-[clamp(2.5rem,5vw,4.75rem)] leading-[0.98] tracking-[-0.015em] lg:mt-[2.5svh] lg:text-[min(4.6vw,8svh)]">
                Close to everything
                <br />
                <span className="text-neutral-400">that</span> matters
              </h2>
            </Reveal>
          </div>
          <Reveal className="md:col-span-4 md:col-start-9 md:pb-3" delay={200}>
            <p className="text-[15px] leading-[1.7] text-neutral-600">{ADDRESS}</p>
            <a
              href={DIRECTIONS_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="group mt-5 inline-flex items-center gap-3 rounded-full bg-neutral-900 py-2 pr-2 pl-5 text-[15px] font-medium text-white shadow-[0_10px_30px_rgb(0_0_0/0.15)] transition-colors hover:bg-neutral-700"
            >
              <PinIcon className="h-5 w-5" />
              Get directions
              <span className="flex h-10 w-10 items-center justify-center rounded-full bg-white text-neutral-900 transition-transform duration-500 group-hover:translate-x-0.5">
                <span aria-hidden>&rarr;</span>
              </span>
            </a>
          </Reveal>
        </div>

        <Reveal delay={150} className="mt-14 sm:mt-20 lg:mt-[5svh]">
          <div className="rounded-[28px] border border-neutral-900/10 bg-white/70 p-6 sm:p-10 lg:px-12 lg:py-[4.5svh]">
            <div className="grid gap-6 sm:gap-10 lg:grid-cols-12 lg:gap-12">
              {/* Readout for the selected place */}
              <div className="relative min-h-[196px] sm:min-h-[220px] lg:col-span-5 lg:min-h-0" aria-live="polite">
                {PLACES.map((p, i) => (
                  <div
                    key={p.name}
                    aria-hidden={i !== active}
                    className="absolute inset-0 flex flex-col justify-start gap-6 lg:gap-[3svh] transition-[opacity,transform] duration-700 ease-[cubic-bezier(0.22,1,0.36,1)]"
                    style={{
                      opacity: i === active ? 1 : 0,
                      transform: i === active ? "translateY(0)" : "translateY(12px)",
                    }}
                  >
                    <div className="flex items-center gap-3">
                      <span className="flex h-11 w-11 items-center justify-center rounded-full bg-neutral-900 text-white">
                        <Icon name={p.icon} />
                      </span>
                      <span className="text-[11px] font-medium tracking-[0.2em] text-neutral-500 uppercase">
                        {p.kind}
                      </span>
                    </div>
                    <div>
                      <p className="font-serif text-[clamp(5rem,11vw,9.5rem)] leading-[0.85] tracking-[-0.02em] lg:text-[min(10vw,17svh)]">
                        {p.km}
                        <span className="ml-2 text-[0.35em] text-neutral-400">km</span>
                      </p>
                      <p className="mt-4 font-serif text-[clamp(1.5rem,2.4vw,2.25rem)] leading-tight">
                        {p.name}
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Place list */}
              <ul className="lg:col-span-7">
                {PLACES.map((p, i) => (
                  <li key={p.name}>
                    <button
                      type="button"
                      onMouseEnter={() => pick(i)}
                      onFocus={() => pick(i)}
                      onClick={() => pick(i)}
                      aria-pressed={i === active}
                      className="group relative flex w-full items-center gap-4 border-b border-neutral-900/10 py-5 text-left sm:gap-6 lg:py-[1.7svh]"
                    >
                      <span
                        className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-full border transition-colors duration-500 ${
                          i === active
                            ? "border-neutral-900 bg-neutral-900 text-white"
                            : "border-neutral-900/15 text-neutral-700 group-hover:border-neutral-900"
                        }`}
                      >
                        <Icon name={p.icon} />
                      </span>
                      <span
                        className={`flex-1 text-[17px] transition-colors duration-500 sm:text-lg ${
                          i === active ? "text-neutral-900" : "text-neutral-500"
                        }`}
                      >
                        {p.name}
                      </span>
                      <span
                        className={`font-serif text-2xl tabular-nums transition-colors duration-500 ${
                          i === active ? "text-neutral-900" : "text-neutral-400"
                        }`}
                      >
                        {p.km} km
                      </span>
                      {/* Progress through the auto cycle */}
                      <span
                        aria-hidden
                        className="absolute bottom-[-1px] left-0 h-px bg-neutral-900"
                        style={{
                          width: i === active ? `${rowFill * 100}%` : "0%",
                          transition: pinned
                            ? "width 120ms linear"
                            : i === active && auto
                              ? `width ${CYCLE_MS}ms linear`
                              : "width 400ms ease-out",
                        }}
                      />
                    </button>
                  </li>
                ))}
              </ul>
            </div>

            <DistanceLine active={active} markerKm={markerKm} pinned={pinned} onPick={pick} />
          </div>
        </Reveal>
      </div>
    </section>
  );
}

// Every place plotted to scale along a line from the building, 0 to 10 km.
// Line y-position inside the track; stickers rise from just above it.
const LINE_Y = 150;

function DistanceLine({
  active,
  markerKm,
  pinned,
  onPick,
}: {
  active: number;
  markerKm: number;
  pinned: boolean;
  onPick: (i: number) => void;
}) {
  const ticks = [0, 2.5, 5, 7.5, 10];
  const pos = (km: number) => `${(km / SCALE_KM) * 100}%`;
  // Scroll drives the motion directly when pinned; otherwise ease between places.
  const glide = pinned ? "" : "transition-[width] duration-700 ease-[cubic-bezier(0.22,1,0.36,1)]";
  // The checkpoint the marker is resting on. While pinned the marker only
  // rests exactly on a place between glides, so the sticker shows on arrival
  // and tucks away as soon as the marker moves on.
  const arrived = pinned ? PLACES.findIndex((p) => Math.abs(p.km - markerKm) < 0.01) : active;

  return (
    <div className="mt-6 sm:mt-8 lg:mt-0">
      <div className="relative mx-2 sm:mx-4" style={{ height: LINE_Y + 36 }}>
        {/* Track and the filled stretch up to the marker */}
        <div className="absolute right-0 left-0 h-px bg-neutral-900/15" style={{ top: LINE_Y }} />
        <div
          className={`absolute left-0 h-[2px] -translate-y-[0.5px] bg-neutral-900 ${glide}`}
          style={{ top: LINE_Y, width: pos(markerKm) }}
        />

        {/* Origin */}
        <div className="absolute left-0 -translate-x-1/2 -translate-y-1/2" style={{ top: LINE_Y }}>
          <span className="block h-4 w-4 rounded-full border-[3px] border-neutral-900 bg-white" />
        </div>

        {/* Checkpoints */}
        {PLACES.map((p, i) => (
          <button
            key={p.name}
            type="button"
            onClick={() => onPick(i)}
            aria-label={`${p.name}, ${p.km} km`}
            className="absolute -translate-x-1/2 -translate-y-1/2 p-2"
            style={{ top: LINE_Y, left: pos(p.km) }}
          >
            {/* A soft ring pulses out once when the marker arrives */}
            {i === arrived && (
              <span
                aria-hidden
                className="absolute inset-0 m-auto h-3.5 w-3.5 animate-[checkpoint-pulse_900ms_ease-out_both] rounded-full bg-neutral-900"
              />
            )}
            <span
              className={`relative block rounded-full transition-all duration-500 ${
                i <= Math.max(arrived, 0) && arrived !== -1 ? "h-2.5 w-2.5 bg-neutral-900" : "h-2 w-2 bg-neutral-400"
              }`}
            />
          </button>
        ))}

        {/* Marker that travels along the line with the scroll */}
        <span
          aria-hidden
          className={`absolute z-10 h-5 w-5 -translate-x-1/2 -translate-y-1/2 rounded-full border-[3px] border-white bg-neutral-900 shadow-[0_0_0_6px_rgb(23_23_23/0.08)] ${glide.replace("width", "left")}`}
          style={{ top: LINE_Y, left: pos(markerKm) }}
        />

        {/* Stickers: one per checkpoint, popping up when the marker arrives */}
        {PLACES.map((p, i) => (
          <Sticker key={p.name} place={p} index={i} shown={i === arrived} left={pos(p.km)} />
        ))}

        {/* Scale, with the origin named under its dot */}
        <span
          className="absolute left-0 -translate-x-2 text-[11px] font-medium tracking-[0.18em] whitespace-nowrap uppercase"
          style={{ top: LINE_Y + 20 }}
        >
          K-Indrali
        </span>
        {ticks.slice(1).map((t) => (
          <span
            key={t}
            // The quarter marks crowd the origin label on phones, so only
            // 5 and 10 km show there.
            className={`absolute text-[11px] whitespace-nowrap text-neutral-400 tabular-nums ${t === 5 || t === SCALE_KM ? "" : "hidden sm:block"}`}
            style={{ top: LINE_Y + 20, left: pos(t), transform: t === SCALE_KM ? "translateX(-100%)" : "translateX(-50%)" }}
          >
            {t} km
          </span>
        ))}
      </div>
    </div>
  );
}

// Real die-cut stickers of each landmark (cut out from src/LEISURE), with
// their natural sizes for next/image.
const STICKERS: Record<IconName, { src: string; w: number; h: number }> = {
  train: { src: "/landmarks/train.webp", w: 520, h: 485 },
  hospital: { src: "/landmarks/hospital.webp", w: 520, h: 366 },
  temple: { src: "/landmarks/temple.webp", w: 520, h: 391 },
  bus: { src: "/landmarks/bus.webp", w: 520, h: 274 },
  beach: { src: "/landmarks/beach.webp", w: 520, h: 482 },
};

// The landmark's sticker, stuck above its checkpoint. It eases up out of the
// dot (rise, grow and a turn settling to a slight tilt) on a long, soft curve
// with no bounce, and slips away gently when the marker moves on.
const TILT = [-4, 3, -3, 4, -3];

function Sticker({
  place,
  index,
  shown,
  left,
}: {
  place: (typeof PLACES)[number];
  index: number;
  shown: boolean;
  left: string;
}) {
  const art = STICKERS[place.icon];
  // Keep the sticker inside the track near either end.
  const anchor = place.km >= 8 ? 85 : place.km <= 1 ? 15 : 50;
  const tilt = TILT[index % TILT.length];
  return (
    <div
      aria-hidden={!shown}
      className="pointer-events-none absolute z-20"
      style={{ left, top: LINE_Y - 16, transform: `translate(-${anchor}%, -100%)` }}
    >
      <div
        style={{
          transformOrigin: `${anchor}% 100%`,
          opacity: shown ? 1 : 0,
          transform: shown
            ? `translate3d(0, 0, 0) scale(1) rotate(${tilt}deg)`
            : `translate3d(0, 26px, 0) scale(0.82) rotate(${tilt * 3}deg)`,
          transition: shown
            ? "transform 1100ms cubic-bezier(0.16, 1, 0.3, 1), opacity 600ms cubic-bezier(0.16, 1, 0.3, 1)"
            : "transform 520ms cubic-bezier(0.65, 0, 0.35, 1), opacity 420ms cubic-bezier(0.65, 0, 0.35, 1)",
          willChange: "transform, opacity",
        }}
      >
        <Image
          src={art.src}
          alt=""
          width={art.w}
          height={art.h}
          sizes="(min-width: 640px) 210px, 150px"
          loading="eager"
          className="h-auto max-h-[112px] w-auto max-w-[150px] drop-shadow-[0_12px_18px_rgb(0_0_0/0.18)] sm:max-h-[150px] sm:max-w-[210px]"
        />
      </div>
    </div>
  );
}

const stroke = {
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.5,
  strokeLinecap: "round",
  strokeLinejoin: "round",
} as const;

function Icon({ name }: { name: IconName }) {
  return (
    <svg aria-hidden viewBox="0 0 24 24" className="h-5 w-5">
      <g {...stroke}>
        {name === "train" && (
          <>
            <rect x="6" y="3" width="12" height="14" rx="3" />
            <path d="M6 10h12M9 14h.01M15 14h.01M8.5 21l1.5-4M15.5 21L14 17" />
          </>
        )}
        {name === "hospital" && (
          <>
            <path d="M4 21V7h16v14M2.5 21h19" />
            <path d="M12 9.5v5M9.5 12h5M10 21v-3h4v3" />
          </>
        )}
        {name === "temple" && (
          <>
            <path d="M12 2.5v2.5M8 9l4-4 4 4M6.5 13l1.5-4h8l1.5 4M4.5 21l2-8h11l2 8z" />
            <path d="M10.5 21v-3.5h3V21" />
          </>
        )}
        {name === "bus" && (
          <>
            <rect x="4" y="4" width="16" height="13" rx="2.5" />
            <path d="M4 11h16M7.5 14h.01M16.5 14h.01M7 17v2.5M17 17v2.5" />
          </>
        )}
        {name === "beach" && (
          <>
            <path d="M4 11a8 8 0 0 1 16 0z" />
            <path d="M12 11v8M3 20c1.5 0 1.5-1 3-1s1.5 1 3 1 1.5-1 3-1 1.5 1 3 1 1.5-1 3-1 1.5 1 3 1" />
          </>
        )}
      </g>
    </svg>
  );
}
