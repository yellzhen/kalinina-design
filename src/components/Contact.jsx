import { motion } from "framer-motion";
import ScrollReveal from "./ScrollReveal";
import { profile } from "../data/profile";

const links = [
  { label: "Email", href: `mailto:${profile.email}`, value: profile.email },
  { label: "Телефон", href: profile.phoneHref, value: profile.phone },
  {
    label: "Telegram",
    href: profile.telegram,
    value: profile.telegramHandle,
  },
];

export default function Contact() {
  return (
    <section
      id="contact"
      className="section-padding relative z-10 -mt-12 pb-10 pt-0 sm:-mt-16 sm:pb-12 lg:-mt-24 lg:pb-14"
    >
      <div className="mx-auto max-w-[1600px]">
        <ScrollReveal>
          <h2 className="max-w-4xl font-display text-[clamp(2.5rem,6vw,5rem)] font-semibold leading-[1.02] tracking-tight text-cream">
            Свяжитесь со мной
          </h2>
        </ScrollReveal>

        <ScrollReveal delay={0.15} className="mt-10 sm:mt-12">
          <ul className="grid gap-8">
            {links.map((link, i) => (
              <motion.li
                key={link.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08, duration: 0.5 }}
              >
                <p className="text-sm text-cream-muted">
                  {link.label}
                </p>
                <a
                  href={link.href}
                  target={link.href.startsWith("http") ? "_blank" : undefined}
                  rel={link.href.startsWith("http") ? "noopener noreferrer" : undefined}
                  className="mt-2 inline-block font-display text-xl text-cream transition-colors hover:text-accent-warm sm:text-2xl"
                >
                  {link.value}
                </a>
              </motion.li>
            ))}
          </ul>
        </ScrollReveal>
      </div>
    </section>
  );
}
