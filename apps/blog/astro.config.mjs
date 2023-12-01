import { defineConfig } from 'astro/config';
import unocss from '@unocss/astro';
import markdoc from '@astrojs/markdoc';
// import { nodePolyfills } from 'vite-plugin-node-polyfills';
// TODO: Use this url for the final build.  'https://sheltonswebdevelopmentblog.info',

// https://astro.build/config
export default defineConfig({
  outDir: "../../dist/astro",
  vite: {
    optimizeDeps: {
      exclude: ["astro:content"]
    }
  },
  integrations: [
    markdoc({ ignoreIndentation: true }),
    unocss({ injectReset: true }),
  ],
});
