import Image from "next/image";
import { SITE } from "@/lib/site";

// The company lockup. Uses the logo file from SITE.logo when one is supplied;
// until then the full company name is set in type so it is always legible.
export default function Brand({
  size = "nav",
  tone = "dark",
  className = "",
}: {
  size?: "nav" | "splash" | "footer";
  tone?: "dark" | "light";
  className?: string;
}) {
  const s = SIZES[size];

  if (SITE.logo) {
    return (
      <span className={`relative block ${s.logo} ${className}`}>
        <Image src={SITE.logo} alt={SITE.developer} fill priority={size !== "footer"} className="object-contain object-left" />
      </span>
    );
  }

  const ink = tone === "dark" ? "text-neutral-900" : "text-white";
  const rule = `h-px flex-1 ${tone === "dark" ? "bg-neutral-900" : "bg-white"} opacity-50`;
  const centered = size === "splash";
  return (
    <span className={`inline-flex flex-col ${centered ? "items-center" : ""} ${ink} ${className}`} aria-label={SITE.developer}>
      <span aria-hidden className={`font-semibold leading-none uppercase ${s.top}`} style={tracked(s.trackTop)}>
        Jaidev
      </span>
      <span aria-hidden className={`flex items-center self-stretch leading-none uppercase ${s.bottom}`}>
        <span className={rule} />
        <span style={tracked(s.trackBottom)}>Infra Project</span>
        {centered && <span className={rule} />}
      </span>
    </span>
  );
}

// Letter-spacing also adds space after the last letter; pulling it back keeps
// each line optically aligned with the one above.
const tracked = (em: number): React.CSSProperties => ({ letterSpacing: `${em}em`, marginRight: `-${em}em` });

const SIZES = {
  nav: {
    logo: "h-9 w-40 sm:h-10 sm:w-48",
    top: "text-[19px] sm:text-[22px]",
    trackTop: 0.34,
    bottom: "mt-1.5 gap-2 text-[9.5px] font-medium sm:text-[10.5px]",
    trackBottom: 0.3,
  },
  splash: {
    logo: "h-20 w-72 sm:h-24 sm:w-96",
    top: "text-[34px] sm:text-[56px]",
    trackTop: 0.3,
    bottom: "mt-4 gap-4 text-[11px] font-medium sm:text-[14px]",
    trackBottom: 0.4,
  },
  footer: {
    logo: "h-12 w-56",
    top: "text-[26px]",
    trackTop: 0.34,
    bottom: "mt-2 gap-2.5 text-[11px] font-medium",
    trackBottom: 0.34,
  },
} as const;
