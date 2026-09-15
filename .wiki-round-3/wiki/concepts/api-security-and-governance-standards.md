---
type: concept
title: API Security and Governance Standards
tags:
  - security
  - api
  - compliance
created: '2026-09-15T02:27:51.189Z'
---
Mandatory technical and cryptographic standards for external partner connections to [Project Meridian](project-meridian.md) (Source Type: Security Standard; Department: Information Security; Status: Mandatory Standard; Published: June 15, 2026).

## Protocol Requirements
- **Mutual TLS (mTLS):** Required for all ingress traffic to Meridian API endpoints.
- **OAuth 2.0 with DPoP:** Application-level token replay protection.
- **Payload Signatures:** HMAC-SHA256 request header signing for balance modification requests.
- **Rate Limiting:** Tier-1 partners (such as [Helix Logistics](../entities/helix-logistics.md)) receive burst limits of 15,000 RPS, while Tier-2 partners (such as [Solis Retail Group](../entities/solis-retail-group.md)) receive 5,000 RPS.
- **Data Retention:** 7-year immutable WORM storage for state transitions and signature traces.
