---
type: concept
title: Atlas Data Architecture Proposal
tags:
  - architecture
  - proposal
  - project-atlas
  - database
created: '2026-09-15T04:26:37.072Z'
sources:
  - sources/03-atlas-architecture-proposal-summary.md
---
The **Atlas Data Architecture Proposal** outlines the engineering team's evaluation of storage options for Project Atlas and recommends PostgreSQL as the primary production database.

Key elements:
- PostgreSQL for relational data storage.
- Access via a shared data-access layer.
- Backups/replication via existing managed infrastructure.
- Pending review with the platform team before implementation.

## See also

- [Project Atlas](../entities/project-atlas.md)
- [PostgreSQL](../entities/postgresql.md)
- [Platform Team](../entities/platform-team.md)
- [Atlas Architecture Review](atlas-architecture-review.md)
- [DynamoDB](../entities/dynamodb.md)
