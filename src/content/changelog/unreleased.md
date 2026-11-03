---
title: "Unreleased — heading toward v0.7.0"
version: null
date: null
unreleased: true
---

Three more plugins move into sandboxed frames, the app says what an action did
in a notification, Debt payoff gains the controls people asked for, and the API
gets a rate limit and a cap on concurrent CSV imports. **The rate limit is on by
default, so a script that calls the API in a loop may now get `429`s.** There are
two new migrations, 034 and 035. **Back up your database before upgrading**, as
for any release. Going back a version means running `down` twice, and that
discards the new Debt payoff settings. See
[Upgrading](https://wickermoney.dev/docs/self-hosting/upgrading#from-0-6-1).

### Added

- **Debt payoff: leave a debt out of the plan.** Each debt has an “In plan”
  switch, saved as soon as you change it. A debt that is switched off stays in
  your list, marked “Not in plan”, but is left out of the chart, the totals and
  the debt-free date, so one very large debt, a mortgage say, no longer flattens
  the rest. The headline says what it leaves out.
- **Debt payoff: an extra amount for one debt.** Each debt can have its own
  monthly extra, paid on top of the shared extra. It stops when that debt is
  paid off instead of moving to another one.
- **Debt payoff: loans in deferment.** A debt can have a repayment start date.
  Until then no minimum is due, the extra money skips it, and interest keeps
  adding to its balance. The page says what the loan will owe by then.
- **Debt payoff: promotional rates and deferred interest.** A debt can have a
  promotional rate and the day it ends. With “interest is charged back” ticked,
  the plan pays the even amount that clears it in time, as far as your monthly
  payment allows, and says how much interest would be added if it falls short.
  This is an estimate; check your agreement.
- **Debt payoff: how interest is worked out, per debt.** Monthly (as before),
  compounded daily, or simple daily interest. A debt that uses none of this gets
  exactly the plan it got before.
- **A limit on concurrent CSV imports.** One person importing alone isn’t slowed.
  When several large files are committed at once, the extras wait for a turn
  without holding a database connection, for up to 30 seconds by default, and are
  then refused with a message that says nothing was imported. Sending the same
  file again imports it once. Measured on a small test machine, ten people
  importing 50,000 rows each used to make most other requests fail for about 40
  seconds; with the limit, none did. See
  [Concurrent imports](https://wickermoney.dev/docs/self-hosting/configuration#concurrent-imports).
- **For plugin authors:** an experimental notification toast in
  `@wickermoney/ui-kit` (for the core app only for now), a `rowDetail` option on
  `Table`, a `link` icon, and two additive messages in the experimental isolated
  protocol. Nothing was removed. See
  [Writing a plugin](https://wickermoney.dev/docs/contributing/plugin-authoring#toasts-row-detail-and-the-link-icon-ui-kit).
- **End-to-end tests.** A first package of seven smoke specs that drives the built
  image through a throwaway compose stack. It isn’t part of the regular test run,
  and the compose stack it uses hasn’t been run under Docker yet.

### Changed

- **The API has a per-user rate limit, on by default.** Each signed-in user may
  make 600 requests a minute, 30 CSV import requests and 5 data exports. Someone
  using the app won’t meet it: a heavy session makes under a seventh of the
  general limit. **A sync, a poller or a script that loops over the API may get
  `429 rate_limited`.** Raise `API_RATE_LIMIT_MAX`, or set
  `API_RATE_LIMIT_ENABLED=false` to turn the limit off. The counters are per API
  process. See
  [API rate limit](https://wickermoney.dev/docs/self-hosting/configuration#api-rate-limit).
- **Upcoming, Forecast and Debt payoff run in sandboxed frames.** Like Insights
  and Spending Trends since v0.6.0, they no longer share the app’s page or your
  session, and read through the app with only their own grants. They look and
  behave as before. Only Budgets and Import CSV still run in the app’s own page.
  The sandbox has the same known gaps and still hasn’t been independently
  reviewed. See
  [How much a plugin is trusted](https://wickermoney.dev/docs/features/plugins#how-much-a-plugin-is-trusted).
- **Dashboard widgets in frames start when you scroll to them.** A card that
  runs in a frame loads once it is within about 600 pixels of the window. Frames
  in the first screen load as before. Find in page and printing only see the
  cards that have started.
- **The app says what an action did in a notification.** On Transactions,
  Recurring, Accounts, Categories and Settings, a result such as “Deleted
  ‘Coffee’ (-$4.50).” stays at the top of the page until you close it. There is
  no Undo, and nothing closes itself. See
  [Notifications](https://wickermoney.dev/docs/features/notifications).
- **The Transactions recurring column is quieter.** A matched row shows its
  recurring item as a pill with an Unmatch button. A new Link button on each row
  opens a list under it with the suggestion, the other items it could be, and the
  ones you dismissed.

### Fixed

- **A hovered primary button keeps its colours.** It used to turn light grey
  under its light text.
- **Phone layout:** text buttons in the Transactions recurring column no longer
  overlap their neighbours.
- **Erase my data and a write in flight.** A write that was open when the erase
  started could commit afterwards and leave a row. The erase now waits for open
  writes. A request that had already passed its session check can still leave one
  row, which the next erase removes.
- **`pnpm dev` and plugin frames.** Widgets in frames failed to start in
  development, and `pnpm dev` failed on Windows with `EPERM`. Both are fixed; the
  dev server now serves the frame through the API.

### Migrations

Two new migrations, so an upgrade runs two more steps. Going back is `down`
twice.

- **034** adds an “In plan” switch and an extra amount to each debt. Every
  existing debt stays in the plan with no extra.
- **035** adds the repayment start date, the promotional rate and its options,
  and the interest option to each debt, each with a default that keeps today’s
  behaviour. Its `down`, like 034’s, discards what you set in the new columns.
