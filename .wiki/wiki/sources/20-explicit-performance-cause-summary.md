---
type: source
title: 20_explicit_performance_cause.md
source_path: raw/20_explicit_performance_cause.md
ingested: '2026-09-16'
created: '2026-09-16'
tags: []
---
This source documents a brief performance incident affecting the Atlas platform on September 15, occurring between 10:20 AM and 11:05 AM, during which API response times rose noticeably above normal levels. Engineering's investigation traced the cause to a recently introduced caching configuration error that caused repeated requests to bypass the application cache layer entirely.

With caching bypassed, a larger volume of requests fell through to the database, and the resulting increase in query load caused response times to degrade further during periods of heavy usage. Engineering corrected the caching configuration at 11:02 AM, after which performance returned to normal shortly thereafter.

The incident review formally identified the caching misconfiguration as the root cause, providing a clear, explicit causal chain: config error → cache bypass → increased database load → elevated response times. This incident is closely related to other Atlas performance investigations, suggesting a pattern of caching and database load issues affecting the platform's reliability during peak usage periods.
