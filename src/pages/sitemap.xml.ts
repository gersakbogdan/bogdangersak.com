import type { APIRoute } from 'astro';
import { getEntries, getProjects, entryUrl, projectUrl, sections, topics } from '../lib/content';
export const GET: APIRoute = async ({ site }) => {
  const projects = (await getProjects()).filter((project) => project.data.status === 'published');
  const projectPaths = projects.length ? ['/projects/', ...projects.map(projectUrl)] : [];
  const paths = [...projectPaths, '/', '/writing/', '/about/', '/now/', ...sections.map((s) => '/' + s.slug + '/'), ...topics.map((t) => '/topics/' + t.slug + '/'), ...(await getEntries()).filter((e) => e.data.status === 'published').map(entryUrl)];
  return new Response('<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">' + paths.map((path) => '<url><loc>' + new URL(path, site).href + '</loc></url>').join('') + '</urlset>', { headers: { 'Content-Type': 'application/xml' } });
};
