---
type: concept
title: September 15 Performance Incident
tags:
  - incident
  - performance
  - caching
  - atlas
  - root-cause
created: '2026-09-16T01:59:11.019Z'
sources:
  - sources/20-explicit-performance-cause-summary.md
---
## Overview
On September 15, Atlas experienced elevated API response times between **10:20 AM and 11:05 AM**.

## Root Cause
A recently introduced **caching configuration error** caused repeated requests to bypass the application cache, resulting in a higher volume of direct database queries. Under heavy usage, this increased load caused API response times to rise.

## Resolution
Engineering corrected the caching configuration at **11:02 AM**, and performance returned to normal shortly afterward.

## Findings
The incident review identified the caching configuration error as the definitive root cause of the performance degradation.

## See also

- [Project Atlas](../entities/project-atlas.md)
- [Atlas Performance Review](atlas-performance-review.md)
