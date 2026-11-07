# Verification ledger

## Automated checks

- npm run check validates required source files, plugin manifests, fourteen skill folders and all referenced HTML element IDs.
- npm test runs Node tests verifying valid drafts, approval gating, edit invalidation, modification detection, scheduling constraints, local queue restoration and truthful counters.
- npm run verify runs both.

## Browser checks to perform before release

1. Inspect hero and 3D art at desktop 1440px and mobile 375px.
2. Generate an Instagram draft; edit, approve and schedule it locally.
3. Verify a changed approved caption requires reapproval.
4. Switch to Facebook and create a separate caption.
5. Inspect local queue and activity counts; refresh to verify persistence.
6. Open Watch motion film and verify that the visual sequence plays immediately; test optional Export video or clear unsupported-browser message.
7. Confirm no network call to Meta or PostZen from the public website.
8. Verify CSP/security headers and mobile legibility.

## Explicitly unverified

No real account tokens were supplied or accessed. Authenticated Instagram, Facebook Page, scheduling, message and analytics tool behavior cannot be certified without OAuth authorization. The demo is not a production social media publishing backend.


## Release evidence — 2026-11-07

- GitHub CI green: https://github.com/hossain0707/Falvorn-Social-Copilot/actions/runs/42356091531 (commit ac59052).
- Production deployment READY: dpl_9ApezY2gthF5uBgPMTasvCdQaUjG, public URL https://falvorn-social-copilot.vercel.app.
- Automated browser walkthrough verified the studio could generate Instagram and Facebook demo drafts, approve drafts, add a local schedule, and update local counts without making external social calls.
- Initial browser QA also detected an empty default brief and a hanging on-demand movie recorder. Commit 6fe8784 implements a default brief, an immediately playing animated film, and bounded optional video export. Current deployment contains those changes. The corrected full interactive film/export has not yet been independently browser-retested across browsers.
- Deployment method: Vercel API inline production deploy from the GitHub repository's site files. GitHub integration permission is not available for this new repo yet, so future Git pushes will NOT auto-deploy until Vercel's GitHub integration is granted access and linked. Avoid representing Git integration as already active.
