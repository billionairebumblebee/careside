# Elastic

## CareSide status
Implemented and live verified: case-isolated keyword retrieval feeds source-bound answers.

## Established requirements and sources
- Workshop centers research agents and Elasticsearch context engineering. Actual track criteria pending.
- No timeline details; guide prizes/workshop, criteria pending.

Source provenance: canonical `sponsor-intelligence.html` sponsor/track and complete-channel inventory, refreshed October 24, 2026. This document preserves established rules and unresolved gaps; later app evidence below supersedes the packet's old “hospital not built” snapshot. Slack links may require event-workspace access.

- [Source 1](https://docs.google.com/document/d/1RQrueC9wm5u8uxtWSC2gadIchp05hVayhGUrIjxT9dE/edit)

## Meaningful user function
Server-isolated case-source retrieval is implemented behind configuration.

## Actual code and run evidence
`elastic-context.mjs`, `api-handler.mjs`, `test/elastic-context.test.mjs`, `test/retrieval-authorization.test.mjs`. Actual index `careside-private-context-v1`: live two-case test returned four matches per case and no cross-case result. Actual combined CREAO run `94da3015-018c-4b21-9e53-9496b91e59c6` used four Elastic matches, revision 2, query time `2026-10-25T17:24:13.303Z`. CREAO authored the mapping-validation patch in its sandbox; local coding agents reviewed, applied and pushed it.

## Demonstration
Inspect the completed answer source details: Elastic, case-scoped, keyword, count, revision and query time. Namespaces are server-derived HMACs. API tests reject staff/caregiver access to private patient retrieval, including after revocation.

## Eligibility gaps and limits
Keyword search is verified; no semantic/vector claim. The 30-day credential has no cluster privileges and covers one index. One mixed-label model section was explicitly withheld as Unknown while independently validated sections remained. Synthetic records only; no clinical validation or guaranteed qualification.
