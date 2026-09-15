---
type: concept
title: Shared Data-Access Layer
tags:
  - architecture
  - data-access
  - design-pattern
  - project-atlas
created: '2026-09-15T04:26:37.062Z'
sources:
  - sources/03-atlas-architecture-proposal-summary.md
---
The **shared data-access layer** is an architectural component through which application services interact with the PostgreSQL database in Project Atlas, rather than connecting directly.

This abstraction likely centralizes data access logic, enforces consistency, and simplifies future changes to the underlying storage technology.

## See also

- [PostgreSQL](../entities/postgresql.md)
- [Project Atlas](../entities/project-atlas.md)
