---
type: entity
title: PostgreSQL
tags:
  - database
  - postgresql
  - infrastructure
  - project-atlas
created: '2026-09-15T04:26:37.041Z'
sources:
  - sources/03-atlas-architecture-proposal-summary.md
---
**PostgreSQL** is the relational database selected as the primary production database for Project Atlas.

- Chosen for its relational querying capabilities.
- Already widely supported by the platform team, reducing integration risk.
- Application services access it through a shared data-access layer rather than directly.
- Backups and replication use existing managed database infrastructure.

## See also

- [Project Atlas](project-atlas.md)
- [Shared Data-Access Layer](../concepts/shared-data-access-layer.md)
- [Platform Team](platform-team.md)
- [DynamoDB](dynamodb.md)
- [Atlas Architecture Review](../concepts/atlas-architecture-review.md)
