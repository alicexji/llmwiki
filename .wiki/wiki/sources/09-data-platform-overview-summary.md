---
type: source
title: 09_data_platform_overview.md
source_path: raw/09_data_platform_overview.md
ingested: '2026-09-16'
created: '2026-09-16'
tags: []
---
This short source document describes Northstar Financial's **Enterprise Data Platform**, operated by the **Data Engineering** team. The platform provides shared ingestion pipelines that collect loan, pricing, and risk data from multiple internal systems, serving as a common data backbone across the organization.

A key point is that **Project Atlas** consumes data from two of these shared pipelines to power its risk analysis functionality. These same pipelines are also relied upon by the **Portfolio Analytics** and **Forecasting** applications, making the platform a shared dependency across several critical business systems.

The document clarifies a division of responsibility: Data Engineering owns pipeline availability, schema management, and data quality monitoring, while individual application teams remain responsible for the products built on top of the shared data. This distinction is relevant context for understanding accountability during incidents or data quality issues affecting downstream consumers like Atlas.

## See also

- [Enterprise Data Platform](../concepts/enterprise-data-platform.md)
- [Data Engineering](../entities/data-engineering.md)
- [Project Atlas](../entities/project-atlas.md)
