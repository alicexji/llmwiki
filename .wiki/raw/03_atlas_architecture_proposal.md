# Project Atlas Data Architecture Proposal

The engineering team evaluated several storage options for the Atlas platform.

The proposed architecture uses PostgreSQL as the primary production database. PostgreSQL provides the relational querying capabilities needed for Atlas and is already widely supported by the platform team.

Under this design, application services will access PostgreSQL through the shared data-access layer. Backups and replication will use the company's existing managed database infrastructure.

The architecture will be reviewed with the platform team before implementation begins.