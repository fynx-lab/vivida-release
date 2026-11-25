import { readFileSync, existsSync } from 'node:fs';

const root = new URL('../dist/', import.meta.url);
const locales = ['en', 'zh-CN', 'zh-TW', 'ja', 'ko', 'fr', 'de', 'es'];
const pages = ['home', 'guide', 'privacy'];
const origin = 'https://vivida.fynxlab.com/';
const release = 'https://github.com/fynx-lab/vivida-release/releases/download/v0.0.2/vivida-0.0.2-windows-x64-setup.exe';
const route = (locale, page) => `${locale === 'en' ? '' : `${locale}/`}${page === 'home' ? '' : `${page}/`}`;
const expected = (locale, page) => origin + route(locale, page);
const local = (locale, page) => '/' + route(locale, page);
const out = (file) => new URL(file, root);
const assert = (condition, detail) => { if (!condition) throw new Error(detail); };

for (const locale of locales) for (const page of pages) {
  const id = `${locale}/${page}`;
  const html = readFileSync(out(`${route(locale, page)}index.html`), 'utf8');
  assert(html.includes(`<html lang="${locale}"`), `${id}: lang attribute`);
  assert(html.includes(`rel="canonical" href="${expected(locale, page)}"`), `${id}: canonical`);
  assert(html.includes(`property="og:url" content="${expected(locale, page)}"`), `${id}: OG URL`);
  assert(html.includes('href="/favicon.ico"'), `${id}: favicon path`);
  assert(!/(?:href|src)="\/vivida-release\//.test(html), `${id}: stale project base in asset or navigation link`);
  assert(/<title>[^<]+<\/title>/.test(html), `${id}: title`);
  assert(/<meta name="description" content="[^\"]+"/.test(html), `${id}: description`);
  for (const other of locales) {
    assert(html.includes(`hreflang="${other}" href="${expected(other, page)}"`), `${id}: alternate ${other}`);
    assert(html.includes(`href="${local(other, page)}"`), `${id}: language link ${other}`);
  }
  assert(html.includes(`hreflang="x-default" href="${expected('en', page)}"`), `${id}: default alternate`);
  assert(html.includes(`href="${local(locale, 'guide')}"`), `${id}: guide link`);
  assert(html.includes(`href="${local(locale, 'privacy')}"`), `${id}: policy link`);
  assert(html.includes('https://github.com/fynx-lab/vivida-release/issues'), `${id}: issue link`);
  assert(html.includes('https://github.com/fynx-lab/vivida-release/releases/latest'), `${id}: release link`);
  if (page === 'home') {
    assert(html.includes(`href="${release}"`), `${id}: installer link`);
    assert(html.split(`href="${release}"`).length === 2, `${id}: must have one download CTA`);
    assert(html.includes('href="/hero.png"'), `${id}: screenshot path`);
    assert(html.includes('id="features"') && html.includes('HEIC / HEIF'), `${id}: homepage sections`);
  } else {
    assert(!html.includes(release), `${id}: no extra installer CTA`);
    assert(!html.includes('href="/hero.png"'), `${id}: no screenshot link`);
    assert(html.includes(`pageKind = "${page}"`), `${id}: root-only redirect must be disabled`);
    if (page === 'guide') {
      for (const section of ['favorites', 'grid', 'viewer', 'shortcuts']) assert(html.includes(`id="${section}"`), `${id}: guide ${section}`);
      assert(html.includes('Ctrl + C') && html.includes('Shift + R'), `${id}: shortcuts`);
    } else {
      for (const section of ['privacy', 'local', 'updates', 'website', 'terms', 'changes']) assert(html.includes(`id="${section}"`), `${id}: policy ${section}`);
      assert(html.includes('api.github.com') && html.includes('state.txt'), `${id}: privacy facts`);
    }
  }
  for (const match of html.matchAll(/(?:src|href)="(\/(?:_astro\/[^"?#]+|hero\.png|icon\.png|favicon\.ico))"/g)) {
    const file = match[1].slice(1);
    assert(existsSync(out(file)), `${id}: missing asset ${file}`);
  }
}
for (const file of ['CNAME', 'hero.png', 'icon.png', 'favicon.ico', 'sitemap-index.xml', 'sitemap-0.xml']) assert(existsSync(out(file)), `missing ${file}`);
assert(readFileSync(out('CNAME'), 'utf8').trim() === 'vivida.fynxlab.com', 'CNAME must preserve custom Pages domain');
const sitemapIndex = readFileSync(out('sitemap-index.xml'), 'utf8');
assert(sitemapIndex.includes(origin + 'sitemap-0.xml'), 'sitemap index URL');
const sitemap = readFileSync(out('sitemap-0.xml'), 'utf8');
for (const locale of locales) for (const page of pages)
  assert(sitemap.includes(`<loc>${expected(locale, page)}</loc>`), `sitemap missing ${locale}/${page}`);
console.log(`Validated ${locales.length * pages.length} generated pages, assets, alternates, and sitemap.`);
