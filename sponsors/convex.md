# Convex

## CareSide status
Implemented: durable reactive backend.

## Established requirements and sources
- Use Convex as a meaningful reactive database and backend. Working integration, not a nominal dependency. Saturday 4 PM workshop; detailed submission criteria still require the final brief. Sponsor channel .
- No timeline build details; backend prize in guide, criteria pending.

Source provenance: canonical `sponsor-intelligence.html` sponsor/track and complete-channel inventory, refreshed October 24, 2026. This document preserves established rules and unresolved gaps; later app evidence below supersedes the packet's old “hospital not built” snapshot. Slack links may require event-workspace access.

- [Source 1](https://cal-hacks-13-0.slack.com/archives/C0CA1GV1SQP)

## Meaningful user function
Owned patient, staff and caregiver state synchronizes and revokes access.

## Actual code and run evidence
`convex/schema.ts`, `convex/cases.ts`, `case-store.mjs`, `public/app.js`; [code-backed log](../hackathon.md).

## Demonstration
Authorize question access, ask the same question from patient/caregiver, answer once as staff, observe caregiver without refresh, then revoke.

## Eligibility gaps and limits
Custom bearer capabilities are not Convex Auth or clinical identity. No registered Convex components, vector search, cron or file storage is claimed.

All clinical records are synthetic. No diagnosis, clinical validation, real EHR connection, automatic medical action or measured patient benefit is claimed. See the main README for the founder contribution and reused assets.
