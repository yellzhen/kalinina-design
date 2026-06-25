import { motion } from "framer-motion";
import ScrollReveal from "./ScrollReveal";
import { highlights } from "../data/profile";

const aboutSkillColumns = [
  [
    "Рекламные кампании",
    "Наружная реклама",
    "Полиграфия и POSM",
    "Адаптация под носители",
    "Анимации и motion",
    "Digital и web макеты",
  ],
  [
    "Figma",
    "Photoshop",
    "Illustrator",
    "InDesign",
    "CorelDraw",
    "Google Slides",
  ],
  [
    "After Effects",
    "Premier Pro",
    "Midjorney",
    "Gemini",
    "Kling",
    "Runway",
  ],
];

export default function About() {
  return (
    <section id="about" className="section-padding pb-6 pt-4 sm:pb-8 sm:pt-6 lg:pb-10 lg:pt-8">
      <div className="mx-auto max-w-[1600px]">
        <motion.div
          className="grid gap-12"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          variants={{
            visible: { transition: { staggerChildren: 0.12 } },
          }}
        >
          <motion.div
            className="grid gap-8"
            variants={{
              hidden: { opacity: 0, y: 40 },
              visible: {
                opacity: 1,
                y: 0,
                transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] },
              },
            }}
          >
            <ScrollReveal delay={0.1}>
              <div className="grid gap-6 bg-cream/[0.035] p-5 sm:grid-cols-3 sm:p-7 lg:p-8">
                {highlights.map((item) => (
                  <motion.div
                    key={item.label}
                    className="sm:text-center"
                    whileHover={{ y: -2 }}
                    transition={{ duration: 0.3 }}
                  >
                    <p className="font-body text-6xl font-semibold leading-none text-cream lining-nums tabular-nums sm:text-7xl lg:text-8xl">
                      {item.value}
                    </p>
                    <p className="mt-3 text-sm text-cream-muted sm:text-base">
                      {item.label}
                    </p>
                  </motion.div>
                ))}
              </div>
            </ScrollReveal>

            <div className="grid gap-8 lg:grid-cols-[minmax(0,0.95fr)_minmax(0,1.05fr)] lg:items-start">
              <div className="space-y-5">
                <p className="text-lg leading-relaxed text-cream-muted sm:text-xl sm:leading-relaxed">
                  Дизайнер визуальных коммуникаций с опытом в девелопменте, retail и
                  digital.
                </p>
                <p className="text-base leading-relaxed text-cream-muted/90">
                  Разрабатываю дизайн-системы и креативы для кампаний. Работаю с
                  брендингом, наружной рекламой, motion-дизайном и AI-инструментами.
                  Создаю печатные и диджитал макеты от концепции до адаптации на
                  десятки носителей.
                </p>
              </div>

              <ScrollReveal delay={0.15}>
                <div
                  id="skills"
                  className="flex flex-wrap gap-2 pt-2"
                >
                  {aboutSkillColumns.flat().map((skill) => (
                    <span
                      key={skill}
                      className="cursor-default select-none rounded-full border border-cream/60 bg-transparent px-3.5 py-1.5 text-xs font-medium leading-none text-cream transition-colors hover:border-cream hover:bg-cream hover:text-graphite-950 sm:text-sm"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </ScrollReveal>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
