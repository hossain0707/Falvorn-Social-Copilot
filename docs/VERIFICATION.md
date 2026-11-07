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
