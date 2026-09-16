---
type: source
title: 20_explicit_performance_cause.md
source_path: raw/20_explicit_performance_cause.md
ingested: '2026-09-16'
created: '2026-09-16'
tags: []
---
This source describes an Atlas performance incident on September 15, during which API response times rose significantly between 10:20 AM and 11:05 AM. Engineering's root-cause investigation traced the issue to a recently introduced caching configuration error that caused repeated requests to bypass the application cache layer entirely.

With caching bypassed, a much larger volume of requests hit the database directly, and under heavy usage this increased load caused API response times to degrade. Engineering corrected the caching configuration at 11:02 AM, and performance returned to normal shortly afterward.

The incident review formally identified the caching misconfiguration as the root cause, distinguishing this event from other Atlas performance issues that may have had different underlying causes (e.g., database or infrastructure-level problems).
