---
type: source
title: 09_data_platform_overview.md
source_path: raw/09_data_platform_overview.md
ingested: '2026-09-16'
created: '2026-09-16'
tags: []
---
This source describes Northstar's Enterprise Data Platform, operated by the Data Engineering team. The team maintains ingestion pipelines that collect loan, pricing, and risk data from multiple internal systems, and is responsible for pipeline availability, schema management, and data quality monitoring.

Project Atlas consumes data from two of these shared pipelines to support its risk analysis functionality. The same pipelines are also shared by the Portfolio Analytics and Forecasting applications. The document notes a clear division of responsibility: Data Engineering owns the shared pipelines, while application teams (such as the Atlas team) remain responsible for the products that consume the data.
