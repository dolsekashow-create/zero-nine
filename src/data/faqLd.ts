import site from './site.json';
import type { Lang } from './i18n';

export const faqLd = (items: [string, string][]) => ({
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: items.map(([q, a]) => ({ '@type': 'Question', name: q, acceptedAnswer: { '@type': 'Answer', text: a } })),
});

export const homeFaq = (lang: Lang) =>
  faqLd(site.faq.map((f: any) => [f[`q_${lang}`], f[`a_${lang}`]] as [string, string]));

export const breadcrumbLd = (items: [string, string][]) => ({
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: items.map(([name, item], i) => ({ '@type': 'ListItem', position: i + 1, name, item })),
});
