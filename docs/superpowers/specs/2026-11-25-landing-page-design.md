# Vivida landing page redesign — design specification

Date: 2026-11-25
Status: Approved for local implementation; publication remains a separate approval step.
Repository: `fynx-lab/vivida-release` (public landing page and release assets). The private application repository remains unchanged.

## Goal and scope

Explain Vivida, a local Windows image browser, and make the current Windows installer easy to find. The principal promise is responsive folder browsing: list the folder first, then fill in thumbnails. Show the real product, not a recreated interface or an unverified speed benchmark. Replace the existing single-file landing page with an Astro static site; keep the public URL `https://fynx-lab.github.io/vivida-release/`.

This work redesigns the landing page only. It does not change the application, installer, GitHub Release assets, or issue tracker.

## Decisions confirmed interactively

- Direction: speed-first, with a compact page rather than a feature-by-feature long-form showcase.
- Hero: text on the left and the user-provided, approved real Vivida grid screenshot on the right. The screenshot may be displayed publicly as supplied; do not recreate the application UI in HTML.
- Dark immersive page. Separate the dark screenshot from the dark background with a restrained frame, contrast, and spacing; preserve the screenshot's colors and contents. Use the currently shipped application's icon (`vivida/src/vivida.ico`) for site branding and favicon, not the old blue V artwork. Match the application's violet accent: CUI dark-theme accent `#a78bff` and high-contrast violet CTA (`#7747ff` with white text).
- Hero headline: **Your photos, without the wait.**
- Hero supporting line: **See your folders right away. Let the thumbnails catch up.**
- Exactly one primary download CTA in the Hero, below the text; no competing CTA in the navigation and no repeated download button at the bottom. Show Windows x64 / installer context beneath it.
- After the Hero, three compact feature cards about the native C++ experience, background thumbnail loading with up to eight workers (hardware-dependent, not always exactly eight), and visible-area-prioritized grid browsing for larger folders. Use the user's approved Simplified Chinese card copy verbatim:
  1. **纯正原生体验，回归本地看图**：采用原生 C++ 打造，直连 Windows 本地环境，启动与操作直接利落，把注意力留给图片本身。
  2. **多核异步加载，切目录更顺滑**：进入文件夹先看框架，后台调度最多 8 个工作线程按需加载缩略图，界面保持响应不被 IO 卡住。
  3. **聚焦可视区域，大文件夹也从容**：优先处理和绘制视野内的图片，跳过暂不可见的冗余工作，面对大量图片时依然流畅轻盈。
  Translate these themes for the other seven routes. Beneath the cards, one scannable complete format list including HEIC/HEIF.
- Footer: GitHub Release, issue reporting, and concise installer information. Do not imply the installer is signed, that associations are changed automatically, or that the application never performs network requests (it checks GitHub for releases).
- Desktop Hero: screenshot has enough room to be recognized as a real application. Mobile: stack text, download button, then the uncropped screenshot; clicking the screenshot opens the full image for inspection. Avoid horizontal overflow and upscaling beyond the image's useful resolution.

## Localization and search indexing

Build separate static HTML pages for eight languages: `en`, `zh-CN`, `zh-TW`, `ja`, `ko`, `fr`, `de`, `es`. English is at `/vivida-release/` and the others at `/vivida-release/<locale>/` (for example `/vivida-release/zh-CN/`). English is the fallback for unsupported browser locales. If preference storage is unavailable, browser-language matching still works for the current visit without persistence. All page-owned copy, navigation, CTA, metadata, screenshot alt text, and accessibility labels are localized; filenames and the content inside the supplied screenshot are not translated. Translation resources should be easy to extend and checked for required keys at build time.

Each language route is an actual pre-rendered HTML document, with its own `<html lang>`, localized title and meta description, canonical URL, reciprocal `hreflang` links (including `x-default` pointing to the English root), and sitemap entries. Avoid one English page that only changes text after JavaScript loads. Keep link targets and generated assets correct for the `/vivida-release/` GitHub Pages base path. Provide useful social-share metadata with accurate product descriptions; do not make numerical speed benchmarks or absolute never-stutters claims without measurements.

First-time visitors to the root URL with a supported non-English browser language are redirected client-side to the matching locale route. Persist an explicit language-selector choice locally and prefer it on later visits. An explicitly visited language route is never redirected to another language, so shared links and crawlers can access every locale. Choosing English saves that choice and opens the English root. Browser-language matching uses supported language tags and sensible regional mappings (Simplified/Traditional Chinese); unsupported tags fall back to English. JavaScript-disabled visitors can still read the English root and directly load any localized route. The language selector is keyboard-accessible, has visible language names, and links to the equivalent route for the current page.

## Assets and build/deploy boundaries

The Hero image is the screenshot provided and approved in this conversation. Its original `hero.png` is now available in the public page checkout (1805 × 1218); the earlier chat preview was resized. Preserve the supplied file and its contents. Do not substitute a synthetic interface or publish a screenshot with changed contents. Use the actual current app icon for the logo and favicon; the old site logo/favicon do not match the app. The image should have explicit dimensions to avoid layout shift; use a format and delivery size that preserve legibility.

Use Astro's static build and a small shared locale data source, reusable layout, and centralized release download URL/version so all eight pages stay consistent. The main CTA links directly to the current Windows x64 installer asset; the footer Release link points to the latest public Release. Updating a versioned installer URL in future releases remains an explicit publishing task, not a runtime API fetch.

GitHub Pages currently publishes the public repository's `main` branch root in legacy mode. Switch deployment to a GitHub Actions build of the Astro static output and configure Pages to use Actions, preserving the existing public URL and `/vivida-release/` base. Keep source, build output, and temporary design mockups distinct; do not commit build artifacts or `.superpowers/brainstorm/` files. Publication is a separate approval step after preview and verification.

## Verification and acceptance

1. Build the Astro project locally and preview the generated static site with the repository base path; no missing CSS, fonts, images, or links.
2. Verify all eight routes render localized visible text, metadata, alt text, and correct language tags without depending on client-side translation.
3. Verify exact canonical, reciprocal `hreflang` including `x-default`, and sitemap URLs using the public origin and base path.
4. Test first-visit browser-language matching, unsupported-language English fallback, saved explicit choice, direct locale links, and JavaScript-disabled route access.
5. Inspect desktop, tablet, and narrow phone widths, particularly the screenshot's readability, focus/contrast, image enlargement, and the single Hero download CTA. Check reduced-motion behavior if decorative motion is added.
6. Verify the CTA resolves to the current installer, the footer Release and Issues links work, and no unsupported capability or unsigned-installer claim is misrepresented.
7. Do not change the existing live page until the finished build is reviewed and deployment is explicitly approved.
