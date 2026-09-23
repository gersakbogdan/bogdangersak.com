import { defineCollection } from 'astro:content';
import { z } from 'astro/zod';
import { glob } from 'astro/loaders';

const entries = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './content/writing' }),
  schema: z.object({
    title: z.string().min(1),
    description: z.string().min(1),
    type: z.enum(['note', 'essay', 'guide', 'lab']),
    topics: z.array(z.enum(['engineering', 'ai', 'leadership', 'building'])).min(1),
    status: z.enum(['draft', 'published']).default('draft'),
    created: z.coerce.date(),
    updated: z.coerce.date().optional(),
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

export const collections = { entries, pages };
