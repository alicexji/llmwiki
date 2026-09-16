---
type: concept
title: July 7 Certificate Incident
tags:
  - incident
  - tls-certificate
  - outage
  - atlas
  - root-cause
created: '2026-09-16T01:58:21.960Z'
sources:
  - sources/13-july-certificate-incident-summary.md
---
## Overview
On July 7, Project Atlas suffered a **22-minute service interruption** caused by an expired TLS certificate.

## Root Cause
The expired certificate prevented an internal application service from communicating with the **loan processing service**, breaking a critical workflow path.

## Resolution
- Engineering renewed the TLS certificate
- Normal service was restored

## Follow-up Actions
Platform Engineering added **automated certificate expiration monitoring** to detect similar issues before they cause outages.

## See also

- [Project Atlas](../entities/project-atlas.md)
- [Platform Engineering](../entities/platform-engineering.md)
