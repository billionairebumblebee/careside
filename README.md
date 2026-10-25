# CareSide

A synthetic hospital-companion prototype: talk or type to Richard, correct his readback, confirm your recollection, ask a source-grounded question, and share a reviewed update with an authorized caregiver.

## How we use Convex
Durable cases and answer jobs live in a separate Convex deployment.
Indexed custom capabilities filter patient, staff and caregiver reads.
Realtime subscriptions deliver staff answers and revoke caregiver access without refresh.
See [the code-backed hackathon log](hackathon.md) for features, proof files and dated commits.

## Why Vivian built CareSide

Vivian Yang arrived at Cal Hacks building Money Meow. An unexpected ER visit after food or drink—with mouth numbness and possible swelling—made waiting, follow-up questions and family communication concrete problems. A doctor considered a mild allergic reaction or a physical stress response; the cause remained uncertain. Her roommate accompanied her, and her mother struggled to get updates about what was happening and when she could leave. That experience prompted the CareSide pivot; it is not a diagnosis or evidence of hospital negligence.

Vivian selected the problem, designed the talk-first patient/caregiver workflow, directed the agent team, tested and revised the UX, set source and consent boundaries, and presents the project. Coding agents substantially authored and integrated implementation code. CREAO supplied actual runtime answers and planning/review/marketing work; we do not claim its agents autonomously edited this repository. No personal medical photos or records are included in this public repository.

## CREAO submission evidence

- Dedicated saved hospital agent: **`28c98e79-312c-4e5f-ab2b-22bbb9d9b93d`**, Hospital Companion — Timeline & Questions.
- Actual completed API run: **`3fa7084f-d0c8-4187-a0b7-047751ade218`**. [Synthetic run share](https://agent.creao.ai/share/38bfd75de0f779412c97c1726839b9cb) (platform expiry shown as November 24, 2026).
- Core path: owned synthetic case and source records → saved CREAO agent → structured answers → server quotation/source-category and bounded contradiction checks → patient answer with citations. Removing the agent stops generated source-bound Q&A; deterministic consent, timeline review and queue operations remain available.
- Configured model: **Claude Sonnet 5.5 Medium** through CREAO. Configuration is verified; the API response did not provide per-run model telemetry. This is not direct Anthropic API or redeemed-credit proof.
- In Devpost, select the CREAO track and include the saved agent ID and completed run-share link. AI-First Disruptor and One-Person Company are distinct requirements; implementation evidence does not guarantee an award or submission acceptance.

### Saved-role organization and actual coordination

| Role | Saved agent ID | Actual scope |
|---|---|---|
| CareSide COO | `1962510c-5ad8-461e-9be1-6c151b3eba6f` | Master acceptance, dependencies and role directives; master thread `030da988-e0dc-4115-bab4-bdd0153ad4fd` |
| CTO | `f16f21a7-ef79-4bae-aa83-013ca6ad174b` | Architecture, implementation and test directives |
| UI/UX | `6136a8ac-e2f0-49aa-ae2b-88ff7aa3f008` | Talk-first patient/caregiver experience |
| Research/runtime | `28c98e79-312c-4e5f-ab2b-22bbb9d9b93d` | Source-bound synthetic care answers |
| CMO | `817a870c-bc1a-4286-a843-18011f7e59d5` | Concept deck, story and presentation work |
| QA/Brief Auditor | `145abf55-c3be-48e7-84d1-7f87fe24ddeb` | Evidence and acceptance review |

COO saved-role handoffs resolve role playbooks into the current sandbox; they are not proof of independently executing role processes or repository access. A separate native workflow did execute 20 bounded review tasks with concurrency three: **1 PASS, 0 FAIL, 16 UNKNOWN and 3 deliverables**. UNKNOWN meant missing accessible evidence, not a completed test. No overnight recurring loop is claimed. The One-Person Company entry should disclose these boundaries rather than treat an org chart alone as orchestration proof.

## Live prototype and verified evidence

Open **https://careside.vercel.app**. This is a separate Vercel project connected to the private `billionairebumblebee/careside` repository, production branch `codex/care-side`, and a separate Convex deployment. It does not modify the Money Meow deployment.

- Production synthetic-case creation returned HTTP200. Browser checks exercised patient review, authorized caregiver sharing, staff queue/update fanout and revocation.
- A completed dedicated CREAO hospital-agent run (`3fa7084f-d0c8-4187-a0b7-047751ade218`) returned five answers spanning all four evidence labels. The agent configuration shows **Claude Sonnet 5.5**, used for API runs. This is configuration evidence, not per-response model telemetry or direct Anthropic API proof.
- The current focused suite contains 24 passing tests. Independent source checks cover exact quotation provenance and bounded order/administration/discharge contradictions; they do not establish general semantic entailment or clinical validation.
- Working prototype evidence and open limits are consolidated in `.doc-qa/QA-REPORT.md`; deployment evidence is `.doc-qa/deployment-proof.json`.

## What ran and what did not

The deployed prototype, one actual configured-Claude run, deterministic source checks, and browser consent/revocation tests have evidence. Recurring overnight Judge/Inventor execution has not been verified by this README; prepared agents or a planned loop are not proof that jobs ran. Sponsor qualification and a completed submission are separate from implementation. Credit redemption is still unverified.

## Evidence boundaries

- All chart entries, patients, staff roles and medication records in this demo are fictional. There is no live hospital/EHR integration, clinical validation, diagnosis, dispatch or treatment action.
- Patient-reported observations, simulated chart/staff facts, public general references and unknowns must remain distinct. An order does not establish administration; a public drug indication does not establish why a clinician ordered it for a particular patient.
- Caregiver access requires authorization and can be revoked. This prototype does not establish compliance certification or production clinical readiness.

## Public medication references

`medication-reference.mjs` accepts only an allowlisted topic ID. It never sends patient narrative or chart records to public collection. The first supported topic is general [famotidine information from MedlinePlus](https://medlineplus.gov/druginfo/meds/a687011.html). This reference must not be mapped to the fictional “Example medicine A.”

The app-connected public-reference path was exercised in actual CREAO run `0368f4fa-0ead-43fb-a762-216ac157f4ce`: direct MedlinePlus retrieval → distinct general-reference source → generated answer with validated quotations. The provider was **direct-public-reference**, not Bright Data. The Bright Data adapter is prepared, but live Bright Data retrieval and credit redemption remain unverified. Setting server-only `BRIGHT_DATA_API_TOKEN` and `BRIGHT_DATA_UNLOCKER_ZONE` selects the documented [Bright Data Web Unlocker request API](https://docs.brightdata.com/api-reference/rest-api/unlocker/unlock-website).

Convex provides separate durable case state and role-filtered reactive updates. Elastic retrieval is implemented behind server configuration and isolation tests, but no live CareSide Elastic project/query is verified. Fetch/ASI and Visa evidence from Money Meow is not CareSide integration proof. Azure is not used; its absence alone is not a Microsoft-track disqualification under the available mentor clarification. No measured clinical benefit is claimed.

## Working demonstration

1. Start a clearly labeled synthetic case. Type a recollection or explicitly enable microphone dictation where supported.
2. Review Richard's editable readback, correct it, and confirm. Only confirmation creates a reviewed **PatientReported** timeline entry.
3. Ask about a documented collection: source/time-grounded facts can answer it. Missing ETA or rationale remains unknown and can enter the staff exception queue.
4. Authorize a caregiver, separately opting into question access. Patient and caregiver versions of the same unresolved question share one queue item.
5. A synthetic staff operator answers once; the authorized caregiver receives the confirmed source update through Convex. Revoke access to clear and deny the caregiver view.

Four evidence labels remain distinct: **Confirmed**, **PatientReported**, **GeneralEducation**, **Unknown**. Ordered medicine is not documented administration. A pending result is not normal. The demo does not clear discharge, diagnose, prescribe, contact staff automatically, or connect to a live EHR.

## Machine-readable project context

[`llms.txt`](llms.txt) is canonical; [`public/llms.txt`](public/llms.txt) is its identical served copy at https://careside.vercel.app/llms.txt. It contains project context and route boundaries, not credentials or private case links.

Every retrieved source carries URL, retrieval time and source level. Unknown publication dates remain null. Quotation validation verifies an exact passage against retrieved content; it does not prove clinical correctness, personalized applicability, or elimination of hallucinations. Retrieval failures return unknown rather than a fabricated reference.

## Development

Run `npm install`, then `npm test` and `npm run build`. With the approved server environment in ignored `.env`, run `npm start`; this workspace uses `PORT=4181`, so the local app is http://127.0.0.1:4181 (the server defaults to4180 if PORT is absent). Required server configuration is `CREAO_API_KEY`, `CREAO_AGENT_ID`, `CONVEX_URL`, and `CARE_SIDE_SECRET`. Never commit their values or real patient data.

Production is deployed and independently opened. Pushes to `codex/care-side` trigger the connected CareSide Vercel project. Direct Anthropic $50 credit redemption and Bright Data $300 credit/access verification remain blocked at sign-in; neither is counted as used. Existing CREAO configured-Claude use is separate from those claims.

## Hackathon provenance

CareSide is a separate prototype developed during Cal Hacks 13. Richard branding/art is reused from Money Meow, which was developed during this event. The existing CREAO account and agent infrastructure are shared development resources; they are not evidence that a hospital integration existed earlier. Third-party dependencies are recorded in package.json/package-lock.json. This is not an “everything was newly authored” claim.

The [official Cal Hacks FAQ](https://www.calhacks.io/) permits pre-event ideation and requires implementation during the hackathon (verified October 24, 2026). It does not provide an itemized exemption or general disclosure rule for every reused asset. Answer submission provenance questions accurately and preserve the distinction between reused resources and CareSide-specific implementation.
