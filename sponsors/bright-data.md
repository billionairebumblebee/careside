# Bright Data

## CareSide status
Prepared / blocked; not live.

## Established requirements and sources
- Live public-web data essential to the core experience: removing it should remove the product’s core capability. Specific real user, live demo, resilient retrieval and clean useful output. Handle blocks, slow responses and empty results. $300 build credits . Hackpack . Source: sponsor announcement supplied by Vivian October 22. Rewards are credits and gift cards, not cash.
- Updated from sponsor post supplied by Vivian: Best Use of Public Web Data in an App; $300 build credits; three credit-plus-Amazon-gift-card awards. See main table.

Source provenance: canonical `sponsor-intelligence.html` sponsor/track and complete-channel inventory, refreshed October 24, 2026. This document preserves established rules and unresolved gaps; later app evidence below supersedes the packet's old “hospital not built” snapshot. Slack links may require event-workspace access.

- [Source 1](https://brightdata.com/?promo=calhack2026&hs_signup=1)
- [Source 2](https://github.com/ScrapeAlchemist/public-data-hackpack)

## Meaningful user function
An allowlisted public-reference adapter can use Web Unlocker when configured.

## Actual code and run evidence
`medication-reference.mjs`, `api-handler.mjs`, `test/reference-pipeline.test.mjs`; actual live reference run `0368f4fa-0ead-43fb-a762-216ac157f4ce` used direct MedlinePlus, NOT Bright Data.

## Demonstration
Use About famotidine: inspect evidence.reference.provider. Current evidence must say direct-public-reference, never Bright Data.

## Eligibility gaps and limits
Account/access and live provider retrieval are unverified. Prepared code and mocked tests do not satisfy essential live Bright Data use. No patient narrative is sent to public collection.

All clinical records are synthetic. No diagnosis, clinical validation, real EHR connection, automatic medical action or measured patient benefit is claimed. See the main README for the founder contribution and reused assets.
