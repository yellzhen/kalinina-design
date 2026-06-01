import { optimizedImages } from "../generated/image-manifest";

const publicAsset = (path) => `${import.meta.env.BASE_URL}${path}`;

const normalizeName = (name) => name.normalize("NFC");

const selectedMetaEntries = {
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
  "падел клуб длинный макет": {
    title: "Padel Club — энергия игры",
    category: "Широкий формат · Спортивная навигация",
  },
  "marmax-campaign": {
    title: "ИСГ «Мармакс» — визуальная кампания",
    category: "Key visual · Бренд-коммуникация",
  },
};

const selectedMeta = Object.fromEntries(
  Object.entries(selectedMetaEntries).map(([key, value]) => [
    normalizeName(key),
    value,
  ]),
);

const getFileName = (path) =>
  path
    .split("/")
    .pop()
    .replace(/\.[^.]+$/, "");

const toTitle = (fileName) =>
  normalizeName(fileName)
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

const randomRank = (path) => {
  const value = normalizeName(getFileName(path));
  let hash = 2166136261;

  for (let i = 0; i < value.length; i += 1) {
    hash ^= value.charCodeAt(i);
    hash = Math.imul(hash, 16777619);
  }

  return hash >>> 0;
};

const byRandomRank = ([a], [b]) => randomRank(a) - randomRank(b);

const imageEntries = Object.entries(optimizedImages);
const selectedImageEntries = imageEntries.filter(([path]) =>
  path.startsWith("../assets/selected-works/"),
);
const minorImageEntries = imageEntries.filter(([path]) =>
  path.startsWith("../assets/minor-works/"),
);

export const selectedWorks = selectedImageEntries
  .sort(byFileName)
  .map(([path, image]) => {
    const fileName = normalizeName(getFileName(path));
    const meta = selectedMeta[fileName] || {};

    return {
      id: toId(fileName),
      title: meta.title || "",
      category: meta.category || "Графический дизайн",
      year: meta.year || "2025",
      type: "image",
      src: image.src,
      blurSrc: image.blur,
      width: image.width,
      height: image.height,
    };
  });

export const minorWorks = minorImageEntries
  .sort(byRandomRank)
  .map(([path, image]) => {
    const fileName = getFileName(path);

    return {
      id: toId(fileName),
      title: toTitle(fileName),
      src: image.src,
      blurSrc: image.blur,
      width: image.width,
      height: image.height,
    };
  });

export const motionWorks = [
  {
    id: "holland-june-outdoor",
    title: "ЖК «Голландия» — летняя outdoor-кампания",
    category: "Motion · Наружная реклама",
    year: "2025",
    type: "video",
    src: publicAsset("works/1440х720_Голландия июнь 2025_RusOutDoor-poster.jpg"),
    poster: publicAsset("works/1440х720_Голландия июнь 2025_RusOutDoor-poster.jpg"),
    video: publicAsset("works/1440х720_Голландия июнь 2025_RusOutDoor.mp4"),
  },
  {
    id: "zarina-fashion-second",
    title: "«Марко молл» × ZARINA — fashion-анонс",
    category: "Motion · Коллаборация",
    year: "2026",
    type: "video",
    src: publicAsset("works/1440х720_Зарина_2-poster.jpg"),
    poster: publicAsset("works/1440х720_Зарина_2-poster.jpg"),
    video: publicAsset("works/1440х720_Зарина_2.mp4"),
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
