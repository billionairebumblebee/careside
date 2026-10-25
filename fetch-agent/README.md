# CareSide public synthetic ACP demo

An isolated public Fetch uAgent, separate from financial Money Meow. It implements Agent Chat Protocol 0.3.0. Public text is reduced to a fixed intent locally; raw visitor text is never sent to CareSide or a model. It creates only a new fictional case, reads fixed sample status, or prepares a synthetic pending staff question. No private patient case, real staff contact, diagnosis or treatment. Capability tokens remain internal.

Verified October 25, 2026: Agentverse registration succeeded; My Agents shows Active and ASI Available with Agent Chat Protocol 0.3.0. A separate signed uAgent received an ACK and response. An actual ASI:One user message returned the source-labelled synthetic collection status. This is operator-hosted on the judging laptop, not Vercel; keep its mailbox process running. Sponsor acceptance remains a judging decision.

Public profile: https://asi1.ai/ai/agent1q0lj46rp8jfh4h40qn679j9wh7kmezxwcyxz3n02rmlkqzpurvxs639x39l

Example: “Show sample blood collection status.” Actual response identifies specimen collection at08:30, a pending result, simulated source and timestamp, and explicitly says no real chart was read. Screenshot proof is in .doc-qa/fetch-asi-actual-reply.png. No inference or patient data is sent to a model by this bounded public worker.

Run with the existing Python environment: python fetch-agent/agent.py (local port8103). Seed and approved mailbox credential stay in ignored server .env. No real patient information should be entered.
