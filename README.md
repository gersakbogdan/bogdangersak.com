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

## Make commands

The Makefile provides short, explicit commands for the common workflow:

```sh
make check
make deploy
make status
make publish FILES="content/pages/now.md" MESSAGE="Link Aluzio on Now page"
```

`make publish` builds the site, stages only the paths in `FILES`, commits with `MESSAGE`, pushes `main`, and deploys to Cloudflare. Keeping the file list explicit prevents local draft files from being included accidentally. Use `make commit` when you want to commit without pushing or deploying.

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

## Responsive layout

The layout has three responsive ranges:

- Above 900px: full two-column layout with the sidebar navigation.
- 651px–900px: two-column layout with narrower spacing and type.
- 650px and below: single-column layout. The sidebar links are replaced by the hamburger icon in the header, and the menu opens as a dropdown.

The CSS uses `max-width` media queries, so the mobile layout starts at a viewport width of 650px or less. This is based on available layout space rather than a specific device model; tablets and desktop windows can enter the mobile layout if they are resized below that width.

## Publish and maintain

See [the writing guide](docs/PUBLISHING.md) for adding notes and publishing updates.
See [the deployment guide](docs/DEPLOYMENT.md) for GitHub, giscus, Cloudflare, and domain setup.

Run npm run deploy:check to validate a deployment without publishing.
Repository and discussion IDs belong in src/config/community.json. Comments are configured but currently disabled in src/lib/community.ts until launch.

The canonical domain is configured in astro.config.mjs and public/robots.txt.
