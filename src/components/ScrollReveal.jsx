import { motion, useInView } from "framer-motion";
import { useRef } from "react";

export default function ScrollReveal({
  children,
  className = "",
  delay = 0,
  duration = 0.8,
  y = 48,
  once = true,
  amount = 0.2,
}) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once, amount });

  return (
    <motion.div
      ref={ref}
      className={className}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      variants={{
        hidden: { opacity: 0, y },
        visible: {
          opacity: 1,
          y: 0,
          transition: { duration, delay, ease: [0.22, 1, 0.36, 1] },
        },
      }}
    >
      {children}
    </motion.div>
  );
}
