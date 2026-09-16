---
type: concept
title: Enterprise Data Platform
tags:
  - data-platform
  - infrastructure
  - shared-services
  - northstar
created: '2026-09-16T01:04:24.636Z'
sources:
  - sources/09-data-platform-overview-summary.md
---
The **Enterprise Data Platform** is Northstar's shared analytical data infrastructure, operated by the Data Engineering team. It maintains ingestion pipelines that collect loan, pricing, and risk data from multiple internal systems.

**Responsibilities:**
- Data Engineering: pipeline availability, schema management, data quality monitoring
- Application teams: ownership of their own consuming products

Project Atlas, Portfolio Analytics, and Forecasting all consume data from this shared platform, making it a critical piece of shared infrastructure across multiple business applications.

## See also

- [Data Engineering](../entities/data-engineering.md)
- [Project Atlas](../entities/project-atlas.md)
- [Portfolio Analytics](../entities/portfolio-analytics.md)
- [Forecasting](../entities/forecasting.md)
