import { motion } from "framer-motion";
import ScrollReveal from "./ScrollReveal";
import { minorWorks } from "../data/projects";

function MinorWorkImage({ work, index }) {
  return (
    <ScrollReveal delay={Math.min(index * 0.015, 0.12)} y={0}>
      <motion.img
        src={work.src}
        alt={work.title}
        className="block h-auto w-full rounded-sm"
        loading="lazy"
        whileHover={{
          y: -5,
          scale: 1.012,
        }}
        transition={{ duration: 0.42, ease: [0.22, 1, 0.36, 1] }}
      />
    </ScrollReveal>
  );
}

export default function Presentation() {
  return (
    <section
      id="presentation"
      className="section-padding bg-graphite-900/35 pb-10 pt-6 sm:pb-12 sm:pt-8 lg:pb-14 lg:pt-10"
    >
      <div className="mx-auto max-w-[1600px]">
        <ScrollReveal>
          <div className="mb-8 flex flex-col gap-4 sm:mb-10 lg:max-w-3xl">
            <p className="text-xs font-semibold uppercase tracking-[0.24em] text-accent-warm">
              Другие работы
            </p>
            <h2 className="font-display text-3xl font-semibold tracking-tight text-cream sm:text-4xl">
              Малые форматы, события и быстрые digital-задачи
            </h2>
            <p className="max-w-2xl text-sm leading-6 text-cream-muted sm:text-base">
              Подборка небольших макетов: афиши, баннеры, объявления, праздничные ивенты и точечные визуальные задачи.
            </p>
          </div>
        </ScrollReveal>

        <div className="grid grid-cols-2 items-start gap-3 sm:gap-5 lg:hidden">
          {minorWorks.map((work, index) => (
            <MinorWorkImage key={work.id} work={work} index={index} />
          ))}
        </div>

        <div className="hidden gap-5 lg:block lg:columns-4">
          {minorWorks.map((work, index) => (
            <div key={work.id} className="mb-5 inline-block w-full break-inside-avoid">
              <MinorWorkImage work={work} index={index} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
