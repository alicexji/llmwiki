---
type: entity
title: PostgreSQL
tags:
  - database
  - postgresql
  - infrastructure
  - storage
created: '2026-09-15T03:39:07.231Z'
sources:
  - sources/03-atlas-architecture-proposal-summary.md
---
**PostgreSQL** is the relational database selected as the primary production database for **Project Atlas**. It was chosen for its relational querying capabilities and because it is already widely supported by the platform team.

Under the proposed architecture, application services access PostgreSQL through the shared data-access layer, with backups and replication handled by existing managed database infrastructure.

## See also

- [Project Atlas](project-atlas.md)
- [Atlas Data Architecture](../concepts/atlas-data-architecture.md)
