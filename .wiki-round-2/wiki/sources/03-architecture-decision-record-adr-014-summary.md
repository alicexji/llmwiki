---
type: summary
title: 'Architecture Decision: Selection of Core Persistence Engine Summary'
tags:
  - architecture
  - adr
  - dynamodb
  - database
created: '2026-09-15T01:55:05.866Z'
sources:
  - raw/03-architecture-decision-record-adr-014.md
---
An approved Architecture Decision Record published on March 18, 2026 by Elena Rostova and Marcus Vance. The decision formally selects Amazon DynamoDB with DynamoDB Accelerator (DAX) as the core persistence engine for Project Meridian, superseding the earlier February 4, 2026 PostgreSQL/Citus RFC proposal after benchmarks showed Citus failed sub-50ms p99 latency targets during peak load tests at 80,000 TPS.
