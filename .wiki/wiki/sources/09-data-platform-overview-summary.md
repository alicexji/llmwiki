---
type: source
title: 09_data_platform_overview.md
source_path: raw/09_data_platform_overview.md
ingested: '2026-09-16'
created: '2026-09-16'
tags: []
---
This source describes Northstar Financial's Enterprise Data Platform, operated by the Data Engineering team. The platform provides ingestion pipelines that collect loan, pricing, and risk data from multiple internal systems, serving as shared infrastructure for several downstream applications.

Atlas relies on two of these shared pipelines for its risk analysis functionality, and the same pipelines also feed the Portfolio Analytics and Forecasting applications, making the platform a critical shared dependency across multiple products.

Responsibilities are clearly divided: Data Engineering owns pipeline availability, schema management, and data quality monitoring, while application teams (such as those behind Atlas, Portfolio Analytics, and Forecasting) remain responsible for their own consuming products. This separation of concerns highlights a shared-infrastructure model where upstream data reliability is centralized but downstream product ownership is distributed.

## See also

- [Data Engineering](../entities/data-engineering.md)
- [Project Atlas](../entities/project-atlas.md)
- [Portfolio Analytics](../entities/portfolio-analytics.md)
- [Forecasting](../entities/forecasting.md)
- [Enterprise Data Platform](../concepts/enterprise-data-platform.md)
