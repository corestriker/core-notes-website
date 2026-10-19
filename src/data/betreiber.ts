// Angaben für Impressum und Datenschutzerklärung – an einer Stelle gepflegt.
// ACHTUNG: Das hier ist öffentlich (Website + öffentliches Repo).
export const betreiber = {
  name: "Leon Bethke",
  strasse: "Poststraße 8",
  ort: "27711 Osterholz-Scharmbeck",
  mail: "hallo@core-notes.de",
};

export const platzhalterOffen = Object.values(betreiber).some((wert) => wert.startsWith("["));
