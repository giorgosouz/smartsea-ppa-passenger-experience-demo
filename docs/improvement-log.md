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
