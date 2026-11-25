import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

export default defineConfig({
  site: 'https://fynx-lab.github.io',
  base: '/vivida-release',
  trailingSlash: 'always',
  output: 'static',
  i18n: {
    locales: ['en', 'zh-CN', 'zh-TW', 'ja', 'ko', 'fr', 'de', 'es'],
    defaultLocale: 'en',
    routing: { prefixDefaultLocale: false },
  },
  integrations: [sitemap({
    i18n: {
      defaultLocale: 'en',
      locales: {
        en: 'en', 'zh-CN': 'zh-CN', 'zh-TW': 'zh-TW',
        ja: 'ja', ko: 'ko', fr: 'fr', de: 'de', es: 'es',
      },
    },
  })],
});
