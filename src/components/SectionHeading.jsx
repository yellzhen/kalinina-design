import { motion } from "framer-motion";
import ScrollReveal from "./ScrollReveal";

export default function SectionHeading({
  label,
  title,
  description,
  align = "left",
}) {
  const alignClass =
    align === "center"
      ? "text-center items-center mx-auto"
      : "text-left items-start";

  return (
    <ScrollReveal className={`flex max-w-3xl flex-col gap-4 ${alignClass}`}>
      {label && (
        <span className="font-body text-xs font-semibold uppercase tracking-[0.24em] text-accent-warm">
          {label}
        </span>
      )}
      <h2 className="font-display text-4xl font-semibold leading-[1.05] tracking-tight text-cream sm:text-5xl lg:text-6xl">
        {title}
      </h2>
      {description && (
        <p className="max-w-xl text-base leading-relaxed text-cream-muted sm:text-lg">
          {description}
        </p>
      )}
    </ScrollReveal>
  );
}
