---
type: source
title: 18_vendor_capacity.md
source_path: raw/18_vendor_capacity.md
ingested: '2026-09-16'
created: '2026-09-16'
tags: []
---
This source describes a brief performance issue affecting Atlas that traces back to an external dependency, RiskData. RiskData is a third-party service Atlas relies on to provide property and market information used during loan analysis workflows. On August 21, Atlas users experienced slower-than-usual loading times when opening property analysis screens.

The root cause was traced to RiskData processing unusually high request volumes that morning, which degraded response times for downstream consumers like Atlas. The Atlas engineering team contacted RiskData directly as part of its investigation into the slowdown. Loading performance returned to normal later that same afternoon, suggesting the issue was transient and resolved either by RiskData's own scaling/mitigation or a natural decline in request volume.

This incident highlights Atlas's dependency on third-party services for core functionality (loan analysis) and the operational practice of engaging external vendors directly when performance issues are suspected to originate outside Atlas's own systems.
