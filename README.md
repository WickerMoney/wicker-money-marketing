# Wicker Money — Marketing Site

The public marketing site for [Wicker Money](https://github.com/wickermoney/wicker-money),
served at [wicker.money](https://wicker.money). Built with
[Astro](https://astro.build) — static output, no client-side JS framework —
and deployed to GitHub Pages.

See [`../wicker-money-dev`](../wicker-money-dev) for the documentation site
(wickermoney.dev), which is a separate repo and a separate job: this one is
the pitch, that one is the manual.

## Pages

| Route | Purpose |
|---|---|
| `/` | Hero, the privacy pitch, the self-hosting reality check, current status |
| `/self-hosting` | Condensed self-hosting overview; links to the full quickstart on the docs site rather than duplicating it |
| `/migrate-from-mint` | What moving data from Mint (or any bank's CSV export) into Wicker Money actually looks like today |
| `/features` | Shipped vs. Now/Next/Later, sourced from `ROADMAP.md` in the main repo |
| `/pricing` | Self-hosted: free. Hosted: not built, not priced, not promised |
| `/changelog` | Curated highlights, seeded from `CHANGELOG.md` in the main repo |

## Development

Requires Node 22+ and pnpm 10 (`corepack enable pnpm`, or `npx pnpm@10.33.0`
if corepack can't create the global shim in your environment).

```bash
pnpm install
pnpm dev        # http://localhost:4321
pnpm build      # -> dist/
pnpm lint
pnpm typecheck
```

## Deployment

`.github/workflows/deploy.yml` builds and deploys `dist/` to GitHub Pages on
every push to `main`, the same `actions/deploy-pages` pattern as
`wicker-money-dev`. `public/CNAME` pins the custom domain (`wicker.money`).

**Before the first deploy actually works**, the domain needs DNS records at
the registrar — this repo can't do that part:

- 4 `A` records (and optionally an `AAAA` set) at the apex (`wicker.money`)
  pointing at GitHub Pages' IPs — the same pattern already documented for
  `wickermoney.dev` in the project's hosting notes.
- Enable GitHub Pages for this repo (Settings → Pages → Source: GitHub
  Actions) once it's pushed, and set the custom domain there so GitHub issues
  the TLS certificate.

## Content policy

Every feature or status claim on this site should trace back to something
actually true in the main repo (`ROADMAP.md`, `CHANGELOG.md`) or the docs
site — not to old planning documents from before the project was renamed.
When the roadmap changes, this site's `/features` and `/changelog` pages are
what need a follow-up pass, not the other way around.
