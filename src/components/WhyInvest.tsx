import Reveal from "@/components/Reveal";
import { PinIcon } from "@/components/icons";
import { DIRECTIONS_URL } from "@/lib/site";

const PAGE = "#ebeae5";

// Figures and reasons from the "Why to invest?" and location pages of the
// brochure.
const TRANSIT = [
  { value: "1.6", label: "Udupi Railway Station" },
  { value: "2", label: "Kasturba Hospital, Manipal" },
  { value: "3.3", label: "Udupi Bus Stand" },
];

const REASONS = [
  {
    title: "Steady footfall",
    text: "Hospital visitors, rail passengers and highway traffic pass the door every day.",
  },
  {
    title: "Versatile use",
    text: "Retail, dining, offices and lodging in one building, drawing a wide mix of customers and tenants.",
  },
  {
    title: "Built to last",
    text: "Premium finishes with dependable services, including 24/7 water and generator backup for every unit.",
  },
  {
    title: "Lasting value",
    text: "A modern, Vastu-planned development designed for long-term appreciation and steady rental yields.",
  },
];

export default function WhyInvest() {
  return (
    <section id="invest" className="px-3 pb-3 sm:px-5 sm:pb-5" style={{ background: PAGE }}>
      <div className="rounded-[28px] bg-[#1c1c1a] text-white">
        <div className="mx-auto max-w-[1400px] px-6 py-20 sm:px-10 sm:py-28 lg:px-14">
          <Reveal>
            <p className="text-[11px] font-medium tracking-[0.22em] text-white/60 uppercase">Why invest</p>
          </Reveal>
          <Reveal delay={100}>
            <h2 className="mt-6 max-w-[18ch] font-serif text-[clamp(2.5rem,5.2vw,5rem)] leading-[0.98] tracking-[-0.015em]">
              A prime address, <span className="italic">built</span> for lasting value
            </h2>
          </Reveal>

          <div className="mt-14 grid gap-4 sm:mt-20 lg:grid-cols-12 lg:gap-5">
            {/* Location and transit: a light card so the key figures stand
                out against the dark section. */}
            <Reveal className="lg:col-span-5" delay={150}>
              <div className="flex h-full flex-col rounded-[22px] p-7 text-neutral-900 sm:p-9" style={{ background: PAGE }}>
                <div className="flex items-center justify-between gap-4">
                  <p className="text-[11px] font-semibold tracking-[0.22em] uppercase">Location &amp; transit</p>
                  <span className="rounded-full border border-neutral-900/15 px-3 py-1 text-[11px] font-medium">
                    Udupi-Manipal Hwy
                  </span>
                </div>
                <dl className="mt-8 flex-1 divide-y divide-neutral-900/12">
                  {TRANSIT.map((t) => (
                    <div key={t.label} className="flex items-baseline justify-between gap-6 py-4">
                      <dt className="text-[15px] font-medium">{t.label}</dt>
                      <dd className="font-serif text-[clamp(2.25rem,3.4vw,3rem)] leading-none whitespace-nowrap">
                        {t.value}
                        <span className="ml-1 text-lg text-neutral-500">km</span>
                      </dd>
                    </div>
                  ))}
                </dl>
                <a
                  href={DIRECTIONS_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-6 inline-flex items-center justify-center gap-2 self-start rounded-full bg-neutral-900 px-5 py-3 text-sm font-medium text-white transition-colors hover:bg-neutral-700"
                >
                  <PinIcon /> Get directions
                </a>
              </div>
            </Reveal>

            <ol className="grid gap-4 sm:grid-cols-2 lg:col-span-7 lg:gap-5">
              {REASONS.map((r, i) => (
                <Reveal as="li" key={r.title} delay={200 + i * 70}>
                  <div className="group flex h-full flex-col rounded-[22px] border border-white/15 p-7 transition-colors duration-500 hover:border-white/40 hover:bg-white/[0.04] sm:p-8">
                    <span className="text-sm text-white/50 tabular-nums">{String(i + 1).padStart(2, "0")}</span>
                    <h3 className="mt-10 font-serif text-[clamp(1.75rem,2.4vw,2.25rem)] leading-tight">{r.title}</h3>
                    <p className="mt-3 text-[15px] leading-[1.7] text-white/75">{r.text}</p>
                  </div>
                </Reveal>
              ))}
            </ol>
          </div>
        </div>
      </div>
    </section>
  );
}
