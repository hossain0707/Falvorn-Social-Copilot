# Integration setup

## ChatGPT

Open the [private plugin](https://chatgpt.com/plugins/plugins_6aee86621324819180a3fcda3276de66). The fourteen skills can draft, research, rework and plan content inside ChatGPT even without any connected social account.

## Instagram / Facebook Pages

The optional MCP configuration in plugin/mcp.json points to https://mcp.postzen.dev/mcp. If available, follow ChatGPT's secure connection flow to sign in at PostZen and authorize eligible accounts. Never enter an account password or access token into the public demo.

- Instagram: eligible Creator/Business professional account and appropriate permissions.
- Facebook: authorized Page, not personal timeline posting.
- DM, comments, insights, Stories and content variants may require additional scopes or may be unsupported. Check available tools at connection time.

Provider: https://www.postzen.dev/instagram-agent-skill and https://www.postzen.dev/facebook.

Meta official documentation: https://developers.facebook.com/docs/instagram-platform/

## Approval-first release steps

1. Verify exact authorized destination and supported provider tools.
2. Show the final media, caption, selected account/Page, scheduling timezone and external action.
3. Request explicit human approval for that exact preview.
4. Make one authorized call, report the returned provider status and identifier.
5. Do not declare published after a mere queue acknowledgement. If the status is uncertain, reconcile it without blind duplicate retries.

**Current status:** The account connection and actual Instagram/Facebook publishing are not yet independently tested here. The website never sends real posts.
