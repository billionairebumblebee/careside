# Apify

## CareSide status
Implemented and live verified: public-reference Actor retrieval reaches the source-bound answer pipeline.

## Established requirements and sources
- Meaningful real-time web data, workflow automation, or agent integration. MCP, CLI and API. Sponsor update specifies Best Actor built with AI Chat ($400). $200 credits via APIFY_CAL_HACKS; existing users use Billing → Subscription → Promo Code; paying members should contact Petros. Workshop Saturday 11 AM–noon. Slack describes $5,000 total including the $400 Actor award; the guide labels the five places “$5,000” although they sum to $4,600. Do not double-count. Sponsor post .
- $200 credits. Code APIFY_CAL_HACKS ; existing users use Billing → Subscription → Promo Code. Offer · Docs · MCP: https://mcp.apify.com.
- Cash awards, $200 credits, MCP/API/CLI and meaningful-use requirement.

Source provenance: canonical `sponsor-intelligence.html` sponsor/track and complete-channel inventory, refreshed October 24, 2026. This document preserves established rules and unresolved gaps; later app evidence below supersedes the packet's old “hospital not built” snapshot. Slack links may require event-workspace access.

- [Source 1](https://cal-hacks-13-0.slack.com/archives/C0C7TGUC924/p1792528380692499)
- [Source 2](https://console.apify.com/sign-up?couponId=APIFY_CAL_HACKS)
- [Source 3](https://docs.apify.com/)

## Meaningful user function
The official Website Content Crawler retrieves an allowlisted MedlinePlus famotidine reference. Only the fixed public URL reaches Apify, never the patient narrative or chart. The normalized source retains URL, retrieval time, provider and Actor run receipt.

## Actual code and run evidence
`medication-reference.mjs`, `medication-reference.test.mjs`, `api-handler.mjs`, `public/app.js`. Actual Actor run `eqKd7wQBaVFJQghPO` retrieved 6,907 characters on October 25, 2026; [Actor receipt](https://console.apify.com/actors/runs/eqKd7wQBaVFJQghPO). Actual CREAO consumption run `e2592690-6854-4a1c-a5b5-2a3afad453b0` completed with validated GeneralEducation and Unknown answers, preserving source ID `REF-famotidine-16b4160c576b` and the Actor receipt. The consumption check reused the actual retrieved packet rather than creating a duplicate Actor run.

## Demonstration
Choose About famotidine, inspect the answer's Apify source receipt, retrieval time, source URL and exact supporting quotations. The fictional Example medicine A is not identified as famotidine. Direct retrieval, when used, stays labeled direct-public-reference.

## Eligibility gaps and limits
This uses the existing official `apify/website-content-crawler` Actor; no custom Actor was built, so the separate Best Actor built with AI Chat prize is not claimed. Account access may be required to view the console receipt. No clinical validation, personalized medication advice or sponsor-award outcome is claimed.

All clinical records are synthetic. No diagnosis, clinical validation, real EHR connection, automatic medical action or measured patient benefit is claimed. See the main README for the founder contribution and reused assets.
