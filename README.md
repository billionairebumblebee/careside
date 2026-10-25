# CareSide

A synthetic hospital-companion prototype: Richard helps a patient understand a source-labeled timeline, prepare a staff question, and share a reviewed update with an authorized caregiver.

## Evidence boundaries

- All chart entries, patients, staff roles and medication records in this demo are fictional. There is no live hospital/EHR integration, clinical validation, diagnosis, dispatch or treatment action.
- Patient-reported observations, simulated chart/staff facts, public general references and unknowns must remain distinct. An order does not establish administration; a public drug indication does not establish why a clinician ordered it for a particular patient.
- Caregiver access requires authorization and can be revoked. This prototype does not establish compliance certification or production clinical readiness.

## Public medication references

`medication-reference.mjs` accepts only an allowlisted topic ID. It never sends patient narrative or chart records to public collection. The first supported topic is general [famotidine information from MedlinePlus](https://medlineplus.gov/druginfo/meds/a687011.html). This reference must not be mapped to the fictional “Example medicine A.”

Actual verified provider: direct public retrieval. The Bright Data adapter is prepared, but a live Bright Data request/credited balance has not yet been verified. Setting server-only `BRIGHT_DATA_API_TOKEN` and `BRIGHT_DATA_UNLOCKER_ZONE` selects the documented [Bright Data Web Unlocker request API](https://docs.brightdata.com/api-reference/rest-api/unlocker/unlock-website). Do not call it used merely because code exists.

Every retrieved source carries URL, retrieval time and source level. Unknown publication dates remain null. Quotation validation verifies an exact passage against retrieved content; it does not prove clinical correctness, personalized applicability, or elimination of hallucinations. Retrieval failures return unknown rather than a fabricated reference.

## Development

Run `npm install`, then `npm test`. Provider credentials belong only in ignored server environment files. Never commit credentials or real patient data. Runtime/deployment setup is being completed separately; do not infer deployment from a local test result.

## Hackathon provenance

CareSide is a separate prototype developed during Cal Hacks 13. Richard branding/art is reused from Money Meow, which was developed during this event. The existing CREAO account and agent infrastructure are shared development resources; they are not evidence that a hospital integration existed earlier. Third-party dependencies are recorded in package.json/package-lock.json. This is not an “everything was newly authored” claim.

The [official Cal Hacks FAQ](https://www.calhacks.io/) permits pre-event ideation and requires implementation during the hackathon (verified October 24, 2026). It does not provide an itemized exemption or general disclosure rule for every reused asset. Answer submission provenance questions accurately and preserve the distinction between reused resources and CareSide-specific implementation.
