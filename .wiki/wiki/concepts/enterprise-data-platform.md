---
type: concept
title: Enterprise Data Platform
tags:
  - data-platform
  - data-engineering
  - infrastructure
  - shared-pipelines
created: '2026-09-16T09:58:14.005Z'
sources:
  - sources/09-data-platform-overview-summary.md
---
The Enterprise Data Platform is Northstar's shared analytical data platform, operated by the Data Engineering team. It includes ingestion pipelines that collect loan, pricing, and risk data from several internal systems. Data Engineering is responsible for pipeline availability, schema management, and data quality monitoring, while consuming application teams are responsible for their own products.

Project Atlas consumes data from two of these shared pipelines for its risk analysis functionality. The same pipelines also serve the Portfolio Analytics and Forecasting applications, meaning multiple products depend on shared infrastructure.

## See also

- [Data Engineering](../entities/data-engineering.md)
- [Project Atlas](project-atlas.md)
- [Portfolio Analytics](../entities/portfolio-analytics.md)
- [Forecasting](../entities/forecasting.md)
