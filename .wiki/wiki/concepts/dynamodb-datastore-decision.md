---
type: concept
title: DynamoDB Datastore Decision
tags:
  - dynamodb
  - architecture-decision
  - project-atlas
  - database
  - nosql
created: '2026-09-15T03:39:07.179Z'
sources:
  - sources/04-atlas-architecture-decision-summary.md
---
## Overview
Following the Project Atlas architecture review, the platform and Atlas engineering teams decided to use **DynamoDB** as the production datastore for Atlas, replacing the previously proposed relational design.

## Rationale
- Concerns were raised about the **operational requirements** of the relational design at Atlas's expected workload.
- An alternative design using DynamoDB was evaluated and selected.

## Next Steps
- The platform team will provide the standard DynamoDB deployment configuration.
- The Atlas team will update the service design accordingly.
- Engineering can proceed with implementation based on this architecture.

## See also

- [Project Atlas](../entities/project-atlas.md)
- [03_atlas_architecture_proposal.md](../sources/03-atlas-architecture-proposal-summary.md)
