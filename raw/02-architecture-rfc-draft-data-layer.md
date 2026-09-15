# RFC: Storage Architecture for Real-Time Settlement Engine

This document is a working draft request for comments prepared in early February 2026 by Principal Architect Elena Rostova with input from the platform core team, soliciting feedback on storage options for Project Meridian.

## Background & Problem Statement
Project Meridian requires a data persistence tier capable of high write throughput, strict multi-account balance reconciliation, and comprehensive audit history. We must evaluate database engines that balance immediate consistency with predictable operational costs.

## Proposed Solution: PostgreSQL with Citus Extension
The architecture working group proposes standardizing our persistence tier on managed PostgreSQL enhanced with the Citus distributed extension.

### Key Rationale
1. **Relational ACID Semantics:** Strict transactional consistency is vital for real-time ledger balance updates, preventing race conditions during concurrent settlements.
2. **Team Expertise:** Over 80% of our existing backend engineering staff have deep operational experience writing complex SQL queries, migrations, and indexing strategies in PostgreSQL.
3. **Complex Financial Reporting:** Rich relational joins and window functions allow reporting services to query ledgers directly without requiring immediate ETL synchronization to an external analytics warehouse.

### Implementation Blueprint
- **Primary Sharding Key:** `account_id` and `tenant_id` to distribute write traffic across worker nodes.
- **Connection Pooling:** PgBouncer layer deployed alongside application instances.
- **Read Replicas:** Two asynchronous read replicas per regional shard for read-heavy balance inquiries.

## Open Questions for Review
- How will Citus handle rebalancing during unexpected traffic bursts from large enterprise tenants like Helix Logistics?
- What are the latency overheads introduced by two-phase commits across distributed shards?
