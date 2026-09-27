// @ts-check
import { defineConfig } from 'astro/config'
import sitemap from '@astrojs/sitemap'

// GitHub Pages deployment config. Deployed via .github/workflows/deploy.yml
// (actions/deploy-pages) against the custom domain in public/CNAME, not the
// `astro` CLI's own GitHub Pages deploy action. Mirrors the wicker-money-dev
// pattern (see that repo's docusaurus.config.ts for the same reasoning).
export default defineConfig({
  site: 'https://wicker.money',
  integrations: [sitemap()],
})
