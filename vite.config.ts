import { paraglideVitePlugin } from '@inlang/paraglide-js';
import netlify from '@netlify/vite-plugin-tanstack-start';
import tailwindcss from '@tailwindcss/vite';
import { devtools } from '@tanstack/devtools-vite';
import { tanstackStart } from '@tanstack/react-start/plugin/vite';
import viteReact from '@vitejs/plugin-react';
import { defineConfig } from 'vite';

const config = defineConfig({
  plugins: [
    devtools(),
    paraglideVitePlugin({
      outdir: './src/paraglide',
      project: './project.inlang',
      strategy: ['url', 'baseLocale'],
    }),
    netlify(),
    tailwindcss(),
    tanstackStart(),
    viteReact(),
  ],
  resolve: { tsconfigPaths: true },
});

export default config;
