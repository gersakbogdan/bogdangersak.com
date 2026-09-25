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

## Choose a writing format

Choose by what the reader comes for, rather than length or how polished the writing is.

| Format | Main value | Reader expectation |
| --- | --- | --- |
| **Notes** | One useful observation or idea | “Here’s something I noticed or learned.” |
| **Essays** | A developed perspective or argument | “Here’s what I think, and why.” |
| **Guides** | Help accomplishing or understanding something | “Here’s how to do this, and when it applies.” |
| **Labs** | An experiment and its evidence | “Here’s what I tried, what happened, and what remains open.” |

### One subject, four formats

These are possible angles on **AI code review**, not claims about completed work:

- **Note:** A useful prompt pattern for reviewing a diff.
- **Essay:** Why AI review changes the role of human reviewers.
- **Guide:** How to set up an AI review workflow.
- **Lab:** Testing a review agent against a set of known bugs.

### When formats overlap

Ask: **Is the main value the observation, the argument, the instruction, or the experiment?** Choose the format that best matches that value.

- **Notes are complete small pieces.** They do not have to grow into essays.
- **Essays need a central point.** They develop an idea beyond recording a discovery.
- **Guides help the reader reach an outcome.** Use explanation, steps, examples, and tradeoffs as needed.
- **Labs document experiments.** Include the question, approach, results, and what remains uncertain. Failed or inconclusive results still belong here.

Format and publication status are separate: every format can be a draft or published. Labs are not a bucket for unfinished writing. Topics describe the subject; formats describe how it is explored.

Choose the folder and matching `type` before publishing. Keep published paths stable because they determine URLs and comment threads.

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

## Homepage and navigation

Homepage copy is Markdown-backed in `content/site/home.md`, in its own `site` collection.
The main navigation is Writing, Labs, Projects, Now, and About; the full-name logo links
home. Writing includes All writing, Notes, Essays, and Guides tabs. Labs and Projects
get tabs from collection entries with `tab: true`; use `tabTitle` for a shorter label.
See [the publishing guide](docs/PUBLISHING.md#homepage-and-writing-index) for editing details.

Project stories live in `content/projects/` and use the same draft visibility rules as
writing. Run `npm run dev` to review the draft project stories; production builds exclude them.
