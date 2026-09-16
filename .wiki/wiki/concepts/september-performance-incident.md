---
type: concept
title: September Performance Incident
tags:
  - incident
  - performance
  - caching
  - database
  - atlas
  - root-cause
created: '2026-09-16T10:00:00.914Z'
sources:
  - sources/20-explicit-performance-cause-summary.md
---
## Overview
On September 15, Atlas experienced elevated API response times between 10:20 AM and 11:05 AM.

## Root Cause
A recently introduced **caching configuration** error caused repeated requests to bypass the application cache. This increased the volume of database queries, which caused API response times to rise during periods of heavy usage.

## Resolution
Engineering corrected the caching configuration at 11:02 AM, and performance returned to normal shortly afterward. The incident review identified the caching configuration error as the confirmed root cause.

## See also

- [Project Atlas](project-atlas.md)
- [Atlas Performance Review](atlas-performance-review.md)
