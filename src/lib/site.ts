import en from '../i18n/en.json';
import zhCN from '../i18n/zh-CN.json';
import zhTW from '../i18n/zh-TW.json';
import ja from '../i18n/ja.json';
import ko from '../i18n/ko.json';
import fr from '../i18n/fr.json';
import de from '../i18n/de.json';
import es from '../i18n/es.json';
import docsEn from '../i18n/docs/en.json';
import docsZhCN from '../i18n/docs/zh-CN.json';
import docsZhTW from '../i18n/docs/zh-TW.json';
import docsJa from '../i18n/docs/ja.json';
import docsKo from '../i18n/docs/ko.json';
import docsFr from '../i18n/docs/fr.json';
import docsDe from '../i18n/docs/de.json';
import docsEs from '../i18n/docs/es.json';
import releaseNotes from '../content/release-notes.md?raw';

export const locales = ['en', 'zh-CN', 'zh-TW', 'ja', 'ko', 'fr', 'de', 'es'] as const;
export type Locale = typeof locales[number];
export const localeNames: Record<Locale, string> = {
  en: 'English', 'zh-CN': '简体中文', 'zh-TW': '繁體中文',
  ja: '日本語', ko: '한국어', fr: 'Français', de: 'Deutsch', es: 'Español',
};
export const messages: Record<Locale, typeof en> = {
  en, 'zh-CN': zhCN, 'zh-TW': zhTW, ja, ko, fr, de, es,
};
export const documents: Record<Locale, typeof docsEn> = {
  en: docsEn, 'zh-CN': docsZhCN, 'zh-TW': docsZhTW,
  ja: docsJa, ko: docsKo, fr: docsFr, de: docsDe, es: docsEs,
};
export type PageKind = 'home' | 'guide' | 'privacy';

export const release = {
  version: '0.0.3',
  notes: releaseNotes,
  download: 'https://github.com/fynx-lab/vivida-release/releases/download/v0.0.3/vivida-0.0.3-windows-x64-setup.exe',
  latest: 'https://github.com/fynx-lab/vivida-release/releases/latest',
  issues: 'https://github.com/fynx-lab/vivida-release/issues',
};

const base = import.meta.env.BASE_URL.replace(/\/?$/, '/');
export const asset = (file: string) => `${base}${file.replace(/^\//, '')}`;
export const localePath = (locale: Locale, page: PageKind = 'home') =>
  `${base}${locale === 'en' ? '' : `${locale}/`}${page === 'home' ? '' : `${page}/`}`;
