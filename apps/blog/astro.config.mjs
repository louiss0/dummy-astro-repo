import { defineConfig } from 'astro/config';

import UnoCSS from 'unocss/astro'
import markdoc from "@astrojs/markdoc"
export default defineConfig({
  integrations: [
    UnoCSS({
      includeReset: true
    }),
    markdoc({
      ignoreIndentation: true
    })
  ],
  outDir: '../../dist/apps/blog',
});
