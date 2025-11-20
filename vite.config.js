import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import path from 'path';
import fs from 'fs';
// Fix: Import ssg dengan cara yang kompatibel
import ssgPlugin from 'vite-plugin-ssr-ssg';
// PERBAIKAN: Impor sebagai default export (tanpa kurung kurawal)
import javascriptObfuscator from 'vite-plugin-javascript-obfuscator';

// Handle default export untuk ssg
const ssg = ssgPlugin.default || ssgPlugin;

// Plugin untuk replace HTML placeholders dengan env vars
function htmlEnvReplace() {
  return {
    name: 'html-env-replace',
    transformIndexHtml(html) {
      const siteName = process.env.VITE_SITE_NAME || 'Blog';
      const siteUrl = process.env.VITE_SITE_URL || process.env.CF_PAGES_URL || 'https://bzone.pages.dev';
      const ogTitle = process.env.VITE_OG_TITLE || siteName;
      const ogDescription = process.env.VITE_OG_DESCRIPTION || 'Blog Description';
      
      return html
        .replace(/\{\{VITE_SITE_NAME\}\}/g, siteName)
        .replace(/\{\{VITE_SITE_URL\}\}/g, siteUrl)
        .replace(/\{\{VITE_OG_TITLE\}\}/g, ogTitle)
        .replace(/\{\{VITE_OG_DESCRIPTION\}\}/g, ogDescription);
    }
  };
}

let articleRoutes = [];
try {
  const articlesData = JSON.parse(fs.readFileSync(path.resolve(__dirname, 'public/articles.json'), 'utf-8'));
  articleRoutes = articlesData.map(article => `/${article.slug}`);
} catch (error) {
  console.warn('Could not read articles.json for prerendering. This is normal on the first build.');
}

export default defineConfig({
  plugins: [
    htmlEnvReplace(),
    vue(),
    ssg({
      entry: 'src/main.js',
      format: 'esm',
      routes: [
        '/',
        '/categories',
        '/about',
        '/contact',
        '/privacy-policy',
        '/terms-of-service',
        ...articleRoutes
      ],
      crittersOptions: false,
      concurrency: 1,
    }),
    javascriptObfuscator({
      options: {
        compact: true,
        controlFlowFlattening: false,
        deadCodeInjection: false,
        debugProtection: false,
        debugProtectionInterval: 0,
        disableConsoleOutput: true,
        identifierNamesGenerator: 'hexadecimal',
        log: false,
        numbersToExpressions: false,
        renameGlobals: false,
        selfDefending: true,
        simplify: true,
        splitStrings: false,
        stringArray: true,
        stringArrayThreshold: 0.75,
        unicodeEscapeSequence: false
      },
      apply: 'build'
    })
  ],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  ssgOptions: {
    script: 'async',
    formatting: 'prettify',
  },
});