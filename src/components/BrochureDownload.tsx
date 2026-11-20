"use client";

import { useRef, useState } from "react";
import { DownloadIcon } from "@/components/icons";
import { BROCHURE_FILENAME, BROCHURE_SIZE, BROCHURE_URL, enquire } from "@/lib/site";

type State = "idle" | "loading" | "done";

// One-click PDF download (the brochure by default), no form. The file is fetched in the page so
// the button can show real progress and a clear "Downloaded" confirmation,
// then saved under a friendly file name. If anything goes wrong it falls back
// to a normal browser download, so the visitor always gets the file.
export default function BrochureDownload({
  className = "",
  label = "Download brochure",
  showSize = false,
  href = BROCHURE_URL,
  filename = BROCHURE_FILENAME,
  size = BROCHURE_SIZE,
  sizeClassName = "",
}: {
  className?: string;
  label?: string;
  showSize?: boolean;
  // Defaults to the brochure; pass these to download another PDF.
  href?: string;
  filename?: string;
  size?: string;
  // Extra classes for the "PDF, 4 MB" note, e.g. to hide it on narrow screens.
  sizeClassName?: string;
}) {
  const [state, setState] = useState<State>("idle");
  const [progress, setProgress] = useState(0);
  const busy = useRef(false);
  const ref = useRef<HTMLAnchorElement>(null);
  // Width is held while the label changes so nothing around the button shifts.
  const [minWidth, setMinWidth] = useState<number>();

  if (!href) {
    return (
      <button type="button" onClick={() => enquire("Brochure")} className={className}>
        <DownloadIcon /> Get the brochure
      </button>
    );
  }

  const save = (href: string) => {
    const a = document.createElement("a");
    a.href = href;
    a.download = filename;
    a.rel = "noopener";
    document.body.appendChild(a);
    a.click();
    a.remove();
  };

  const download = async (e: React.MouseEvent) => {
    e.preventDefault();
    if (busy.current) return;
    busy.current = true;
    setMinWidth(ref.current?.offsetWidth);
    setState("loading");
    setProgress(0);
    try {
      const res = await fetch(href);
      if (!res.ok || !res.body) throw new Error(String(res.status));
      const total = Number(res.headers.get("content-length")) || 0;
      const reader = res.body.getReader();
      const chunks: Uint8Array<ArrayBuffer>[] = [];
      let received = 0;
      for (;;) {
        const { done, value } = await reader.read();
        if (done) break;
        chunks.push(value);
        received += value.length;
        if (total) setProgress(received / total);
      }
      const url = URL.createObjectURL(new Blob(chunks, { type: "application/pdf" }));
      save(url);
      setTimeout(() => URL.revokeObjectURL(url), 60_000);
    } catch {
      save(href);
    }
    setProgress(1);
    setState("done");
    setTimeout(() => {
      setState("idle");
      setMinWidth(undefined);
      busy.current = false;
    }, 3000);
  };

  return (
    <a
      ref={ref}
      href={href}
      download={filename}
      onClick={download}
      aria-live="polite"
      aria-busy={state === "loading"}
      className={`relative justify-center overflow-hidden ${className}`}
      style={{ minWidth }}
    >
      {/* Progress fill behind the label */}
      <span
        aria-hidden
        className="absolute inset-y-0 left-0 bg-current opacity-10 transition-[width,opacity] duration-300 ease-out"
        style={{ width: state === "idle" ? "0%" : `${Math.max(progress, 0.08) * 100}%`, opacity: state === "done" ? 0 : undefined }}
      />
      <span className="relative inline-flex items-center gap-2 whitespace-nowrap">
        {state === "done" ? <CheckIcon /> : state === "loading" ? <Spinner /> : <DownloadIcon />}
        {state === "loading"
          ? progress > 0
            ? `Downloading ${Math.round(progress * 100)}%`
            : "Preparing..."
          : state === "done"
            ? "Downloaded"
            : label}
        {state === "idle" && showSize && <span className={`opacity-60 ${sizeClassName}`}>PDF, {size}</span>}
      </span>
    </a>
  );
}

function CheckIcon() {
  return (
    <svg aria-hidden viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M5 12.5l4.5 4.5L19 7.5" />
    </svg>
  );
}

function Spinner() {
  return (
    <svg aria-hidden viewBox="0 0 24 24" className="h-4 w-4 animate-spin" fill="none" stroke="currentColor" strokeWidth="2">
      <circle cx="12" cy="12" r="9" opacity="0.25" />
      <path d="M21 12a9 9 0 0 0-9-9" strokeLinecap="round" />
    </svg>
  );
}
