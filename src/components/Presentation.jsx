import { useEffect, useMemo, useState } from "react";
import { motion } from "framer-motion";
import ScrollReveal from "./ScrollReveal";
import { minorWorks } from "../data/projects";

const getColumnCount = () => {
  if (typeof window === "undefined") return 4;
  return window.matchMedia("(min-width: 1024px)").matches ? 4 : 2;
};

const distributeWorks = (works, ratios, columnCount) => {
  const columns = Array.from({ length: columnCount }, () => []);
  const heights = Array.from({ length: columnCount }, () => 0);

  works.forEach((work) => {
    const shortestColumn = heights.indexOf(Math.min(...heights));
    columns[shortestColumn].push(work);
    heights[shortestColumn] += ratios[work.id] || 1;
  });

  return columns;
};

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
  const [columnCount, setColumnCount] = useState(getColumnCount);
  const [ratios, setRatios] = useState({});

  useEffect(() => {
    const updateColumnCount = () => setColumnCount(getColumnCount());

    updateColumnCount();
    window.addEventListener("resize", updateColumnCount);
    return () => window.removeEventListener("resize", updateColumnCount);
  }, []);

  useEffect(() => {
    let cancelled = false;

    minorWorks.forEach((work) => {
      const image = new Image();
      image.onload = () => {
        if (cancelled || !image.naturalWidth) return;

        setRatios((current) => ({
          ...current,
          [work.id]: image.naturalHeight / image.naturalWidth,
        }));
      };
      image.src = work.src;
    });

    return () => {
      cancelled = true;
    };
  }, []);

  const columns = useMemo(
    () => distributeWorks(minorWorks, ratios, columnCount),
    [columnCount, ratios],
  );

  return (
    <section
      id="presentation"
      className="section-padding relative bg-graphite-900/35 pb-10 pt-6 sm:pb-12 sm:pt-8 lg:pb-14 lg:pt-10"
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

        <div className="grid grid-cols-2 items-start gap-3 sm:gap-5 lg:grid-cols-4">
          {columns.map((column, columnIndex) => (
            <div key={columnIndex} className="flex flex-col gap-3 sm:gap-5">
              {column.map((work, index) => (
                <MinorWorkImage
                  key={work.id}
                  work={work}
                  index={index * columnCount + columnIndex}
                />
              ))}
            </div>
          ))}
        </div>
      </div>

      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-72 bg-gradient-to-b from-transparent via-graphite-950/80 to-graphite-950 sm:h-96 lg:h-[32rem]" />
    </section>
  );
}
