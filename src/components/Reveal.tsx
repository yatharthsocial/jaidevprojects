"use client";

import { useEffect, useRef, useState } from "react";

// Drifts its children up into place the first time they scroll into view.
// Opacity and transform only, so it stays cheap while scrolling.
export default function Reveal({
  children,
  delay = 0,
  className = "",
  as: Tag = "div",
}: {
  children: React.ReactNode;
  delay?: number;
  className?: string;
  as?: "div" | "li";
}) {
  const ref = useRef<HTMLDivElement & HTMLLIElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          io.disconnect();
        }
      },
      { rootMargin: "0px 0px -5% 0px" },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <Tag
      ref={ref}
      className={className}
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? "translate3d(0, 0, 0)" : "translate3d(0, 20px, 0)",
        transition: [
          `opacity 700ms ease-out ${delay}ms`,
          `transform 900ms cubic-bezier(0.16, 1, 0.3, 1) ${delay}ms`,
        ].join(", "),
      }}
    >
      {children}
    </Tag>
  );
}
