import { optimizedImages } from "../generated/image-manifest";

const publicAsset = (path) => `${import.meta.env.BASE_URL}${path}`;

const normalizeName = (name) => name.normalize("NFC");

const selectedMetaEntries = {
  "Манхэттен машино-место в подарок": {
    title: "Рекламная кампания для акции девелопера",
    category: "Наружная реклама · Рязань",
  },
  "Мармакс 1": {
    title: "Имиджевая рекламная кампания",
    category: "Наружная реклама · Рязань",
  },
  "Мармакс 2": {
    title: "Имиджевая рекламная кампания",
    category: "Наружная реклама · Курск",
  },
  "масленица молл": {
    title: "Сезонная рекламная кампания для ТРЦ «Марко молл»",
    category: "Наружная реклама · Digital",
  },
  "молл 1": {
    title: "ТРЦ «Марко молл» — весенняя коммуникация",
    category: "Промо · Digital",
  },
  "молл 2": {
    title: "Рекламная кампания для ТРЦ «Марко молл»",
    category: "Наружная реклама · Digital",
  },
  "падел клуб длинный макет": {
    title: "Брендирование падел-клуба",
    category: "Широкий формат · Коллаборация · Курск",
  },
  "marmax-campaign": {
    title: "Реклама на экранах биатлоного комплекса",
    category: "Motion · Коллаборация",
  },
  "масленица привязка тц": {
    title: "Серия макетов для offline и digital-носителей",
    category: "Motion · Бренд-коммуникация",
  },
  "весна молл билбдорд": {
    title: "Рекламная кампания для ТРЦ «Марко молл»",
    category: "Наружная реклама · Digital",
  },
  "забор 3000х28050": {
    title: "Брендирование строительной площадки",
    category: "Широкий формата · Стройплощадка · Рязань",
  },
  "книжка поляна": {
    title: "Дизайн арт-объекта",
    category: "Нестандратный формат · Рязань",
  }
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

const toImageProject = ([path, image], fallbackCategory = "Графический дизайн") => {
  const fileName = normalizeName(getFileName(path));
  const meta = selectedMeta[fileName] || {};

  return {
    id: toId(fileName),
    title: meta.title || "",
    category: meta.category || fallbackCategory,
    year: meta.year || "2025",
    type: "image",
    src: image.src,
    blurSrc: image.blur,
    width: image.width,
    height: image.height,
  };
};

export const selectedWorks = selectedImageEntries
  .sort(byFileName)
  .map((entry) => toImageProject(entry));

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
    title: "«Голландия» — летняя outdoor-кампания",
    category: "Motion · Наружная реклама",
    year: "2025",
    type: "video",
    src: publicAsset("works/1440х720_Голландия июнь 2025_RusOutDoor-poster.jpg"),
    poster: publicAsset("works/1440х720_Голландия июнь 2025_RusOutDoor-poster.jpg"),
    video: publicAsset("works/1440х720_Голландия июнь 2025_RusOutDoor.mp4"),
  },
  {
    id: "zarina-fashion-second",
    title: "«Марко молл» × ZARINA",
    category: "Motion · Digital · Коллаборация",
    year: "2026",
    type: "video",
    src: publicAsset("works/1440х720_Зарина_2-poster.jpg"),
    poster: publicAsset("works/1440х720_Зарина_2-poster.jpg"),
    video: publicAsset("works/1440х720_Зарина_2.mp4"),
  },
  {
    id: "marco-february",
    title: "«Марко молл» — февральский промо-ролик",
    category: "Наружная реклама · Digital",
    year: "2026",
    type: "video",
    src: publicAsset("works/marco-mall-february-2026-poster.jpg"),
    poster: publicAsset("works/marco-mall-february-2026-poster.jpg"),
    video: publicAsset("works/marco-mall-february-2026.mp4"),
  },
  {
    id: "marmax-motion",
    title: "«Мармакс» — видео для наружной рекламы",
    category: "Наружная реклама · Digital",
    year: "2026",
    type: "video",
    src: publicAsset("works/marmax-motion-poster.jpg"),
    poster: publicAsset("works/marmax-motion-poster.jpg"),
    video: publicAsset("works/marmax-motion.mp4"),
  },
];
