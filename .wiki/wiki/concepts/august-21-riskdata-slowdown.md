---
type: concept
title: August 21 RiskData Slowdown
tags:
  - incident
  - riskdata
  - performance
  - third-party-dependency
  - atlas
created: '2026-09-16T01:45:44.211Z'
sources:
  - sources/18-vendor-capacity-summary.md
---
## Overview
On August 21, Atlas users experienced slower-than-usual loading times on property analysis screens due to unusually high request volumes at **RiskData**, an external vendor providing property and market data.

## Timeline
- Morning: RiskData experiences high request volumes, causing slow loading in Atlas property analysis screens.
- Atlas engineering team contacts RiskData to investigate.
- Afternoon: Performance returns to normal.

## Root Cause
The slowdown originated from RiskData's own load spike rather than an internal Atlas defect, illustrating a third-party dependency risk.

## See also

- [RiskData](../entities/riskdata.md)
- [Project Atlas](../entities/project-atlas.md)
