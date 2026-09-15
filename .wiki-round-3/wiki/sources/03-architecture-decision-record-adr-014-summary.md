---
type: summary
title: 'Architecture Decision: Selection of Core Persistence Engine Summary'
tags:
  - architecture
  - adr
  - dynamodb
  - database
created: '2026-09-15T02:27:51.088Z'
sources:
  - raw/03-architecture-decision-record-adr-014.md
---
An approved Architecture Decision Record (Source Type: Architecture Decision Record; Department: Architecture; Status: Approved; Published: March 18, 2026) signed by Elena Rostova and Marcus Vance. Formally establishes Amazon DynamoDB with DAX as the adopted persistence layer, superseding the earlier draft RFC after benchmark testing demonstrated Citus failed sub-50ms p99 latency targets during peak loads at 80,000 TPS.
