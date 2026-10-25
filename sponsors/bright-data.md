# Bright Data

## CareSide status
Implemented and live verified: public-reference backup with an explicit approved alternative source.

## Established requirements and sources
- Live public-web data essential to the core experience: removing it should remove the product’s core capability. Specific real user, live demo, resilient retrieval and clean useful output. Handle blocks, slow responses and empty results. $300 build credits . Hackpack . Source: sponsor announcement supplied by Vivian October 22. Rewards are credits and gift cards, not cash.
- Updated from sponsor post supplied by Vivian: Best Use of Public Web Data in an App; $300 build credits; three credit-plus-Amazon-gift-card awards. See main table.

Source provenance: canonical `sponsor-intelligence.html` sponsor/track and complete-channel inventory, refreshed October 24, 2026. This document preserves established rules and unresolved gaps; later app evidence below supersedes the packet's old “hospital not built” snapshot. Slack links may require event-workspace access.

- [Source 1](https://brightdata.com/?promo=calhack2026&hs_signup=1)
- [Source 2](https://github.com/ScrapeAlchemist/public-data-hackpack)

## Meaningful user function
An allowlisted public-reference adapter can use Web Unlocker when configured.

## Actual code and run evidence
`medication-reference.mjs`, `bright-reference.test.mjs`, `api-handler.mjs`, `case-core.mjs`. A real Bright request retrieved 6,342 characters from https://my.clevelandclinic.org/health/drugs/18896-famotidine-tablets at `2026-10-25T17:21:46.020Z`. Combined CREAO run `94da3015-018c-4b21-9e53-9496b91e59c6` consumed the cached source, ID `REF-famotidine-36d6bc55db8e`, alongside live Elastic retrieval. Earlier MedlinePlus direct retrieval remains direct, not Bright proof.

## Demonstration
Apify stays primary. When the configured backup actually retrieves the approved alternative, answer evidence says bright-data and retains Cleveland Clinic URL/time. Public GeneralEducation remains separate from the fictional medication order.

## Eligibility gaps and limits
Bright blocked MedlinePlus under its usage policy; no bypass was attempted. The approved Cleveland Clinic alternative succeeded. No patient text is sent to collection. Free account requests were shown; the advertised $300 promotion remains unverified. One mixed-label model section was explicitly withheld as Unknown. No clinical validation or award outcome is claimed.
