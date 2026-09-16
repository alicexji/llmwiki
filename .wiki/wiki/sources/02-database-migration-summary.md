---
type: source
title: 02_database_migration.md
source_path: raw/02_database_migration.md
ingested: '2026-09-16'
created: '2026-09-16'
tags: []
---
This source describes the completion of the Atlas engineering team's production migration of its primary transactional database from MySQL to PostgreSQL on August 10. The migration had been in planning for roughly three months, with the primary goal of improving scalability as transaction volume grows.

Post-migration validation indicated that primary Atlas services were operating normally, though the engineering team planned continued monitoring of database performance over the following weeks to catch any latent issues. The document characterizes this migration as one of the largest infrastructure changes completed by the Atlas team during the quarter, underscoring its significance relative to other engineering initiatives.

## See also

- [MySQL to PostgreSQL Migration](../concepts/mysql-to-postgresql-migration.md)
- [Project Atlas](../entities/project-atlas.md)
