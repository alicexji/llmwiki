---
type: source
title: 03_atlas_architecture_proposal.md
source_path: raw/03_atlas_architecture_proposal.md
ingested: '2026-09-15'
created: '2026-09-15'
tags: []
---
This document is a data architecture proposal for Project Atlas, produced by the engineering team after evaluating several storage options. The team selected **PostgreSQL** as the primary production database, citing its relational querying capabilities and existing broad support from the platform team as key advantages.

Under the proposed design, application services will access PostgreSQL through the shared data-access layer, rather than connecting directly to the database. Backups and replication will rely on the company's existing managed database infrastructure, avoiding the need for custom tooling.

The proposal notes that this architecture is not yet final — it will be reviewed with the platform team before implementation begins, indicating a pending approval step in the Atlas project timeline.

## See also

- [Project Atlas](../entities/project-atlas.md)
- [PostgreSQL](../entities/postgresql.md)
- [Platform Team](../entities/platform-team.md)
- [Shared Data-Access Layer](../concepts/shared-data-access-layer.md)
- [Atlas Data Architecture Proposal](../concepts/atlas-data-architecture-proposal.md)
