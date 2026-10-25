# CareSide public synthetic ACP demo

An isolated public Fetch uAgent, separate from financial Money Meow. It implements Agent Chat Protocol 0.3.0. Public text is reduced to a fixed intent locally; raw visitor text is never sent to CareSide or a model. It creates only a new fictional case, reads fixed sample status, or prepares a synthetic pending staff question. No private patient case, real staff contact, diagnosis or treatment. Capability tokens remain internal.

The ACP code and direct synthetic API action have been tested. Agentverse registration and direct ASI:One discovery remain pending; do not claim qualification until observed. Hosting must stay running; a local process is not a durable deployment.

Run with the existing Python environment: python fetch-agent/agent.py. Seed stays in ignored server .env. No real patient information should be entered.
