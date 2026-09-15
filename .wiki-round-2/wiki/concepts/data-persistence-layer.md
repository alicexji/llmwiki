---
type: concept
title: Data Persistence Layer
tags:
  - architecture
  - database
  - project-meridian
created: '2026-09-15T01:55:05.866Z'
updated: '2026-09-15T01:55:05.866Z'
---
The storage architecture underpinning the Project Meridian settlement ledger.

### Evaluation & Final Decision (Chronological Progression)
- **PostgreSQL with Citus (Draft Proposal — Published: 2026-02-04):** Initially proposed on February 4, 2026 by [Elena Rostova](../entities/elena-rostova.md) for relational ACID guarantees. Benchmark testing in late February 2026 revealed cross-shard locking and connection pool exhaustion under 80,000 TPS peak loads, failing latency targets.
- **Amazon DynamoDB with DAX (Approved Decision — Published: 2026-03-18):** Formally selected and approved on March 18, 2026 (ADR-014) by [Elena Rostova](../entities/elena-rostova.md) and [Marcus Vance](../entities/marcus-vance.md) as the primary persistence layer. It provides predictable single-digit millisecond latency (write <8ms, read <3ms), partition autoscaling, conditional write balance validations, and event streaming via DynamoDB Streams to Kafka and Snowflake.
