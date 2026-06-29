# dtrw-app-home

Personal homepage monorepo — a Next.js static site paired with a Fastify REST API, managed with concurrently and pnpm workspaces.

Monorepo template: [burtek/dtrw-app-helloworld](https://github.com/burtek/dtrw-app-helloworld)

---

## Repository structure

```
dtrw-app-home/
├── packages/
│   ├── backend/          # Fastify REST API (Node.js 24, TypeScript, Rollup)
│   └── frontend/         # Next.js static site (React 19, TypeScript, Velite MDX)
├── docker/
│   ├── backend/
│   │   └── env           # Backend environment variables (production)
│   └── frontend/
│       └── nginx.conf    # Nginx config for serving the static export
├── .github/
│   └── workflows/
│       ├── test-pr.yaml  # Tests, lint & build on every PR
│       ├── release.yaml  # Auto-version bump + CHANGELOG on merge to master
│       └── deploy.yaml   # SCP + Docker Compose deploy on version tags
├── .husky/               # Git hooks (commit-msg, pre-commit)
├── docker-compose.yml    # Production Docker Compose stack
├── vitest.config.ts      # Root Vitest config (runs tests across all packages)
├── tsconfig.json         # Root TypeScript config (shared base)
└── package.json          # pnpm workspaces root
```

---

## Packages

| Package | Description | Docs |
|---------|-------------|------|
| [`packages/backend`](packages/backend) | Fastify REST API — health check, short-link data, and more | [README](packages/backend/README.md) |
| [`packages/frontend`](packages/frontend) | Next.js personal homepage with a blog, sitemap, and RSS feed | [README](packages/frontend/README.md) |

---

## Monorepo tooling

| Tool | Role |
|------|------|
| **pnpm workspaces** | single lockfile |
| **Concurrently 10** | Runnig scripts in parallel |
| **Vitest 4** | Unit tests — root config runs projects from all packages in parallel |
| **ESLint 10** + `@dtrw/eslint-config` | Shared lint rules for both packages |
| **Husky** + **Commitlint** | Conventional-commit enforcement via git hooks |
| **standard-version** | Automated semantic versioning and CHANGELOG generation |

---

## Getting started

**Prerequisites:** Node.js 24, pnpm 11.x

```bash
# Install all dependencies (hoisted to root node_modules)
pnpm install

# Start both packages in watch/dev mode
pnpm dev

# Frontend only (Next.js dev server on http://localhost:3000)
pnpm dev:ui
```

The frontend proxies `/api/*` to `http://localhost:4000` in development, so the backend must be running for API-dependent features.

---

## Common commands

| Command | Description |
|---------|-------------|
| `pnpm dev` | Start backend (nodemon) + frontend (Next.js) in dev mode |
| `pnpm dev:ui` | Start frontend dev server only |
| `pnpm build` | Build all packages (Rollup for backend, Next.js static export for frontend) |
| `pnpm lint` | ESLint all packages |
| `pnpm test` | Run Vitest across all packages |
| `pnpm release` | Bump versions, update CHANGELOG, create git tag |

---

## CI/CD pipeline

```
PR opened
  └─► test-pr.yaml  ── pnpm test + pnpm lint + pnpm build

PR merged to master
  └─► release.yaml  ── tests + build → standard-version → push tag vX.Y.Z

Tag vX.Y.Z pushed
  └─► deploy.yaml   ── pnpm build (with COMMIT_SHA) → SCP to VPS → docker compose up
```

### Deployment infrastructure

- **Frontend** — `packages/frontend/out/` (static HTML) served by Nginx in an Alpine container
- **Backend** — `packages/backend/dist/` (compiled CommonJS) run by Node.js 24 Alpine container
- **Networking** — both containers join a shared external Docker network named `apps`

---

## Tech stack summary

| Layer | Technology |
|-------|-----------|
| Language | TypeScript 5.9 |
| Frontend framework | Next.js 16 (static export, App Router) |
| UI library | React 19 |
| Styling | SCSS / Sass |
| Content system | Velite 0.2 (Markdown / MDX → typed JSON) |
| Syntax highlighting | Shiki 3 |
| Backend framework | Fastify 5 |
| API validation | Zod 4 + fastify-type-provider-zod |
| Backend build | Rollup 4 |
| Testing | Vitest 4 |
| Linting | ESLint 10 |
| Containerisation | Docker Compose (Nginx + Node.js Alpine) |
