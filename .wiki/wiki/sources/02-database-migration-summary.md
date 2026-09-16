---
type: source
title: 02_database_migration.md
source_path: raw/02_database_migration.md
ingested: '2026-09-16'
created: '2026-09-16'
tags: []
---
This document summarizes the completion of Atlas's production database migration from MySQL to PostgreSQL on August 10. The migration had been in planning for roughly three months, with the primary goal of improving scalability as transaction volume grows for Atlas services.

Post-migration validation indicated that primary Atlas services were operating normally, though engineering committed to continued monitoring of database performance over the following weeks to catch any latent issues. The document notes this was one of the largest infrastructure changes completed by the Atlas team during the quarter, underscoring its significance relative to other engineering work.

## See also

- [Project Atlas](../entities/project-atlas.md)
- [Platform Engineering](../entities/platform-engineering.md)
- [MySQL to PostgreSQL Migration](../concepts/mysql-to-postgresql-migration.md)
