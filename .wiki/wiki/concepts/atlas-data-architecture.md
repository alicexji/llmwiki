---
type: concept
title: Atlas Data Architecture
tags:
  - architecture
  - data-storage
  - proposal
  - planning
created: '2026-09-15T03:39:07.244Z'
sources:
  - sources/03-atlas-architecture-proposal-summary.md
---
The **Atlas Data Architecture** is the proposed technical design for data storage and access within **Project Atlas**. Key elements include:

- **PostgreSQL** as the primary production database
- Application services accessing the database through a **shared data-access layer**
- Backups and replication via existing managed database infrastructure

The architecture is still a proposal and requires review with the platform team before implementation begins.

## See also

- [Project Atlas](../entities/project-atlas.md)
- [PostgreSQL](../entities/postgresql.md)
- [Shared Data-Access Layer](shared-data-access-layer.md)
