import { useCallback, useEffect, useRef, useState } from "react";
import { Document, Page, pdfjs } from "react-pdf";
import { motion, AnimatePresence } from "framer-motion";
import ScrollReveal from "./ScrollReveal";
import "react-pdf/dist/Page/AnnotationLayer.css";
import "react-pdf/dist/Page/TextLayer.css";

pdfjs.GlobalWorkerOptions.workerSrc = new URL(
  "pdfjs-dist/build/pdf.worker.min.mjs",
  import.meta.url,
).toString();

const PDF_URL = "/presentation.pdf";

export default function Presentation() {
  const containerRef = useRef(null);
  const [numPages, setNumPages] = useState(null);
  const [page, setPage] = useState(1);
  const [width, setWidth] = useState(640);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const update = () => {
      const next = el.clientWidth - 2;
      setWidth(Math.max(next, 280));
    };

    update();
    const observer = new ResizeObserver(update);
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const goTo = useCallback(
    (next) => {
      if (!numPages) return;
      setPage(Math.min(Math.max(next, 1), numPages));
    },
    [numPages]
  );

  useEffect(() => {
    const onKey = (e) => {
      if (e.key === "ArrowLeft") goTo(page - 1);
      if (e.key === "ArrowRight") goTo(page + 1);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [page, goTo]);

  return (
    <section
      id="presentation"
      className="bg-graphite-900/30 pb-10 pt-6 sm:pb-12 sm:pt-8 lg:pb-14 lg:pt-10"
    >
      <div className="section-padding mx-auto max-w-[1600px]">
        <ScrollReveal>
          <h2 className="mb-6 font-display text-3xl font-semibold tracking-tight text-cream sm:mb-8 sm:text-4xl">
            Другие проекты
          </h2>
        </ScrollReveal>

        <ScrollReveal delay={0.1}>
          <motion.div
            className="overflow-hidden rounded-sm bg-graphite-850 shadow-2xl shadow-black/40"
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          >
            <div
              ref={containerRef}
              className="relative flex items-center justify-center bg-graphite-800/50 px-0 py-0 sm:min-h-[min(72vh,780px)] sm:px-4 sm:py-5"
            >
              {loading && (
                <div className="absolute inset-0 z-10 flex items-center justify-center bg-graphite-850/80">
                  <div className="flex flex-col items-center gap-3">
                    <div className="h-8 w-8 animate-spin rounded-full border-2 border-cream/20 border-t-cream" />
                    <p className="text-sm text-cream-muted">Загрузка презентации…</p>
                  </div>
                </div>
              )}

              <Document
                file={PDF_URL}
                onLoadSuccess={({ numPages: total }) => {
                  setNumPages(total);
                  setLoading(false);
                }}
                onLoadError={() => setLoading(false)}
                loading={null}
                className="flex justify-center"
              >
                <AnimatePresence mode="wait" initial={false}>
                  <motion.div
                    key={page}
                    initial={{ opacity: 0, x: 28 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -28 }}
                    transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                    className="pdf-page-shadow max-w-full"
                  >
                    <Page
                      pageNumber={page}
                      width={width}
                      renderTextLayer={false}
                      renderAnnotationLayer={false}
                      className="!bg-white"
                    />
                  </motion.div>
                </AnimatePresence>
              </Document>

              <button
                type="button"
                onClick={() => goTo(page - 1)}
                disabled={page <= 1}
                aria-label="Предыдущая страница"
                className="absolute left-3 top-1/2 z-20 flex h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full bg-graphite-950/75 text-cream shadow-2xl shadow-black/30 backdrop-blur-sm transition-all hover:bg-cream hover:text-graphite-950 disabled:pointer-events-none disabled:opacity-25 sm:left-6 sm:h-14 sm:w-14"
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
                onClick={() => goTo(page + 1)}
                disabled={!numPages || page >= numPages}
                aria-label="Следующая страница"
                className="absolute right-3 top-1/2 z-20 flex h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full bg-graphite-950/75 text-cream shadow-2xl shadow-black/30 backdrop-blur-sm transition-all hover:bg-cream hover:text-graphite-950 disabled:pointer-events-none disabled:opacity-25 sm:right-6 sm:h-14 sm:w-14"
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

            <div className="flex justify-end px-4 py-3 sm:px-6">
              <span className="tabular-nums text-sm text-cream-muted">
                {numPages ? `${page} / ${numPages}` : "—"}
              </span>
            </div>

            {numPages && numPages > 1 && (
              <div className="flex gap-1.5 overflow-x-auto px-4 py-4 sm:justify-center sm:px-6">
                {Array.from({ length: numPages }, (_, i) => i + 1).map((n) => (
                  <button
                    key={n}
                    type="button"
                    onClick={() => setPage(n)}
                    aria-label={`Страница ${n}`}
                    aria-current={n === page ? "true" : undefined}
                    className={`h-1.5 shrink-0 rounded-full transition-all ${
                      n === page
                        ? "w-8 bg-accent-warm"
                        : "w-1.5 bg-cream/20 hover:bg-cream/40"
                    }`}
                  />
                ))}
              </div>
            )}

          </motion.div>
        </ScrollReveal>
      </div>
    </section>
  );
}
