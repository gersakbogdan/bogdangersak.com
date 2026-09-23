# bogdangersak.com

A minimal, Markdown-first public engineering notebook for Bogdan Gersak.

## Product
- Cover Engineering, AI Engineering, Leadership, and Building.
- Support notes, essays, guides, labs, /now, and /about.
- Keep the design quiet, readable, and responsive. Avoid a CV-style homepage.
- Keep Markdown in content/ as the source of truth.
- giscus article comments, GitHub edit links, a public GitHub repository, and Cloudflare deployment are authorized. Do not add a CMS, custom authentication, newsletter, or AI chat without a request.

## Implementation
- Astro static output, TypeScript, plain CSS.
- Collections and schemas: src/content.config.ts.
- Shared content queries and URL helpers: src/lib/content.ts.
- Writing: content/writing/{notes,essays,guides,labs}/; nested folders are supported.
- Informational pages: content/pages/.
- Keep type and parent folder consistent. Keep URLs stable.
- Drafts are visible only in development and must never be emitted by production builds.
- New substantive writing starts as a draft; do not invent personal experiences, achievements, social URLs, or sources.
- Keep links semantic and keyboard accessible; respect reduced motion and small screens.

## Commands
- npm install (or npm ci after the lockfile exists)
- npm run dev
- npm run build (type checks and builds)
- npm run preview

Run npm run build after implementation changes. Check generated links and ensure draft routes are absent before delivery. Do not deploy unless requested.
