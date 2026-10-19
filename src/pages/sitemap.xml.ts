import type { APIRoute } from "astro";

// Nur die Startseite: Impressum, Datenschutz und 404 sind auf noindex.
export const GET: APIRoute = ({ site }) => {
  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url><loc>${new URL("/", site)}</loc></url>
</urlset>
`;
  return new Response(xml, { headers: { "Content-Type": "application/xml" } });
};
