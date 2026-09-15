---
type: concept
title: Data Persistence Layer
tags:
  - architecture
  - database
  - project-meridian
created: '2026-09-15T02:27:51.088Z'
updated: '2026-09-15T02:27:51.088Z'
---
The storage architecture underpinning the Project Meridian settlement ledger.

### Architectural Decision Lineage & Approved Standard
- **Exploratory Proposal (RFC — Status: Draft, Published: 2026-02-04):** [Elena Rostova](../entities/elena-rostova.md) initially proposed distributed PostgreSQL with Citus. Subsequent load testing in late February 2026 demonstrated cross-shard locking and connection exhaustion at 80,000 TPS, failing performance criteria.
- **Adopted Persistence Standard (ADR-014 — Status: Approved, Published: 2026-03-18):** Formally accepted by Architecture and Engineering leadership ([Elena Rostova](../entities/elena-rostova.md), [Marcus Vance](../entities/marcus-vance.md)). **Amazon DynamoDB with DAX** is the official persistence tier, providing predictable single-digit latency (write <8ms, read <3ms), partition autoscaling, conditional balance updates, and event streaming via DynamoDB Streams to Kafka and Snowflake.
