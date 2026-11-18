"use client";

import Image from "next/image";
import { useState } from "react";
import Reveal from "@/components/Reveal";
import { DownloadIcon } from "@/components/icons";
import { APPROVALS, BROCHURE_URL, COMPLETION, LEVELS, enquire } from "@/lib/site";

const PAGE = "#ebeae5";
const RADIUS = 28;

// Index of the first level below ground, for drawing the ground line.
const FIRST_BASEMENT = LEVELS.findIndex((l) => l.name.toLowerCase().includes("basement"));

export default function FloorPlans() {
  const [active, setActive] = useState(2);
  const level = LEVELS[active];

  const facts = [
    { label: "Structure", value: "G+4 with 2 basements" },
    { label: "Planning", value: "Vastu compliant" },
    {
      label: "Expected completion",
      value: COMPLETION.confirmed ? COMPLETION.date : "To be confirmed",
    },
    ...APPROVALS.filter((a) => a.value),
  ];

  return (
    <section id="floor-plans" className="text-neutral-900" style={{ background: PAGE }}>
      <div className="mx-auto max-w-[1400px] px-5 py-24 sm:px-8 sm:py-32">
        <div className="grid gap-8 md:grid-cols-12 md:items-end">
          <div className="md:col-span-7">
            <Reveal>
              <p className="text-[11px] font-medium tracking-[0.22em] text-neutral-500 uppercase">Floor plans</p>
            </Reveal>
            <Reveal delay={100}>
              <h2 className="mt-6 font-serif text-[clamp(2.5rem,5vw,4.75rem)] leading-[0.98] tracking-[-0.015em]">
                Level by level
              </h2>
            </Reveal>
          </div>
          <Reveal className="md:col-span-4 md:col-start-9 md:pb-3" delay={200}>
            <p className="text-[15px] leading-[1.7] text-neutral-600">
              Select a level to see what it is planned for. Detailed drawings are shared with the brochure.
            </p>
          </Reveal>
        </div>

        <Reveal delay={150} className="mt-14 sm:mt-20">
          <div className="grid gap-3 sm:gap-5 lg:grid-cols-12">
            {/* Building section: one bar per level, basements below the
                ground line. */}
            <div
              className="flex flex-col justify-center gap-2 border border-neutral-900/10 bg-white/70 p-6 sm:p-10 lg:col-span-5"
              style={{ borderRadius: RADIUS }}
              role="group"
              aria-label="Levels"
            >
              {LEVELS.map((l, i) => {
                const on = i === active;
                const below = FIRST_BASEMENT !== -1 && i >= FIRST_BASEMENT;
                return (
                  <div key={l.name}>
                    {i === FIRST_BASEMENT && (
                      <div className="my-3 flex items-center gap-3 text-[10px] font-medium tracking-[0.2em] text-neutral-500 uppercase">
                        <span className="h-px flex-1 bg-neutral-900/40" />
                        Ground level
                        <span className="h-px flex-1 bg-neutral-900/40" />
                      </div>
                    )}
                    <button
                      type="button"
                      onClick={() => setActive(i)}
                      onMouseEnter={() => setActive(i)}
                      onFocus={() => setActive(i)}
                      aria-pressed={on}
                      className={`flex items-center justify-between gap-4 rounded-[14px] border px-5 text-left transition-colors duration-300 ${
                        i === 0 ? "mx-auto w-[82%] py-3" : "w-full py-4"
                      } ${
                        on
                          ? "border-neutral-900 bg-neutral-900 text-white"
                          : below
                            ? "border-dashed border-neutral-900/25 bg-transparent text-neutral-700 hover:border-neutral-900"
                            : "border-neutral-900/15 bg-white text-neutral-800 hover:border-neutral-900"
                      }`}
                    >
                      <span className="text-[15px] font-medium">{l.name}</span>
                      <span aria-hidden className={`text-sm ${on ? "text-white" : "text-neutral-400"}`}>
                        &rarr;
                      </span>
                    </button>
                  </div>
                );
              })}
            </div>

            {/* Detail for the selected level */}
            <div
              className="flex flex-col bg-[#1c1c1a] p-7 text-white sm:p-10 lg:col-span-7 lg:p-12"
              style={{ borderRadius: RADIUS }}
              aria-live="polite"
            >
              <p className="text-[11px] font-medium tracking-[0.22em] text-white/60 uppercase">
                Level {active + 1} of {LEVELS.length}
              </p>
              <div key={active} className="animate-[fade-in_500ms_ease-out]">
                <h3 className="mt-5 font-serif text-[clamp(2.25rem,4vw,3.5rem)] leading-[1]">{level.name}</h3>
                <p className="mt-4 max-w-[46ch] text-[17px] leading-[1.6] text-white/80">{level.use}</p>
              </div>

              <div className="relative mt-8 min-h-[220px] flex-1 overflow-hidden rounded-[18px] border border-white/15 bg-white/[0.03]">
                {level.plan ? (
                  <Image
                    src={level.plan}
                    alt={`${level.name} floor plan`}
                    fill
                    sizes="(min-width: 1024px) 50vw, 100vw"
                    className="bg-white object-contain p-4"
                  />
                ) : (
                  <div className="flex h-full min-h-[220px] flex-col items-center justify-center gap-4 p-8 text-center">
                    <PlanIcon />
                    <p className="max-w-[34ch] text-[15px] leading-relaxed text-white/75">
                      The approved drawing for this level is shared on request.
                    </p>
                    <PlanButton />
                  </div>
                )}
              </div>
            </div>
          </div>
        </Reveal>

        {/* Key facts and approvals */}
        <Reveal delay={100} className="mt-3 sm:mt-5">
          <dl
            className="grid grid-cols-2 gap-px overflow-hidden border border-neutral-900/10 bg-neutral-900/10 lg:grid-flow-col lg:auto-cols-fr lg:grid-cols-none"
            style={{ borderRadius: RADIUS }}
          >
            {facts.map((f) => (
              <div key={f.label} className="bg-white/80 px-6 py-6 sm:px-8">
                <dt className="text-[11px] font-medium tracking-[0.18em] text-neutral-500 uppercase">{f.label}</dt>
                <dd className="mt-2 font-serif text-2xl leading-tight">{f.value}</dd>
              </div>
            ))}
          </dl>
        </Reveal>
      </div>
    </section>
  );
}

function PlanButton() {
  const cls =
    "inline-flex items-center gap-2 rounded-full bg-white px-5 py-3 text-sm font-medium text-neutral-900 transition-colors hover:bg-neutral-200";
  if (BROCHURE_URL) {
    return (
      <a href={BROCHURE_URL} download className={cls}>
        <DownloadIcon /> Download brochure
      </a>
    );
  }
  return (
    <button type="button" onClick={() => enquire("Floor plans")} className={cls}>
      <DownloadIcon /> Request floor plans
    </button>
  );
}

function PlanIcon() {
  return (
    <svg aria-hidden viewBox="0 0 48 48" className="h-12 w-12 text-white/60" fill="none" stroke="currentColor" strokeWidth="1.2">
      <rect x="6" y="6" width="36" height="36" rx="2" />
      <path d="M6 22h14v20M20 6v10M28 42V28h14M28 22h14M34 22V6" />
    </svg>
  );
}
