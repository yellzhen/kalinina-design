import SectionHeading from "./SectionHeading";
import ProjectCard from "./ProjectCard";
import {
  ScrollRevealStagger,
  ScrollRevealItem,
} from "./ScrollReveal";
import { motionWorks } from "../data/projects";

export default function MotionSection() {
  return (
    <section
      id="motion"
      className="section-padding bg-graphite-900/50 pb-6 pt-10 sm:pb-8 sm:pt-12 lg:pb-10 lg:pt-14"
    >
      <div className="mx-auto max-w-[1600px]">
        <div className="mb-8 sm:mb-10">
          <SectionHeading
            label="Анимация и digital"
            title="Motion для экранов, соцсетей и рекламы"
            description="Широкоформатные ролики 1440×720 — целиком, без обрезки. Наведите на карточку, чтобы воспроизвести."
          />
        </div>

        <ScrollRevealStagger className="grid gap-5 lg:grid-cols-2 lg:gap-6">
          {motionWorks.map((reel) => (
            <ScrollRevealItem key={reel.id}>
              <ProjectCard {...reel} />
            </ScrollRevealItem>
          ))}
        </ScrollRevealStagger>
      </div>
    </section>
  );
}
