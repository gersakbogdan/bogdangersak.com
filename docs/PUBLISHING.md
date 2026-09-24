# Writing and publishing

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
