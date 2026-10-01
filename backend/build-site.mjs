import { cp, mkdir, readdir, rm, stat } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const backendDirectory = path.dirname(fileURLToPath(import.meta.url));
const projectDirectory = path.resolve(backendDirectory, "..");
const outputDirectory = path.join(backendDirectory, "dist");
const files = [
  "index.html",
  "main.css",
  "main.js",
  "firebase-config.js",
  "checkout-config.js",
  "productos.html",
  "data/productos-iniciales.json",
  "admin/app.js",
  "admin/firebase-setup.js",
  "admin/index.html",
  "admin/styles.css"
];
const directories = ["asset", "favicon", "fotos de wsp", "js", "pages"];
const maxAssetBytes = 25 * 1024 * 1024;
const skippedFiles = [];

async function copyDirectory(source, destination) {
  await mkdir(destination, { recursive: true });
  for (const entry of await readdir(source, { withFileTypes: true })) {
    const sourcePath = path.join(source, entry.name);
    const destinationPath = path.join(destination, entry.name);
    if (entry.isDirectory()) {
      await copyDirectory(sourcePath, destinationPath);
      continue;
    }

    const file = await stat(sourcePath);
    if (file.size > maxAssetBytes) {
      skippedFiles.push(path.relative(projectDirectory, sourcePath));
      continue;
    }
    await cp(sourcePath, destinationPath);
  }
}

await rm(outputDirectory, { recursive: true, force: true });
await mkdir(outputDirectory, { recursive: true });

for (const relativePath of files) {
  await cp(path.join(projectDirectory, relativePath), path.join(outputDirectory, relativePath));
}

for (const relativePath of directories) {
  await copyDirectory(path.join(projectDirectory, relativePath), path.join(outputDirectory, relativePath));
}

console.log(`Prepared Cloudflare assets in ${outputDirectory}`);
if (skippedFiles.length) console.log(`Skipped oversized files: ${skippedFiles.join(", ")}`);