const imageModules = import.meta.glob(
  "../assets/selected-works/*.{jpg,jpeg,png,webp,avif}",
  {
    eager: true,
    query: "?url",
    import: "default",
  },
);

const minorImageModules = import.meta.glob(
  "../assets/minor-works/*.{jpg,jpeg,png,webp,avif}",
  {
    eager: true,
    query: "?url",
    import: "default",
  },
);

const selectedMeta = {
  "Курск_утро": {
    title: "Мармакс · проект в Курске",
    category: "Билборды · Стройплощадки",
  },
  "Манхэттен машино-место в подарок": {
    title: "«Манхэттен» — машино-место в подарок",
    category: "Акция · Наружная реклама",
  },
  "Мармакс": {
    title: "ИСГ «Мармакс» — рекламная кампания",
    category: "Наружная реклама · Digital",
  },
  "Мармакс-1": {
    title: "ИСГ «Мармакс» — бренд-коммуникация",
    category: "Key visual · Digital",
  },
  "Мармакс_утро": {
    title: "Мармакс · утренняя коммуникация",
    category: "Графический дизайн",
  },
  "мармакс 1": {
    title: "Мармакс · серия носителей",
    category: "Рекламные материалы",
  },
  "масленица молл": {
    title: "ТРЦ «Марко молл» — Масленица",
    category: "Событие · Digital",
  },
  "молл 1": {
    title: "ТРЦ «Марко молл» — промо",
    category: "Рекламная кампания",
  },
  "молл 2": {
    title: "ТРЦ «Марко молл» — digital-носители",
    category: "Digital · Соцсети",
  },
};

const getFileName = (path) =>
  path
    .split("/")
    .pop()
    .replace(/\.[^.]+$/, "");

const toTitle = (fileName) =>
  fileName
    .replace(/[_-]+/g, " ")
    .replace(/\s+/g, " ")
    .trim();

const toId = (fileName) =>
  toTitle(fileName)
    .toLowerCase()
    .replace(/[^a-zа-яё0-9]+/gi, "-")
    .replace(/^-+|-+$/g, "");

const byFileName = ([a], [b]) =>
  getFileName(a).localeCompare(getFileName(b), "ru", { numeric: true });

export const selectedWorks = Object.entries(imageModules)
  .sort(byFileName)
  .map(([path, src]) => {
    const fileName = getFileName(path);
    const meta = selectedMeta[fileName] || {};

    return {
      id: toId(fileName),
      title: meta.title || toTitle(fileName),
      category: meta.category || "Графический дизайн",
      year: meta.year || "2025",
      type: "image",
      src,
    };
  });

export const minorWorks = Object.entries(minorImageModules)
  .sort(byFileName)
  .map(([path, src]) => {
    const fileName = getFileName(path);

    return {
      id: toId(fileName),
      title: toTitle(fileName),
      src,
    };
  });

export const motionWorks = [
  {
    id: "marco-march",
    title: "ТРЦ «Марко молл» — март 2026",
    category: "Анимация для экранов",
    year: "2026",
    type: "video",
    src: "/works/marco-mall-march-2026-poster.jpg",
    poster: "/works/marco-mall-march-2026-poster.jpg",
    video: "/works/marco-mall-march-2026.mp4",
  },
  {
    id: "marco-february",
    title: "ТРЦ «Марко молл» — февраль 2026",
    category: "Промо · Digital",
    year: "2026",
    type: "video",
    src: "/works/marco-mall-february-2026-poster.jpg",
    poster: "/works/marco-mall-february-2026-poster.jpg",
    video: "/works/marco-mall-february-2026.mp4",
  },
  {
    id: "zarina-collab",
    title: "Коллаборация «Марко молл» × ZARINA",
    category: "Рекламная кампания",
    year: "2025",
    type: "video",
    src: "/works/marco-mall-zarina-poster.jpg",
    poster: "/works/marco-mall-zarina-poster.jpg",
    video: "/works/marco-mall-zarina.mp4",
  },
  {
    id: "marmax-motion",
    title: "ИСГ «Мармакс» — motion для digital",
    category: "Анимация · Соцсети",
    year: "2025",
    type: "video",
    src: "/works/marmax-motion-poster.jpg",
    poster: "/works/marmax-motion-poster.jpg",
    video: "/works/marmax-motion.mp4",
  },
];
