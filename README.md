# bogdangersak.com

Bogdan Gersak's public engineering notebook. Astro renders Markdown into static HTML; there is no database or application server.

## Develop

Use Node.js 22.12+ (or a newer version supported by the installed Astro release).

```sh
npm ci
npm run dev
```

Open http://127.0.0.1:4321. Development includes clearly labelled draft entries.

```sh
npm run build
npm run preview
```

The build checks types and validates frontmatter, then writes the production site to dist/. Production excludes drafts, including their detail routes.

## Structure

```text
content/
  writing/
    notes/
    essays/
    guides/
    labs/
  pages/
    about.md
    now.md
templates/entry.md
src/
  content.config.ts
  components/
  layouts/
  lib/
  pages/
  styles/
public/
AGENTS.md
```

## Add writing

Copy templates/entry.md into the matching folder. Set type to note, essay, guide, or lab. Use one or more topics: engineering, ai, leadership, building. Set the created date to the actual date and keep status: draft until the writing is ready.

The relative path becomes the URL. For example, content/writing/notes/ai/tool-use.md becomes /notes/ai/tool-use/. Change status to published to include an entry in production. An optional updated date appears on the article.

The four initial draft outlines are starter material for review. The short introductory note, About, and Now are initial copy based on the project brief; review them before deploying. Social profile links are intentionally left unset until their real URLs are supplied.

## Routes

/, /notes/, /essays/, /guides/, /labs/, /now/, /about/, /topics/{topic}/, and /{type-folder}/{entry}/. There is also a 404 page and a generated sitemap.

The V1 uses semantic HTML, plain CSS, automatic light/dark appearance, responsive navigation, and a skip link. Fonts use Google Fonts with system fallbacks.

## Publish and maintain

See [the writing guide](docs/PUBLISHING.md) for adding notes and publishing updates.
See [the deployment guide](docs/DEPLOYMENT.md) for GitHub, giscus, Cloudflare, and domain setup.

Run npm run deploy:check to validate a deployment without publishing.
Repository and discussion IDs belong in src/config/community.json; comments stay disabled until those real values are configured.

The canonical domain is configured in astro.config.mjs and public/robots.txt.
