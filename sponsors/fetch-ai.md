# Fetch.ai

## CareSide status
Implemented and directly verified in ASI:One. Additional official Fetch submission saved October 25, 2026, 10:36 AM Pacific: **Team ID calhacks-296f3b2c; Status Submitted; roster 1/1**. This is separate from Devpost submission and agent registration. Sponsor acceptance is not guaranteed by a receipt.

## Established requirements and sources
Agentverse registration, Agent Chat Protocol and direct ASI:One use; Devpost plus the official CalHacks ASI:One Submission Agent. Source: [official hackpack](https://www.fetch.ai/events/hackathons/calhacks-13-0/hackpack), and the current Fetch Slack announcement linking [CalHacks event dashboard](https://asi1.ai/festival/calhacks2026/dashboard).

## Meaningful user function
The public agent accepts fixed synthetic intents: view sample collection status, distinguish a medicine order from administration, or prepare a pending discharge question in a newly isolated fictional case. Raw visitor text is classified locally and never forwarded to CareSide or a model. It cannot access private patient cases or contact real staff.

## Actual code and run evidence
- Agent: Richard CareSide, `agent1q0lj46rp8jfh4h40qn679j9wh7kmezxwcyxz3n02rmlkqzpurvxs639x39l`.
- [Agentverse profile](https://agentverse.ai/agents/details/agent1q0lj46rp8jfh4h40qn679j9wh7kmezxwcyxz3n02rmlkqzpurvxs639x39l/profile) showed Active and ASI Available, ACP0.3.0.
- Separate signed uAgent received an acknowledgement and nonempty reply.
- [Direct ASI:One profile](https://asi1.ai/ai/agent1q0lj46rp8jfh4h40qn679j9wh7kmezxwcyxz3n02rmlkqzpurvxs639x39l) actually returned source-labelled specimen collection status, timestamp, pending result and explicit synthetic limitation.
- Code: fetch-agent/agent.py; private mailbox credential and seed are excluded from Git. Evidence screenshots: .doc-qa/fetch-asi-actual-reply.png and .doc-qa/fetch-submission-confirmed.png.

## Demonstration
Open the direct ASI:One profile and ask “Show sample blood collection status.” Explain that this is an isolated synthetic communication workflow; the private patient/caregiver app remains separate. The response states pending does not mean normal and no real chart was read.

## Submitted deliverables
CareSide; solo team; public repository https://github.com/billionairebumblebee/careside ; project https://devpost.com/software/careside ; actual video https://www.youtube.com/watch?v=lfPe9Qp7Dkw ; one Agentverse profile. No table number or shared-chat bonus link was supplied. Submission agent explicitly confirmed saved/Submitted; no local file was represented as a video URL.

## Runtime and limits
Mailbox worker runs on the judging laptop, local port8103, and must remain running. It is not a Vercel-hosted always-on worker. A directory profile or screenshot does not guarantee future uptime. This is not financial Richard, real hospital integration, clinical validation, diagnosis or medical execution. No public patient data is accepted.
