# Vivida

Public landing page, Windows installer downloads, and issue tracker for Vivida. The source repository is private.

Download the current per-user Windows x64 installer from [Releases](https://github.com/fynx-lab/vivida-release/releases/latest). Installation does not require administrator privileges.

## Website

The landing page, user guide, and privacy/terms draft are an Astro static site available in eight languages. English is served at `/vivida-release/`, with translated routes under `/<locale>/`. To work locally with Node.js 24:

```sh
npm ci
npm run build
npm run preview
```

`npm run build` validates both locale catalogs and all 24 generated pages, their links, metadata, and sitemap. The GitHub Actions workflow in `.github/workflows/deploy.yml` publishes `dist` to GitHub Pages. Keep Pages configured to use **GitHub Actions**, not the branch-root legacy build. Do not commit `dist` or `node_modules`.

For a new installer release, update the version and direct download URL in `src/lib/site.ts`, and the expected download URL in `scripts/check-site.mjs`; then rebuild and check the live link. Privacy/terms text is a general draft and requires legal review before being relied on as a legal document. The application and release assets live outside this website project.
