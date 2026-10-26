"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";
import Reveal from "@/components/Reveal";

const PAGE = "#ebeae5";

const THUMBS = [
  { src: "/hero/pic1.jpg", alt: "Lobby" },
  { src: "/hero/pic2.jpg", alt: "Reception" },
  { src: "/hero/pic3.jpg", alt: "Corridor" },
  { src: "/hero/pic4.jpg", alt: "Lodging suite" },
];

const STATS = [
  { value: "G+4", label: "Floors" },
  { value: "2", label: "Basements" },
  { value: "Vastu", label: "Planned" },
];

const FEATURES = [
  {
    icon: "store",
    title: ["Retail", "showrooms"],
    body: "Shopfronts facing the main road between Udupi and Manipal, where passing trade sees you first.",
    href: "#contact",
  },
  {
    icon: "office",
    title: ["Office", "spaces"],
    body: "Workable floors for firms, clinics and studios, with two basements of parking below.",
    href: "#contact",
  },
  {
    icon: "bed",
    title: ["Lodging", "suites"],
    body: "Comfortable rooms for travellers and visitors to Manipal, on the floors above the shops.",
    href: "#contact",
  },
  {
    icon: "check",
    title: ["Approved", "building plan"],
    body: "Planned to Vastu at Indrali, Udupi, with the building plan already approved.",
    href: "#contact",
  },
] as const;

export default function About() {
  const sectionRef = useRef<HTMLElement>(null);
  const thumbRef = useRef<HTMLSpanElement>(null);

  // The vertical rule between the columns tracks how far the page has
  // scrolled through this section.
  useEffect(() => {
    const section = sectionRef.current;
    const thumb = thumbRef.current;
    if (!section || !thumb) return;
    let frame = 0;
    const update = () => {
      frame = 0;
      const rect = section.getBoundingClientRect();
      const range = rect.height - window.innerHeight;
      const p = range > 0 ? Math.min(Math.max(-rect.top / range, 0), 1) : 0;
      thumb.style.transform = `translateY(${p * 300}%)`;
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
  }, []);

  return (
    <section
      ref={sectionRef}
      id="about"
      className="min-h-svh text-neutral-900"
      style={{ background: PAGE }}
    >
      <div className="mx-auto grid max-w-[1400px] gap-14 px-5 py-20 sm:px-8 md:grid-cols-[1fr_auto_minmax(0,500px)] md:gap-12 md:py-0 lg:gap-20">
        {/* Left column, held in view while the cards scroll past */}
        <div className="md:sticky md:top-0 md:flex md:h-svh md:flex-col md:justify-center md:py-20">
          <div>
            <Reveal>
              <p className="text-[11px] font-medium tracking-[0.22em] text-neutral-500 uppercase">
                About Jaidev Infra Project
              </p>
            </Reveal>
            <Reveal delay={100}>
              <h2 className="mt-6 font-serif text-[clamp(2.5rem,5vw,4.75rem)] leading-[0.98] tracking-[-0.015em]">
                Built on trust,
                <br />
                <span className="text-neutral-400">made to</span> last
              </h2>
            </Reveal>
            <Reveal delay={200}>
              <p className="mt-6 max-w-[44ch] text-[15px] leading-[1.7] text-neutral-600">
                We are a young real estate company that cares about quality, honest dealing and
                good design. Our first address, K-Indrali Business Square, puts shops, offices and
                lodging under one roof on the road between Udupi and Manipal.
              </p>
            </Reveal>
          </div>

          <Reveal delay={300} className="mt-14 md:mt-20">
            {/* Overlapping stack; each photo lifts clear of the others on hover. */}
            <ul className="flex items-center">
              {THUMBS.map((t, i) => (
                <li
                  key={t.src}
                  className="relative -ml-4 h-14 w-14 overflow-hidden rounded-full border-[3px] shadow-[0_6px_16px_rgb(0_0_0/0.12)] transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] first:-ml-[3px] z-[var(--z)] hover:z-20 hover:-translate-y-1.5 hover:scale-110"
                  style={{ borderColor: PAGE, ["--z" as string]: THUMBS.length - i }}
                >
                  <Image src={t.src} alt={t.alt} fill sizes="56px" className="object-cover" />
                </li>
              ))}
            </ul>
            <dl className="mt-6 flex gap-10">
              {STATS.map((s) => (
                <div key={s.label}>
                  <dt className="sr-only">{s.label}</dt>
                  <dd className="font-serif text-3xl leading-none">{s.value}</dd>
                  <dd className="mt-2 text-sm text-neutral-500">{s.label}</dd>
                </div>
              ))}
            </dl>
          </Reveal>
        </div>

        {/* Divider and scroll indicator */}
        <div aria-hidden className="hidden md:sticky md:top-0 md:flex md:h-svh md:items-center">
          <span className="relative block h-[44svh] w-px bg-neutral-900/10">
            <span
              ref={thumbRef}
              className="absolute top-0 left-[-1px] h-1/4 w-[3px] rounded-full bg-neutral-900 will-change-transform"
            />
          </span>
        </div>

        {/* Feature list, scrolling with the page */}
        <div className="flex flex-col gap-6 md:py-[24svh]">
          {FEATURES.map((f, i) => (
            <Reveal key={f.icon} delay={i === 0 ? 150 : 0}>
              <FeatureCard {...f} />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

// Card with the icon sitting in a notch at the top left and the arrow in a
// notch at the bottom right, both cut out in the page colour.
function FeatureCard({
  icon,
  title,
  body,
  href,
}: {
  icon: (typeof FEATURES)[number]["icon"];
  title: readonly [string, string];
  body: string;
  href: string;
}) {
  return (
    <a href={href} className="group relative block">
      <div className="rounded-[22px] border border-neutral-900/10 bg-white/70 transition-colors group-hover:bg-white">
        <h3 className="pt-5 pr-6 pl-[84px] text-[19px] leading-snug font-medium tracking-[-0.01em]">
          {title[0]}
          <br />
          <span className="text-neutral-500">{title[1]}</span>
        </h3>
        <p className="mx-6 mt-5 border-t border-neutral-900/10 pt-4 pr-20 pb-6 text-sm leading-relaxed text-neutral-600">
          {body}
        </p>
      </div>

      <span
        className="absolute top-0 left-0 flex h-[68px] w-[68px] items-center justify-center rounded-br-[22px] pt-1 pl-1"
        style={{ background: PAGE }}
      >
        <span className="flex h-12 w-12 items-center justify-center rounded-full bg-neutral-900 text-white">
          <Icon name={icon} />
        </span>
      </span>
      <span
        className="absolute right-0 bottom-0 flex items-center rounded-tl-[20px] pt-2 pl-2"
        style={{ background: PAGE }}
      >
        <span className="flex h-10 w-16 items-center justify-center rounded-full border border-neutral-900/15 bg-white text-neutral-900 transition-all group-hover:bg-neutral-900 group-hover:text-white">
          <svg aria-hidden viewBox="0 0 24 12" className="h-3 w-6" fill="none" stroke="currentColor" strokeWidth="1.4">
            <path d="M0 6h22M17 1l5 5-5 5" />
          </svg>
        </span>
      </span>
    </a>
  );
}

function Icon({ name }: { name: string }) {
  const common = { fill: "none", stroke: "currentColor", strokeWidth: 1.5, strokeLinecap: "round", strokeLinejoin: "round" } as const;
  return (
    <svg aria-hidden viewBox="0 0 24 24" className="h-5 w-5">
      {name === "store" && (
        <g {...common}>
          <path d="M4 10v10h16V10" />
          <path d="M3 10l1.5-5h15L21 10c0 1.4-1.1 2.5-2.5 2.5S16 11.4 16 10c0 1.4-1.1 2.5-2.5 2.5h-3C9.1 12.5 8 11.4 8 10c0 1.4-1.1 2.5-2.5 2.5S3 11.4 3 10z" />
          <path d="M10 20v-4h4v4" />
        </g>
      )}
      {name === "office" && (
        <g {...common}>
          <path d="M5 21V4h9v17M14 9h5v12M3 21h18" />
          <path d="M8 8h3M8 12h3M8 16h3M17 13v.01M17 17v.01" />
        </g>
      )}
      {name === "bed" && (
        <g {...common}>
          <path d="M3 18V7M3 14h18v4M21 14v-2a3 3 0 0 0-3-3h-7v5" />
          <circle cx="7" cy="11" r="1.6" />
        </g>
      )}
      {name === "check" && (
        <g {...common}>
          <circle cx="12" cy="12" r="8.5" />
          <path d="M8.5 12.2l2.4 2.3 4.6-4.8" />
        </g>
      )}
    </svg>
  );
}
