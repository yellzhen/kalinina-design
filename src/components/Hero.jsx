import { motion } from "framer-motion";
import ScrollReveal from "./ScrollReveal";

const heroImage = `${import.meta.env.BASE_URL}works/marmax-campaign.png`;

export default function Hero() {
  return (
    <section className="section-padding pb-10 sm:pb-12 lg:pb-14">
      <div className="mx-auto max-w-[1600px]">
        <ScrollReveal>
          <p className="text-sm font-medium text-cream-muted">
            Избранный проект
          </p>
          <h2 className="mt-3 font-display text-2xl font-semibold text-cream sm:text-3xl">
            ИСГ «Мармакс» — визуальная кампания
          </h2>
        </ScrollReveal>

        <ScrollReveal delay={0.1} y={40} className="mt-8">
          <motion.div
            className="overflow-hidden rounded-sm bg-graphite-850"
            whileHover={{ boxShadow: "0 28px 80px rgba(0, 0, 0, 0.28)" }}
          >
            <div className="flex items-center justify-center bg-graphite-800/40 p-4 sm:p-8">
              <motion.img
                src={heroImage}
                alt="Рекламная кампания ИСГ Мармакс"
                className="h-auto w-full max-h-[min(75vh,880px)] object-contain"
                initial={{ opacity: 0, scale: 0.98 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
              />
            </div>
          </motion.div>
        </ScrollReveal>
      </div>
    </section>
  );
}
