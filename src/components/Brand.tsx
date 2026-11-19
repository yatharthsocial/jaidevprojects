import Image from "next/image";
import { SITE } from "@/lib/site";

// The company lockup. Uses the logo file from SITE.logo when one is supplied;
// until then the full company name is set in type: JAIDEV over INFRA PROJECT,
// with both lines sharing the same left and right edges.
export default function Brand({
  size = "nav",
  tone = "dark",
  animate = false,
  className = "",
}: {
  size?: "nav" | "splash" | "footer";
  tone?: "dark" | "light";
  // Splash only: letters rise in one by one, then the second line follows.
  animate?: boolean;
  className?: string;
}) {
  const s = SIZES[size];

  if (SITE.logo) {
    return (
      <span
        className={`relative block ${s.logo} ${animate ? "animate-[logo-in_1400ms_cubic-bezier(0.22,1,0.36,1)_both]" : ""} ${className}`}
      >
        <Image
          src={SITE.logo}
          alt={SITE.developer}
          fill
          priority={size !== "footer"}
          className={`object-contain ${size === "splash" ? "object-center" : "object-left"}`}
        />
      </span>
    );
  }

  const ink = tone === "dark" ? "text-neutral-900" : "text-white";
  return (
    <span className={`inline-grid ${ink} ${className}`} aria-label={SITE.developer}>
      <span aria-hidden className={`block font-semibold leading-none uppercase ${s.top}`} style={tracked(s.trackTop)}>
        {animate
          ? "Jaidev".split("").map((ch, i) => (
              <span key={i} className="inline-block overflow-hidden align-top">
                <span
                  className="inline-block animate-[letter-in_900ms_cubic-bezier(0.22,1,0.36,1)_both]"
                  style={{ animationDelay: `${150 + i * 80}ms` }}
                >
                  {ch}
                </span>
              </span>
            ))
          : "Jaidev"}
      </span>
      {/* Letters spread evenly so the line spans exactly the width of JAIDEV:
          INFRA starts under the J and PROJECT ends under the V. */}
      <span
        aria-hidden
        className={`flex justify-between leading-none uppercase ${s.bottom} ${
          animate ? "animate-[fade-up_900ms_ease-out_both] [animation-delay:750ms]" : ""
        }`}
      >
        {"Infra Project".split("").map((ch, i) => (ch === " " ? <span key={i} className="w-[0.5em]" /> : <span key={i}>{ch}</span>))}
      </span>
    </span>
  );
}

// Letter-spacing also adds space after the last letter; pulling it back keeps
// the right edge of JAIDEV true.
const tracked = (em: number): React.CSSProperties => ({ letterSpacing: `${em}em`, marginRight: `-${em}em` });

const SIZES = {
  nav: {
    logo: "h-9 w-40 sm:h-10 sm:w-48",
    top: "text-[20px] sm:text-[22px]",
    trackTop: 0.32,
    bottom: "mt-[7px] text-[9px] font-medium sm:text-[10px]",
  },
  splash: {
    logo: "h-24 w-80 sm:h-32 sm:w-[28rem]",
    top: "text-[40px] sm:text-[60px]",
    trackTop: 0.3,
    bottom: "mt-3 text-[15px] font-medium sm:mt-4 sm:text-[21px]",
  },
  footer: {
    logo: "h-12 w-56",
    top: "text-[26px]",
    trackTop: 0.32,
    bottom: "mt-2 text-[11.5px] font-medium",
  },
} as const;
