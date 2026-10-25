# CareSide

A synthetic hospital-companion prototype: Richard helps a patient understand a source-labeled timeline, prepare a staff question, and share a reviewed update with an authorized caregiver.

## Live prototype and verified evidence

Open **https://careside.vercel.app**. This is a separate Vercel project connected to the private `billionairebumblebee/careside` repository, production branch `codex/care-side`, and a separate Convex deployment. It does not modify the Money Meow deployment.

- Production synthetic-case creation returned HTTP200. Browser checks exercised patient review, authorized caregiver sharing, staff queue/update fanout and revocation.
- A completed dedicated CREAO hospital-agent run (`3fa7084f-d0c8-4187-a0b7-047751ade218`) returned five answers spanning all four evidence labels. The agent configuration shows **Claude Sonnet 5.5**, used for API runs. This is configuration evidence, not per-response model telemetry or direct Anthropic API proof.
- A fresh October 25 local run of `npm test` passes 19/19 tests. Independent source checks cover exact quotation provenance and bounded order/administration/discharge contradictions; they do not establish general semantic entailment or clinical validation.
- Working prototype evidence and open limits are consolidated in `.doc-qa/QA-REPORT.md`; deployment evidence is `.doc-qa/deployment-proof.json`.

## What ran and what did not

The deployed prototype, one actual configured-Claude run, deterministic source checks, and browser consent/revocation tests have evidence. Recurring overnight Judge/Inventor execution has not been verified by this README; prepared agents or a planned loop are not proof that jobs ran. Sponsor qualification and a completed submission are separate from implementation. Credit redemption is still unverified.

## Evidence boundaries

- All chart entries, patients, staff roles and medication records in this demo are fictional. There is no live hospital/EHR integration, clinical validation, diagnosis, dispatch or treatment action.
- Patient-reported observations, simulated chart/staff facts, public general references and unknowns must remain distinct. An order does not establish administration; a public drug indication does not establish why a clinician ordered it for a particular patient.
- Caregiver access requires authorization and can be revoked. This prototype does not establish compliance certification or production clinical readiness.

## Public medication references

`medication-reference.mjs` accepts only an allowlisted topic ID. It never sends patient narrative or chart records to public collection. The first supported topic is general [famotidine information from MedlinePlus](https://medlineplus.gov/druginfo/meds/a687011.html). This reference must not be mapped to the fictional “Example medicine A.”

Actual adapter provider verified in an isolated source test: direct public retrieval. This adapter is not yet called by the app; do not claim it powers current chat answers. The Bright Data adapter is prepared, but a live Bright Data request/credited balance has not yet been verified. Setting server-only `BRIGHT_DATA_API_TOKEN` and `BRIGHT_DATA_UNLOCKER_ZONE` selects the documented [Bright Data Web Unlocker request API](https://docs.brightdata.com/api-reference/rest-api/unlocker/unlock-website). Do not call it used merely because code exists.

Every retrieved source carries URL, retrieval time and source level. Unknown publication dates remain null. Quotation validation verifies an exact passage against retrieved content; it does not prove clinical correctness, personalized applicability, or elimination of hallucinations. Retrieval failures return unknown rather than a fabricated reference.

## Development

Run `npm install`, then `npm test` and `npm run build`. With the approved server environment in ignored `.env`, run `npm start`; this workspace uses `PORT=4181`, so the local app is http://127.0.0.1:4181 (the server defaults to4180 if PORT is absent). Required server configuration is `CREAO_API_KEY`, `CREAO_AGENT_ID`, `CONVEX_URL`, and `CARE_SIDE_SECRET`. Never commit their values or real patient data.

Production is deployed and independently opened. Pushes to `codex/care-side` trigger the connected CareSide Vercel project. Direct Anthropic $50 credit redemption and Bright Data $300 credit/access verification remain blocked at sign-in; neither is counted as used. Existing CREAO configured-Claude use is separate from those claims.

## Hackathon provenance

CareSide is a separate prototype developed during Cal Hacks 13. Richard branding/art is reused from Money Meow, which was developed during this event. The existing CREAO account and agent infrastructure are shared development resources; they are not evidence that a hospital integration existed earlier. Third-party dependencies are recorded in package.json/package-lock.json. This is not an “everything was newly authored” claim.

The [official Cal Hacks FAQ](https://www.calhacks.io/) permits pre-event ideation and requires implementation during the hackathon (verified October 24, 2026). It does not provide an itemized exemption or general disclosure rule for every reused asset. Answer submission provenance questions accurately and preserve the distinction between reused resources and CareSide-specific implementation.
