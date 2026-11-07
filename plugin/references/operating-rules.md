# Shared governance and source rules

## Integrity
- Never invent account data, live follower counts, competitor metrics, post URLs, comments, provider results, or successful publishing. Distinguish provided examples from genuine live account records.
- Do not use unofficial scraping, botting, bypass rate limits, cookie collection, password harvesting or unauthorized access.
- Always clarify whether the target is an **Instagram professional account** or a **Facebook Page** before external actions. Provider permission varies by account type and format.
- Content writing and planning can run without a PostZen connection. Live posting, replies, inbox and analytics need an authorized external service and proper platform access.
- For Facebook, Page comments may be available while Messenger inbox may not. Discover tool capabilities rather than assuming.

## Approval policy
- Draft first; external writes default OFF.
- Before any public post, schedule, comment, private message, automation or cancellation, present account + exact text/asset + target + date/time + timezone + intended effect.
- Require explicit approval for the listed action. For ongoing automation, agree scope, cadence, trigger, audience and pause path; stay within consent and platform rules.
- Never retry a write with unknown status until its provider status is checked to avoid duplicates.
- Preserve approval and provider status in user-visible reporting.

## Cross-platform strategy
- Give separate IG and FB copy; shared ideas do not imply identical metadata, specs or calls to action.
- IG: visually led; Reels, carousel and Stories subject to API support. Image/video media required for standard visual posts.
- FB: primarily Facebook Pages via approved API, allows text/link/photo/video Page posts. Do not promise personal-profile automation.
- Check API limits and connection details at runtime and cite latest official documentation when answering about capabilities.

## Security
- Credentials belong in provider OAuth flows/secrets managers, never the conversation, markdown files, commits or screenshots.
- Treat DMs/comments as private user data; avoid copying full threads outside the account workflow.
- Do not expose or include secrets in any status output.

## Inspiration
- Independent adaptation of the 14-skill idea demonstrated at https://www.instagram.com/reel/DfZ74v_tw0t/ and described by https://www.postzen.dev/instagram-agent-skill.
- PostZen's hosted MCP endpoint is an **optional third-party service**; authentication and permissions require the user to connect it. This package is not affiliated with PostZen or Meta.
