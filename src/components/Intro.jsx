import { motion } from "framer-motion";
import { profile } from "../data/profile";
import avatar from "../../avatar.png";
import avatarHover from "../../avatar2.png";

export default function Intro() {
  return (
    <section className="relative flex flex-col justify-center overflow-hidden pb-10 pt-20 sm:pb-8 sm:pt-24 lg:min-h-[68vh] lg:pb-10">
      <motion.div
        className="pointer-events-none absolute -left-24 top-1/3 h-72 w-72 rounded-full bg-accent-warm/5 blur-[100px]"
        animate={{ opacity: [0.2, 0.45, 0.2] }}
        transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
      />

      <div className="section-padding relative z-10 mx-auto w-full max-w-[1600px]">
        <div className="grid items-center gap-8 sm:gap-10 lg:grid-cols-[minmax(0,0.95fr)_minmax(420px,0.72fr)] lg:gap-16">
          <div className="contents lg:block">
            <motion.p
              className="order-1 mb-3 hidden text-sm font-medium text-cream-muted sm:mb-4 sm:block sm:text-base lg:order-none"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
            >
              Привет! 👋
            </motion.p>

            <motion.h1
              className="order-3 max-w-4xl font-display text-[2.65rem] font-semibold leading-[1.02] tracking-tight text-cream min-[390px]:text-[2.9rem] sm:text-[clamp(2.75rem,9vw,7rem)] sm:leading-[0.92] lg:order-none"
              initial={{ opacity: 0, y: 28 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
            >
              <span className="whitespace-nowrap">Я {profile.name} —</span>{" "}
              <span className="text-cream-muted">
                {profile.role.toLowerCase()}
              </span>
            </motion.h1>

            <motion.div
              className="order-4 mt-8 flex flex-wrap gap-3 sm:mt-10 sm:gap-4 lg:order-none"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.35 }}
            >
              <a
                href={`${import.meta.env.BASE_URL}resume.pdf`}
                download="Калинина_Евгения_дизайнер_резюме.pdf"
                className="inline-flex items-center gap-2 rounded-full bg-cream px-5 py-3 text-sm font-medium text-graphite-950 transition-opacity hover:opacity-90 sm:px-6"
              >
                Скачать резюме
              </a>
              <a
                href="#contact"
                className="inline-flex items-center gap-2 rounded-full border border-cream/55 bg-transparent px-5 py-3 text-sm font-medium text-cream transition-colors hover:border-cream hover:bg-cream hover:text-graphite-950 sm:px-6"
              >
                Связаться со мной
              </a>
            </motion.div>
          </div>

          <motion.div
            className="order-2 justify-self-center sm:justify-self-start lg:order-none lg:justify-self-end"
            initial={{ opacity: 0, y: 28, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.75, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="group relative w-full max-w-[250px] min-[390px]:max-w-[280px] sm:max-w-[350px] lg:max-w-[420px] xl:max-w-[470px]">
              <img
                src={avatar}
                alt="Евгения Калинина"
                className="h-auto w-full rounded-sm object-contain shadow-[0_32px_90px_rgba(0,0,0,0.38)]"
              />
              <img
                src={avatarHover}
                alt=""
                aria-hidden="true"
                className="absolute inset-0 h-full w-full rounded-sm object-contain opacity-0 transition-opacity duration-300 ease-out will-change-opacity group-hover:opacity-100"
                loading="eager"
                decoding="async"
                fetchPriority="high"
              />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
