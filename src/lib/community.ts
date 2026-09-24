import community from '../config/community.json';

export { community };

if (community.repository && !/^[a-zA-Z0-9_.-]+\/[a-zA-Z0-9_.-]+$/.test(community.repository)) {
  throw new Error('Community repository must use owner/repository format.');
}
export const repositoryUrl = community.repository
  ? 'https://github.com/' + community.repository
  : undefined;

// Keep the integration configured and ready, but leave comments hidden until launch.
export const commentsEnabled = false;

export function editUrl(filePath: string) {
  if (!repositoryUrl) return undefined;
  return repositoryUrl + '/edit/' + encodeURIComponent(community.branch) + '/' +
    filePath.split('/').map(encodeURIComponent).join('/');
}
