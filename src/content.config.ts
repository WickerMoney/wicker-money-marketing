import { defineCollection, z } from 'astro:content'
import { glob } from 'astro/loaders'

// Seeded from the real CHANGELOG.md in the main wicker-money repo (Keep a
// Changelog format). Add one entry per tagged release going forward rather
// than hand-copying the whole file here — this is a curated marketing-facing
// summary, not a mirror; the repo's CHANGELOG.md stays the source of truth.
const changelog = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/changelog' }),
  schema: z.object({
    title: z.string(),
    version: z.string().nullable(),
    date: z.string().nullable(),
    unreleased: z.boolean().default(false),
  }),
})

export const collections = { changelog }
