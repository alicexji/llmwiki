# InfoSec and API Integration Standards: Project Meridian

Standard defined in June 2026 by Priya Patel, Director of Information Security, governing external partner API gateways and pilot integrations for Project Meridian (including Helix Logistics and Solis Retail Group).

## Overview
This document establishes security, authentication, and mutual transport protocols for all external enterprise clients integrating with the Project Meridian real-time transaction engine.

## Authentication & Transport Requirements
1. **Mutual TLS (mTLS):** All inbound traffic to Meridian API endpoints must terminate via mTLS with certificates signed by an approved enterprise Certificate Authority (CA).
2. **OAuth 2.0 with DPoP:** Token issuance requires OAuth 2.0 with Demonstrating Proof-of-Possession (DPoP) at the application layer to mitigate token replay attacks.
3. **Payload Signature Verification:** Sensitive balance modification requests must include an asymmetric HMAC-SHA256 signature header (`X-Meridian-Signature`) computed with client private keys.

## Partner Tier Rate Limiting
- **Tier 1 (Enterprise Anchor, e.g., Helix Logistics):** Burst limit of 15,000 requests per second (RPS); sustained quota of 500,000 requests per hour across production clusters.
- **Tier 2 (Standard Merchant, e.g., Solis Retail):** Burst limit of 5,000 RPS; sustained quota of 150,000 requests per hour.

## Compliance and Data Retention
All request payloads, signature verification traces, and balance state transitions must be retained in immutable WORM (Write Once, Read Many) cloud storage for seven (7) years to satisfy financial regulatory requirements.
