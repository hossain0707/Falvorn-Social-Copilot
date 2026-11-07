# Architecture

Falvorn Social Copilot has two intentionally separate surfaces.

## ChatGPT plugin
The plugin/ directory contains the portable manifest, fourteen original workflow skills and optional third-party PostZen MCP configuration. ChatGPT generates the content and can call connected approved tools after authorization and exact human approval. The repository does not deploy a separate social publishing server or collect account passwords.

## Static demonstration site
The site/ directory is a dependency-free HTML/CSS/ES-module website. The hero uses original CSS 3D transforms with motion and pointer tilt. The studio offers example draft generation using local templates, caption edits, approval, date-based simulated scheduling and simulated handoffs. It never contacts Meta or an AI model. Browser localStorage persists demo-only drafts; a visitor can clear that state.

The browser motion film draws original frames into Canvas and captures a genuine video via MediaRecorder. Browser codec support varies.

## Approval demonstration

Draft → Approved → Scheduled locally → Simulated handoff.

Or: Draft → Approved → Simulated handoff.

Any content edit reverts to Draft, invalidating approval. The signature in site/core.mjs detects unintended edits for the local demo flow, but browser state is under the visitor's control and must never be trusted as authorization for a real external action.

## Hosting

Set Vercel Root Directory to site. No build/install command is needed. Security response headers are in site/vercel.json. No tokens or database are needed for the public demo. No paid resources are provisioned.

## Trust boundary

External action authorization stays inside ChatGPT's connected-provider flow, not the website. Provider feature availability and OAuth, webhook, audit, retry and rate-limit handling require account-specific verification.
