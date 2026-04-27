---
name: smartsea-ppa-demo
description: Maintain the SmartSEA PPA passenger experience demo, including strategic messaging, demo scenarios, content safety checks, and validation workflow.
---

# SmartSEA PPA Demo Workflow

Use this skill when changing the SmartSEA PPA demo narrative, pages, scenarios, validation, or release flow.

## Positioning

- Lead with passenger experience, not signage procurement.
- Treat CMS and screens as channels for SmartSEA's data and logic layer.
- Avoid claims based on prior engagement, private conversations, or insider context.
- Keep the story simple: the tender upgrades screens and CMS; SmartSEA upgrades the experience.

## Content Safety

- Do not track `SUPPORTING_SOURCE_MATERIAL_ORIGINALS/`.
- Do not copy internal email threads, confidentiality footers, tender excerpts, or proposal templates into tracked files.
- Use sanitized, original sales copy only.

## Validation

Run:

```powershell
npm run validate
npm run build
```

For UI changes, also run the app and browser-check desktop plus mobile layouts.
