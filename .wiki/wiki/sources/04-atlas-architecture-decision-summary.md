---
type: source
title: 04_atlas_architecture_decision.md
source_path: raw/04_atlas_architecture_decision.md
ingested: '2026-09-15'
created: '2026-09-15'
tags: []
---
This document records the outcome of the Project Atlas architecture review, where the platform and Atlas engineering teams evaluated the proposed relational data architecture against an alternative DynamoDB-based design. Concerns about the operational overhead of running the relational design at Atlas's expected workload prompted the team to consider DynamoDB as an alternative.

The review concluded with a decision: **DynamoDB will be the production datastore for Atlas**. The platform team will supply the standard DynamoDB deployment configuration, and the Atlas team will revise the service design to align with this choice. With this decision finalized, engineering has been given the green light to proceed with implementation.

This marks the resolution of the architectural debate previously raised in the architecture proposal, confirming a shift away from the relational approach.
