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

Hypothesis: after reframing the demo around SmartSEA Intermodal APIs, future edits could drift back toward signage/CMS positioning unless the validator requires the new API-layer pillars.

Improvement: updated `scripts/validate-content.mjs` to require the SmartSEA Intermodal APIs message pillars and additional raw-response UI identifiers.

Success proxy:
- app copy must include SmartSEA Intermodal APIs,
- app copy must state that the product is the API layer,
- app copy must keep CMS and screens as channels,
- app copy must preserve Connection risk and Recovery action language,
- app code must not reintroduce common raw JSON/API response panel identifiers.

Evidence:
- `npm run validate` should pass for the API-first demo and fail if the required API-layer positioning is removed.

## 2026-04-28

Hypothesis: using a revised proposal PDF for visual direction could accidentally overwrite the first Word draft's passenger-information narrative or copy proposal-template material into the app.

Improvement: updated `npm run validate` to require the first-draft narrative pillars and reject CEO/contact/proposal-template phrases from app copy.

Success proxy:
- app copy keeps "from screens to passenger information",
- app copy keeps Control / React / Extend,
- app copy keeps CMS and screens as channels,
- app copy blocks revised-PDF-only CEO, contact, and installation-bid phrasing.

Evidence:
- `npm run validate` should pass after the revised visual restyle and fail if those narrative pillars or safety guards regress.

Hypothesis: switching the baseline to the final "Beyond Digital Signage" proposal could drift the app away from the proposal's section logic or accidentally import its prior-collaboration line.

Improvement: updated the content validator and source notes to require the final proposal anchors while blocking TravelWise/ongoing-collaboration claims.

Success proxy:
- app copy must keep the proposal anchors for dynamic operational guidance, CMS/data-layer roles, SmartSEA role, invitation to engage, and baggage status,
- app copy must not include TravelWise or ongoing-collaboration positioning,
- the reference use case remains explicitly protected in source notes.

Evidence:
- `npm run validate` should pass after the final-proposal narrative update and fail if those anchors or safety guards regress.

Hypothesis: after sharpening the demo around the USP, future edits could drift back to generic signage/CMS value instead of SmartSEA decision intelligence.

Improvement: updated the app copy and validator to require the decision-layer USP, including the "Not digital signage" hero, "Any vendor can display signs" framing, intermodal proof, MCT/recovery, and baggage-processing anchors.

Success proxy:
- app copy must present SmartSEA as the passenger decision layer,
- demo screens must keep intermodal, MCT/recovery, and baggage-processing proof as evidence of that layer,
- validation fails if the new USP anchors are removed.

Evidence:
- `npm run validate`, `npm run build`, and desktop/mobile browser checks should pass after the USP rewrite.

Hypothesis: even with the USP fixed, screen examples can still feel generic if they use broad airport/port labels instead of PPA operating language.

Improvement: rewrote the demo screen scenarios around PPA cruise operations and added validation anchors for PPA Mobility Desk, transfer bay, baggage hall, and PPA screen publishing.

Success proxy:
- passenger displays read as Piraeus/PPA cruise-operation screens,
- intermodal proof still includes ATH, Piraeus rail, vessel, baggage, and PPA terminal readiness,
- validation fails if the PPA screen anchors disappear.

Evidence:
- `npm run validate`, `npm run build`, and desktop/mobile browser checks should pass after the PPA screen-tailoring update.

Hypothesis: PPA-specific text is not enough if every mock screen uses the same visual template.

Improvement: added screen format variants for advisory, terminal, transfer, baggage, rail, handoff, staff, and mobile views, with distinct panels and styling.

Success proxy:
- the screen wall shows visibly different touchpoint formats,
- validation fails if the variant rendering or key format assignments disappear,
- desktop/mobile checks confirm the larger variant layouts still fit.

Evidence:
- `npm run validate`, `npm run build`, and desktop/mobile browser checks should pass after the screen-format update.

## 2026-05-04

Hypothesis: a capability-table update can regress into generic prose unless each capability is represented by a protected structured screen.

Improvement: added a capability screen scenario and validator anchors for all eight SmartSEA capability names plus the structured screen detail renderer.

Success proxy:
- the demo contains passenger-ready screens for journey risk, next best action, group orchestration, disruption recovery, terminal flow, berth impact, zone triggers, and beyond-terminal guidance,
- `npm run validate` fails if those capability anchors or the structured screen renderer disappear.

Evidence:
- `npm run validate` and `npm run build` should pass after generating the capability screens.
