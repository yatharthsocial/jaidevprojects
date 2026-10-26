"use client";

import { useState } from "react";
import Reveal from "@/components/Reveal";
import { DIRECTIONS_URL, SITE, digits, hasRealNumber } from "@/lib/site";

const PAGE = "#ebeae5";
const RADIUS = 28;

const INTERESTS = ["Retail showroom", "Office space", "Lodging suite", "Investment"];

export default function Contact() {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [interest, setInterest] = useState(INTERESTS[0]);
  const [message, setMessage] = useState("");
  const [note, setNote] = useState("");

  // Sends the enquiry to the sales team on WhatsApp, prefilled, so no
  // backend is needed.
  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!hasRealNumber(SITE.whatsapp)) {
      setNote("The sales WhatsApp number has not been set up yet.");
      return;
    }
    const text = [
      `Hello, I'm interested in ${SITE.name}.`,
      `Name: ${name}`,
      `Phone: ${phone}`,
      `Interested in: ${interest}`,
      message && `Message: ${message}`,
    ]
      .filter(Boolean)
      .join("\n");
    window.open(`https://wa.me/${digits(SITE.whatsapp)}?text=${encodeURIComponent(text)}`, "_blank", "noopener");
    setNote("Opening WhatsApp with your details. Just press send.");
  };

  return (
    <section id="contact" className="px-3 pb-3 sm:px-5 sm:pb-5" style={{ background: PAGE }}>
      <div className="mx-auto grid max-w-[1400px] gap-3 pt-12 sm:gap-5 sm:pt-20 lg:grid-cols-12">
        {/* Details */}
        <Reveal className="lg:col-span-5">
          <div className="flex h-full flex-col justify-between gap-14 bg-[#1c1c1a] p-7 text-white sm:p-10 lg:p-12" style={{ borderRadius: RADIUS }}>
            <div>
              <p className="text-[11px] font-medium tracking-[0.22em] text-white/50 uppercase">Contact</p>
              <h2 className="mt-6 font-serif text-[clamp(2.5rem,4.6vw,4.5rem)] leading-[0.98] tracking-[-0.015em]">
                Book a
                <br />
                <span className="text-white/40 italic">site</span> visit
              </h2>
              <p className="mt-6 max-w-[36ch] text-[15px] leading-[1.7] text-white/60">
                Tell us what you are looking for and our team will get back to you with availability
                and a time to walk the site.
              </p>
            </div>

            <dl className="divide-y divide-white/10 border-y border-white/10">
              <Detail label="Call">
                <a href={`tel:+${digits(SITE.phone)}`} className="transition-colors hover:text-white">
                  {SITE.phone}
                </a>
              </Detail>
              <Detail label="Email">
                <a href={`mailto:${SITE.email}`} className="transition-colors hover:text-white">
                  {SITE.email}
                </a>
              </Detail>
              <Detail label="Visit">
                <a href={DIRECTIONS_URL} target="_blank" rel="noopener noreferrer" className="transition-colors hover:text-white">
                  Udupi-Manipal Hwy, Indrali, Udupi 576102
                </a>
              </Detail>
            </dl>
          </div>
        </Reveal>

        {/* Form */}
        <Reveal className="lg:col-span-7" delay={120}>
          <form
            onSubmit={submit}
            className="flex h-full flex-col border border-neutral-900/10 bg-white/70 p-7 sm:p-10 lg:p-12"
            style={{ borderRadius: RADIUS }}
          >
            <fieldset>
              <legend className="text-[11px] font-medium tracking-[0.22em] text-neutral-500 uppercase">
                I am interested in
              </legend>
              <div className="mt-4 flex flex-wrap gap-2">
                {INTERESTS.map((opt) => (
                  <label key={opt} className="cursor-pointer">
                    <input
                      type="radio"
                      name="interest"
                      value={opt}
                      checked={interest === opt}
                      onChange={() => setInterest(opt)}
                      className="peer sr-only"
                    />
                    <span className="block rounded-full border border-neutral-900/15 px-4 py-2 text-sm text-neutral-700 transition-colors duration-300 peer-checked:border-neutral-900 peer-checked:bg-neutral-900 peer-checked:text-white peer-focus-visible:ring-2 peer-focus-visible:ring-neutral-900/30 hover:border-neutral-900">
                      {opt}
                    </span>
                  </label>
                ))}
              </div>
            </fieldset>

            <div className="mt-10 grid gap-x-8 sm:grid-cols-2">
              <Field label="Your name" id="name">
                <input id="name" required autoComplete="name" value={name} onChange={(e) => setName(e.target.value)} className={inputCls} />
              </Field>
              <Field label="Phone number" id="phone">
                <input
                  id="phone"
                  required
                  type="tel"
                  inputMode="tel"
                  autoComplete="tel"
                  pattern="[0-9+ ]{10,15}"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className={inputCls}
                />
              </Field>
              <Field label="Message (optional)" id="message" className="sm:col-span-2">
                <textarea id="message" rows={3} value={message} onChange={(e) => setMessage(e.target.value)} className={`${inputCls} resize-none`} />
              </Field>
            </div>

            <div className="mt-auto flex flex-wrap items-center justify-between gap-4 pt-10">
              <p className="max-w-[36ch] text-[13px] leading-relaxed text-neutral-500" aria-live="polite">
                {note || "We will reply on WhatsApp or call you back."}
              </p>
              <button
                type="submit"
                className="group inline-flex items-center gap-3 rounded-full bg-neutral-900 py-2 pr-2 pl-6 text-sm font-medium text-white transition-colors hover:bg-neutral-700"
              >
                Send enquiry
                <span className="flex h-9 w-9 items-center justify-center rounded-full bg-white text-neutral-900 transition-transform duration-500 group-hover:translate-x-0.5">
                  <span aria-hidden>&rarr;</span>
                </span>
              </button>
            </div>
          </form>
        </Reveal>
      </div>
    </section>
  );
}

const inputCls =
  "w-full border-b border-neutral-900/20 bg-transparent pt-6 pb-2.5 text-[17px] text-neutral-900 outline-none transition-colors focus:border-neutral-900";

// Small caps label sitting above an underlined field.
function Field({
  label,
  id,
  className = "",
  children,
}: {
  label: string;
  id: string;
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <div className={`relative mb-6 ${className}`}>
      {children}
      <label
        htmlFor={id}
        className="pointer-events-none absolute top-0 left-0 text-[11px] font-medium tracking-[0.18em] text-neutral-500 uppercase"
      >
        {label}
      </label>
    </div>
  );
}

function Detail({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="flex items-baseline justify-between gap-6 py-4">
      <dt className="text-[11px] font-medium tracking-[0.2em] text-white/40 uppercase">{label}</dt>
      <dd className="text-right text-[15px] text-white/80">{children}</dd>
    </div>
  );
}
