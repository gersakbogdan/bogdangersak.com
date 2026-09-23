import community from '../config/community.json';

export { community };

if (community.repository && !/^[a-zA-Z0-9_.-]+\/[a-zA-Z0-9_.-]+$/.test(community.repository)) {
  throw new Error('Community repository must use owner/repository format.');
}
export const repositoryUrl = community.repository
  ? 'https://github.com/' + community.repository
  : undefined;

const settings = [community.repository, community.giscus.repositoryId, community.giscus.categoryId];
export const commentsEnabled = settings.every(Boolean);

if ((community.giscus.repositoryId || community.giscus.categoryId) && !commentsEnabled) {
  throw new Error('Complete all repository and discussion-category IDs before enabling giscus.');
}

export function editUrl(filePath: string) {
  if (!repositoryUrl) return undefined;
  return repositoryUrl + '/edit/' + encodeURIComponent(community.branch) + '/' +
    filePath.split('/').map(encodeURIComponent).join('/');
}
