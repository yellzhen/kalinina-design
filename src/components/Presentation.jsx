import { useEffect, useMemo, useRef, useState } from "react";
import { motion } from "framer-motion";
import ScrollReveal from "./ScrollReveal";
import { minorWorks } from "../data/projects";

const getColumnCount = () => {
  if (typeof window === "undefined") return 4;
  return window.matchMedia("(min-width: 1024px)").matches ? 4 : 2;
};

const getCollapsedHeight = () => {
  if (typeof window === "undefined") return 940;
  if (window.matchMedia("(min-width: 1024px)").matches) return 940;
  if (window.matchMedia("(min-width: 640px)").matches) return 860;
  return 760;
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
        loading="eager"
        decoding="async"
        fetchPriority={index < 8 ? "high" : "low"}
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
  const galleryRef = useRef(null);
  const [columnCount, setColumnCount] = useState(getColumnCount);
  const [collapsedHeight, setCollapsedHeight] = useState(getCollapsedHeight);
  const [galleryHeight, setGalleryHeight] = useState(getCollapsedHeight);
  const [ratios, setRatios] = useState({});
  const [isExpanded, setIsExpanded] = useState(false);
  const canToggle = minorWorks.length > 8;

  useEffect(() => {
    const updateLayout = () => {
      setColumnCount(getColumnCount());
      setCollapsedHeight(getCollapsedHeight());
    };

    updateLayout();
    window.addEventListener("resize", updateLayout);
    return () => window.removeEventListener("resize", updateLayout);
  }, []);

  useEffect(() => {
    let cancelled = false;

    const loadRatios = async () => {
      const entries = await Promise.all(
        minorWorks.map(
          (work) =>
            new Promise((resolve) => {
              const image = new Image();

              image.onload = async () => {
                if (image.decode) {
                  try {
                    await image.decode();
                  } catch {
                    // The ratio is still available even if async decoding is skipped.
                  }
                }

                resolve([
                  work.id,
                  image.naturalWidth
                    ? image.naturalHeight / image.naturalWidth
                    : 1,
                ]);
              };

              image.onerror = () => resolve([work.id, 1]);
              image.src = work.src;
            }),
        ),
      );

      if (!cancelled) {
        setRatios(Object.fromEntries(entries));
      }
    };

    loadRatios();

    return () => {
      cancelled = true;
    };
  }, []);

  const columns = useMemo(
    () => distributeWorks(minorWorks, ratios, columnCount),
    [columnCount, ratios],
  );

  useEffect(() => {
    if (!galleryRef.current) return undefined;

    const updateGalleryHeight = () => {
      setGalleryHeight(galleryRef.current.scrollHeight + 180);
    };

    updateGalleryHeight();

    const resizeObserver = new ResizeObserver(updateGalleryHeight);
    resizeObserver.observe(galleryRef.current);

    return () => resizeObserver.disconnect();
  }, [columns]);

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

        <motion.div
          animate={{
            maxHeight: isExpanded ? galleryHeight : collapsedHeight,
          }}
          transition={{ duration: 0.85, ease: [0.22, 1, 0.36, 1] }}
          className="relative overflow-hidden pb-28 sm:pb-32"
        >
          <div
            ref={galleryRef}
            className="grid grid-cols-2 items-start gap-3 sm:gap-5 lg:grid-cols-4"
          >
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

          {canToggle && (
            <div
              className={`pointer-events-none absolute inset-x-0 bottom-0 z-20 flex items-end justify-center text-cream ${
                isExpanded
                  ? "h-32 bg-gradient-to-b from-transparent to-graphite-950/90 pb-4 sm:h-36 sm:pb-5"
                  : "h-[34rem] bg-gradient-to-b from-transparent via-graphite-950/82 to-graphite-950 pb-7 sm:h-[40rem] sm:pb-9 lg:h-[46rem] lg:pb-10"
              }`}
            >
              <motion.button
                type="button"
                onClick={() => setIsExpanded((current) => !current)}
                aria-label={
                  isExpanded
                    ? "Свернуть другие работы"
                    : "Развернуть другие работы"
                }
                className="pointer-events-auto inline-flex cursor-pointer items-center gap-3 rounded-full border border-cream/15 bg-graphite-950/65 px-5 py-3 text-sm font-medium text-cream shadow-2xl shadow-black/30 backdrop-blur-sm sm:px-6 sm:text-base"
                animate={{ y: [0, isExpanded ? -3 : 3, 0] }}
                transition={{
                  duration: 2.8,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              >
                <span>
                  {isExpanded ? "Свернуть" : "Развернуть"}
                </span>
                <svg
                  width="18"
                  height="18"
                  viewBox="0 0 22 22"
                  fill="none"
                  aria-hidden="true"
                  className={isExpanded ? "rotate-180" : ""}
                >
                  <path
                    d="M5.5 8.5L11 14L16.5 8.5"
                    stroke="currentColor"
                    strokeWidth="1.8"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </motion.button>
            </div>
          )}
        </motion.div>
      </div>
    </section>
  );
}
