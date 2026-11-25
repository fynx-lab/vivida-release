# Hero screenshot slideshow and lightbox

## Goal

Show the two supplied, unmodified application screenshots (`public/hero.png` and `public/hero-2.png`) on each of the eight landing-page locales. Replace the current screenshot link, which opens an image in a separate browser page, with an in-page lightbox. Leave document pages and the single download CTA unchanged.

## Interaction

- The first screenshot is shown initially. Users can switch manually with previous/next buttons or two position indicators; there is no timer or automatic transition. The image frame keeps a stable aspect ratio despite the slightly different source dimensions, uses `object-fit: contain`, and never crops screenshot content.
- Clicking the active screenshot opens a native `<dialog>` showing that same slide at the largest size allowed by the viewport. The dialog includes a close control, previous/next controls and slide position. It also supports Escape, left/right arrow keys and backdrop-click dismissal. Clicking navigation controls must not open or dismiss the dialog accidentally.
- Closing returns focus to the screenshot opener. The dialog's native modality prevents interaction with the page behind it. Desktop and 320px mobile layouts keep controls reachable without horizontal overflow.
- Each slide has accurate localized alternate text: slide one shows the thumbnail grid, slide two shows the image viewer with the colour-information sidebar and an EXIF tab. Localized button and dialog labels cover `en`, `zh-CN`, `zh-TW`, `ja`, `ko`, `fr`, `de`, `es`.

## Implementation boundaries

- Use a small client script scoped to the landing-page carousel. Do not add a third-party dependency or modify either image. Keep the existing Astro static routes and current GitHub Pages custom-domain root.
- Serve screenshots from `public/`; render the first image eagerly, and load the second when requested. Keep slide index shared between the inline screenshot and the open lightbox. If JavaScript is unavailable, show the first screenshot as a normal static image rather than opening a raw image URL.
- Honor reduced-motion preferences and avoid automatic motion. Ensure visible focus styles and descriptive accessible button names; do not use the same generic alternate text for both screenshots.

## Verification and publication

- Extend site build checks for both screenshot assets, expected markup and localized controls. Verify inline controls, opening/closing, keyboard and backdrop behavior, focus return, image integrity, and mobile layout in a real browser. Confirm all 24 generated routes and the existing release link still work. Publish through the existing GitHub Actions workflow after checks pass.
