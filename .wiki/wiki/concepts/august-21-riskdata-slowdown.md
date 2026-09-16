---
type: concept
title: August 21 RiskData Slowdown
tags:
  - incident
  - performance
  - vendor-dependency
  - riskdata
  - atlas
created: '2026-09-16T01:58:56.729Z'
sources:
  - sources/18-vendor-capacity-summary.md
---
## Summary
On **August 21**, Atlas users experienced slower-than-usual loading times when opening property analysis screens, caused by unusually high request volumes processed by the external vendor **RiskData**.

## Timeline
- **Morning**: Users report slow loading of property analysis screens.
- **During the day**: Atlas engineering team contacts RiskData to investigate.
- **Afternoon**: Loading performance returns to normal.

## Root Cause
High request volume on RiskData's side, not an internal Atlas issue, caused the slowdown.

## Significance
Demonstrates Atlas's exposure to performance risk from third-party vendor dependencies.

## See also

- [Project Atlas](../entities/project-atlas.md)
- [RiskData](../entities/riskdata.md)
