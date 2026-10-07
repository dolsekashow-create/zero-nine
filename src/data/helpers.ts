import site from './site.json';
import type { Lang } from './i18n';

export const BASE = 'https://www.zero--nine.online';

/** Home path for a language: "/" or "/en/". */
export const home = (lang: Lang) => (lang === 'ar' ? '/' : '/en/');

export const phones = [
  { wa: site.contact.whatsapp, display: site.contact.phoneDisplay },
  { wa: site.contact.whatsapp2, display: site.contact.phoneDisplay2 },
].filter((p) => p.wa);

export const waLink = (text: string, to = site.contact.whatsapp) =>
  `https://wa.me/${to}?text=${encodeURIComponent(text)}`;

export const helloText = (lang: Lang) =>
  lang === 'ar' ? 'السلام عليكم، عايز أستفسر عن موقع.' : "Hello, I'd like to ask about a website.";

export const hostOf = (u: string) => {
  try { return new URL(u).hostname.replace(/^www\./, ''); } catch { return u; }
};

/** Content-collection id -> URL slug for /work/<slug>/ */
export const projectSlug = (id: string) => id.replace(/\.json$/, '');
