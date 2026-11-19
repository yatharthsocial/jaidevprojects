import Brand from "@/components/Brand";
import { APPROVALS, DIRECTIONS_URL, NAV, SITE, digits, whatsappLink } from "@/lib/site";

const PAGE = "#ebeae5";

const LINKS = [...NAV.slice(0, -1), { label: "Progress", href: "#progress" }, { label: "FAQ", href: "#faq" }];

export default function Footer() {
  const approvals = APPROVALS.filter((a) => a.value);
  return (
    <footer className="overflow-hidden text-neutral-900" style={{ background: PAGE }}>
      <div className="mx-auto max-w-[1400px] px-5 pt-20 sm:px-8 sm:pt-28">
        <div className="grid gap-12 border-t border-neutral-900/15 pt-12 sm:grid-cols-2 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <Brand size="footer" />
            <p className="mt-5 max-w-[34ch] text-[15px] leading-relaxed text-neutral-600">
              Developers of {SITE.name}, Indrali, Udupi.
            </p>
          </div>

          <FooterCol title="Explore" className="lg:col-span-2 lg:col-start-5">
            {LINKS.map((n) => (
              <li key={n.href}>
                <a href={n.href} className="transition-colors hover:text-neutral-900">
                  {n.label}
                </a>
              </li>
            ))}
          </FooterCol>

          <FooterCol title="Contact" className="lg:col-span-3">
            {SITE.phones.map((p) => (
              <li key={p}>
                <a href={`tel:+${digits(p)}`} className="tabular-nums transition-colors hover:text-neutral-900">
                  {p}
                </a>
              </li>
            ))}
            <li>
              <a href={whatsappLink()} target="_blank" rel="noopener noreferrer" className="transition-colors hover:text-neutral-900">
                WhatsApp {SITE.whatsapp}
              </a>
            </li>
            {SITE.email && (
              <li>
                <a href={`mailto:${SITE.email}`} className="transition-colors hover:text-neutral-900">
                  {SITE.email}
                </a>
              </li>
            )}
          </FooterCol>

          <FooterCol title="Address" className="lg:col-span-3">
            <li>{SITE.address.replace(`${SITE.name}, `, "")}</li>
            <li>
              <a
                href={DIRECTIONS_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="font-medium text-neutral-900 underline decoration-neutral-900/30 underline-offset-4 transition-colors hover:decoration-neutral-900"
              >
                Get directions &rarr;
              </a>
            </li>
          </FooterCol>
        </div>

        {/* Statutory details */}
        <div className="mt-14 grid gap-4 border-t border-neutral-900/15 pt-6 text-xs leading-relaxed text-neutral-600 lg:grid-cols-12">
          {approvals.length > 0 && (
            <dl className="flex flex-wrap gap-x-8 gap-y-2 lg:col-span-5">
              {approvals.map((a) => (
                <div key={a.label} className="flex gap-2">
                  <dt>{a.label}:</dt>
                  <dd className="font-medium text-neutral-900">
                    {a.value.startsWith("http") ? (
                      <a href={a.value} target="_blank" rel="noopener noreferrer" className="underline underline-offset-2">
                        {a.value.replace(/^https?:\/\//, "")}
                      </a>
                    ) : (
                      a.value
                    )}
                  </dd>
                </div>
              ))}
            </dl>
          )}
          <p className="lg:col-span-7 lg:text-right">
            Images are artist&rsquo;s impressions for representation only. Plans and specifications are
            subject to the approved drawings and may change.
          </p>
        </div>

        <div className="mt-6 flex flex-wrap items-center justify-between gap-4 pb-10 text-xs text-neutral-500">
          <p>&copy; 2026 {SITE.developer}. All rights reserved.</p>
          <a href="#" className="transition-colors hover:text-neutral-900">
            Back to top &uarr;
          </a>
        </div>
      </div>

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
