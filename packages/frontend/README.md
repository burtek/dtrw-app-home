# frontend

Personal homepage and blog — a Next.js static site with Markdown/MDX content, syntax highlighting, and an RSS feed.

---

## Tech stack

| Layer | Technology |
|-------|-----------|
| Framework | Next.js 16 (App Router, static export) |
| UI library | React 19 |
| Language | TypeScript 5.9 |
| Styling | SCSS / Sass |
| Content system | Velite 0.2 (Markdown / MDX → typed JSON objects) |
| Syntax highlighting | Shiki 3 + `@shikijs/rehype` |
| Spell checking | Retext + `retext-spell` (Polish dictionary) |
| Date handling | Day.js |
| RSS generation | `rss` (custom build-time script) |
| Linting | ESLint 10 + `@dtrw/eslint-config` |

---

## Source structure

```
packages/frontend/
├── src/
│   └── app/                        # Next.js App Router
│       ├── page.tsx                # Homepage
│       ├── robots.ts               # /robots.txt
│       ├── sitemap.ts              # /sitemap.xml
│       ├── @header/                # Parallel route — shared header layout
│       ├── @footer/                # Parallel route — shared footer layout
│       ├── [subpage]/              # Generic dynamic pages
│       ├── blog/
│       │   ├── page.tsx            # Blog index
│       │   ├── [id]/               # Individual blog posts
│       │   ├── tag/[tag]/          # Posts filtered by tag
│       │   └── components/         # Blog-specific React components
│       ├── zagle/                  # Countries / travels page
│       └── b/[short]/              # Short-link redirects
├── build-utils/
│   └── generate-rss.js             # Generates public/static/rss.xml at build time
├── public/
│   └── static/
│       └── rss.xml                 # Pre-generated RSS feed
├── next.config.mjs                 # Next.js config (static export, API proxy, Velite plugin)
├── velite.config.ts                # Velite content schema definitions
└── tsconfig.json                   # TypeScript config (extends root, Next.js plugin)
```

---

## Content pipeline

Markdown and MDX files are processed by **Velite** during the build, which validates them against typed schemas and outputs JSON objects into the `.velite/` directory. Next.js then reads those objects at build time to generate static HTML pages.

```
Markdown / MDX files
    └─► Velite (schema validation, MDX compilation)
            └─► .velite/*.json  (typed content objects)
                    └─► Next.js static generation
                            └─► out/  (static HTML)
```

Additional build-time steps:
- **Syntax highlighting** — Shiki renders code blocks to HTML during the build so no JS is shipped to the browser.
- **Spell checking** — Retext checks prose in Markdown files against a Polish dictionary and fails the build on errors.
- **RSS** — A custom Node.js script reads the Velite output and writes `public/static/rss.xml` after Next.js finishes.

---

## Commands

Run from the **repo root** (Lerna) or from this directory directly.

| Command | Description |
|---------|-------------|
| `yarn start:dev` | Start Next.js dev server at `http://localhost:3000` |
| `yarn build` | Run Velite + Next.js static export → `out/` + generate RSS feed |
| `yarn start` | Start the Next.js production server (requires a prior build) |
| `yarn lint` | Run ESLint |
| `yarn clean` | Delete `.next/` and `.velite/` cache directories |

---

## Routing overview

| Route | Description |
|-------|-------------|
| `/` | Homepage |
| `/blog` | Blog post index |
| `/blog/[id]` | Individual blog post |
| `/blog/tag/[tag]` | Posts filtered by tag |
| `/zagle` | Countries / travels page |
| `/b/[short]` | Short-link redirect (data served by backend) |
| `/robots.txt` | Generated robots file |
| `/sitemap.xml` | Generated sitemap |
| `/static/rss.xml` | RSS feed |

In development the Next.js dev server proxies `/api/*` requests to `http://localhost:4000` (the backend).

---

## TypeScript path aliases

| Alias | Resolves to |
|-------|-------------|
| `#content` | `.velite/` (Velite generated content) |
| `#velite` | `.velite/` (Velite runtime helpers) |

---

## Build output

`yarn build` produces a fully static site in `out/`. The Nginx config at `docker/frontend/nginx.conf` serves this directory and handles client-side navigation with `try_files $uri $uri.html /index.html`.

---

## Production deployment

The `out/` directory is copied to the VPS during the `deploy` GitHub Actions workflow and served by an Nginx Alpine Docker container (see `docker-compose.yml` at the repo root).
