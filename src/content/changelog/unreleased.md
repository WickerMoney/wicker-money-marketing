---
title: "Unreleased — heading toward v0.8.0"
version: null
date: null
unreleased: true
---

Budgets and Import CSV move into sandboxed frames, so no bundled plugin runs in
the app’s own page today. Import CSV sends its file to the API in pieces while
you map the columns, which is what lets a frame import a file of up to 8 MB.
Keyboard focus now moves across plugin frames at once and stays on a control
while its request runs, Escape in the phone navigation drawer returns focus to
the Menu button, and plugin frames download about 90 kB less. There is no
migration. **Back up your database before upgrading**, as for any release. See
[Upgrading](https://wickermoney.dev/docs/self-hosting/upgrading).

### Added

- **Import CSV: staged upload (API).** A file can be sent in pieces and then
  analyzed or imported by an `uploadId`: four new routes under the plugin’s own
  (`upload/begin`, `upload/chunk`, `upload/finish` and `upload/abort`), and
  `analyze` and `commit` accept an `uploadId` in place of `csv`. A file can be up
  to 8,000,000 bytes, in at most 64 pieces. This is what lets a sandboxed frame
  import a file larger than one message to the app. It is additive: sending the
  `csv` body works as before, for scripts and the API. Uploads are held in the API
  process’s memory (two live per user, gone 15 minutes after their last new piece
  or once imported), so there is nothing to migrate and a restart empties them.
  See
  [Staged upload](https://wickermoney.dev/docs/api/overview#staged-upload).
- **A `busy` prop and `guardBusy` in `@wickermoney/ui-kit`.** `Button`,
  `IconButton`, `Field` and `SelectField` take `busy` for a request in flight: the
  control stays focusable, looks disabled, ignores a click and says “Still
  working. Try again in a moment.” to a screen reader. `guardBusy` is the same
  guard for a plain element such as a checkbox. Additive: nothing existing
  changes.
- **`--wm-toast-height` in `@wickermoney/ui-kit`** (experimental, like the rest
  of the toast). While a toast banner shows, its height is set on the parent
  element so a stylesheet can keep a control out from behind it.
- **More checks on the frame work.** The hostile-plugin test suite gains a phase
  for the staged upload routes and grows from 149 attacks and 27 checks to 173
  and 36. New browser checks drive the Budgets and Import CSV pages in their
  frames, and the flaky checks found in v0.7.0 are steadier.

### Changed

- **Budgets runs in a sandboxed frame.** The Budgets page and the Budget
  breakdown widget no longer run in the app’s own page. They read and write
  through the app, with only the plugin’s own routes and the table reads its
  manifest lists. The page loads its categories and accounts once, when it opens,
  so a category or account added elsewhere shows after a reload, and holding
  Enter on “Previous” no longer ends in “This plugin is sending requests too
  fast”. The result of “Start this month”, and a failed remove, now appear in the
  section they belong to instead of at the top of the page.
- **Import CSV runs in a sandboxed frame.** The page no longer runs in the app’s
  own page, which leaves no bundled plugin there today. It sends the file as soon
  as it is chosen, while you map the columns, and then checks and imports by
  upload id. Large files work as before (a 100,000-row import was tested). A file
  that cannot be sent, an expired upload and a lost answer each show a message
  with a retry. Leaving the page mid-upload does not release the upload: it is
  held until it expires, 15 minutes later, and counts against the limit of two. A
  frame uses about 130 MiB more browser memory than the page did, measured in
  headless Chromium.
- **Plugin frames download about 90 kB less.** The frame’s start-up no longer
  loads parts it did not need (447,151 to 356,459 bytes of JavaScript,
  uncompressed, measured when the change was made).
- **No bundled plugin runs in the app’s own page, and what that means.** All
  seven bundled plugins run in sandboxed frames, and which plugins may run in the
  page is a list inside the host that is empty. The code that would load a listed
  plugin into the page is still in the app; nothing in the image uses it. The
  sandbox has the same known gaps (it doesn’t stop prerender or WebRTC requests
  in Chromium) and still hasn’t been independently reviewed. A frame can call
  every route of its own plugin, so the Budgets frame can change budgets and the
  Import CSV frame can analyze, import and undo imports; the sandbox holds a
  frame to those routes and the reads its manifest lists, and no further. See
  [How much a plugin is trusted](https://wickermoney.dev/docs/features/plugins#how-much-a-plugin-is-trusted).
- **The README’s Transactions screenshots show the current recurring column**
  (light and dark). Six other screenshot pairs are still out of date.

### Fixed

- **Focus and Tab order in plugin frames.** Tab at the last control of a plugin
  page or widget, and Shift+Tab at its first, now moves focus on the page at once,
  with no extra stop between two adjacent frames; at the end of a page whose last
  thing is a frame, focus goes round to the skip link. Tab is left alone while a
  modal dialog is open inside the frame. In the Forecast Tab-order check, the next
  Tab after the last control went back into the frame in 2 of 10 runs before and
  0 of 10 after.
- **Buttons, switches and checkboxes keep focus while a request runs.** Table
  actions, a form’s Save, the plugin switches, two checkboxes and the Debt payoff
  strategy buttons were disabled while their request ran, which dropped keyboard
  focus to the page. They now keep focus, look disabled and ignore a click. Four
  Import CSV buttons still disable themselves.
- **Escape in the open phone navigation drawer** (and a tap on its backdrop)
  returns focus to the Menu button.
- **A table wider than its room can be scrolled with the keyboard.** While the
  shared table overflows, its scroller is a Tab stop with a visible focus ring. A
  table that fits adds no Tab stop.
- **A plugin page frame is as tall as its page.** The last card is no longer 19
  pixels short of where it sits in the app.
- **Import CSV on a phone.** In the frame the page was 61 pixels wider than the
  window; each table now scrolls inside its own keyboard-reachable region, and
  undone rows in the history are readable in both themes.

### Migrations

None. Staged uploads are kept in the API process’s memory, not the database, so
there is nothing to run and nothing to undo: the previous image runs against the
database as it is.
