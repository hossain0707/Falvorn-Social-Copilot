---
name: social-publishing
description: When asked to publish, cross-post, schedule or cancel an Instagram or Facebook post through ChatGPT.
---

# Approve, publish and schedule

This is one of 14 skills in Falvorn Social Copilot for ChatGPT, Instagram and Facebook. Use the plugin's shared [operating rules](../../references/operating-rules.md) and [brand voice template](../../references/brand-voice.md). Only use tools actually available in the session.

## Procedure

1. Check the real connected account and supported tool availability. Only professional Instagram accounts and authorized Facebook Pages are eligible for API posting; do not pretend personal profiles are supported.
2. Gather final approved content, media asset/public URL if needed, selected IG account / FB Page, chosen destinations and local publish time with timezone.
3. Render a final PREVIEW containing exact per-platform copy, account names, media, action (publish now vs schedule), and any provider charges.
4. Require an explicit confirmation referring to that concrete preview before any external write. If the user says stop, revise, or later, do not publish.
5. Use PostZen MCP functions only if actually discoverable after connection; do not invent operation names. Do not post through unofficial cookie/session automation.
6. Where provider creates a queued or scheduled item, report that status; only say "published" after a verified successful result. Capture IDs/links when available and avoid duplicate retries after uncertain status.
7. For cancellations or edits, identify the exact scheduled job and explicitly confirm deletion or replacement before action.

## Deliverable

Confirmed preview, approval record, provider status and returned post ID/link or precise connection blocker.

## Supported platforms

- Instagram: eligible professional (Business/Creator) account for API publishing.
- Facebook: eligible Page administered by the user; never promise posting to personal profiles.
- ChatGPT: planning and drafting work even when provider connection is missing.
