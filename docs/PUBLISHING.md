# Writing and publishing

Start with [choosing a writing format](../README.md#choose-a-writing-format) for the differences between Notes, Essays, Guides, and Labs, with examples and guidance for overlap.

## Add a note

Copy `templates/entry.md` into `content/writing/notes/my-note.md`.
Use `essays`, `guides`, or `labs` for the other formats and set the corresponding singular `type`.

```yaml
---
title: What I learned about tool calls
description: A small discovery from building an agent.
type: note
topics: [ai, engineering]
status: draft
created: 2026-09-23
---
```

Replace the example date with the actual date. Write Markdown below the frontmatter.
Topics are `engineering`, `ai`, `leadership`, and `building`.

Run `npm run dev` and visit http://127.0.0.1:4321. Drafts appear locally with a label.

## Publish

1. Review the writing and set `status: published`.
2. Run `npm run build`. Optionally run `npm run preview` to inspect exactly what will be published.
3. Commit the specific files you intend to publish and push to `main`:

```sh
git add content/writing/notes/my-note.md
git commit -m "Publish note about tool calls"
git push origin main
```

After the Cloudflare Git integration is connected, each push to main builds and deploys the website.
Check the build result in Cloudflare before assuming the update is live.
Homepage, section, topic listings, and sitemap update automatically.

## Update existing writing

Edit its Markdown file. Add or update an `updated: YYYY-MM-DD` field if appropriate.
Use the same build, commit, and push workflow. Edit `content/pages/now.md` and `about.md` the same way.

Keep published filenames stable: they determine URLs and the associated comment thread.

## Private drafts in a public repository

`status: draft` excludes a page from the website, not from GitHub.
Anything pushed to a public repository is public, including other branches and commit history.

For private material, use an unpushed local branch or keep files untracked.
The ignored `private-drafts/` folder is also available for notes you do not want Git to track; these do not appear in the local website until copied into `content/writing/`.
Use explicit file paths with `git add` so unrelated drafts are not included accidentally.

The four starter outlines under content/writing are examples, not finished writing.
Choose whether to keep them in the public source or leave them untracked before the initial push.

## Reader interaction

Comments are configured through giscus, but are currently disabled in `src/lib/community.ts`. Re-enable `commentsEnabled` when you are ready to launch them.
Draft articles do not load comments or show edit links.

Visitors can read comments without signing in. Posting requires a GitHub account and authorization for giscus.
Comments and reactions live in GitHub Discussions; moderate them there. Keep Issues for actionable bugs and corrections.

## Homepage and writing index

Edit `content/site/home.md` to update the homepage introduction, headings, link labels,
Aluzio mention, and Now callout. The introduction is the Markdown body; the other copy
lives in frontmatter. Keep project descriptions factual and link to the real project
until a reviewed project story exists. This file renders at `/`, not `/home/`.

The homepage lists the six most recent entries across all four formats. `/writing/`
combines Notes, Essays, and Guides; Labs remains a separate destination. Both views
use the existing draft rules. The existing format indexes and article URLs stay stable.

Selected writing is deferred until there is enough published material to support it.

## Project stories

Project stories live in `content/projects/`. Start from `templates/project.md`, set the
actual creation date, and leave `status: draft` until the story has been reviewed.
Draft project pages appear only with `npm run dev`; `npm run preview` serves the
production build and excludes drafts. Projects stays in the main navigation.

An optional `project: aluzio` field on a writing entry associates it with
`content/projects/aluzio.md`. The project page lists related visible writing, and the
article links back to the project when that project is visible. The homepage's
`building.project` field selects its project story; a draft story is never linked
from the production homepage. Existing external project links remain available.

Set `tab: true` in a project or lab entry to add it to that collection's tabs.
Optional `tabTitle` provides a shorter label; otherwise the title supplies the label.
Only projects and labs visible in the current environment become tabs, so drafts appear
on the development server and disappear from production.

The Aluzio story and workflow note contain explicit prompts where product facts and
personal observations are still needed. Review those before publishing. Draft status
hides content from the built site, not from a public Git repository.
