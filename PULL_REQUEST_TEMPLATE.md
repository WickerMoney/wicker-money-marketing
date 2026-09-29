<!-- PR title: Conventional Commits, same as commit subjects, e.g.
     content: add the pricing and self-hosting comparison page -->

## What and why

<!-- What does this change, and why? -->

## Linked issue

<!-- Closes #123, or "None". -->

## Checklist

- [ ] Commits use Conventional Commits and are signed off (`git commit -s`)
- [ ] `pnpm lint`, `pnpm typecheck` and `pnpm build` pass locally (CI runs the same checks on pull requests)
- [ ] Claims match wicker-money's `ROADMAP.md`: nothing planned is described as shipped, and the Features page lists stay in sync
- [ ] Brand rules hold: "Weave together your future." stays out of feature or "what's built" copy, terminology follows the brand guide
- [ ] Any `--wm-*` change in `src/styles/global.css` still matches `packages/ui-kit/src/tokens.css` in wicker-money
- [ ] Pages checked in light and dark mode (screenshots below if visual)

## Related PRs

<!-- Matching changes in wicker-money or wicker-money-dev, or "None". -->
