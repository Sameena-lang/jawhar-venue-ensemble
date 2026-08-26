import { motion } from "framer-motion";
import type { ReactNode } from "react";

export function Reveal({
  children,
  delay = 0,
  className,
}: {
  children: ReactNode;
  delay?: number;
  className?: string;
}) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: 32 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.8, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  );
}

export function SectionHeading({
  eyebrow,
  title,
  description,
  light = false,
  center = true,
}: {
  eyebrow: string;
  title: string;
  description?: string;
  light?: boolean;
  center?: boolean;
}) {
  return (
    <Reveal className={center ? "text-center" : ""}>
      <p className="eyebrow">{eyebrow}</p>
      <h2
        className={`mt-4 font-display text-3xl font-medium leading-tight md:text-5xl ${
          light ? "text-white" : "text-forest"
        }`}
      >
        {title}
      </h2>
      <div className={`divider-gold mt-6 ${center ? "mx-auto" : ""}`} />
      {description && (
        <p
          className={`mt-6 max-w-2xl text-base leading-relaxed ${
            center ? "mx-auto" : ""
          } ${light ? "text-white/70" : "text-muted-foreground"}`}
        >
          {description}
        </p>
      )}
    </Reveal>
  );
}
