---
type: source
title: 18_vendor_capacity.md
source_path: raw/18_vendor_capacity.md
ingested: '2026-09-16'
created: '2026-09-16'
tags: []
---
This short update describes an August 21 incident involving **RiskData**, an external third-party service that Atlas relies on for property and market information used in loan analysis. On that date, Atlas users experienced slower-than-usual loading times when opening property analysis screens, attributed to RiskData processing unusually high request volumes that morning.

The Atlas engineering team engaged RiskData directly as part of its investigation into the slowdown. Performance returned to normal later that afternoon, suggesting the issue was transient and tied to RiskData's own load conditions rather than a defect in Atlas's own systems.

This document reinforces Atlas's dependency on external vendors for critical functionality, and highlights how third-party performance issues can directly affect user-facing latency even when the root cause lies outside the Atlas engineering team's own infrastructure.
