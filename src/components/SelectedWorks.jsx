import { useEffect, useRef } from "react";
import SectionHeading from "./SectionHeading";
import ProjectCard from "./ProjectCard";
import ScrollReveal from "./ScrollReveal";
import { selectedWorks } from "../data/projects";

const loopCopies = [0, 1, 2, 3, 4];
const middleCopyIndex = 2;

export default function SelectedWorks() {
  const viewportRef = useRef(null);
  const trackRef = useRef(null);
  const positionRef = useRef(0);
  const autoPausedUntilRef = useRef(0);
  const manualFrameRef = useRef(null);
  const dragRef = useRef({
    pointerId: null,
    startX: 0,
    startY: 0,
    lastX: 0,
    isDragging: false,
    hasDirection: false,
  });

  const getSetWidth = () => {
    const track = trackRef.current;
    if (!track) return 0;

    const firstSet = track.children[0];
    const secondSet = track.children[1];

    if (!firstSet || !secondSet) return track.scrollWidth / 3;
    return secondSet.offsetLeft - firstSet.offsetLeft;
  };

  const normalizePosition = (position) => {
    const viewport = viewportRef.current;
    const setWidth = getSetWidth();

    if (!viewport || setWidth <= viewport.clientWidth) return position;
    if (position >= setWidth * (middleCopyIndex + 1)) return position - setWidth;
    if (position < setWidth * middleCopyIndex) return position + setWidth;
    return position;
  };

  const applyPosition = (position) => {
    const track = trackRef.current;
    if (!track) return;
    track.style.transform = `translate3d(${-position}px, 0, 0)`;
  };

  useEffect(() => {
    const track = trackRef.current;
    const viewport = viewportRef.current;
    if (!track || !viewport) return;

    let frameId;
    let lastTime;
    const speed = 22;

    const ensureMiddleCopy = () => {
      const setWidth = getSetWidth();
      if (setWidth <= viewport.clientWidth) return;
      if (!positionRef.current) positionRef.current = setWidth * middleCopyIndex;
      positionRef.current = normalizePosition(positionRef.current);
      applyPosition(positionRef.current);
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

    const firstSet = track.children[0];
    const secondSet = track.children[1];
    const setWidth =
      firstSet && secondSet
        ? secondSet.offsetLeft - firstSet.offsetLeft
        : track.scrollWidth / 3;
    if (setWidth <= viewport.clientWidth) return;

    if (manualFrameRef.current) cancelAnimationFrame(manualFrameRef.current);

    const distance = Math.min(viewport.clientWidth * 0.9, 760);
    const currentPosition = positionRef.current || setWidth * middleCopyIndex;

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

      positionRef.current = normalizePosition(nextPosition);
      track.style.transform = `translate3d(${-positionRef.current}px, 0, 0)`;
      manualFrameRef.current = null;
    };

    manualFrameRef.current = requestAnimationFrame(animate);
  };

  const handlePointerDown = (event) => {
    if (!event.isPrimary || event.button !== 0) return;

    dragRef.current = {
      pointerId: event.pointerId,
      startX: event.clientX,
      startY: event.clientY,
      lastX: event.clientX,
      isDragging: false,
      hasDirection: false,
    };
  };

  const handlePointerMove = (event) => {
    const drag = dragRef.current;
    if (drag.pointerId !== event.pointerId) return;

    const deltaX = event.clientX - drag.lastX;
    const totalX = event.clientX - drag.startX;
    const totalY = event.clientY - drag.startY;

    if (!drag.hasDirection) {
      if (Math.abs(totalX) < 8 && Math.abs(totalY) < 8) return;

      drag.hasDirection = true;
      drag.isDragging = Math.abs(totalX) > Math.abs(totalY);

      if (!drag.isDragging) return;

      event.currentTarget.setPointerCapture(event.pointerId);
      if (manualFrameRef.current) cancelAnimationFrame(manualFrameRef.current);
    }

    if (!drag.isDragging) return;

    event.preventDefault();
    autoPausedUntilRef.current = performance.now() + 1800;
    positionRef.current = normalizePosition(positionRef.current - deltaX);
    applyPosition(positionRef.current);
    drag.lastX = event.clientX;
  };

  const handlePointerUp = (event) => {
    const drag = dragRef.current;
    if (drag.pointerId !== event.pointerId) return;

    if (drag.isDragging) {
      autoPausedUntilRef.current = performance.now() + 1800;
      positionRef.current = normalizePosition(positionRef.current);
      applyPosition(positionRef.current);
      event.currentTarget.releasePointerCapture(event.pointerId);
    }

    dragRef.current.pointerId = null;
  };

  return (
    <section id="works" className="section-padding pb-10 pt-6 sm:pb-12 sm:pt-8 lg:pb-14 lg:pt-10">
      <div className="mx-auto max-w-[1600px]">
        <div className="mb-8 flex flex-col gap-5 sm:mb-10 lg:flex-row lg:items-end lg:justify-between">
          <SectionHeading
            label="Графический дизайн"
            title="Рекламные кампании и креативные дизайн-решения"
            description="Разработка дизайн-систем и визуальных решений для рекламных кампаний, цифровых и офлайн-коммуникаций"
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
              className="-mx-5 touch-pan-y overflow-hidden px-5 pb-3 sm:-mx-8 sm:px-8 lg:-mx-12 lg:px-12 xl:-mx-16 xl:px-16"
              onPointerDown={handlePointerDown}
              onPointerMove={handlePointerMove}
              onPointerUp={handlePointerUp}
              onPointerCancel={handlePointerUp}
            >
              <div ref={trackRef} className="flex will-change-transform">
                {loopCopies.map((copyIndex) => (
                  <div
                    key={copyIndex}
                    className="flex shrink-0 gap-5 pr-5 lg:gap-7 lg:pr-7"
                  >
                    {selectedWorks.map((project) => (
                      <div key={`${project.id}-${copyIndex}`} className="shrink-0">
                        <ProjectCard
                          {...project}
                          className="h-full"
                          mediaMode="fixed-height"
                        />
                      </div>
                    ))}
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
