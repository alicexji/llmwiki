---
type: concept
title: Shared Data-Access Layer
tags:
  - architecture
  - data-access
  - design-pattern
created: '2026-09-15T03:39:07.261Z'
sources:
  - sources/03-atlas-architecture-proposal-summary.md
---
The **shared data-access layer** is the intermediary component through which application services in **Project Atlas** interact with the PostgreSQL production database, rather than connecting directly. This design promotes consistency and centralizes data access logic across services.

## See also

- [PostgreSQL](../entities/postgresql.md)
- [Project Atlas](../entities/project-atlas.md)
