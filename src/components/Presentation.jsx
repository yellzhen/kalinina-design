import { useEffect, useMemo, useRef, useState } from "react";
import { motion } from "framer-motion";
import ScrollReveal from "./ScrollReveal";
import { minorWorks } from "../data/projects";

const getCollapsedHeight = () => {
  if (typeof window === "undefined") return 940;
  if (window.matchMedia("(min-width: 1024px)").matches) return 940;
  if (window.matchMedia("(min-width: 640px)").matches) return 860;
  return 760;
};

const getColumnCount = () => {
  if (typeof window === "undefined") return 4;
  return window.matchMedia("(min-width: 1024px)").matches ? 4 : 2;
};

const getGap = () => {
  if (typeof window === "undefined") return 20;
  return window.matchMedia("(min-width: 640px)").matches ? 20 : 12;
};

const getWorkSpan = (work, columnCount) => {
  if (columnCount < 4) return 1;

  const ratio = work.width && work.height ? work.width / work.height : 1;
  return ratio >= 1.28 ? 2 : 1;
};

const buildMasonryLayout = (works, columnCount, containerWidth, gap) => {
  if (!containerWidth) return { height: 0, items: [] };

  const maxLayoutWidth =
    columnCount >= 4 ? Math.min(containerWidth, 1380) : containerWidth;
  const offsetX = Math.max(0, (containerWidth - maxLayoutWidth) / 2);
  const columnWidth = (maxLayoutWidth - gap * (columnCount - 1)) / columnCount;
  const heights = Array.from({ length: columnCount }, () => 0);
  const items = [];

  works.forEach((work, index) => {
    const span = getWorkSpan(work, columnCount);
    const ratio = work.width && work.height ? work.width / work.height : 1;
    const width = columnWidth * span + gap * (span - 1);
    const height = width / ratio;
    let targetColumn = 0;
    let targetY = Infinity;

    for (let column = 0; column <= columnCount - span; column += 1) {
      const y = Math.max(...heights.slice(column, column + span));

      if (y < targetY) {
        targetY = y;
        targetColumn = column;
      }
    }

    const neighborHeights = [
      heights[targetColumn - 1],
      heights[targetColumn + span],
    ].filter((value) => Number.isFinite(value));
    const surroundingHeight = neighborHeights.length
      ? Math.max(...neighborHeights)
      : targetY;
    const verticalRoom = surroundingHeight - targetY - height;
    const centerOffset =
      span > 1 && verticalRoom > gap * 2
        ? Math.min(verticalRoom / 2, columnWidth * 0.22)
        : 0;
    const x = offsetX + targetColumn * (columnWidth + gap);
    const y = targetY + centerOffset;
    const bottom = y + height + gap;

    for (let column = targetColumn; column < targetColumn + span; column += 1) {
      heights[column] = bottom;
    }

    items.push({
      height,
      index,
      work,
      width,
      x,
      y,
    });
  });

  return {
    height: Math.max(0, Math.max(...heights) - gap),
    items,
    width: maxLayoutWidth,
  };
};

function MinorWorkImage({ item }) {
  const { height, index, width, work, x, y } = item;
  const ratio = work.width && work.height ? work.width / work.height : 1;

  return (
    <motion.div
      className="absolute"
      initial={{ opacity: 0, y: 18 }}
      style={{
        height,
        left: x,
        top: y,
        width,
      }}
      viewport={{ once: true, amount: 0.15 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{
        duration: 0.65,
        delay: Math.min(index * 0.015, 0.12),
        ease: [0.22, 1, 0.36, 1],
      }}
    >
      <div
        className="relative h-full w-full overflow-hidden rounded-sm bg-graphite-800 bg-cover bg-center shadow-[0_18px_70px_rgba(0,0,0,0.18)]"
        style={{
          aspectRatio: `${ratio}`,
          backgroundImage: work.blurSrc ? `url(${work.blurSrc})` : undefined,
        }}
      >
        <motion.img
          src={work.src}
          alt={work.title}
          className="absolute inset-0 block h-full w-full object-cover"
          loading="eager"
          decoding="async"
          fetchPriority={index < 8 ? "high" : "low"}
          whileHover={{
            y: -3,
            scale: 1.008,
          }}
          transition={{ duration: 0.42, ease: [0.22, 1, 0.36, 1] }}
        />
      </div>
    </motion.div>
  );
}

export default function Presentation() {
  const galleryRef = useRef(null);
  const [columnCount, setColumnCount] = useState(getColumnCount);
  const [galleryWidth, setGalleryWidth] = useState(0);
  const [gap, setGap] = useState(getGap);
  const [collapsedHeight, setCollapsedHeight] = useState(getCollapsedHeight);
  const [galleryHeight, setGalleryHeight] = useState(getCollapsedHeight);
  const [isExpanded, setIsExpanded] = useState(false);
  const canToggle = minorWorks.length > 8;

  useEffect(() => {
    const updateLayout = () => {
      setColumnCount(getColumnCount());
      setGap(getGap());
      setCollapsedHeight(getCollapsedHeight());
    };

    updateLayout();
    window.addEventListener("resize", updateLayout);
    return () => window.removeEventListener("resize", updateLayout);
  }, []);

  useEffect(() => {
    const gallery = galleryRef.current;
    if (!gallery) return undefined;

    const updateWidth = () => setGalleryWidth(gallery.clientWidth);
    const resizeObserver = new ResizeObserver(updateWidth);

    updateWidth();
    resizeObserver.observe(gallery);

    return () => resizeObserver.disconnect();
  }, []);

  const layout = useMemo(
    () => buildMasonryLayout(minorWorks, columnCount, galleryWidth, gap),
    [columnCount, galleryWidth, gap],
  );

  useEffect(() => {
    setGalleryHeight(layout.height + 180);
  }, [layout.height]);

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
              Подборка небольших макетов: афиши, баннеры, объявления, иллюстрации, праздничные ивенты и точечные визуальные задачи.
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
            className="relative w-full"
            style={{ height: layout.height || collapsedHeight }}
          >
            {layout.items.map((item) => (
              <MinorWorkImage key={item.work.id} item={item} />
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
