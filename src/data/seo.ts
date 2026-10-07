import type { CollectionEntry } from 'astro:content';
import type { ServicePage } from './servicePages';
import { ui, type Lang } from './i18n';
import { BASE, home, hostOf, projectSlug } from './helpers';
import { faqLd, breadcrumbLd } from './faqLd';

const homeUrl = (lang: Lang) => `${BASE}${home(lang)}`;

export const pageLd = (s: ServicePage, lang: Lang) => {
  const c = s[lang];
  const url = `${homeUrl(lang)}services/${s.slug}/`;
  return [
    {
      '@context': 'https://schema.org',
      '@type': 'Service',
      name: c.name,
      description: c.desc,
      url,
      serviceType: c.name,
      areaServed: { '@type': 'Country', name: 'Egypt' },
      provider: { '@id': `${BASE}/#org` },
      ...(s.from ? { offers: { '@type': 'Offer', price: s.from, priceCurrency: 'EGP' } } : {}),
    },
    faqLd(c.faq),
    breadcrumbLd([[ui[lang].home, homeUrl(lang)], [c.name, url]]),
  ];
};

/** Text for a project page. Uses the summary from /admin when present, otherwise a short neutral line. */
export const projectSummary = (p: CollectionEntry<'projects'>, lang: Lang) => {
  const own = lang === 'ar' ? p.data.summary_ar : p.data.summary_en;
  if (own) return own;
  const { name, tag } = p.data;
  return lang === 'ar'
    ? `موقع ${name}${tag ? ` (${tag})` : ''}، من تصميم وتطوير زيرو-ناين. شوف الموقع مباشرة على ${hostOf(p.data.url)}.`
    : `${name}${tag ? ` (${tag})` : ''}, a website designed and developed by Zero-Nine. See it live at ${hostOf(p.data.url)}.`;
};

export const projectMeta = (p: CollectionEntry<'projects'>, lang: Lang) => {
  const url = `${homeUrl(lang)}work/${projectSlug(p.id)}/`;
  const title = lang === 'ar'
    ? `${p.data.name}${p.data.tag ? ` - ${p.data.tag}` : ''} | من أعمال Zero-Nine`
    : `${p.data.name}${p.data.tag ? ` - ${p.data.tag}` : ''} | Zero-Nine portfolio`;
  return {
    title,
    desc: projectSummary(p, lang).slice(0, 160),
    jsonLd: [
      {
        '@context': 'https://schema.org',
        '@type': 'CreativeWork',
        name: p.data.name,
        url,
        about: p.data.tag || undefined,
        creator: { '@id': `${BASE}/#org` },
        sameAs: p.data.url,
      },
      breadcrumbLd([[ui[lang].home, homeUrl(lang)], [ui[lang].allWork, `${homeUrl(lang)}#work`], [p.data.name, url]]),
    ],
  };
};
