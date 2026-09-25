---
title: A public engineering notebook
description: Building a small, Markdown-first home for writing about software, AI, leadership, and making things.
kind: Website
status: draft
created: 2026-09-25
website: https://bogdangersak.com
---

This website is itself a building project: a place for notes, essays, guides, and experiments to sit alongside the work that produces them.

This draft describes the implementation in this repository. It leaves room for the personal context and lessons that still need to be written.

## The shape of the project

The site brings together four connected subjects: engineering, AI engineering, leadership, and building. Formats describe how an idea is explored; topics describe what it is about.

A short observation can stand on its own as a note. An essay gives an argument more room. A guide helps a reader reach an outcome. A lab records an experiment and its evidence.

## Markdown as the source

Writing lives in Markdown files under `content/`. Frontmatter carries the title, description, format, topics, date, and publication status. Astro turns the content into static pages.

The homepage introduction also lives in Markdown. Updating its copy does not require editing a page component.

## Keeping the structure easy to follow

Writing provides a combined overview, while Notes, Essays, and Guides remain directly accessible in the menu. Each format index links back to All writing. Labs and Projects have their own places alongside that group.

Published article paths stay tied to their existing folders. Grouping links in the menu does not require moving the articles or changing their addresses.

## A place to review unfinished work

Drafts appear in the development server with a visible label. The production build excludes their pages and removes them from listings and the sitemap.

That separation makes it possible to review a new piece in the actual layout before publishing it.

## What remains open

**To add:** Why this notebook matters personally, how it fits into a writing habit, and what has been learned from using it. Those observations should come from the work rather than being invented to complete a project story.
