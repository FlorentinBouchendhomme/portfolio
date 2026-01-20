# Portfolio

Personal portfolio website built with **Nuxt 4 (SSG)**, **Tailwind CSS**, and **GSAP**.  
Deployed on **Cloudflare Pages**.

## Tech Stack

- Nuxt 4
- Vue 3
- Tailwind CSS
- GSAP

## Requirements

- Node.js >= 20
- npm >= 9

## Getting Started

Install dependencies:

```bash
npm install
```

Run locally:

```bash
npm run dev
```

Open: http://localhost:3000

## Build (Production)

Build the project:

```bash
npm run build
```

> Nuxt is configured for the `cloudflare-pages` Nitro preset, so the build output is generated in `dist/`.

## Deployment

This project is deployed via **Cloudflare Pages**:

- Production branch: `main`
- Build command: `npm run build`
- Output directory: `dist`

Every push to `main` triggers a production deployment.

## Scripts

- `npm run dev` — start dev server
- `npm run build` — build for production (Cloudflare Pages output: `dist`)