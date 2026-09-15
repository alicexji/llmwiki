---
type: source
title: 03_atlas_architecture_proposal.md
source_path: raw/03_atlas_architecture_proposal.md
ingested: '2026-09-15'
created: '2026-09-15'
tags: []
---
This document outlines the proposed data architecture for Project Atlas, focusing on the engineering team's evaluation of storage options. After considering alternatives, the team selected **PostgreSQL** as the primary production database, citing its strong relational querying capabilities and existing support from the platform team.

The proposed design has application services accessing PostgreSQL through the shared data-access layer, rather than direct connections. Backup and replication responsibilities will be handled via the company's existing managed database infrastructure, reducing the need for custom tooling.

The proposal notes that this architecture is not yet finalized—it will be reviewed with the platform team before implementation begins, indicating this is a pre-implementation planning document.

## See also

- [PostgreSQL](../entities/postgresql.md)
- [Project Atlas](../entities/project-atlas.md)
- [Atlas Data Architecture](../concepts/atlas-data-architecture.md)
- [Shared Data-Access Layer](../concepts/shared-data-access-layer.md)
