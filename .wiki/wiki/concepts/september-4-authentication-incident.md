---
type: concept
title: September 4 Authentication Incident
tags:
  - incident
  - authentication
  - atlas
  - authcore
  - outage
created: '2026-09-16T01:21:20.535Z'
sources:
  - sources/11-authentication-incident-summary.md
---
## Overview
On September 4, Atlas users experienced intermittent login failures due to elevated authentication error rates.

## Details
- Atlas authentication is handled by **AuthCore**.
- The Atlas team observed elevated error rates and contacted AuthCore during the incident.
- Service returned to normal later that morning.
- **Root cause undetermined**: it is unclear whether the issue originated in Atlas, AuthCore, or another dependency.
- AuthCore continues assisting Northstar Financial with the investigation.

## Status
Open/unresolved — root cause investigation ongoing.

## See also

- [AuthCore](../entities/authcore.md)
- [Project Atlas](../entities/project-atlas.md)
- [Northstar Financial](../entities/northstar-financial.md)
