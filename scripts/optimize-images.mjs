import crypto from "node:crypto";
import { mkdir, readdir, stat, writeFile } from "node:fs/promises";
import path from "node:path";
import sharp from "sharp";

const rootDir = process.cwd();
const sourceGroups = [
  {
    name: "selected-works",
    sourceDir: path.join(rootDir, "src/assets/selected-works"),
    sourceKeyPrefix: "../assets/selected-works",
    maxWidth: 2400,
    quality: 84,
  },
  {
    name: "minor-works",
    sourceDir: path.join(rootDir, "src/assets/minor-works"),
    sourceKeyPrefix: "../assets/minor-works",
    maxWidth: 1800,
    quality: 82,
  },
  {
    name: "offline-works",
    sourceDir: path.join(rootDir, "src/assets/offline-works"),
    sourceKeyPrefix: "../assets/offline-works",
    maxWidth: 2400,
    quality: 84,
  },
];
const outputDir = path.join(rootDir, "src/generated");
const imageExtensions = new Set([".jpg", ".jpeg", ".png", ".webp", ".avif"]);

const toPosix = (value) => value.split(path.sep).join("/");

const hashPath = (value) =>
  crypto.createHash("sha1").update(value).digest("hex").slice(0, 12);

const listImages = async (dir) => {
  const entries = await readdir(dir, { withFileTypes: true });
  return entries
    .filter((entry) => entry.isFile())
    .map((entry) => entry.name)
    .filter((fileName) => imageExtensions.has(path.extname(fileName).toLowerCase()))
    .sort((a, b) => a.localeCompare(b, "ru", { numeric: true }));
};

const getFileStat = async (filePath) => {
  try {
    return await stat(filePath);
  } catch {
    return null;
  }
};

const optimizeImage = async ({ group, fileName }) => {
  const sourcePath = path.join(group.sourceDir, fileName);
  const id = `${path.basename(fileName, path.extname(fileName))}-${hashPath(
    `${group.name}/${fileName}`,
  )}`;
  const imageOutput = path.join(outputDir, "images", group.name, `${id}.webp`);
  const blurOutput = path.join(outputDir, "blur", group.name, `${id}.webp`);
  const originalKey = `${group.sourceKeyPrefix}/${toPosix(fileName)}`;

  await mkdir(path.dirname(imageOutput), { recursive: true });
  await mkdir(path.dirname(blurOutput), { recursive: true });

  const sourceStat = await stat(sourcePath);
  const imageStat = await getFileStat(imageOutput);
  const blurStat = await getFileStat(blurOutput);
  const hasFreshGeneratedFiles =
    imageStat &&
    blurStat &&
    imageStat.mtimeMs >= sourceStat.mtimeMs &&
    blurStat.mtimeMs >= sourceStat.mtimeMs;

  if (hasFreshGeneratedFiles) {
    const metadata = await sharp(imageOutput).metadata();

    return {
      originalKey,
      imageImport: `./images/${group.name}/${id}.webp`,
      blurImport: `./blur/${group.name}/${id}.webp`,
      width: metadata.width || 1,
      height: metadata.height || 1,
      skipped: true,
    };
  }

  const optimizedBuffer = await sharp(sourcePath)
    .rotate()
    .resize({
      width: group.maxWidth,
      withoutEnlargement: true,
    })
    .webp({
      quality: group.quality,
      effort: 5,
    })
    .toBuffer();

  const blurBuffer = await sharp(sourcePath)
    .rotate()
    .resize({
      width: 36,
      withoutEnlargement: true,
    })
    .blur(3)
    .webp({
      quality: 32,
      effort: 4,
    })
    .toBuffer();

  await writeFile(imageOutput, optimizedBuffer);
  await writeFile(blurOutput, blurBuffer);

  const metadata = await sharp(optimizedBuffer).metadata();

  return {
    originalKey,
    imageImport: `./images/${group.name}/${id}.webp`,
    blurImport: `./blur/${group.name}/${id}.webp`,
    width: metadata.width || 1,
    height: metadata.height || 1,
    skipped: false,
  };
};

const buildManifest = (entries) => {
  const imports = [];
  const records = [];

  entries.forEach((entry, index) => {
    const imageName = `image${index}`;
    const blurName = `blur${index}`;

    imports.push(`import ${imageName} from ${JSON.stringify(entry.imageImport)};`);
    imports.push(`import ${blurName} from ${JSON.stringify(entry.blurImport)};`);
    records.push(
      `${JSON.stringify(entry.originalKey)}: { src: ${imageName}, blur: ${blurName}, width: ${entry.width}, height: ${entry.height} }`,
    );
  });

  return `${imports.join("\n")}

export const optimizedImages = {
  ${records.join(",\n  ")}
};
`;
};

await mkdir(outputDir, { recursive: true });

const optimizedEntries = [];
let skippedCount = 0;

for (const group of sourceGroups) {
  const files = await listImages(group.sourceDir);

  for (const fileName of files) {
    const entry = await optimizeImage({ group, fileName });
    optimizedEntries.push(entry);
    if (entry.skipped) skippedCount += 1;
  }
}

await writeFile(
  path.join(outputDir, "image-manifest.js"),
  buildManifest(optimizedEntries),
);

console.log(
  `Optimized ${optimizedEntries.length - skippedCount} images, reused ${skippedCount}.`,
);
