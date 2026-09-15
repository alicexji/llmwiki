---
type: concept
title: Atlas Architecture Review
tags:
  - architecture-review
  - decision
  - dynamodb
  - atlas
created: '2026-09-15T04:26:45.718Z'
sources:
  - sources/04-atlas-architecture-decision-summary.md
---
The **Atlas Architecture Review** was a joint evaluation by the platform and Atlas engineering teams of the proposed data architecture for Project Atlas. The review raised concerns about the operational requirements of the previously proposed relational design at expected Atlas workload, prompting evaluation of an alternative using **DynamoDB**.

The outcome: DynamoDB was selected as the production datastore. The platform team will provide standard deployment configuration, and the Atlas team will update its service design. This decision supersedes the earlier **Atlas Data Architecture Proposal** and clears engineering to proceed with implementation.

## See also

- [DynamoDB](../entities/dynamodb.md)
- [Project Atlas](../entities/project-atlas.md)
- [Platform Team](../entities/platform-team.md)
- [Atlas Data Architecture Proposal](atlas-data-architecture-proposal.md)
