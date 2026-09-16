---
type: concept
title: September 15 Performance Incident
tags:
  - incident
  - performance
  - caching
  - database
  - atlas
  - root-cause
created: '2026-09-16T01:45:58.202Z'
sources:
  - sources/20-explicit-performance-cause-summary.md
---
## Overview
On September 15, Atlas experienced elevated API response times between **10:20 AM and 11:05 AM**.

## Root Cause
A recently introduced **caching configuration error** caused repeated requests to bypass the application cache. This increased the volume of database queries, which in turn raised API response times during periods of heavy usage.

## Resolution
Engineering corrected the caching configuration at **11:02 AM**, after which performance returned to normal.

## Findings
The incident review explicitly identified the caching configuration error as the root cause of the performance degradation — a clear, single-cause explanation distinct from other Atlas performance issues.

## See also

- [Project Atlas](../entities/project-atlas.md)
- [Atlas Performance Review](atlas-performance-review.md)
- [Platform Engineering](../entities/platform-engineering.md)
