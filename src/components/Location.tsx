"use client";

import { useEffect, useRef, useState } from "react";
import Reveal from "@/components/Reveal";

const PAGE = "#ebeae5";

const ADDRESS =
  "K-Indrali Business Square, Udupi-Manipal Hwy, Rudra Priya Nagar, Indrali, Udupi, Karnataka 576102";
const DIRECTIONS = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(ADDRESS)}`;

// Distances from the location page of the brochure.
const PLACES = [
  { name: "Udupi Railway Station", km: 1.6, kind: "Transit", icon: "train" },
  { name: "Kasturba Hospital, Manipal", km: 2, kind: "Healthcare", icon: "hospital" },
  { name: "Sri Krishna Matha Temple", km: 3, kind: "Heritage", icon: "temple" },
  { name: "Udupi Bus Stand", km: 3.3, kind: "Transit", icon: "bus" },
  { name: "Malpe Beach", km: 10, kind: "Leisure", icon: "beach" },
] as const;

const SCALE_KM = 10;
const CYCLE_MS = 3500;

type IconName = (typeof PLACES)[number]["icon"];

// Wide screens pin the section and let scrolling step through the places.
const PIN_QUERY = "(min-width: 1024px) and (min-height: 640px)";

export default function Location() {
  const sectionRef = useRef<HTMLElement>(null);
  const [active, setActive] = useState(0);
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

  const pick = (i: number) => {
    setAuto(false);
    setActive(i);
  };

  return (
    <section
      ref={sectionRef}
      id="location"
      className="text-neutral-900 lg:[@media(min-height:640px)]:h-[350svh]"
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
              href={DIRECTIONS}
              target="_blank"
              rel="noopener noreferrer"
              className="group mt-4 inline-flex items-center gap-2 border-b border-neutral-900/40 pb-1 text-sm font-medium transition-colors hover:border-neutral-900"
            >
              Get directions
              <span aria-hidden className="transition-transform group-hover:translate-x-0.5">
                &rarr;
              </span>
            </a>
          </Reveal>
        </div>

        <Reveal delay={150} className="mt-14 sm:mt-20 lg:mt-[5svh]">
          <div className="rounded-[28px] border border-neutral-900/10 bg-white/70 p-6 sm:p-10 lg:px-12 lg:py-[4.5svh]">
            <div className="grid gap-10 lg:grid-cols-12 lg:gap-12">
              {/* Readout for the selected place */}
              <div className="relative min-h-[220px] lg:col-span-5 lg:min-h-0" aria-live="polite">
                {PLACES.map((p, i) => (
                  <div
                    key={p.name}
                    aria-hidden={i !== active}
                    className="absolute inset-0 flex flex-col justify-between transition-[opacity,transform] duration-700 ease-[cubic-bezier(0.22,1,0.36,1)]"
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
                          width: i === active ? "100%" : "0%",
                          transition:
                            i === active && auto && !pinned ? `width ${CYCLE_MS}ms linear` : "width 400ms ease-out",
                        }}
                      />
                    </button>
                  </li>
                ))}
              </ul>
            </div>

            <DistanceLine active={active} onPick={pick} />
          </div>
        </Reveal>
      </div>
    </section>
  );
}

// Every place plotted to scale along a line from the building, 0 to 10 km.
function DistanceLine({ active, onPick }: { active: number; onPick: (i: number) => void }) {
  const ticks = [0, 2.5, 5, 7.5, 10];
  const pos = (km: number) => `${(km / SCALE_KM) * 100}%`;
  const current = PLACES[active];

  return (
    <div className="mt-12 sm:mt-16 lg:mt-[4svh]">
      <div className="relative mx-2 h-24 sm:mx-4">
        {/* Track and the filled stretch up to the selected place */}
        <div className="absolute top-12 right-0 left-0 h-px bg-neutral-900/15" />
        <div
          className="absolute top-12 left-0 h-[2px] -translate-y-[0.5px] bg-neutral-900 transition-[width] duration-700 ease-[cubic-bezier(0.22,1,0.36,1)]"
          style={{ width: pos(current.km) }}
        />

        {/* Origin */}
        <div className="absolute top-12 left-0 -translate-x-1/2 -translate-y-1/2">
          <span className="block h-4 w-4 rounded-full border-[3px] border-neutral-900 bg-white" />
        </div>
        <span className="absolute top-0 left-0 -translate-x-2 text-[11px] font-medium tracking-[0.18em] whitespace-nowrap uppercase">
          K-Indrali
        </span>

        {/* Places */}
        {PLACES.map((p, i) => (
          <button
            key={p.name}
            type="button"
            onClick={() => onPick(i)}
            aria-label={`${p.name}, ${p.km} km`}
            className="absolute top-12 -translate-x-1/2 -translate-y-1/2 p-2"
            style={{ left: pos(p.km) }}
          >
            <span
              className={`block rounded-full transition-all duration-500 ${
                i === active ? "h-3.5 w-3.5 bg-neutral-900 ring-4 ring-neutral-900/10" : "h-2 w-2 bg-neutral-400"
              }`}
            />
          </button>
        ))}

        {/* Label for the selected place, kept inside the track at the far end */}
        <span
          className="absolute top-0 hidden text-[11px] font-medium tracking-[0.18em] whitespace-nowrap text-neutral-500 uppercase transition-[left] sm:block duration-700 ease-[cubic-bezier(0.22,1,0.36,1)]"
          style={{
            left: pos(current.km),
            transform: current.km > 8 ? "translateX(-100%)" : current.km < 2.5 ? "translateX(-20%)" : "translateX(-50%)",
          }}
        >
          {current.km} km
        </span>

        {/* Scale */}
        {ticks.map((t) => (
          <span
            key={t}
            className="absolute top-[4.25rem] text-[11px] whitespace-nowrap text-neutral-400 tabular-nums"
            style={{ left: pos(t), transform: t === SCALE_KM ? "translateX(-100%)" : "translateX(-50%)" }}
          >
            {t === 0 ? "" : `${t} km`}
          </span>
        ))}
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
