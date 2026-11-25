# Vivida policy and guide pages — design specification

Date: 2026-11-25
Status: Awaiting review of this written specification; no implementation or publication is authorized by this document.
Repository: public `fynx-lab/vivida-release` site checkout. The application and installer remain unchanged.

## Scope and navigation

Add two page types to the local Astro site in all eight existing locales (`en`, `zh-CN`, `zh-TW`, `ja`, `ko`, `fr`, `de`, `es`):

- `/privacy/` and `/<locale>/privacy/` at the custom domain root: one page titled **Privacy & Terms** (localized), with visibly separate Privacy and Terms sections and internal section links.
- `/guide/` and `/<locale>/guide/` at the custom domain root: a concise **User Guide** (localized).

Add a Guide link in the shared navigation and Guide / Privacy & Terms links in the shared footer, including on the homepage. Preserve the existing single-download-CTA rule on the homepage; do not add another installer CTA to the footer or policies. Keep the current dark, violet-accented visual system and current application icon. Layouts use clear headings, short paragraphs, numbered instructions and keyboard-friendly shortcut tables; mobile tables must remain readable without horizontal page overflow. The language selector must preserve the current page type when switching languages. Direct page URLs never auto-redirect; only the English *homepage* retains the existing browser-language redirect.

Each of the 16 new URLs is statically rendered with localized title, description and `<html lang>`, self-canonical, reciprocal `hreflang` and English `x-default`, and a sitemap entry. Link to valid per-locale pages from all page types. Content should be readable without JavaScript; no modal or client-side translation.

## Privacy & Terms: factual privacy content

Write original plain-language content, not copy-pasted third-party legal boilerplate. Cover the **application** and the **website** separately. Avoid claiming that using the application never involves a network request or that external infrastructure keeps no logs.

- Vivida requires no account and does not contain application telemetry, advertising trackers or a mechanism to upload the user's photos, folder contents or file names to Vivida's servers.
- Images are opened and decoded locally. Last-opened folder, favorites (which may contain absolute local paths), language, sort/grid/sidebar preferences are stored on the user's device in `%APPDATA%\Vivida\state.txt`. Explain the user can remove that file to remove saved app preferences; uninstall intentionally leaves this directory in place. Do not tell users to delete it while Vivida is running because the app can write it again.
- On Windows, about one minute after launch the app checks the public latest GitHub Release using `api.github.com` via HTTPS; the user can also check manually from Settings → About. The request includes Vivida's version in the user agent and GitHub will receive ordinary request information such as IP address. It does **not** send image files or the contents of the saved state file. The user chooses whether to visit/download a newer version; there is no automatic installation.
- The landing site has no first-party analytics or tracking scripts. The language selector may save an explicit choice in the browser's `localStorage` (`vivida-page-language`). GitHub Pages hosts the site and GitHub serves Releases and Issues; visiting these services can involve their normal network logs and policies. Link to GitHub's privacy statement. Avoid pretending to control or describe GitHub's exact retention practices.
- For privacy questions, link to the public Issues page and warn users not to post sensitive paths, photos or other private information in public reports. Do not invent a private contact channel or promise a data-request workflow that does not exist.

## Terms: limited general template

Use concise generic user-facing terms with sections for scope, responsible use (including respect for others' rights), software updates/external GitHub services, software provided as available with no promise of error-free operation, liability subject to applicable mandatory consumer law, and future changes with a visible updated date. Do not assert a legal entity, jurisdiction, copyright license, waiver of statutory rights, unlimited liability exclusion, automatic acceptance upon installation, subscription, payment, or account terms without a factual basis. Note that this is a draft general template requiring legal review before public publication. Do not present this design spec itself as legal advice.

## User Guide: verified actions

Aim for fast onboarding with these sections:

1. **Install and open**: Windows x64 current-user installer; installer does not silently make Vivida the default for image formats. Launch Vivida and browse Places/This PC in the sidebar; click folders or images. A folder/image path may also be passed to `vivida.exe` on the command line. Do not promise an Open toolbar button or system dialog: the current application source does not implement one, despite the older README.
2. **Favorites**: navigate to the desired folder in the grid, click the star in the top toolbar beside the sort control; it becomes filled, the folder appears in the left **Favorites** list, and clicking the star again removes it. This is a folder favorite, not per-image favorite. Sidebar may be toggled by the panel icon. Favorites persist in local state.
3. **Grid**: sort by name/date/size, wheel to scroll, Ctrl+wheel to change thumbnail size. Arrow keys and Home/End select and reveal an item; Enter enters a selected folder or previews a selected image; Backspace moves to the parent folder. F2 renames the selected item, Delete opens the deletion confirmation and sends the file to the Recycle Bin, Ctrl+C copies the selected file/folder path.
4. **Viewer**: left/right arrows or A/D move among images; Home/End jump to first/last; wheel zooms around the pointer, drag pans, double-click toggles fit/100%; when viewer has keyboard focus, + / − zoom, 0 fits, 1 shows actual pixels; R/Shift+R rotate the display 90° clockwise/counterclockwise **without changing the original file**; F11 toggles fullscreen; Esc exits fullscreen first and then returns to the grid, while Backspace returns to the grid. Avoid listing viewer up/down arrows as guaranteed shortcuts without a focus note (the image view uses them for panning when focused).
5. **Settings / help**: Settings → Language; Settings → File Associations lets the user explicitly register selected formats and Windows Settings controls defaults; Settings → About checks updates manually. Link to public Releases and Issues, and note that a Windows SmartScreen warning is possible because the installer is unsigned.

Present keyboard shortcuts in two localized groups (grid/viewer), with readable `<kbd>` labels. Keep the guide aligned to the current released version 0.0.2; avoid features not present there. Mention destructive actions only with their confirmation and Recycle Bin behavior. Verify wording against the released application and source where possible.

## Content and verification boundaries

Put localized policy and guide text in structured locale resources that can be validated for missing keys alongside the existing eight-language homepage catalog. Reuse shared shell/site metadata and route helpers rather than duplicating SEO or language-switch logic. No backend, cookies, account flow, or form submission is needed. Do not claim the policy is a substitute for legal review.

Acceptance: build 24 static pages total; validate each locale's three routes, links and metadata; check direct visits, in-page anchors, language switches retaining page type, and site-root-only language detection. Test desktop/phone readability and keyboard navigation. Review all eight translations for factual alignment, with special attention to update-check privacy, favorite **folder** behavior and context-dependent shortcuts. Do not push or change GitHub Pages deployment before the user reviews the final local site and explicitly approves publication.
