import { rm } from "node:fs/promises";
import path from "node:path";

const rootDir = process.cwd();
const unusedPublicCopies = [
  path.join(rootDir, "dist/examples"),
];

for (const target of unusedPublicCopies) {
  await rm(target, { recursive: true, force: true });
}

console.log("Removed unused files from dist.");
