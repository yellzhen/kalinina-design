import { motion } from "framer-motion";
import ScrollReveal from "./ScrollReveal";
import { highlights } from "../data/profile";
import { clients } from "../data/skills";

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
                    className="sm:pr-7"
                    whileHover={{ y: -2 }}
                    transition={{ duration: 0.3 }}
                  >
                    <p className="font-display text-6xl font-semibold leading-none text-cream sm:text-7xl lg:text-8xl">
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
                  В ИСГ «Мармакс» и ТРЦ «Марко молл» разрабатываю дизайн-системы и
                  креативы для кампаний: билборды, стройплощадки, POSM, веб-макеты и
                  анимации для экранов. Работаю на стыке графического дизайна, motion и
                  AI-инструментов — Photoshop, Illustrator, InDesign, After Effects, Figma.
                </p>
              </div>

              <ScrollReveal delay={0.15}>
                <div className="flex flex-wrap gap-2 pt-2">
                  {clients.map((client, index) => {
                    const isFeatured = index < 3;

                    return (
                      <span
                        key={client}
                        className={`rounded-full px-3.5 py-2 ${
                          isFeatured
                            ? "bg-cream text-sm font-medium text-graphite-950"
                            : "bg-cream/[0.055] text-sm text-cream-muted"
                        }`}
                      >
                        {client}
                      </span>
                    );
                  })}
                </div>
              </ScrollReveal>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
