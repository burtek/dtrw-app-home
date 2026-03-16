# backend

Fastify REST API powering the personal homepage.

---

## Tech stack

| Layer | Technology |
|-------|-----------|
| Runtime | Node.js 24 |
| Framework | Fastify 5 |
| Language | TypeScript 5.9 |
| Validation | Zod 4 + fastify-type-provider-zod |
| Build tool | Rollup 4 (CommonJS output with source maps) |
| Testing | Vitest 4 |
| Linting | ESLint 10 + `@dtrw/eslint-config` |

---

## Source structure

```
packages/backend/
├── index.ts               # Entry point (re-exports server)
├── src/
│   ├── app.ts             # Fastify app factory — plugin & route registration
│   ├── server.ts          # Server startup and graceful shutdown
│   ├── config.ts          # Environment-based configuration (dotenv)
│   ├── health/            # GET /health — liveness probe for Docker healthcheck
│   ├── hello/             # GET /hello — sample greeting endpoint
│   ├── errors/            # Custom error classes
│   └── decorators/        # Fastify decorators (auth, error handling)
├── rollup.config.mjs      # Rollup build config
├── tsconfig.json          # TypeScript config (extends root)
├── tsconfig.build.json    # Build-specific TypeScript config
└── vitest.config.ts       # Vitest config
```

---

## Commands

Run from the **repo root** (Lerna) or from this directory directly.

| Command | Description |
|---------|-------------|
| `yarn start:dev` | Watch mode — nodemon restarts the server on file changes |
| `yarn dev` | Single build + run (useful for one-shot start) |
| `yarn build` | Compile TypeScript → CommonJS in `dist/` via Rollup |
| `yarn test` | Run unit tests once (Vitest) |
| `yarn test:watch` | Run tests in watch mode |
| `yarn lint` | Run ESLint |

---

## API endpoints

| Method | Path | Description |
|--------|------|-------------|
| `GET` | `/health` | Returns `{ status: "ok" }` — used as Docker healthcheck |
| `GET` | `/hello` | Sample greeting — returns a hello message |

All request/response schemas are defined with Zod and are type-safe end-to-end via `fastify-type-provider-zod`.

---

## Build output

Rollup compiles the source to `dist/` (CommonJS modules with source maps). A copy of `package.json` with `"type": "commonjs"` is written to `dist/` so the bundle can be executed with:

```bash
node --enable-source-maps dist/index.js
```

---

## Environment variables

Runtime configuration is loaded from a `.env` file (or from the environment). In production the file is supplied at `docker/backend/env` and mounted into the container.

| Variable | Description |
|----------|-------------|
| `PORT` | Port the server listens on (default `4000`) |
| `NODE_ENV` | `development` \| `production` |

---

## Production deployment

The compiled `dist/` directory is copied to the VPS during the `deploy` GitHub Actions workflow and served by a Node.js 24 Alpine Docker container (see `docker-compose.yml` at the repo root).
