# Hackathon log

- Project: CareSide
- Event: CalHacks 13.0
- What it does: A synthetic hospital companion lets a patient review their recollection, ask source-labeled questions, and share staff updates with an authorized caregiver.
- Live app: https://careside.vercel.app
- Repo: https://github.com/billionairebumblebee/careside
- Frontend: Vercel
- Convex deployment: https://quick-rabbit-590.convex.cloud
- Components: none (no @convex-dev packages or app.use registration)
- Convex features: schema, indexes, queries, mutations; realtime query subscriptions through ConvexClient.onUpdate (not React useQuery)
- Auth: Other (custom hashed bearer capabilities; synthetic demo roles, not clinical identity)
- AI models: none (no provider model ID selected in code; CREAO saved-agent configuration is documented separately in README)
- Started: 2026-10-25T05:36:42Z
- Last updated: 2026-10-25T16:14:20Z

## How we use Convex

- Durable patient cases and pending answer jobs: `cases` schema and server mutations persist source-labeled state across processes; proof: `convex/schema.ts`, `convex/cases.ts`, `case-store.mjs`.
- Shared patient/caregiver questions: an atomic `update` mutation applies question deduplication and one staff answer to the owned case; proof: `convex/cases.ts`, `case-core.mjs`, `test/case-authorization.test.mjs`.
- Live staff/family screens: `cases:read` subscriptions update authorized answer cards without refresh; fallback polling runs only when unsubscribed; proof: `public/app.js` (`connectReactive`), `convex/cases.ts`.
- Revocation: clearing the family capability hash invalidates the indexed read and clears the caregiver view; proof: `convex/schema.ts`, `convex/cases.ts`, `public/app.js`.
- Bounded answer starts: `budgets.by_day` and case job reservation share an atomic mutation; proof: `convex/cases.ts`, `test/case-authorization.test.mjs`.

## Log

- c063504 — 2026-10-25: patient/staff/family interface; `public/index.html`, `public/app.js`, `public/style.css`.
- e87eeeb — 2026-10-25: allowlisted general-reference retrieval and quotation checks; `medication-reference.mjs`, `medication-reference.test.mjs`.
- 44b4860 — 2026-10-25: active async status polling and failures; `public/app.js`.
- 5d75fb8 — 2026-10-25: durable private case runtime, roles and consent; `convex/schema.ts`, `convex/cases.ts`, `case-store.mjs`, `api-handler.mjs`.
- 92d6681 — 2026-10-25: reactive case subscription and patient recollection; `public/app.js`.
- 06e51c7 — 2026-10-25: job reservation and reported-source tests; `test/case-authorization.test.mjs`.
- ec2f75c — 2026-10-25: sentence-scoped clinical contradiction checks; `case-core.mjs`, `test/research-grounding.test.mjs`.
- 97f2ec1 — 2026-10-25: retain drafts after failed saves; `public/app.js`.
- 108d5bf — 2026-10-25: connect public reference and isolated retrieval; `api-handler.mjs`, `elastic-context.mjs`, `test/reference-pipeline.test.mjs`.
- 1302705 — 2026-10-25: reviewed editable readback before timeline creation; `case-core.mjs`, `api-handler.mjs`, `test/intake-review.test.mjs`.
- bd68967 — 2026-10-25: factual provider, founder and CREAO evidence; `README.md`, `llms.txt`, `public/llms.txt`.
