import { readFileSync } from 'node:fs';

const locales = ['en', 'zh-CN', 'zh-TW', 'ja', 'ko', 'fr', 'de', 'es'];
for (const group of ['', 'docs/']) {
  const load = (locale) => JSON.parse(readFileSync(new URL(`../src/i18n/${group}${locale}.json`, import.meta.url), 'utf8'));
  const reference = load('en');
  const keys = Object.keys(reference).sort();
  for (const locale of locales) {
    const catalog = load(locale);
    if (JSON.stringify(Object.keys(catalog).sort()) !== JSON.stringify(keys)) throw new Error(`${group}${locale}: catalog keys do not match English`);
    for (const key of keys) {
      const value = catalog[key];
      if (typeof value !== 'string' || !value.trim()) throw new Error(`${group}${locale}: ${key} is empty`);
      const slots = [...value.matchAll(/\{[^}]+\}/g)].map(([slot]) => slot).sort();
      const expected = [...reference[key].matchAll(/\{[^}]+\}/g)].map(([slot]) => slot).sort();
      if (JSON.stringify(slots) !== JSON.stringify(expected)) throw new Error(`${group}${locale}: ${key} has different placeholders`);
    }
  }
  console.log(`Validated ${locales.length} ${group || 'home'} locale catalogs (${keys.length} keys each).`);
}
