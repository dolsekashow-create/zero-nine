import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

export default defineConfig({
  site: 'https://www.zero--nine.online',
  trailingSlash: 'ignore',
  integrations: [sitemap({ i18n: { defaultLocale: 'ar', locales: { ar: 'ar-EG', en: 'en' } } })],
  build: { inlineStylesheets: 'always' },
  image: { responsiveStyles: false },
});
