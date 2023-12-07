import { defineConfig } from 'astro/config';
import unocss from '@unocss/astro';
import markdoc from '@astrojs/markdoc';
import vue from '@astrojs/vue';
// TODO: Use this url for the final build.  'https://sheltonswebdevelopmentblog.info',

// https://astro.build/config
export default defineConfig({
  vite: {
    optimizeDeps: {
      exclude: ["astro:content"]
    }
  },
  integrations: [
    markdoc({ ignoreIndentation: true }),
    vue({
      jsx:true
    }),
    unocss({ injectReset: true }),
  ],
});
