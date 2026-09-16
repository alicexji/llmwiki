---
type: concept
title: Enterprise Data Platform
tags:
  - data-platform
  - data-engineering
  - infrastructure
  - shared-services
  - northstar-financial
created: '2026-09-16T01:21:07.816Z'
sources:
  - sources/09-data-platform-overview-summary.md
---
## Overview
The Enterprise Data Platform is Northstar Financial's shared analytical data infrastructure, operated by the **Data Engineering** team.

## Function
- Maintains ingestion pipelines collecting loan, pricing, and risk data from multiple internal systems.
- Provides shared pipelines consumed by multiple applications, including **Project Atlas**, **Portfolio Analytics**, and **Forecasting**.

## Responsibilities
- **Data Engineering** owns pipeline availability, schema management, and data quality monitoring.
- Application teams remain responsible for the products that consume the shared data (a shared-responsibility model).

## Significance
Atlas relies on two of these shared pipelines for its risk analysis functionality, making the platform a critical dependency for Atlas's operation.

## See also

- [Data Engineering](../entities/data-engineering.md)
- [Project Atlas](../entities/project-atlas.md)
- [Portfolio Analytics](../entities/portfolio-analytics.md)
- [Forecasting](../entities/forecasting.md)
- [Northstar Financial](../entities/northstar-financial.md)
