import { defineConfig } from 'astro/config';
import { satteri } from '@astrojs/markdown-satteri';

const externalLinks = {
  name: 'external-links',
  element: {
    filter: ['a'],
    visit(node, ctx) {
      const href = node.properties?.href;
      if (typeof href === 'string' && /^https?:\/\//i.test(href) && new URL(href).origin !== 'https://bogdangersak.com') {
        ctx.setProperty(node, 'target', '_blank');
        ctx.setProperty(node, 'rel', ['noopener', 'noreferrer']);
      }
    },
  },
};

export default defineConfig({
  site: 'https://bogdangersak.com',
  output: 'static',
  trailingSlash: 'always',
  devToolbar: { enabled: false },
  markdown: { processor: satteri({ hastPlugins: [externalLinks] }) },
});
