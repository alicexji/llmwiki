---
type: concept
title: September 4 Authentication Incident
tags:
  - incident
  - authentication
  - atlas
  - authcore
  - outage
created: '2026-09-16T01:04:39.383Z'
sources:
  - sources/11-authentication-incident-summary.md
---
## Overview
On September 4, some Atlas users experienced intermittent login failures. The Atlas team observed elevated authentication error rates and contacted **AuthCore**, the authentication provider used by Atlas, as part of the investigation.

## Resolution & Status
- Service returned to normal later that morning.
- Root cause **not yet determined** — unclear whether the issue originated in Atlas, AuthCore, or another dependency.
- AuthCore is assisting **Northstar Financial** with the ongoing investigation.

This incident is distinct from the July certificate incident and the August 12 service incident, though it follows a similar pattern of authentication/service reliability issues affecting Atlas.

## See also

- [Project Atlas](../entities/project-atlas.md)
- [AuthCore](../entities/authcore.md)
- [Northstar Financial](../entities/northstar-financial.md)
- [August 12 Service Incident](august-12-service-incident.md)
- [September Readiness Review](september-readiness-review.md)
