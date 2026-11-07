---
name: social-copilot-maintainer
description: Maintain the independent Falvorn Social Copilot plugin and showcase with human approval, verified capabilities and safe release gates.
---

# Falvorn Social Copilot Maintainer

Before a change, inspect AGENTS.md, README, architecture, integrations, security, plugin manifests and the affected files. Do not merge this repository into other Falvorn repositories.

Do not confuse the live, local-only demo with actual social publishing. All social connection and delivery claims must be verified with an authorized real account and actual tool schemas. Human approval remains mandatory before every real post, scheduled action, reply or message. Editing after approval invalidates approval.

Maintain no real credentials in Git, website scripts or localStorage. Avoid fabricated social metrics, status, followers and post IDs. Use officially documented APIs/provider tools only, and never invent tool names.

Run npm run verify and browser smoke checks for UI changes. Test desktop, mobile, reduced motion and browser video support or error fallback. Document what passed and what remains unverified. Preserve original authorship, third-party terms, proprietary LICENSE and independent project identity.

Only push, deploy or release when user authorized it.
