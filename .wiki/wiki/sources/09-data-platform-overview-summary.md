---
type: source
title: 09_data_platform_overview.md
source_path: raw/09_data_platform_overview.md
ingested: '2026-09-16'
created: '2026-09-16'
tags: []
---
This short internal document describes Northstar's Enterprise Data Platform, operated by the Data Engineering team. The platform provides shared ingestion pipelines that collect loan, pricing, and risk data from multiple internal systems, supporting several downstream applications.

Project Atlas relies on two of these shared pipelines for its risk analysis functionality. Notably, the same pipelines also feed the Portfolio Analytics and Forecasting applications, making the data platform a shared dependency across multiple products.

Data Engineering owns pipeline availability, schema management, and data quality monitoring, while application teams retain responsibility for their own consuming products. This delineation of responsibility highlights a shared-infrastructure model with distributed accountability.

## See also

- [Data Engineering](../entities/data-engineering.md)
- [Project Atlas](../entities/project-atlas.md)
- [Portfolio Analytics](../entities/portfolio-analytics.md)
- [Forecasting](../entities/forecasting.md)
- [Enterprise Data Platform](../concepts/enterprise-data-platform.md)
