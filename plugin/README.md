# Falvorn Social Copilot — ChatGPT + Instagram + Facebook

A private, approval-first **ChatGPT plugin** with 14 original reusable social workflows, inspired by the public PostZen demo. It adds an optional PostZen MCP connection for supported real account actions. It is not a Claude plugin and does not automatically access any social account until the user connects and authorizes it.

## The 14 skills

1. Reels and short videos
2. Niche and audience research
3. Captions
4. Carousels
5. Stories
6. Profile / Page audit
7. Weekly content calendar
8. Natural brand voice editing
9. Thoughtful community participation
10. Comment management
11. Direct message drafts
12. Content repurposing
13. Analytics and experiments
14. Approval-gated publishing / scheduling

## Examples inside ChatGPT

- "Plan seven days of content for my business on Instagram and Facebook, drafts only."
- "Write a Reel script with three hooks and make platform-specific captions."
- "Review these comments from my Page and draft respectful replies. Do not send anything."
- "Show me the exact final post for my connected Instagram and Facebook accounts. Publish only after I approve."

## Connecting Instagram and Facebook

The optional MCP server in `mcp.json` is `https://mcp.postzen.dev/mcp`, publicly documented by the third-party PostZen service. Within ChatGPT, connect the PostZen service when prompted, create or sign into your own PostZen account and authorize the desired Instagram professional account and Facebook Page. You may need to grant requested content/insights/message permissions. Nothing is connected by installing this plugin alone.

Provider documentation: https://www.postzen.dev/instagram-agent-skill and https://www.postzen.dev/facebook. The provider advertises a free plan, but rate limits, features and pricing may change.

## Publishing constraints

- Instagram personal/consumer profiles are not eligible for the published Instagram professional API workflows.
- Facebook personal profiles are not supported; use a Facebook Page you administer.
- Facebook Messenger is not guaranteed by the provider even when Page comments are available.
- Some assets, Stories, media variants and insight scopes vary by account permissions.
- ChatGPT can draft and plan without any provider connection; it cannot publish until account access and working tools exist.
- Every public action, DM, scheduled post, or automation requires an exact preview and the user's clear approval.

## Ownership and project compatibility

© 2026 Md Najmul Hossain, proprietary license for this original plugin package. No third-party code or brand assets are copied; links are references. This is independent of, but complements, the existing [Social-media-automation-agent](https://github.com/hossain0707/Social-media-automation-agent) FastAPI project. It does not change that repo. Third-party service terms apply.

## Verification status

- JSON/YAML syntax and plugin ZIP structure can be validated locally.
- Live MCP OAuth, IG/FB social connections and actual publishing require the user's consent and cannot be verified without provider sign-in.
