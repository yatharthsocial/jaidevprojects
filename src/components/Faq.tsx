"use client";

import { useState } from "react";
import Reveal from "@/components/Reveal";
import { SITE } from "@/lib/site";

const PAGE = "#ebeae5";

// Answers drawn from the K-Indrali brochure.
const FAQS = [
  {
    q: "Where is K-Indrali Business Square?",
    a: `On the Udupi-Manipal Highway at ${SITE.address.replace("K-Indrali Business Square, ", "")}. Udupi Railway Station is 1.6 km away and Kasturba Hospital, Manipal is 2 km away.`,
  },
  {
    q: "What kind of spaces are available?",
    a: "Retail showrooms, professional office spaces and lodging suites. The ground and first floors are designed for showrooms, cafes and offices, and the second to fourth floors for boutique hotel rooms and premium lodging suites.",
  },
  {
    q: "What is on each level?",
    a: "Lower basement: secure parking for owners and visitors. Upper basement: parking with convenience shops. Ground and first floor: retail showrooms, cafes and offices. Second to fourth floor: hotel rooms and lodging suites. Rooftop: a space for a signature lounge or rooftop restaurant with city views.",
  },
  {
    q: "Is the building plan approved?",
    a: "Yes. K-Indrali Business Square has an approved building plan.",
  },
  {
    q: "Is the project Vastu compliant?",
    a: "Yes. The development is planned to be Vastu compliant.",
  },
  {
    q: "What amenities are included?",
    a: "Generator backup for common areas and units, car parking, fire safety provisions, 24/7 water supply (well and municipality), vitrified tile flooring, a passenger lift, rainwater harvesting, a spacious lobby, CCTV surveillance and a sewage treatment plant.",
  },
  {
    q: "Can I visit the site?",
    a: "Yes. Send us your details using the form below and our team will get in touch to arrange a visit.",
  },
];

export default function Faq() {
  const [open, setOpen] = useState(0);

  return (
    <section id="faq" className="text-neutral-900" style={{ background: PAGE }}>
      <div className="mx-auto grid max-w-[1400px] gap-12 px-5 py-24 sm:px-8 sm:py-32 md:grid-cols-12 md:gap-8">
        <div className="md:col-span-4">
          <div className="md:sticky md:top-24">
            <Reveal>
              <p className="text-[11px] font-medium tracking-[0.22em] text-neutral-500 uppercase">FAQ</p>
            </Reveal>
            <Reveal delay={100}>
              <h2 className="mt-6 font-serif text-[clamp(2.5rem,4.6vw,4.5rem)] leading-[0.98] tracking-[-0.015em]">
                Questions,
                <br />
                <span className="text-neutral-400">answered</span>
              </h2>
            </Reveal>
            <Reveal delay={200}>
              <p className="mt-6 max-w-[34ch] text-[15px] leading-[1.7] text-neutral-600">
                Something else you would like to know? Our team is happy to help.
              </p>
              <a
                href="#contact"
                className="group mt-6 inline-flex items-center gap-2 rounded-full bg-neutral-900 px-5 py-2.5 text-sm font-medium text-white transition-colors hover:bg-neutral-700"
              >
                Ask a question
                <span aria-hidden className="transition-transform group-hover:translate-x-0.5">
                  &rarr;
                </span>
              </a>
            </Reveal>
          </div>
        </div>

        <ul className="border-t border-neutral-900/15 md:col-span-7 md:col-start-6">
          {FAQS.map((f, i) => {
            const isOpen = open === i;
            return (
              <Reveal as="li" key={f.q} delay={i * 50} className="border-b border-neutral-900/15">
                <button
                  type="button"
                  onClick={() => setOpen(isOpen ? -1 : i)}
                  aria-expanded={isOpen}
                  aria-controls={`faq-${i}`}
                  className="group flex w-full items-center gap-6 py-6 text-left sm:py-7"
                >
                  <span className="w-8 shrink-0 text-xs text-neutral-400 tabular-nums">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <span
                    className={`flex-1 font-serif text-[clamp(1.35rem,2.1vw,1.85rem)] leading-snug transition-colors duration-300 ${
                      isOpen ? "text-neutral-900" : "text-neutral-700 group-hover:text-neutral-900"
                    }`}
                  >
                    {f.q}
                  </span>
                  <span
                    aria-hidden
                    className={`relative flex h-10 w-10 shrink-0 items-center justify-center rounded-full border transition-colors duration-500 ${
                      isOpen ? "border-neutral-900 bg-neutral-900 text-white" : "border-neutral-900/15 group-hover:border-neutral-900"
                    }`}
                  >
                    <span className="absolute h-px w-3.5 bg-current" />
                    <span
                      className="absolute h-3.5 w-px bg-current transition-transform duration-500"
                      style={{ transform: isOpen ? "scaleY(0)" : "scaleY(1)" }}
                    />
                  </span>
                </button>
                {/* Grid-row trick animates to the content's natural height. */}
                <div
                  id={`faq-${i}`}
                  className="grid transition-[grid-template-rows] duration-500 ease-[cubic-bezier(0.22,1,0.36,1)]"
                  style={{ gridTemplateRows: isOpen ? "1fr" : "0fr" }}
                >
                  <div className="overflow-hidden">
                    <p
                      className="max-w-[60ch] pr-16 pb-7 pl-14 text-[15px] leading-[1.75] text-neutral-600 transition-opacity duration-500"
                      style={{ opacity: isOpen ? 1 : 0 }}
                    >
                      {f.a}
                    </p>
                  </div>
                </div>
              </Reveal>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
