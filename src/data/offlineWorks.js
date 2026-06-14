import { optimizedImages } from "../generated/image-manifest";

const normalizeName = (name) => name.normalize("NFC");

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

const offlineMetaEntries = {
  "падел клуб длинный макет": {
    title: "Брендирование падел-клуба",
    category: "Широкий формат · Коллаборация",
    order: 10,
  },
  "забор 3000х28050": {
    title: "Брендирование строительной площадки",
    category: "Широкий формат · Стройплощадка",
    order: 20,
  },
  "книжка поляна": {
    title: "Дизайн арт-объекта",
    category: "Нестандартный формат",
    order: 40,
  },
  "медный_лифлет": {
    title: "Складной лифлет для резиденции «Медный»",
    category: "Офлайн-носитель",
    order: 30,
  },
};

const offlineMeta = Object.fromEntries(
  Object.entries(offlineMetaEntries).map(([key, value]) => [
    normalizeName(key),
    value,
  ]),
);

export const offlineWorks = Object.entries(optimizedImages)
  .filter(([path]) => path.startsWith("../assets/offline-works/"))
  .map(([path, image]) => {
    const fileName = normalizeName(getFileName(path));
    const meta = offlineMeta[fileName] || {};

    return {
      id: toId(fileName),
      title: meta.title || "",
      category: meta.category || "Оффлайн-креатив",
      order: meta.order || 100,
      src: image.src,
      blurSrc: image.blur,
      width: image.width,
      height: image.height,
    };
  })
  .sort((a, b) => a.order - b.order);
