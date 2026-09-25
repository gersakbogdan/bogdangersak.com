import { defineCollection, reference } from 'astro:content';
import { z } from 'astro/zod';
import { glob } from 'astro/loaders';

const entries = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './content/writing' }),
  schema: z.object({
    title: z.string().min(1),
    description: z.string().min(1),
    type: z.enum(['note', 'essay', 'guide', 'lab']),
    tab: z.boolean().default(false),
    tabTitle: z.string().min(1).optional(),
    project: reference('projects').optional(),
    topics: z.array(z.enum(['engineering', 'ai', 'leadership', 'building'])).min(1),
    status: z.enum(['draft', 'published']).default('draft'),
    created: z.coerce.date(),
    updated: z.coerce.date().optional(),
  }),
});

const projects = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './content/projects' }),
  schema: z.object({
    title: z.string().min(1),
    description: z.string().min(1),
    kind: z.string().min(1).default('Project'),
    tab: z.boolean().default(false),
    tabTitle: z.string().min(1).optional(),
    status: z.enum(['draft', 'published']).default('draft'),
    created: z.coerce.date(),
    updated: z.coerce.date().optional(),
    website: z.url({ protocol: /^https?$/ }).optional(),
  }),
});

const pages = defineCollection({
  loader: glob({ pattern: '*.md', base: './content/pages' }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    updated: z.coerce.date().optional(),
  }),
});

// Homepage content is separate from pages so it does not create a /home/ route.
const site = defineCollection({
  loader: glob({ pattern: 'home.md', base: './content/site' }),
  schema: z.object({
    title: z.string().min(1),
    description: z.string().min(1),
    eyebrow: z.string().min(1),
    heading: z.string().min(1),
    writingLabel: z.string().min(1),
    buildingLabel: z.string().min(1),
    notebookHeading: z.string().min(1),
    notebookLinkLabel: z.string().min(1),
    topicsHeading: z.string().min(1),
    building: z.object({
      project: reference('projects').optional(),
      heading: z.string().min(1),
      name: z.string().min(1),
      description: z.string().min(1),
      url: z.url({ protocol: /^https?$/ }),
      linkLabel: z.string().min(1),
    }),
    experiment: z.object({
      heading: z.string().min(1),
      name: z.string().min(1),
      description: z.string().min(1),
      url: z.string().startsWith('/'),
      linkLabel: z.string().min(1),
    }),
    now: z.object({
      title: z.string().min(1),
      description: z.string().min(1),
    }),
  }),
});

export const collections = { entries, projects, pages, site };
