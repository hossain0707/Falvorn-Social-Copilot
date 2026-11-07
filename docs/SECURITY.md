# Security model

This website is static and contains no social integration credentials, live publishing routes or data collection. The only stored data is optional demo copy and status in the visitor's own browser localStorage. It is limited to 30 records and can be cleared.

No user-supplied brief or caption is rendered as HTML; all live previews use textContent or DOM text nodes. The Vercel configuration sets a restrictive Content Security Policy, disallows frames/objects and disables camera, microphone, payment and geolocation permissions. The browser film runs entirely client-side, without camera access.

The local approval signature is not cryptographic authorization and localStorage can be edited by the user. Real provider-side actions must have a separate verified identity, OAuth permissions, user approval, idempotence and audit trail. Never trust the public demo to authorize connected posting.

Known limitations: this release does not include a multi-tenant production backend, provider token vault, webhooks or verified publishing integration. PostZen is an independent third-party integration. Video export requires MediaRecorder and a supported MIME type. Do not use public issue comments for sensitive account information.
