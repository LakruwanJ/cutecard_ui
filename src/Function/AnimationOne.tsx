import type { ReactNode } from "react";
import { useRef } from "react";
import { useInView } from "framer-motion";

interface SectionProps {
  children: ReactNode;
}

export default function AnimationOne({
  children,
}: SectionProps) {
  const ref = useRef<HTMLElement | null>(null);

  const isInView = useInView(ref, {
    once: true,
  });

  return (
    <section ref={ref}>
      <span
        style={{
          display: "block",
          transform: isInView
            ? "none"
            : "translateX(-100px)",
          opacity: isInView ? 1 : 0,
          transition:
            "all 0.9s cubic-bezier(0.17, 0.55, 0.55, 1) 0.5s",
        }}
      >
        {children}
      </span>
    </section>
  );
}