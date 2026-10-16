---
title: "Unreleased — heading toward vNEXT_VERSION"
version: null
date: null
unreleased: true
---

Not released yet. This is what has landed on the main branch since v0.5.0, and
it can still change. **Back up your database before upgrading.** This release
has four migrations. Going back a version means running `down` four times, and
that deletes the new debt payoff tables and their data. See
[Upgrading](https://wickermoney.dev/docs/self-hosting/upgrading#from-0-5-0).

### Breaking

- **The data export asks for your password.** Downloading it from Settings now
  opens a password dialog. If you call the API directly, `GET /settings/export`
  needs a one-use ticket from the new `POST /settings/export-ticket` (good for two
  minutes) in an `x-wickermoney-export-ticket` header; without it, the answer is
  `403`. See the
  [API reference](https://wickermoney.dev/docs/api/overview#settings-export-and-erase).
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
- **Plugins can run in a sandboxed frame.** Insights and Spending Trends now do:
  they can't reach your session, cookies or the page, and they get data only
  through the app, with a short-lived token that carries just the plugin's grants.
  The other five bundled plugins still run in the app's own page. A test suite
  that attacks the sandbox runs on every pull request. The sandbox has known gaps
  (in Chromium it doesn't stop prerender or WebRTC requests, so a plugin you can
  grant your transactions to could send them out), and it is experimental and not
  yet independently reviewed. See
  [Plugins](https://wickermoney.dev/docs/features/plugins#how-much-a-plugin-is-trusted).
- **An operator can add a third-party UI plugin by hand.** Set
  `PLUGIN_REMOTE_ORIGINS` and put a manifest with an integrity pin in
  `PLUGIN_MANIFEST_DIR`; it starts switched off and runs only in a frame, with no
  server code. Both settings are empty by default, and there is no install flow or
  catalog. See
  [Adding a third-party plugin](https://wickermoney.dev/docs/features/plugins#adding-a-third-party-plugin-experimental).
- **Plugin SDK:** a stable `@wickermoney/plugin-sdk/date` entry point for the
  calendar helpers, an experimental `/isolated` entry point for plugins that run
  in a frame, and an optional `integrity` pin on the manifest. A manifest that
  declares `network:outbound`, `schedule:daily` or `notify` is now refused, since
  the app implements none of them.
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
- **Plainer trust wording.** The docs, `SECURITY.md` and the changelog now say
  what the sandbox protects and what it doesn't. See
  [Plugins](https://wickermoney.dev/docs/features/plugins).
- **Frames cost a little.** Each sandboxed widget adds roughly 6 to 9 MiB and
  150 ms after the first, and a widget below the fold keeps its minimum height
  until you scroll to it.
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
