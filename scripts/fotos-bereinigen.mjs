// Bereinigt Originalfotos aus fotos-no-commit/ für das Repo:
// dreht nach EXIF-Ausrichtung, verkleinert auf max. 2400 px und entfernt ALLE Metadaten (GPS, Gerät, Zeit).
//
// Aufruf:
//   npm run fotos -- PXL_20261019_060531864.jpg=faecher  PXL_...jpg=ruecken
//   (Quelle=Zielname; Ergebnis landet in src/assets/fotos/<zielname>.jpg)
import { readdirSync, existsSync, mkdirSync } from "node:fs";
import { join, parse } from "node:path";
import sharp from "sharp";

const QUELLE = "fotos-no-commit";
const ZIEL = "src/assets/fotos";
const MAX_KANTE = 2400;

const paare = process.argv.slice(2).map((arg) => {
  const [datei, name] = arg.split("=");
  return { datei, name: name || parse(datei).name.toLowerCase() };
});

if (paare.length === 0) {
  console.log("Verfügbare Originale in " + QUELLE + ":");
  for (const f of readdirSync(QUELLE).filter((f) => /\.(jpe?g|png|heic|webp)$/i.test(f))) console.log("  " + f);
  console.log("\nAufruf: npm run fotos -- <datei>=<zielname> [...]");
  process.exit(0);
}

mkdirSync(ZIEL, { recursive: true });

for (const { datei, name } of paare) {
  const quelle = join(QUELLE, datei);
  if (!existsSync(quelle)) {
    console.error("Nicht gefunden: " + quelle);
    process.exitCode = 1;
    continue;
  }
  if (!/^[a-z0-9-]+$/.test(name)) {
    console.error("Zielname nur aus a-z, 0-9 und - : " + name);
    process.exitCode = 1;
    continue;
  }
  const ziel = join(ZIEL, name + ".jpg");
  // sharp schreibt ohne .withMetadata() keine Metadaten mit – genau das wollen wir.
  const info = await sharp(quelle)
    .rotate()
    .resize({ width: MAX_KANTE, height: MAX_KANTE, fit: "inside", withoutEnlargement: true })
    .jpeg({ quality: 84, mozjpeg: true })
    .toFile(ziel);
  console.log(`${datei} -> ${ziel} (${info.width}×${info.height}, ${Math.round(info.size / 1024)} KB)`);
}
