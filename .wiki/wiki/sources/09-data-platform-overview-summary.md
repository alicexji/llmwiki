---
type: source
title: 09_data_platform_overview.md
source_path: raw/09_data_platform_overview.md
ingested: '2026-09-16'
created: '2026-09-16'
tags: []
---
This document describes Northstar Financial's shared **Enterprise Data Platform**, operated by the **Data Engineering** team. The platform runs ingestion pipelines that collect loan, pricing, and risk data from multiple internal systems, serving as a shared backbone for several downstream applications.

A key detail is that **Project Atlas** relies on two of these shared pipelines for its risk analysis functionality, meaning Atlas's reliability is partly dependent on infrastructure it does not own. The same pipelines also feed **Portfolio Analytics** and **Forecasting** applications, making the platform a shared dependency across multiple business-critical systems.

The document draws a clear responsibility boundary: Data Engineering owns pipeline availability, schema management, and data quality monitoring, while application teams (like the Atlas team) remain responsible for the products that consume this data. This division of responsibility is relevant context for understanding root causes of incidents affecting Atlas, since upstream data issues could originate outside the Atlas team's direct control.

## See also

- [Data Engineering](../entities/data-engineering.md)
- [Project Atlas](../entities/project-atlas.md)
- [Portfolio Analytics](../entities/portfolio-analytics.md)
- [Forecasting](../entities/forecasting.md)
- [Enterprise Data Platform](../concepts/enterprise-data-platform.md)
