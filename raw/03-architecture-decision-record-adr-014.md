# Architecture Decision: Selection of Core Persistence Engine for Project Meridian

Following prototype evaluation, this architectural decision record was finalized and approved on March 18, 2026 by Elena Rostova, Marcus Vance, and the Meridian technical leads, formally closing the exploratory RFC process.

## Context
During initial load testing in late February, the proposed distributed PostgreSQL (Citus) prototype struggled to maintain sub-50ms p99 latency targets when subjected to simulated peak workloads exceeding 80,000 TPS. Cross-shard locking mechanisms and connection pool exhaustion under sudden traffic spikes introduced unacceptable tail latencies.

## Decision
We have decided to adopt **Amazon DynamoDB with DynamoDB Accelerator (DAX)** as the primary persistence layer for the Project Meridian transaction and settlement ledger, replacing the earlier PostgreSQL draft proposal.

## Rationale & Benchmark Findings
1. **Predictable Single-Digit Latency:** DynamoDB consistently demonstrated write latencies under 8ms and read latencies under 3ms across all partition keys during stress testing.
2. **Horizontal Partition Scaling:** Built-in partition autoscaling handles massive bursts from high-volume partners without manual shard management or connection pool tuning.
3. **Optimistic Locking Support:** Conditional writes and native transaction support (`TransactWriteItems`) satisfy our strict balance validation requirements without blocking global tables.
4. **Change Data Streaming:** DynamoDB Streams will natively pipe ledger events to our downstream Kafka event bus and Snowflake analytical data lake, eliminating the need for database-level analytical joins.

## Consequences
- The engineering team must undergo training on single-table NoSQL data modeling patterns.
- Relational queries and ad-hoc ledger inspection must be routed through downstream analytical mirrors rather than queried directly against the operational database.
