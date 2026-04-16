# Nortune Shopify Liquid theme

This repository started as a Vite React storefront and has been converted into a Shopify Online Store 2.0 Liquid theme.

## Current structure

React source retained for reference:

- `src/` - Vite React application source.
- `src/components/` - React landing/product UI components, including the old cart drawer and shadcn UI primitives.
- `src/pages/` - React routes for home, product, and not found pages.
- `src/context/` - React cart state used by the previous non-Shopify build.
- `src/assets/` - React-imported image assets.
- `index.html`, `vite.config.ts`, `tsconfig*.json`, `tailwind.config.ts`, `postcss.config.js`, `eslint.config.js`, `package.json` - React/Vite build tooling.

Shopify theme source:

- `layout/theme.liquid` - Shopify document layout with `content_for_header`, global header/footer sections, theme CSS, and theme JS.
- `templates/*.json` - Online Store 2.0 templates for home, product, cart, and 404.
- `sections/*.liquid` - Liquid sections that replace the React landing/product/cart surfaces.
- `snippets/*.liquid` - Reusable SVG snippets.
- `assets/theme.css` and `assets/theme.js` - Theme styling and browser behavior.
- `assets/*.jpg`, `assets/*.jpeg` - Theme image assets referenced through Shopify `asset_url`.
- `config/settings_schema.json` and `config/settings_data.json` - Theme settings.
- `locales/en.default.json` - Translation strings.

`.shopifyignore` excludes the React source, node tooling, and development-only files from Shopify uploads.

## Shopify notes

The product page includes bundle quantity selectors matching the former React experience. Shopify Liquid cannot directly change product prices at add-to-cart time, so the displayed bundle savings need to be backed by Shopify automatic discounts, discount codes, or bundle products configured in the Shopify admin.
