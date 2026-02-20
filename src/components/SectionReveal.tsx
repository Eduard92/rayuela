import { useEffect, useRef, useState } from "react";

type Direction = "up" | "down" | "left" | "right";

const directionClass: Record<Direction, string> = {
  up: "translate-y-16",
  down: "-translate-y-16",
  left: "-translate-x-16",
  right: "translate-x-16",
};

interface SectionRevealProps {
  children: React.ReactNode;
  direction?: Direction;
  delay?: number;
}

const SectionReveal = ({ children, direction = "up", delay = 0 }: SectionRevealProps) => {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.unobserve(el);
        }
      },
      { threshold: 0.08 },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      style={{ transitionDelay: visible ? `${delay}ms` : "0ms" }}
      className={`transition-all duration-700 ease-out overflow-hidden ${
        visible ? "opacity-100 translate-x-0 translate-y-0" : `opacity-0 ${directionClass[direction]}`
      }`}
    >
      {children}
    </div>
  );
};

export default SectionReveal;
