---
type: source
title: 18_vendor_capacity.md
source_path: raw/18_vendor_capacity.md
ingested: '2026-09-16'
created: '2026-09-16'
tags: []
---
This short update describes a minor performance disruption in Project Atlas tied to its dependency on RiskData, an external service supplying property and market information used in loan analysis. On August 21, Atlas users noticed slower-than-usual load times on property analysis screens. The root cause was traced to unusually high request volumes processed by RiskData that morning, rather than any internal Atlas defect. The Atlas engineering team engaged with RiskData during the investigation, and loading performance returned to normal by the afternoon.

The document reinforces earlier references to the August 21 RiskData slowdown and highlights Atlas's dependency on third-party services for core functionality, underscoring a recurring theme of external vendor risk in the Atlas platform's operational history.

## See also

- [RiskData](../entities/riskdata.md)
- [August 21 RiskData Slowdown](../concepts/august-21-riskdata-slowdown.md)
