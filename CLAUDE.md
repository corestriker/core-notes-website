# core-notes.de

Coming-soon-/Vorschau-Seite für **c0re NOTES** – handgemachte A6-Notizbücher. Privates Hobbyprojekt, kein Shop.
Die Domain ist auf jedes Buch gedruckt: Die Seite muss immer erreichbar sein, URLs nie brechen.

## Technik
- Astro (statisch), TypeScript, **kein clientseitiges JavaScript**. Hosting: GitHub Pages via `.github/workflows/deploy.yml`, Domain `core-notes.de` (`public/CNAME`).
- `.npmrc` erzwingt die öffentliche npm-Registry (global ist eine Firmen-Registry konfiguriert – die darf nie in `package-lock.json` landen).
- CSP als Meta-Tag in `src/layouts/Basis.astro`: nur eigene Domain, keine Inline-Styles/-Skripte (`inlineStylesheets: "never"`). Keine externen Ressourcen, kein Tracking, keine Cookies – sonst muss die Datenschutzerklärung angepasst werden.
- Impressum/Datenschutz-Angaben zentral in `src/data/betreiber.ts`. Der CI-Build bricht ab, solange dort Platzhalter stehen.

## Fotos – Ablauf
1. Originale liegen in `fotos-no-commit/` (in `.gitignore` – enthalten GPS-Daten, **nie committen**).
2. Bereinigen: `npm run fotos -- <original.jpg>=<zielname>` → `src/assets/fotos/<zielname>.jpg` (max. 2400 px, ohne Metadaten).
3. In `src/pages/index.astro` importieren / bestehenden Platzhalter ersetzen (gleichen Zielnamen verwenden = automatisch ersetzt).
4. Pre-Commit-Hook (`.githooks/`, `scripts/pre-commit-check.mjs`) blockiert Bilder > 1 MB oder mit Metadaten.
- Aufnahmeliste: `docs/fotoliste.md`.

## Inhalt & Ton
- Texte sind O-Ton des Betreibers, nur redigiert. Keine Werbefloskeln, nichts dazuerfinden. Anrede: Du.
- Gestaltung: „Werkbank/Zine“ – Jost (Coverschrift) für Titel, Courier Prime für Text, Fotos teils schief mit Klebeband, Schnittlinien als Trenner. Keine Handschrift, kein Stempel, kein Punktraster-Hintergrund.
- Werkstatt-Log (`log` in `index.astro`): nur echte, vom Betreiber genannte Daten. Neueste oben.
- Nickname des Betreibers nicht auf der Seite nennen.

## Befehle
- `npm run dev` – Entwicklung, `npm run build` – Build nach `dist/`, `npm run preview` – Build lokal ansehen.
