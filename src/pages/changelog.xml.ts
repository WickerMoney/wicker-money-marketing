import rss from '@astrojs/rss'
import { getCollection } from 'astro:content'
import type { APIContext } from 'astro'

// Changelog feed for people who follow releases in a reader (and for anything
// that wants to hear about a new version). One item per released entry, newest
// first; the "Unreleased" entry is left out because it has no date or version.
export async function GET(context: APIContext) {
  const entries = (await getCollection('changelog'))
    .filter((entry) => !entry.data.unreleased && entry.data.date)
    .sort(
      (a, b) =>
        (b.data.date ?? '').localeCompare(a.data.date ?? '') ||
        (b.data.version ?? '').localeCompare(a.data.version ?? '', undefined, { numeric: true }),
    )

  return rss({
    title: 'Wicker Money changelog',
    description: "What's shipped in Wicker Money, release by release.",
    site: context.site!,
    items: entries.map((entry) => ({
      title: entry.data.title,
      pubDate: new Date(`${entry.data.date}T12:00:00Z`),
      // First paragraph of the entry, as the summary.
      description: (entry.body ?? '').trim().split(/\n\s*\n/)[0]?.replace(/\s+/g, ' ') ?? '',
      link: `/changelog/#${entry.id}`,
    })),
    customData: '<language>en-us</language>',
    trailingSlash: false,
  })
}
