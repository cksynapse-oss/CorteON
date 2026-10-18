import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';

// https://astro.build/config
export default defineConfig({
  output: 'static',
  site: 'https://corteon.in',
  redirects: {
    '/_kit': '/kit',
  },
  integrations: [
    tailwind({
      applyBaseStyles: false,
    }),
  ],
});
