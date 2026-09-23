import { getCollection, type CollectionEntry } from 'astro:content';

export const sections = [
  { slug: 'notes', type: 'note', title: 'Notes', description: 'Small discoveries, working ideas, and things worth remembering.', mark: '↳' },
  { slug: 'essays', type: 'essay', title: 'Essays', description: 'Ideas given room to develop. On software, teams, and how we work.', mark: '≡' },
  { slug: 'guides', type: 'guide', title: 'Guides', description: 'Useful explanations to return to. A little more depth, one subject at a time.', mark: '⌘' },
  { slug: 'labs', type: 'lab', title: 'Labs', description: 'Experiments, open questions, and things taking shape.', mark: '⊞' },
] as const;

export const topics = [
  { slug: 'engineering', title: 'Engineering', description: 'Architecture, systems, and the craft of building software.' },
  { slug: 'ai', title: 'AI Engineering', description: 'Agents, tools, and learning to build with language models.' },
  { slug: 'leadership', title: 'Leadership', description: 'Teams, effectiveness, and the work around the code.' },
  { slug: 'building', title: 'Building', description: 'Products, experiments, and lessons from making things.' },
] as const;

export type Entry = CollectionEntry<'entries'>;
export const isPreview = import.meta.env.DEV;

export async function getEntries() {
  const entries = await getCollection('entries', ({ data }) =>
    isPreview || data.status === 'published',
  );
  for (const entry of entries) {
    const section = sections.find((item) => item.type === entry.data.type)!;
    if (!entry.id.startsWith(section.slug + '/')) {
      throw new Error('Content type must match its folder: ' + entry.id);
    }
  }
  return entries.sort((a, b) =>
    b.data.created.valueOf() - a.data.created.valueOf() || a.id.localeCompare(b.id),
  );
}

export function entryUrl(entry: Entry) { return '/' + entry.id + '/'; }
export function topicTitle(slug: string) {
  return topics.find((topic) => topic.slug === slug)?.title ?? slug;
}
export function dateLabel(date: Date) {
  return date.toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric', timeZone: 'UTC' });
}
export function readingTime(entry: Entry) {
  return Math.max(1, Math.ceil((entry.body ?? '').split(/\s+/).length / 220));
}
