---
title: "Unreleased — heading toward vNEXT_VERSION"
version: null
date: null
unreleased: true
---

Not released yet. This is what has landed on the main branch since v0.5.0, and
it can still change. **Back up your database before upgrading.** This release
adds database changes, and one of them (the new debt payoff tables) is deleted
if you step back a version. See
[Upgrading](https://wickermoney.dev/docs/self-hosting/upgrading#from-0-5-0).

### Breaking

- **Plugin authors:** `@wickermoney/plugin-sdk` no longer exports its manifest
  schemas (`pluginManifestSchema` and the four smaller ones). To validate a
  manifest, call `parseManifest(input)`, which returns the manifest or a readable
  error. See
  [Plugin authoring](https://wickermoney.dev/docs/contributing/plugin-authoring#validating-a-manifest).
- **CSV import, if you call the API directly:** the `analyze` response is now
  paged, with a smaller shape. Anything reading it from a script needs a look.
  The app itself is already updated. See the
  [API reference](https://wickermoney.dev/docs/api/overview#import-csv).

### Added

- **Debt payoff plugin.** List your loans and cards, pick snowball or
  avalanche, add an extra monthly amount, and see the date you'll be debt free
  and the interest it saves against paying only the minimums. A dashboard widget
  shows the date and the next debt in line. See
  [Debt payoff](https://wickermoney.dev/docs/features/debt-payoff).
- **Owners can change roles in Settings → People.** Promote a member to a second
  owner, or step an owner down. The last owner can't be demoted. No more SQL. See
  [Owners and members](https://wickermoney.dev/docs/features/owners-and-members#changing-someones-role).
- **A danger zone in Settings.** "Erase my data" deletes everything you own
  across the app and every plugin, and keeps your login so you can sign straight
  back in to an empty account. For an owner, "Erase this entire instance" empties
  every account and starts the instance over. Each asks for your password and a
  typed phrase, and offers the data export first. See
  [Erasing your data](https://wickermoney.dev/docs/features/erasing-data).
- **Database and import settings.** `DB_POOL_MAX`, `DB_STATEMENT_TIMEOUT` and
  `DB_LONG_STATEMENT_TIMEOUT` tune the connection pool and how long a query may
  run, and `IMPORT_MAX_ROWS` raises the CSV import row limit from a fixed 50,000
  to a default of 100,000. There is also a note on running behind PgBouncer. See
  [Configuration](https://wickermoney.dev/docs/self-hosting/configuration#pool-statement-timeouts-and-the-import-limit).
- **Plugin SDK:** a stable `@wickermoney/plugin-sdk/date` entry point for the
  calendar helpers, and an experimental `/isolated` entry point that defines how
  a plugin could run in a sandboxed frame. Nothing loads plugins that way yet, so
  plugin code still runs fully trusted.
- **Smaller API additions:** `?fields=basic` on the account list, `accountName`
  on upcoming recurring items, and `truncated` flags on recurring matching.

### Changed

- **The server compresses its own responses** (brotli or gzip). If you run a
  reverse proxy that also compresses, turn that off for this upstream. See
  [Configuration](https://wickermoney.dev/docs/self-hosting/configuration#compression-dont-compress-twice).
- **Faster pages.** Core pages load when you first visit them, the Transactions
  page re-renders less, and Budgets and recurring matching read the ledger fewer
  times. Sorting the ledger by merchant or amount is backed by new indexes; on a
  very large ledger, building them can briefly block writes during the upgrade.
- **Plainer trust wording.** The docs now match what the code enforces about how
  far a plugin is trusted. See
  [Plugins](https://wickermoney.dev/docs/features/plugins).
- **The image has no `:next` tag.** A release candidate is published under its
  version tag only. `:latest` is stable releases only, as before.

### Fixed

- **Keyboard and screen reader fixes:** focus stays inside the setup wizard and
  the phone navigation drawer, chart marks are exposed to assistive technology,
  the forecast's day readout is announced, table headers have scopes, the account
  menu is a plain disclosure, and the plugin switch announces "Saving…". Charts
  gain a "Show as table" view. These haven't been checked with a screen reader
  yet.
- **Light-mode green has more contrast** for positive amounts.
