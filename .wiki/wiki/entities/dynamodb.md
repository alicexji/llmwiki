---
type: entity
title: DynamoDB
tags:
  - dynamodb
  - nosql
  - database
  - architecture
created: '2026-09-15T04:26:45.704Z'
sources:
  - sources/04-atlas-architecture-decision-summary.md
---
**DynamoDB** is a NoSQL database service selected as the production datastore for **Project Atlas**, replacing an earlier relational (PostgreSQL) design after concerns about operational requirements at expected workload scale. The **Platform Team** will provide the standard DynamoDB deployment configuration, while the Atlas team updates its service design to align with this choice.

## See also

- [Project Atlas](project-atlas.md)
- [Platform Team](platform-team.md)
- [Atlas Architecture Review](../concepts/atlas-architecture-review.md)
