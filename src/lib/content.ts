import { getCollection, getEntry, type CollectionEntry } from 'astro:content';

export const sections = [
  { slug: 'notes', type: 'note', title: 'Notes', description: 'Small discoveries, working ideas, and things worth remembering.', mark: '↳' },
  { slug: 'essays', type: 'essay', title: 'Essays', description: 'Ideas given room to develop. On software, teams, and how we work.', mark: '≡' },
  { slug: 'guides', type: 'guide', title: 'Guides', description: 'Useful explanations to return to. A little more depth, one subject at a time.', mark: '⌘' },
  { slug: 'labs', type: 'lab', title: 'Labs', description: 'Experiments, open questions, and things taking shape.', mark: '⊞' },
] as const;

export const writingSections = sections.filter((section) => section.type !== 'lab');

export const navigation = [
  { href: '/', title: 'Home', mark: '⌂' },
  { href: '/writing/', title: 'Writing', mark: '≡' },
  { href: '/labs/', title: 'Labs', mark: '⊞' },
  { href: '/projects/', title: 'Projects', mark: '◇' },
  { href: '/now/', title: 'Now', mark: '◷' },
  { href: '/about/', title: 'About', mark: '○' },
] as const;

export function isNavigationActive(href: string, pathname: string) {
  if (href === '/') return pathname === '/';
  if (href === '/writing/' && writingSections.some((section) =>
    pathname.startsWith('/' + section.slug + '/'),
  )) return true;
  return pathname.startsWith(href);
}

export const topics = [
  { slug: 'engineering', title: 'Engineering', description: 'Architecture, systems, and the craft of building software.' },
  { slug: 'ai', title: 'AI Engineering', description: 'Agents, tools, and learning to build with language models.' },
  { slug: 'leadership', title: 'Leadership', description: 'Teams, effectiveness, and the work around the code.' },
  { slug: 'building', title: 'Building', description: 'Products, experiments, and lessons from making things.' },
] as const;

export type Entry = CollectionEntry<'entries'>;
export type Project = CollectionEntry<'projects'>;
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

export async function getProjects() {
  const projects = await getCollection('projects', ({ data }) =>
    isPreview || data.status === 'published',
  );
  return projects.sort((a, b) =>
    b.data.created.valueOf() - a.data.created.valueOf() || a.id.localeCompare(b.id),
  );
}

export function projectUrl(project: Project) { return '/projects/' + project.id + '/'; }

export async function getProjectEntries(project: Project) {
  return (await getEntries()).filter((entry) => entry.data.project?.id === project.id);
}

export type SectionTab = { href: string; title: string };

export async function getWritingTabs(): Promise<SectionTab[]> {
  return [
    { href: '/writing/', title: 'All writing' },
    ...writingSections.map((section) => ({ href: '/' + section.slug + '/', title: section.title })),
  ];
}

export async function getLabTabs(): Promise<SectionTab[]> {
  const labs = (await getEntries()).filter((entry) => entry.data.type === 'lab' && entry.data.tab);
  return [
    { href: '/labs/', title: 'All labs' },
    ...labs.map((entry) => ({ href: entryUrl(entry), title: entry.data.tabTitle ?? entry.data.title })),
  ];
}

export async function getProjectTabs(): Promise<SectionTab[]> {
  const projects = (await getProjects()).filter((project) => project.data.tab);
  return [
    { href: '/projects/', title: 'All projects' },
    ...projects.map((project) => ({ href: projectUrl(project), title: project.data.tabTitle ?? project.data.title })),
  ];
}

export async function getWritingEntries() {
  return (await getEntries()).filter((entry) => entry.data.type !== 'lab');
}

export async function getHome() {
  const home = await getEntry('site', 'home');
  if (!home) throw new Error('Homepage content is missing: content/site/home.md');
  return home;
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
