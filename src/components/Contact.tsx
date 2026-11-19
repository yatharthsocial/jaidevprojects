"use client";

import { useEffect, useRef, useState } from "react";
import BrochureDownload from "@/components/BrochureDownload";
import Reveal from "@/components/Reveal";
import { PhoneIcon, PinIcon, WhatsAppIcon } from "@/components/icons";
import { DIRECTIONS_URL, ENQUIRE_EVENT, SITE, digits, whatsappLink } from "@/lib/site";

const PAGE = "#ebeae5";
const RADIUS = 28;

const INTERESTS = ["Site visit", "Retail showroom", "Office space", "Lodging suite", "Investment", "Brochure", "Floor plans"];

type Status = "idle" | "sending" | "success" | "error";

export default function Contact() {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [interest, setInterest] = useState(INTERESTS[0]);
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState<Status>("idle");
  const nameRef = useRef<HTMLInputElement>(null);

  // Buttons elsewhere ("Get the brochure", "Request floor plans") preselect
  // the topic and bring the visitor here.
  useEffect(() => {
    const onEnquire = (e: Event) => {
      const topic = (e as CustomEvent<string>).detail;
      if (INTERESTS.includes(topic)) setInterest(topic);
      setStatus((s) => (s === "success" ? "idle" : s));
      setTimeout(() => nameRef.current?.focus({ preventScroll: true }), 700);
    };
    window.addEventListener(ENQUIRE_EVENT, onEnquire);
    return () => window.removeEventListener(ENQUIRE_EVENT, onEnquire);
  }, []);

  const summary = [
    `Hello, I'm interested in ${SITE.name}.`,
    `Name: ${name}`,
    `Phone: ${phone}`,
    `Interested in: ${interest}`,
    message && `Message: ${message}`,
  ]
    .filter(Boolean)
    .join("\n");

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("sending");
    const company = (e.currentTarget as HTMLFormElement).elements.namedItem("company") as HTMLInputElement | null;
    try {
      const res = await fetch("/api/enquiry", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, phone, interest, message, source: "Contact form", company: company?.value }),
      });
      if (!res.ok) throw new Error(String(res.status));
      setStatus("success");
    } catch {
      setStatus("error");
    }
  };

  const reset = () => {
    setName("");
    setPhone("");
    setMessage("");
    setInterest(INTERESTS[0]);
    setStatus("idle");
  };

  return (
    <section id="contact" className="px-3 pb-3 sm:px-5 sm:pb-5" style={{ background: PAGE }}>
      <div className="mx-auto grid max-w-[1400px] gap-3 pt-12 sm:gap-5 sm:pt-20 lg:grid-cols-12">
        {/* Details */}
        <Reveal className="lg:col-span-5">
          <div className="flex h-full flex-col gap-10 bg-[#1c1c1a] p-7 text-white sm:p-10 lg:p-12" style={{ borderRadius: RADIUS }}>
            <div>
              <p className="text-[11px] font-medium tracking-[0.22em] text-white/60 uppercase">Contact</p>
              <h2 className="mt-6 font-serif text-[clamp(2.6rem,4.6vw,4.5rem)] leading-[0.98] tracking-[-0.015em] text-white">
                Book your site visit <span className="italic">today</span>
              </h2>
              <p className="mt-6 max-w-[38ch] text-[16px] leading-[1.7] text-white/80">
                Call, message us on WhatsApp or send the form, and we will set up a time to walk you
                through the site.
              </p>
            </div>

            <div className="grid gap-2.5">
              {SITE.phones.map((p) => (
                <a
                  key={p}
                  href={`tel:+${digits(p)}`}
                  className="group flex items-center justify-between gap-4 rounded-[16px] border border-white/15 px-5 py-4 transition-colors hover:border-white/50 hover:bg-white/[0.05]"
                >
                  <span className="flex items-center gap-3">
                    <PhoneIcon className="h-5 w-5 text-white/70" />
                    <span className="text-[18px] font-medium tracking-[0.01em] tabular-nums">{p}</span>
                  </span>
                  <span className="text-[12px] font-medium tracking-[0.16em] text-white/60 uppercase transition-colors group-hover:text-white">
                    Call
                  </span>
                </a>
              ))}
              <div className="mt-1 grid gap-2.5 sm:grid-cols-2">
                <a
                  href={whatsappLink()}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2.5 rounded-full bg-[#1f7a4d] px-5 py-3.5 text-[15px] font-medium text-white transition-colors hover:bg-[#25935c]"
                >
                  <WhatsAppIcon className="h-5 w-5" /> WhatsApp us
                </a>
                <a
                  href={DIRECTIONS_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2.5 rounded-full bg-white px-5 py-3.5 text-[15px] font-medium text-neutral-900 transition-colors hover:bg-neutral-200"
                >
                  <PinIcon className="h-5 w-5" /> Get directions
                </a>
              </div>
              <BrochureDownload
                showSize
                className="inline-flex items-center justify-center rounded-full border border-white/25 px-5 py-3.5 text-[15px] font-medium text-white transition-colors hover:border-white/60 hover:bg-white/[0.05]"
              />
            </div>

            <dl className="mt-auto divide-y divide-white/10 border-y border-white/10">
              <Detail label="Visit">{SITE.shortAddress}</Detail>
              {SITE.email && (
                <Detail label="Email">
                  <a href={`mailto:${SITE.email}`} className="transition-colors hover:text-white">
                    {SITE.email}
                  </a>
                </Detail>
              )}
            </dl>
          </div>
        </Reveal>

        {/* Form */}
        <Reveal className="lg:col-span-7" delay={120}>
          <div className="h-full border border-neutral-900/10 bg-white/80 p-7 sm:p-10 lg:p-12" style={{ borderRadius: RADIUS }}>
            {status === "success" ? (
              <div role="status" className="flex h-full min-h-[420px] flex-col items-start justify-center">
                <span className="flex h-14 w-14 items-center justify-center rounded-full bg-neutral-900 text-white">
                  <svg aria-hidden viewBox="0 0 24 24" className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M5 12.5l4.5 4.5L19 7.5" />
                  </svg>
                </span>
                <h3 className="mt-6 font-serif text-[clamp(2rem,3.4vw,3rem)] leading-tight">Thank you, {name.split(" ")[0]}.</h3>
                <p className="mt-3 max-w-[44ch] text-[16px] leading-relaxed text-neutral-600">
                  We have received your enquiry about <strong className="font-medium text-neutral-900">{interest.toLowerCase()}</strong>.
                  Our team will call you on {phone} shortly.
                </p>
                <button
                  type="button"
                  onClick={reset}
                  className="mt-8 text-sm font-medium underline decoration-neutral-900/30 underline-offset-4 transition-colors hover:decoration-neutral-900"
                >
                  Send another enquiry
                </button>
              </div>
            ) : (
              <form onSubmit={submit} className="flex h-full flex-col">
                <p className="font-serif text-[clamp(1.75rem,2.6vw,2.25rem)] leading-tight">Send an enquiry</p>
                <fieldset className="mt-8">
                  <legend className="text-[11px] font-medium tracking-[0.22em] text-neutral-600 uppercase">
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
                    <input
                      ref={nameRef}
                      id="name"
                      required
                      minLength={2}
                      autoComplete="name"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className={inputCls}
                    />
                  </Field>
                  <Field label="Phone number" id="phone">
                    <input
                      id="phone"
                      required
                      type="tel"
                      inputMode="tel"
                      autoComplete="tel"
                      pattern="\+?[0-9 \-]{10,16}"
                      title="Enter a 10-digit mobile number, with or without +91"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      className={inputCls}
                    />
                  </Field>
                  <Field label="Message (optional)" id="message" className="sm:col-span-2">
                    <textarea id="message" rows={3} value={message} onChange={(e) => setMessage(e.target.value)} className={`${inputCls} resize-none`} />
                  </Field>
                  {/* Spam trap: hidden from people, filled in by bots. */}
                  <input type="text" name="company" tabIndex={-1} autoComplete="off" aria-hidden className="hidden" />
                </div>

                <div className="mt-auto flex flex-wrap items-center justify-between gap-4 pt-8">
                  <div className="max-w-[40ch] text-[14px] leading-relaxed" aria-live="polite">
                    {status === "error" ? (
                      <p className="text-[#b03a2e]">
                        Sorry, your enquiry could not be sent.{" "}
                        <a href={whatsappLink(summary)} target="_blank" rel="noopener noreferrer" className="font-medium underline underline-offset-4">
                          Send it on WhatsApp instead
                        </a>{" "}
                        or call {SITE.phones[0]}.
                      </p>
                    ) : (
                      <p className="text-neutral-600">Our team will call you back to fix a time.</p>
                    )}
                  </div>
                  <button
                    type="submit"
                    disabled={status === "sending"}
                    className="group inline-flex items-center gap-3 rounded-full bg-neutral-900 py-2 pr-2 pl-6 text-[15px] font-medium text-white transition-colors hover:bg-neutral-700 disabled:cursor-progress disabled:opacity-60"
                  >
                    {status === "sending" ? "Sending..." : "Send enquiry"}
                    <span className="flex h-9 w-9 items-center justify-center rounded-full bg-white text-neutral-900 transition-transform duration-500 group-hover:translate-x-0.5">
                      <span aria-hidden>&rarr;</span>
                    </span>
                  </button>
                </div>
              </form>
            )}
          </div>
        </Reveal>
      </div>
    </section>
  );
}

const inputCls =
  "w-full border-b border-neutral-900/25 bg-transparent pt-6 pb-2.5 text-[17px] text-neutral-900 outline-none transition-colors focus:border-neutral-900";

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
        className="pointer-events-none absolute top-0 left-0 text-[11px] font-medium tracking-[0.18em] text-neutral-600 uppercase"
      >
        {label}
      </label>
    </div>
  );
}

function Detail({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="flex items-baseline justify-between gap-6 py-4">
      <dt className="text-[11px] font-medium tracking-[0.2em] text-white/60 uppercase">{label}</dt>
      <dd className="text-right text-[15px] text-white/85">{children}</dd>
    </div>
  );
}
