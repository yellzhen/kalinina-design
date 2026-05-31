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

const publicAsset = (path) => `${import.meta.env.BASE_URL}${path}`;

const selectedMeta = {
  "Манхэттен машино-место в подарок": {
    title: "«Манхэттен» — машино-место в подарок",
    category: "Акция · Наружная реклама",
  },
  "Мармакс 1": {
    title: "ИСГ «Мармакс» — квартиры с террасами",
    category: "Key visual · Наружная реклама",
  },
  "Мармакс 2": {
    title: "ИСГ «Мармакс» — утро в новом доме",
    category: "Key visual · Digital",
  },
  "масленица молл": {
    title: "ТРЦ «Марко молл» — масленичная афиша",
    category: "Событие · Соцсети",
  },
  "молл 1": {
    title: "ТРЦ «Марко молл» — весенняя коммуникация",
    category: "Промо · Digital",
  },
  "молл 2": {
    title: "ТРЦ «Марко молл» — праздничный анонс",
    category: "Событие · Digital",
  },
  "падел клуб длинный макет": {
    title: "Padel Club — спортивный баннер",
    category: "Широкий формат · Навигация",
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
    title: "ТРЦ «Марко молл» — весенняя digital-кампания",
    category: "Motion · Экраны ТРЦ",
    year: "2026",
    type: "video",
    src: publicAsset("works/marco-mall-march-2026-poster.jpg"),
    poster: publicAsset("works/marco-mall-march-2026-poster.jpg"),
    video: publicAsset("works/marco-mall-march-2026.mp4"),
  },
  {
    id: "marco-february",
    title: "ТРЦ «Марко молл» — февральский промо-ролик",
    category: "Motion · Промо",
    year: "2026",
    type: "video",
    src: publicAsset("works/marco-mall-february-2026-poster.jpg"),
    poster: publicAsset("works/marco-mall-february-2026-poster.jpg"),
    video: publicAsset("works/marco-mall-february-2026.mp4"),
  },
  {
    id: "zarina-collab",
    title: "«Марко молл» × ZARINA — fashion-коллаборация",
    category: "Motion · Коллаборация",
    year: "2025",
    type: "video",
    src: publicAsset("works/marco-mall-zarina-poster.jpg"),
    poster: publicAsset("works/marco-mall-zarina-poster.jpg"),
    video: publicAsset("works/marco-mall-zarina.mp4"),
  },
  {
    id: "marmax-motion",
    title: "ИСГ «Мармакс» — динамичная презентация проекта",
    category: "Motion · Digital",
    year: "2025",
    type: "video",
    src: publicAsset("works/marmax-motion-poster.jpg"),
    poster: publicAsset("works/marmax-motion-poster.jpg"),
    video: publicAsset("works/marmax-motion.mp4"),
  },
];
