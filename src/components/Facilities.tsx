"use client";

import Image from "next/image";
import { useState } from "react";
import Reveal from "@/components/Reveal";

const PAGE = "#ebeae5";
// Matches the hero card so the cut-out corners read as one system.
const RADIUS = 28;

// Exactly as listed on the amenities page of the K-Indrali brochure. Every
// amenity shows a project render; where the render does not literally show
// that amenity it is marked as representative. Swap in real photos as they
// become available and drop the flag.
const AMENITIES = [
  { icon: "power", label: "Generator backup", note: "For common areas and every unit.", photo: "/hero/final.jpg", focus: "45% 45%", representative: true },
  { icon: "parking", label: "Car parking", note: "Two basement levels for owners and visitors.", photo: "/hero/final.jpg", focus: "8% 85%" },
  { icon: "fire", label: "Fire safety provisions", note: "Fire safety systems throughout the building.", photo: "/hero/pic3.jpg", focus: "50% 40%", representative: true },
  { icon: "drop", label: "24/7 water supply", note: "From a well and the municipal supply.", photo: "/hero/final.jpg", focus: "40% 20%", representative: true },
  { icon: "tiles", label: "Vitrified tile flooring", note: "Durable, easy-care floors across the building.", photo: "/hero/pic3.jpg", focus: "50% 90%" },
  { icon: "lift", label: "Passenger lift", note: "Lift access to every floor.", photo: "/hero/pic1.jpg", focus: "25% 50%" },
  { icon: "rain", label: "Rainwater harvesting", note: "Rainwater collected and put back to use.", photo: "/hero/final.jpg", focus: "55% 8%", representative: true },
  { icon: "lobby", label: "Spacious lobby", note: "A generous, welcoming entrance.", photo: "/hero/pic1.jpg", focus: "50% 50%" },
  { icon: "cctv", label: "CCTV surveillance", note: "Camera coverage of common areas.", photo: "/hero/pic2.jpg", focus: "50% 50%", representative: true },
  { icon: "stp", label: "Sewage treatment plant", note: "On-site treatment of wastewater.", photo: "/hero/final.jpg", focus: "60% 95%", representative: true },
] satisfies Amenity[];

type Amenity = {
  icon: IconName;
  label: string;
  note: string;
  photo: string;
  focus: string;
  representative?: boolean;
};
type IconName = "power" | "parking" | "fire" | "drop" | "tiles" | "lift" | "rain" | "lobby" | "cctv" | "stp";

const LOBBY = 7;

export default function Facilities() {
  const [active, setActive] = useState(LOBBY);

  return (
    <section id="amenities" className="text-neutral-900" style={{ background: PAGE }}>
      <div className="mx-auto max-w-[1400px] px-5 py-24 sm:px-8 sm:py-32">
        <Reveal>
          <div className="flex items-center gap-6">
            <h2 className="font-serif text-[clamp(2.5rem,5vw,4.75rem)] leading-none tracking-[-0.015em]">
              Amenities
            </h2>
            <span aria-hidden className="mt-3 h-px flex-1 bg-neutral-900/20" />
          </div>
        </Reveal>

        <div className="mt-14 grid gap-10 sm:mt-20 md:grid-cols-12 md:gap-8">
          <Reveal className="h-[340px] sm:h-[460px] md:col-span-5 md:h-auto md:min-h-[560px]">
            <Preview active={active} />
          </Reveal>

          <ul className="grid content-center sm:grid-cols-2 sm:gap-x-8 md:col-span-7">
            {AMENITIES.map((a, i) => (
              <Reveal as="li" key={a.icon} delay={(i % 2) * 80 + Math.floor(i / 2) * 60}>
                <button
                  type="button"
                  onMouseEnter={() => setActive(i)}
                  onFocus={() => setActive(i)}
                  onClick={() => setActive(i)}
                  aria-pressed={active === i}
                  className="group flex w-full items-center gap-5 border-b border-neutral-900/12 py-6 text-left"
                >
                  <span
                    className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-full border transition-colors duration-500 ${
                      active === i
                        ? "border-neutral-900 bg-neutral-900 text-white"
                        : "border-neutral-900/15 bg-white/60 group-hover:border-neutral-900"
                    }`}
                  >
                    <Icon name={a.icon} />
                  </span>
                  <span
                    className={`text-[17px] leading-snug transition-colors duration-500 ${
                      active === i ? "text-neutral-900" : "text-neutral-600"
                    }`}
                  >
                    {a.label}
                  </span>
                </button>
              </Reveal>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}

// Left-hand panel. Every amenity has its own layer (render, icon badge and
// caption) and the active one cross-fades in over the rest. The caption sits
// in a tab cut into the bottom-left corner, the same treatment as the hero.
function Preview({ active }: { active: number }) {
  const curve = `radial-gradient(circle at 100% 0, transparent 19.5px, ${PAGE} 20px)`;
  const current: Amenity = AMENITIES[active];
  return (
    <div className="relative h-full overflow-hidden bg-[#1c1c1a]" style={{ borderRadius: RADIUS }}>
      {AMENITIES.map((a: Amenity, i) => (
        <div
          key={a.label}
          aria-hidden={i !== active}
          className="absolute inset-0 transition-[opacity,transform] duration-700 ease-[cubic-bezier(0.22,1,0.36,1)]"
          style={{ opacity: i === active ? 1 : 0, transform: i === active ? "scale(1)" : "scale(1.04)" }}
        >
          <Image
            src={a.photo}
            alt=""
            fill
            sizes="(min-width: 768px) 40vw, 100vw"
            className="object-cover"
            style={{ objectPosition: a.focus }}
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/45 via-black/5 to-black/10" />
          <span className="absolute top-5 left-5 flex h-14 w-14 items-center justify-center rounded-full bg-white text-neutral-900 shadow-[0_8px_24px_rgb(0_0_0/0.18)]">
            <Icon name={a.icon} className="h-6 w-6" />
          </span>
          {a.representative && (
            <span className="absolute top-6 right-5 rounded-full bg-black/45 px-3 py-1 text-[10px] font-medium tracking-[0.14em] text-white uppercase backdrop-blur">
              Representative image
            </span>
          )}
        </div>
      ))}

      <div
        className="absolute bottom-0 left-0 max-w-[88%] pt-2.5 pr-2.5"
        style={{ background: PAGE, borderTopRightRadius: 20 }}
      >
        <span aria-hidden className="absolute bottom-[calc(100%-1px)] left-0" style={{ width: 20, height: 20, background: curve }} />
        <span aria-hidden className="absolute bottom-0 left-[calc(100%-1px)]" style={{ width: 20, height: 20, background: curve }} />
        <div key={active} className="animate-[fade-in_500ms_ease-out] rounded-[14px] bg-white px-5 py-3">
          <p className="font-serif text-xl leading-tight">{current.label}</p>
          <p className="mt-0.5 text-[13px] text-neutral-600">{current.note}</p>
        </div>
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

function Icon({
  name,
  className = "h-5 w-5",
  strokeWidth = 1.5,
}: {
  name: IconName;
  className?: string;
  strokeWidth?: number;
}) {
  return (
    <svg aria-hidden viewBox="0 0 24 24" className={className}>
      <g {...stroke} strokeWidth={strokeWidth}>
        {name === "parking" && (
          <>
            <rect x="4" y="3.5" width="16" height="17" rx="3" />
            <path d="M10 16.5v-9h3a2.75 2.75 0 0 1 0 5.5h-3" />
          </>
        )}
        {name === "drop" && <path d="M12 3.5c3.5 4.2 6 7.6 6 10.6a6 6 0 0 1-12 0c0-3 2.5-6.4 6-10.6z" />}
        {name === "lift" && (
          <>
            <rect x="4" y="3.5" width="16" height="17" rx="2" />
            <path d="M12 3.5v17M8 9.5l-1.5-2-1.5 2M16 7.5l1.5 2 1.5-2" />
          </>
        )}
        {name === "power" && <path d="M13 2.5L5.5 13.5H12l-1 8 7.5-11H12z" />}
        {name === "fire" && (
          <path d="M12 21a6 6 0 0 0 6-6c0-3.5-2.5-5.5-3.5-8.5-1 2-2 3-3.5 3.5C11 7 10.5 5 9.5 3c-.5 3.5-3.5 6-3.5 12a6 6 0 0 0 6 6z" />
        )}
        {name === "cctv" && (
          <>
            <path d="M3.5 8.5l13-4 2 6-13 4z" />
            <path d="M14.5 12.2l1.3 3.8h3.7M5.5 14.5v5M3 19.5h5" />
          </>
        )}
        {name === "rain" && (
          <>
            <path d="M7 12.5a4 4 0 0 1 .5-8 5 5 0 0 1 9.5 1.5 3.3 3.3 0 0 1 0 6.5z" />
            <path d="M8 15.5l-1 2.5M12 15.5l-1 2.5M16 15.5l-1 2.5M10 19.5l-.6 1.5M14 19.5l-.6 1.5" />
          </>
        )}
        {name === "stp" && (
          <>
            <path d="M4 9.5h16l-1.5 10h-13z" />
            <path d="M6.5 13.5c1.5-1 2.5 1 4 0s2.5 1 4 0 2.5 1 3 0M9 6.5l1-3M14 6.5l1-3" />
          </>
        )}
        {name === "lobby" && (
          <>
            <path d="M4 18.5v-5a2 2 0 0 1 4 0v1h8v-1a2 2 0 0 1 4 0v5z" />
            <path d="M6 11.5v-3a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v3M6 18.5v2M18 18.5v2" />
          </>
        )}
        {name === "tiles" && (
          <>
            <path d="M12 3.5l8.5 5-8.5 5-8.5-5z" />
            <path d="M3.5 13l8.5 5 8.5-5M7.75 6l8.5 5M16.25 6l-8.5 5" />
          </>
        )}
      </g>
    </svg>
  );
}
