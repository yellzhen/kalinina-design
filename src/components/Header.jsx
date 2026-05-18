import { motion, useScroll, useTransform } from "framer-motion";
import { useEffect, useState } from "react";
import { navLinks } from "../data/skills";
import { profile } from "../data/profile";

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const { scrollY } = useScroll();
  const headerBg = useTransform(
    scrollY,
    [0, 80],
    ["rgba(8, 8, 9, 0)", "rgba(8, 8, 9, 0.85)"]
  );
  const headerBorder = useTransform(
    scrollY,
    [0, 80],
    ["rgba(255,255,255,0)", "rgba(255,255,255,0.06)"]
  );

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  return (
    <motion.header
      style={{ backgroundColor: headerBg, borderBottomColor: headerBorder }}
      className="fixed inset-x-0 top-0 z-[80] border-b backdrop-blur-md"
    >
      <div className="section-padding mx-auto flex h-16 max-w-[1600px] items-center justify-between sm:h-20">
        <a
          href="#"
          className="relative z-[90] max-w-[13rem] truncate font-display text-base font-semibold tracking-tight text-cream sm:max-w-none sm:text-xl"
        >
          {profile.name} Калинина<span className="text-cream-muted">.</span>
        </a>

        <nav className="hidden items-center gap-10 md:flex">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-sm text-cream-muted transition-colors hover:text-cream"
            >
              {link.label}
            </a>
          ))}
        </nav>

        <a
          href="#contact"
          className="hidden rounded-full border border-cream/15 px-5 py-2.5 text-sm text-cream transition-colors hover:border-cream/30 hover:bg-cream/5 md:inline-flex"
        >
          Связаться
        </a>

        <button
          type="button"
          aria-label={menuOpen ? "Закрыть меню" : "Открыть меню"}
          className="relative z-[90] flex h-10 w-10 flex-col items-center justify-center gap-1.5 md:hidden"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          <motion.span
            animate={menuOpen ? { rotate: 45, y: 6 } : { rotate: 0, y: 0 }}
            className="block h-px w-6 bg-cream"
          />
          <motion.span
            animate={menuOpen ? { opacity: 0 } : { opacity: 1 }}
            className="block h-px w-6 bg-cream"
          />
          <motion.span
            animate={menuOpen ? { rotate: -45, y: -6 } : { rotate: 0, y: 0 }}
            className="block h-px w-6 bg-cream"
          />
        </button>
      </div>

      <motion.nav
        initial={false}
        animate={
          menuOpen
            ? { opacity: 1, pointerEvents: "auto" }
            : { opacity: 0, pointerEvents: "none" }
        }
        transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
        className="fixed inset-0 z-[70] min-h-[100dvh] overflow-y-auto bg-[#080809] px-6 pb-10 pt-24 md:hidden"
      >
        <ul className="flex flex-col gap-4">
          {navLinks.map((link, i) => (
            <motion.li
              key={link.href}
              initial={false}
              animate={menuOpen ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
              transition={{ delay: menuOpen ? i * 0.05 : 0 }}
            >
              <a
                href={link.href}
                onClick={() => setMenuOpen(false)}
                className="block border-b border-cream/10 py-3 font-display text-3xl font-semibold leading-tight text-cream"
              >
                {link.label}
              </a>
            </motion.li>
          ))}
        </ul>
        <a
          href="#contact"
          onClick={() => setMenuOpen(false)}
          className="mt-8 inline-flex w-fit rounded-full bg-cream px-6 py-3 text-sm font-medium text-graphite-950"
        >
          Связаться
        </a>
      </motion.nav>
    </motion.header>
  );
}
