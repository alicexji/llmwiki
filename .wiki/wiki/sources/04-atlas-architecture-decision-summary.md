---
type: source
title: 04_atlas_architecture_decision.md
source_path: raw/04_atlas_architecture_decision.md
ingested: '2026-09-15'
created: '2026-09-15'
tags: []
---
This short source documents the outcome of the Project Atlas architecture review, in which the platform and Atlas engineering teams evaluated the previously proposed relational (PostgreSQL-based) data architecture against operational requirements at expected Atlas workload scale. Concerns about the relational design's operational demands led the team to evaluate an alternative using DynamoDB.

The final decision reverses the earlier architecture proposal: DynamoDB will be the production datastore for Atlas, not PostgreSQL. The platform team will supply a standard DynamoDB deployment configuration, and the Atlas team will revise its service design accordingly. Engineering is cleared to proceed with implementation based on this new architecture.
