import { motion } from "framer-motion";
import {
  ScrollRevealStagger,
  ScrollRevealItem,
} from "./ScrollReveal";
import { skillGroups } from "../data/skills";

export default function Skills() {
  return (
    <section id="skills" className="section-padding pb-6 pt-0 sm:pb-8 lg:pb-10">
      <div className="mx-auto max-w-[1600px]">
        <ScrollRevealStagger className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4 lg:gap-6">
          {skillGroups.map((group) => (
            <ScrollRevealItem key={group.title}>
              <motion.div
                className="flex h-full flex-col rounded-sm bg-graphite-850/70 p-5 sm:p-6"
                whileHover={{
                  backgroundColor: "rgba(245, 243, 239, 0.055)",
                  y: -4,
                }}
                transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
              >
                <h3 className="font-display text-lg font-semibold text-cream">
                  {group.title}
                </h3>
                <ul className="mt-4 flex flex-1 flex-col gap-2.5">
                  {group.items.map((skill) => (
                    <li
                      key={skill}
                      className="flex items-center gap-3 text-sm text-cream-muted"
                    >
                      <span className="h-px w-4 shrink-0 bg-accent-warm/60" />
                      {skill}
                    </li>
                  ))}
                </ul>
              </motion.div>
            </ScrollRevealItem>
          ))}
        </ScrollRevealStagger>
      </div>
    </section>
  );
}
