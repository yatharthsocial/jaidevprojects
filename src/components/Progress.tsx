import Image from "next/image";
import Reveal from "@/components/Reveal";
import { WhatsAppIcon } from "@/components/icons";
import { COMPLETION, PROGRESS, whatsappLink } from "@/lib/site";

const PAGE = "#ebeae5";
const RADIUS = 28;

// Construction updates from real site photographs, newest first. Entries live
// in PROGRESS in src/lib/site.ts.
export default function Progress() {
  return (
    <section id="progress" className="text-neutral-900" style={{ background: PAGE }}>
      <div className="mx-auto max-w-[1400px] px-5 py-24 sm:px-8 sm:py-32">
        <div className="grid gap-8 md:grid-cols-12 md:items-end">
          <div className="md:col-span-7">
            <Reveal>
              <p className="text-[11px] font-medium tracking-[0.22em] text-neutral-500 uppercase">Construction progress</p>
            </Reveal>
            <Reveal delay={100}>
              <h2 className="mt-6 font-serif text-[clamp(2.5rem,5vw,4.75rem)] leading-[0.98] tracking-[-0.015em]">
                Straight from <span className="italic">the site</span>
              </h2>
            </Reveal>
          </div>
          <Reveal className="md:col-span-4 md:col-start-9 md:pb-3" delay={200}>
            <p className="text-[15px] leading-[1.7] text-neutral-600">
              Dated photographs from the site as work moves ahead.
            </p>
            <p className="mt-3 inline-flex items-center gap-2 rounded-full border border-neutral-900/15 px-4 py-2 text-[13px] font-medium">
              <span aria-hidden className="h-1.5 w-1.5 rounded-full bg-neutral-900" />
              Expected completion: {COMPLETION.confirmed ? COMPLETION.date : "to be confirmed"}
            </p>
          </Reveal>
        </div>

        {PROGRESS.length > 0 ? (
          <ol className="mt-14 grid gap-4 sm:mt-20 sm:grid-cols-2 md:gap-5 lg:grid-cols-3">
            {PROGRESS.map((u, i) => (
              <Reveal as="li" key={`${u.date}-${u.title}`} delay={(i % 3) * 90}>
                <article className="h-full overflow-hidden border border-neutral-900/10 bg-white/70" style={{ borderRadius: RADIUS }}>
                  <div className="relative aspect-[4/3]">
                    <Image src={u.photo} alt={`${u.title}, site photo, ${u.date}`} fill sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw" className="object-cover" />
                    <span className="absolute top-4 left-4 rounded-full bg-white/90 px-3 py-1 text-[12px] font-medium backdrop-blur">
                      {u.date}
                    </span>
                  </div>
                  <div className="p-6 sm:p-7">
                    <h3 className="font-serif text-2xl leading-tight">{u.title}</h3>
                    <p className="mt-2 text-[15px] leading-relaxed text-neutral-600">{u.note}</p>
                  </div>
                </article>
              </Reveal>
            ))}
          </ol>
        ) : (
          <Reveal delay={150} className="mt-14 sm:mt-20">
            <div
              className="flex flex-col items-start justify-between gap-6 border border-dashed border-neutral-900/25 bg-white/50 p-7 sm:flex-row sm:items-center sm:p-10"
              style={{ borderRadius: RADIUS }}
            >
              <div>
                <p className="font-serif text-[clamp(1.6rem,2.4vw,2.1rem)] leading-tight">The first site update is on its way.</p>
                <p className="mt-2 max-w-[52ch] text-[15px] leading-relaxed text-neutral-600">
                  In the meantime, ask us on WhatsApp for the latest photographs from the site.
                </p>
              </div>
              <a
                href={whatsappLink("Hello, could you share the latest construction photos of K-Indrali Business Square?")}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex shrink-0 items-center gap-2 rounded-full bg-[#1f7a4d] px-5 py-3 text-sm font-medium text-white transition-colors hover:bg-[#186640]"
              >
                <WhatsAppIcon /> Ask for site photos
              </a>
            </div>
          </Reveal>
        )}
      </div>
    </section>
  );
}
