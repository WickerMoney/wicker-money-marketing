---
title: "Unreleased — heading toward vNEXT_VERSION"
version: null
date: null
unreleased: true
---

A small patch on v0.6.0. An owner is asked to confirm before a third-party
plugin is switched on, the Transactions table fits narrower windows, the
browser console stops warning about the plugin frame, and one more
row-level security policy gets the per-statement user lookup. There is one new
migration, 033, which changes no access. **Back up your database before
upgrading**, as for any release. See
[Upgrading](https://wickermoney.dev/docs/self-hosting/upgrading#from-0-6-0).

### Added

- **Switching on a third-party plugin asks first.** In Settings, an owner now
  sees a confirmation before a plugin that is not bundled goes on. It names the
  origin the plugin loads from and the tables it is granted, and repeats that it
  runs in a sandboxed frame, has no server-side code and can send what it reads
  to another server through the sandbox's known gaps. Bundled plugins and
  switching a plugin off do not ask. The question is in the Settings page only: a
  request sent straight to the API does not ask.
- **An additive API change in a patch release.** The owner plugin list
  (`GET /api/v1/plugins/registry`) now returns `origin` and `tables` on each
  plugin. Nothing else in the response changed. See the
  [API reference](https://wickermoney.dev/docs/api/overview#plugins).

### Changed

- **The Transactions table fits the room it has.** From the phone layout up, the
  date never wraps, the Edit and Delete buttons are always in view, and neither
  the table nor the page scrolls sideways. With less room, each row becomes three
  lines with the buttons in a column beside them. Every column is still there, in
  the same order.

### Fixed

- **No more `Origin-Agent-Cluster` warnings in the browser console.** Chromium
  logged one for each plugin frame on a dashboard. The API no longer sends the
  header, and nothing about the frame's sandbox changes.

### Migrations

- **033** rewrites any policy that still calls the tenant lookup once per row so
  it runs once per statement. It returns the same rows and locks nothing where
  there is nothing to rewrite. Going back a version is one `down`, which changes
  nothing in your data.
