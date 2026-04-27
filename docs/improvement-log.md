# Improvement Log

## 2026-04-27

Hypothesis: future updates are most likely to regress by either weakening the core positioning or accidentally bringing internal source material into tracked files.

Improvement: added `npm run validate` via `scripts/validate-content.mjs`.

Success proxy:
- raw source directory is not tracked by git,
- app copy contains the required SmartSEA/PPA message pillars,
- tracked text is checked for obvious internal email/source leakage,
- app copy is checked for prior-engagement positioning language.

Evidence:
- `npm run validate` should pass before every content or UI commit.

Hypothesis: once the demo moves away from a raw CMS/API response preview, future edits could accidentally reintroduce JSON-response UI and weaken the passenger-facing story.

Improvement: extended `scripts/validate-content.mjs` to block the removed response-preview identifiers and labels.

Success proxy:
- demo code and styling no longer contain the removed response-preview surface,
- `npm run validate` fails if that surface is reintroduced with the same labels or component names.

Evidence:
- `npm run validate` should pass after the SpinetiX reference update and fail on the removed response-preview patterns.
