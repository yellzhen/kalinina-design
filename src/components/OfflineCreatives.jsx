import SectionHeading from "./SectionHeading";
import { ScrollRevealItem, ScrollRevealStagger } from "./ScrollReveal";
import { offlineWorks } from "../data/offlineWorks";

const getCardClass = ({ width, height }) => {
  const ratio = width && height ? width / height : 1;

  if (ratio >= 3) return "max-w-[1400px]";
  if (ratio <= 1.6) return "max-w-[900px]";
  return "max-w-[1100px]";
};

const getAlignClass = ({ id }) => (id === "книжка-поляна" ? "mx-auto" : "");

export default function OfflineCreatives() {
  if (!offlineWorks.length) return null;

  return (
    <section className="section-padding pt-4 sm:pt-6 lg:pt-8">
      <div className="mx-auto max-w-[1600px]">
        <div className="mb-8 flex flex-col gap-5 sm:mb-10 lg:flex-row lg:items-end lg:justify-between">
          <SectionHeading
            label="Оффлайн-креативы"
            title="Макеты для пространства, печати и нестандартных носителей"
            description="Подборка решений, которые работают вне экрана: от длинных форматов до объектного дизайна."
          />
        </div>

        <ScrollRevealStagger
          className="flex flex-col gap-8 sm:gap-10 lg:gap-12"
          stagger={0.14}
          amount={0.08}
        >
          {offlineWorks.map((work) => (
            <ScrollRevealItem key={work.id} y={56}>
              <article
                className={`w-full overflow-hidden rounded-sm ${getCardClass(
                  work,
                )} ${getAlignClass(work)}`}
              >
                <div
                  className="overflow-hidden bg-graphite-800 bg-cover bg-center"
                  style={{
                    aspectRatio:
                      work.width && work.height
                        ? `${work.width} / ${work.height}`
                        : undefined,
                    backgroundImage: work.blurSrc ? `url(${work.blurSrc})` : undefined,
                  }}
                >
                  <img
                    src={work.src}
                    alt={work.title || work.category || "Оффлайн-креатив"}
                    width={work.width}
                    height={work.height}
                    className="h-auto w-full object-contain"
                    loading="lazy"
                    decoding="async"
                  />
                </div>

                <div className="px-1 pt-2">
                  <p className="text-[10px] leading-none text-cream-muted/70">
                    {work.category}
                  </p>
                  {work.title && (
                    <h3 className="mt-1 font-display text-sm font-medium tracking-tight text-cream/85 sm:text-base">
                      {work.title}
                    </h3>
                  )}
                </div>
              </article>
            </ScrollRevealItem>
          ))}
        </ScrollRevealStagger>
      </div>
    </section>
  );
}
