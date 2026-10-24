import Reveal from "@/components/Reveal";

const PAGE = "#ebeae5";

// Figures and reasons from the "Why to invest?" page of the brochure.
const DISTANCES = [
  { value: "1.6", unit: "km", label: "Railway station" },
  { value: "2", unit: "km", label: "Kasturba Hospital" },
];

const REASONS = [
  {
    title: "Prime connectivity",
    text: "On the Udupi-Manipal Highway, with steady footfall from the nearby railway station and Kasturba Hospital.",
  },
  {
    title: "Versatile growth",
    text: "Flexible spaces for retail, dining and professional lodging, serving a wide mix of people.",
  },
  {
    title: "Commitment to quality",
    text: "Built with premium materials, including vitrified tile flooring and robust fire safety provisions.",
  },
  {
    title: "Reliable infrastructure",
    text: "24/7 water supply from a well and the municipality, and full generator backup for common areas and units.",
  },
  {
    title: "Sustained asset value",
    text: "A modern development designed for long-term appreciation and consistent rental yields.",
  },
];

export default function WhyInvest() {
  return (
    <section id="invest" className="px-3 pb-3 sm:px-5 sm:pb-5" style={{ background: PAGE }}>
      <div className="rounded-[28px] bg-[#1c1c1a] text-white">
        <div className="mx-auto max-w-[1400px] px-6 py-20 sm:px-10 sm:py-28 lg:px-14">
          <div className="grid gap-12 md:grid-cols-12 md:items-end">
            <div className="md:col-span-8">
              <Reveal>
                <p className="text-[11px] font-medium tracking-[0.22em] text-white/50 uppercase">
                  Why invest
                </p>
              </Reveal>
              <Reveal delay={100}>
                <h2 className="mt-6 font-serif text-[clamp(2.5rem,5.2vw,5rem)] leading-[0.98] tracking-[-0.015em]">
                  Visionary design.
                  <br />
                  <span className="text-white/40 italic">Absolute integrity.</span>
                  <br />
                  Built for the future.
                </h2>
              </Reveal>
            </div>

            {/* Distances */}
            <Reveal className="md:col-span-4" delay={200}>
              <dl className="grid grid-cols-2 gap-6 border-t border-white/15 pt-6">
                {DISTANCES.map((d) => (
                  <div key={d.label}>
                    <dt className="sr-only">{d.label}</dt>
                    <dd className="font-serif text-[clamp(3rem,5vw,4.5rem)] leading-none">
                      {d.value}
                      <span className="ml-1 text-2xl text-white/40">{d.unit}</span>
                    </dd>
                    <dd className="mt-2 text-sm text-white/55">{d.label}</dd>
                  </div>
                ))}
              </dl>
              <p className="mt-6 inline-flex items-center gap-2.5 rounded-full border border-white/15 px-4 py-2 text-[13px] text-white/75">
                <span aria-hidden className="h-1.5 w-1.5 rounded-full bg-white" />
                On the Udupi-Manipal Highway
              </p>
            </Reveal>
          </div>

          {/* Reasons */}
          <ol className="mt-20 border-t border-white/15 sm:mt-28">
            {REASONS.map((r, i) => (
              <Reveal as="li" key={r.title} delay={i * 70}>
                <div className="group grid gap-3 border-b border-white/15 py-8 transition-colors duration-500 hover:bg-white/[0.03] sm:grid-cols-[4.5rem_1fr] md:grid-cols-[6rem_minmax(0,1fr)_minmax(0,1.1fr)] md:items-baseline md:gap-8 md:py-10">
                  <span className="text-sm text-white/40 tabular-nums transition-colors duration-500 group-hover:text-white">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <h3 className="font-serif text-[clamp(1.75rem,2.8vw,2.6rem)] leading-tight transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:translate-x-2">
                    {r.title}
                  </h3>
                  <p className="max-w-[52ch] text-[15px] leading-[1.7] text-white/60 sm:col-start-2 md:col-start-auto">
                    {r.text}
                  </p>
                </div>
              </Reveal>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
