---
type: source
title: 20_explicit_performance_cause.md
source_path: raw/20_explicit_performance_cause.md
ingested: '2026-09-16'
created: '2026-09-16'
tags: []
---
This document describes a September 15 Atlas performance incident in which API response times were elevated between 10:20 AM and 11:05 AM. Engineering's investigation identified a recently introduced caching configuration error as the root cause: the misconfiguration caused repeated requests to bypass the application cache, which increased database query volume and drove up API response times during periods of heavy usage. Engineering corrected the caching configuration at 11:02 AM, after which performance returned to normal.

Unlike some other Atlas incident reports, this document explicitly states a causal chain (caching misconfiguration → cache bypass → increased database queries → elevated response times) and identifies it as the confirmed root cause in the incident review.
