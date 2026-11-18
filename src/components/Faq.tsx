"use client";

import { useState } from "react";
import Reveal from "@/components/Reveal";
import { COMPLETION } from "@/lib/site";

const PAGE = "#ebeae5";

// Answers drawn from the K-Indrali brochure.
const FAQS = [
  {
    q: "Where is K-Indrali Business Square?",
    a: "On the Udupi-Manipal Highway at Indrali, Udupi: 1.6 km from Udupi Railway Station and 2 km from Kasturba Hospital, Manipal.",
  },
  {
    q: "What kind of spaces are available?",
    a: "Retail showrooms, cafes and offices on the ground and first floors, and hotel rooms and lodging suites on the second to fourth floors. See Floor plans for every level.",
  },
  {
    q: "Is the building plan approved?",
    a: "Yes. The building plan is approved, and the development is planned to be Vastu compliant.",
  },
  {
    q: "When will the project be completed?",
    a: COMPLETION.confirmed
      ? `Completion is expected by ${COMPLETION.date}. Follow the construction progress section for site updates.`
      : "The completion timeline will be published here once it is confirmed. Our team can give you the latest status.",
  },
  {
    q: "Can I visit the site?",
    a: "Yes. Call or WhatsApp us, or send the form below, and we will arrange a visit.",
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
