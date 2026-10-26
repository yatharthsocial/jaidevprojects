import { DIRECTIONS_URL, NAV, SITE, digits } from "@/lib/site";

const PAGE = "#ebeae5";

export default function Footer() {
  return (
    <footer className="overflow-hidden text-neutral-900" style={{ background: PAGE }}>
      <div className="mx-auto max-w-[1400px] px-5 pt-20 sm:px-8 sm:pt-28">
        <div className="grid gap-12 border-t border-neutral-900/15 pt-12 sm:grid-cols-2 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <p className="font-serif text-3xl leading-tight">
              Visionary design.
              <br />
              <span className="text-neutral-400 italic">Built for the future.</span>
            </p>
            <a
              href="#contact"
              className="group mt-8 inline-flex items-center gap-3 rounded-full bg-neutral-900 py-2 pr-2 pl-6 text-sm font-medium text-white transition-colors hover:bg-neutral-700"
            >
              Book a site visit
              <span className="flex h-9 w-9 items-center justify-center rounded-full bg-white text-neutral-900 transition-transform duration-500 group-hover:translate-x-0.5">
                <span aria-hidden>&rarr;</span>
              </span>
            </a>
          </div>

          <FooterCol title="Explore" className="lg:col-span-2 lg:col-start-7">
            {NAV.map((n) => (
              <li key={n.href}>
                <a href={n.href} className="transition-colors hover:text-neutral-900">
                  {n.label}
                </a>
              </li>
            ))}
            <li>
              <a href="#faq" className="transition-colors hover:text-neutral-900">
                FAQ
              </a>
            </li>
          </FooterCol>

          <FooterCol title="Contact" className="lg:col-span-2">
            <li>
              <a href={`tel:+${digits(SITE.phone)}`} className="transition-colors hover:text-neutral-900">
                {SITE.phone}
              </a>
            </li>
            <li>
              <a href={`mailto:${SITE.email}`} className="transition-colors hover:text-neutral-900">
                {SITE.email}
              </a>
            </li>
          </FooterCol>

          <FooterCol title="Address" className="lg:col-span-2">
            <li>
              <a href={DIRECTIONS_URL} target="_blank" rel="noopener noreferrer" className="transition-colors hover:text-neutral-900">
                Udupi-Manipal Hwy, Rudra Priya Nagar, Indrali, Udupi, Karnataka 576102
              </a>
            </li>
          </FooterCol>
        </div>

        <div className="mt-16 flex flex-wrap items-center justify-between gap-4 text-xs text-neutral-500">
          <p>
            &copy; 2026 {SITE.developer}. All rights reserved.
          </p>
          <a href="#" className="transition-colors hover:text-neutral-900">
            Back to top &uarr;
          </a>
        </div>
      </div>

      {/* Oversized wordmark, cropped by the page edge */}
      <p
        aria-hidden
        className="mt-6 text-center font-serif text-[27vw] leading-[0.72] tracking-[-0.04em] whitespace-nowrap text-neutral-900/[0.07] select-none"
      >
        K-Indrali
      </p>
    </footer>
  );
}

function FooterCol({
  title,
  className = "",
  children,
}: {
  title: string;
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <div className={className}>
      <p className="text-[11px] font-medium tracking-[0.2em] text-neutral-500 uppercase">{title}</p>
      <ul className="mt-5 space-y-3 text-[15px] leading-relaxed text-neutral-600">{children}</ul>
    </div>
  );
}
