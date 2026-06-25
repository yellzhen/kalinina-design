import { optimizedImages } from "../generated/image-manifest";

const normalizeName = (name) => name.normalize("NFC");

const selectedMetaEntries = {
  "масленица молл": {
    title: "Сезонная рекламная кампания для ТРЦ «Марко молл»",
    category: "Наружная реклама · Digital",
  },
  "масленица привязка тц": {
    title: "Серия макетов для offline и digital-носителей",
    category: "Motion · Бренд-коммуникация",
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

const imageEntries = Object.entries(optimizedImages);
const selectedImageEntries = imageEntries.filter(([path]) =>
  path.startsWith("../assets/selected-works/"),
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
