---
title: "Unreleased — heading toward v0.1.0"
version: null
date: null
unreleased: true
---

The first tagged release, `v0.1.0`, hasn't shipped yet. This is what's landed
on `main` so far, curated from the repo's own
[CHANGELOG.md](https://github.com/wickermoney/wicker-money/blob/main/CHANGELOG.md).

### Added

- **Import and categorization.** CSV import with saved column mapping per
  source, an explicit date format with a live parse preview, duplicate
  detection and batch undo. A categories page with rules — previewed before a
  rule touches anything — and triage on the Transactions page.
- **The shell and the first plugin.** A real web host with sign-in,
  navigation and a dashboard fed entirely by plugins over Module Federation.
  Per-plugin database roles derived from each manifest's required tables.
- **Auth and the ledger.** Users, sessions, accounts, categories, category
  rules, transactions and splits, all under row-level security. Account
  balances are derived from the ledger, never stored.
- A budgets plugin with per-category budgets and per-line rollover.
- A container image (amd64 and arm64) serving the API on a single port.

### Security

- Composite `(user_id, ...)` keys close a cross-user hole where a foreign key
  could attach a transaction to another user's account.
