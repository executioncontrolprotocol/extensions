---
name: ecp-extensions
description: >-
  Authors vendor ECP extensions in the extensions monorepo (fal, Slack,
  image-sharp, Adobe, Azure, …). Use when adding or changing vendor packages,
  catalogExtension, package-id alignment, or vendor examples — not for everyday
  consumer Fluent authoring (use the docs ecp skill) or core monorepo internals
  (use ecp-core).
---

# ECP vendor extensions monorepo

Install: `npx skills add executioncontrolprotocol/extensions --skill ecp-extensions -y`

Also respect local `AGENTS.md` and `.cursor/rules/extensions.mdc` when this clone is open.

## Progressive disclosure

- `references/boundaries.md` — allowed deps
- `references/authoring.md` — define / catalog / register / id alignment
- `references/examples.md` — vendor `examples/` map

## Commands

```sh
pnpm install
pnpm run build
pnpm run check
pnpm run link:ecp   # after building sibling core monorepo
```

Canonical package inventory: [README Packages](https://github.com/executioncontrolprotocol/extensions#packages).
