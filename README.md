# Collaborative Board Activity Explorer

## Stack

- **Next.js 16** — App Router + SSR
- **Turbopack** — Rust-based dev bundler
- **Tailwind CSS v4** — Utility-first styles
- **TypeScript**
- **pnpm** — Package manager

## Getting started

### Prerequisites

- Node.js >= 18
- pnpm (`npm install -g pnpm`)

### Install & run

```bash
pnpm install
pnpm dev
```

App runs at [http://localhost:3000](http://localhost:3000).

### Environment variables

Server components load board data by HTTP-fetching this app’s own API routes. The base URL is resolved automatically when possible:

| Variable | When to set |
| --- | --- |
| `INTERNAL_API_ORIGIN` | Non-Vercel deploys (Docker, reverse proxy, custom host) where neither Vercel’s URL nor `127.0.0.1` + `PORT` is correct. Example: `https://your.domain` (no trailing slash). |
| `PORT` | Local/prod process port; defaults to `3000` if unset. Used only for the local fallback when `INTERNAL_API_ORIGIN` and `VERCEL_URL` are not set. |

On Vercel, `VERCEL_URL` is provided and used as `https://…` so you usually do not need `INTERNAL_API_ORIGIN`.

Copy [.env.example](.env.example) to `.env.local` and adjust if needed.

### Other commands

```bash
pnpm build       # Production build
pnpm start       # Serve production build
pnpm lint        # ESLint
pnpm typecheck   # TypeScript (no emit)
```
