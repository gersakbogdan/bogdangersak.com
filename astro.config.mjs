import { defineConfig } from 'astro/config';

export default defineConfig({
  site: 'https://bogdangersak.com',
  output: 'static',
  trailingSlash: 'always',
  devToolbar: { enabled: false },
});
