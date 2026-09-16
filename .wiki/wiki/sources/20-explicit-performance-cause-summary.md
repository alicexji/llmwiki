---
type: source
title: 20_explicit_performance_cause.md
source_path: raw/20_explicit_performance_cause.md
ingested: '2026-09-16'
created: '2026-09-16'
tags: []
---
This document describes a performance incident affecting **Project Atlas** on September 15, occurring between 10:20 AM and 11:05 AM, during which API response times became elevated. Engineering's investigation traced the issue to a recently introduced caching configuration error that caused repeated requests to bypass the application cache, leading to a spike in database queries during periods of heavy usage.

The issue was resolved at 11:02 AM when engineering corrected the caching configuration, after which performance returned to normal. The incident review formally identified the caching configuration error as the root cause of the degradation, distinguishing this incident from other Atlas-related service disruptions (such as the August 12 incident or the RiskData slowdown) by its specific technical cause.
