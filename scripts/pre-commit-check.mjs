// Sicherheitsnetz vor jedem Commit: keine Originalfotos, keine Bilder mit Metadaten, nichts zu Großes.
import { execFileSync } from "node:child_process";
import { statSync } from "node:fs";
import sharp from "sharp";

const MAX_BYTES = 1024 * 1024;

const staged = execFileSync("git", ["diff", "--cached", "--name-only", "--diff-filter=ACMR"], { encoding: "utf8" })
  .split("\n")
  .filter(Boolean);

const fehler = [];

for (const datei of staged) {
  if (datei.startsWith("fotos-no-commit/")) {
    fehler.push(`${datei}: Originalordner darf nie committet werden`);
    continue;
  }
  if (!/\.(jpe?g|png|webp|avif|heic|tiff?)$/i.test(datei)) continue;

  if (statSync(datei).size > MAX_BYTES) fehler.push(`${datei}: größer als 1 MB – erst mit "npm run fotos" bereinigen`);

  const meta = await sharp(datei).metadata();
  if (meta.exif || meta.xmp || meta.iptc) fehler.push(`${datei}: enthält Metadaten (EXIF/XMP/IPTC) – erst mit "npm run fotos" bereinigen`);
}

if (fehler.length) {
  console.error("Commit abgebrochen:\n  " + fehler.join("\n  "));
  process.exit(1);
}
