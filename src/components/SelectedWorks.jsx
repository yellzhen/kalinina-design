import { useEffect, useMemo, useRef } from "react";
import SectionHeading from "./SectionHeading";
import ProjectCard from "./ProjectCard";
import ScrollReveal from "./ScrollReveal";
import { selectedWorks } from "../data/projects";

export default function SelectedWorks() {
  const viewportRef = useRef(null);
  const trackRef = useRef(null);
  const positionRef = useRef(0);
  const autoPausedUntilRef = useRef(0);
  const manualFrameRef = useRef(null);
  const loopedWorks = useMemo(
    () => [...selectedWorks, ...selectedWorks, ...selectedWorks],
    [],
  );

  useEffect(() => {
    const track = trackRef.current;
    const viewport = viewportRef.current;
    if (!track || !viewport) return;

    let frameId;
    let lastTime;
    const speed = 22;

    const getSetWidth = () => track.scrollWidth / 3;
    const normalizePosition = (position) => {
      const setWidth = getSetWidth();
      if (setWidth <= viewport.clientWidth) return position;
      if (position >= setWidth * 2) return position - setWidth;
      if (position < setWidth) return position + setWidth;
      return position;
    };
    const applyPosition = (position) => {
      track.style.transform = `translate3d(${-position}px, 0, 0)`;
    };
    const ensureMiddleCopy = () => {
      const setWidth = getSetWidth();
      if (setWidth <= viewport.clientWidth) return;
      if (positionRef.current < setWidth || positionRef.current >= setWidth * 2) {
        positionRef.current = setWidth;
        applyPosition(positionRef.current);
      }
    };

    ensureMiddleCopy();
    const resizeObserver = new ResizeObserver(ensureMiddleCopy);
    resizeObserver.observe(track);
    resizeObserver.observe(viewport);

    const tick = (time) => {
      if (lastTime === undefined) lastTime = time;
      const delta = time - lastTime;
      lastTime = time;

      if (time < autoPausedUntilRef.current) {
        frameId = requestAnimationFrame(tick);
        return;
      }

      const setWidth = getSetWidth();
      if (setWidth > viewport.clientWidth) {
        positionRef.current += (speed * delta) / 1000;
        positionRef.current = normalizePosition(positionRef.current);
        applyPosition(positionRef.current);
      }

      frameId = requestAnimationFrame(tick);
    };

    frameId = requestAnimationFrame(tick);
    return () => {
      cancelAnimationFrame(frameId);
      resizeObserver.disconnect();
      if (manualFrameRef.current) cancelAnimationFrame(manualFrameRef.current);
    };
  }, []);

  const scrollCarousel = (direction) => {
    const track = trackRef.current;
    const viewport = viewportRef.current;
    if (!track || !viewport) return;

    const setWidth = track.scrollWidth / 3;
    if (setWidth <= viewport.clientWidth) return;

    if (manualFrameRef.current) cancelAnimationFrame(manualFrameRef.current);

    const distance = Math.min(viewport.clientWidth * 0.9, 760);
    let currentPosition = positionRef.current;
    if (direction > 0 && currentPosition + distance >= setWidth * 2) {
      currentPosition -= setWidth;
    }
    if (direction < 0 && currentPosition - distance < setWidth) {
      currentPosition += setWidth;
    }

    const nextPosition = currentPosition + direction * distance;
    const duration = 650;
    const startTime = performance.now();
    autoPausedUntilRef.current = startTime + duration + 150;
    positionRef.current = currentPosition;
    track.style.transform = `translate3d(${-currentPosition}px, 0, 0)`;

    const easeOutCubic = (t) => 1 - Math.pow(1 - t, 3);
    const animate = (time) => {
      const progress = Math.min((time - startTime) / duration, 1);
      const eased = easeOutCubic(progress);
      positionRef.current = currentPosition + (nextPosition - currentPosition) * eased;
      track.style.transform = `translate3d(${-positionRef.current}px, 0, 0)`;

      if (progress < 1) {
        manualFrameRef.current = requestAnimationFrame(animate);
        return;
      }

      positionRef.current = nextPosition;
      manualFrameRef.current = null;
    };

    manualFrameRef.current = requestAnimationFrame(animate);
  };

  return (
    <section id="works" className="section-padding pb-10 pt-6 sm:pb-12 sm:pt-8 lg:pb-14 lg:pt-10">
      <div className="mx-auto max-w-[1600px]">
        <div className="mb-8 flex flex-col gap-5 sm:mb-10 lg:flex-row lg:items-end lg:justify-between">
          <SectionHeading
            label="Графический дизайн"
            title="Рекламные кампании и носители"
            description="Наружная реклама, стройплощадки, key visual и адаптации для digital — проекты ИСГ «Мармакс»."
          />
        </div>

        <div className="relative">
          <div className="pointer-events-none absolute inset-y-0 left-0 right-0 z-20 flex items-center justify-between px-2 sm:px-4 lg:px-6">
            <button
              type="button"
              onClick={() => scrollCarousel(-1)}
              aria-label="Листать работы влево"
              className="pointer-events-auto flex h-12 w-12 items-center justify-center rounded-full bg-graphite-950/70 text-cream shadow-2xl shadow-black/30 backdrop-blur-sm transition-all hover:bg-cream hover:text-graphite-950 sm:h-14 sm:w-14"
            >
              <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
                <path
                  d="M11 4L6 9L11 14"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                />
              </svg>
            </button>
            <button
              type="button"
              onClick={() => scrollCarousel(1)}
              aria-label="Листать работы вправо"
              className="pointer-events-auto flex h-12 w-12 items-center justify-center rounded-full bg-graphite-950/70 text-cream shadow-2xl shadow-black/30 backdrop-blur-sm transition-all hover:bg-cream hover:text-graphite-950 sm:h-14 sm:w-14"
            >
              <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
                <path
                  d="M7 4L12 9L7 14"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                />
              </svg>
            </button>
          </div>
          <ScrollReveal delay={0.1} y={24}>
            <div
              ref={viewportRef}
              className="-mx-5 overflow-hidden px-5 pb-3 sm:-mx-8 sm:px-8 lg:-mx-12 lg:px-12 xl:-mx-16 xl:px-16"
            >
              <div ref={trackRef} className="flex gap-5 will-change-transform lg:gap-7">
                {loopedWorks.map((project, index) => (
                  <div
                    key={`${project.id}-${index}`}
                    className="w-[90vw] shrink-0 sm:w-[76vw] lg:w-[62vw] xl:w-[52vw]"
                  >
                    <ProjectCard {...project} className="h-full" />
                  </div>
                ))}
              </div>
            </div>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
}
