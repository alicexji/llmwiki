---
type: concept
title: Project Meridian
tags:
  - modernization
  - settlement
  - project-meridian
created: '2026-09-15T02:27:51.088Z'
updated: '2026-09-15T02:27:51.088Z'
---
Project Meridian is Aetheris Financial Technologies' flagship modernization program for 2026 (chartered January 15, 2026) to replace legacy settlement systems with a unified cloud-native real-time transaction engine designed for 100,000 TPS and sub-50ms p99 latency.

## Key Stakeholders
- Executive Sponsor: [Marcus Vance](../entities/marcus-vance.md)
- Product Lead: [Jordan Hayes](../entities/jordan-hayes.md)
- Principal Architect: [Elena Rostova](../entities/elena-rostova.md)

## Architecture & Data Layer
The storage tier utilizes [Amazon DynamoDB with DAX](data-persistence-layer.md), finalized via ADR-014 (Architecture Department, Published: 2026-03-18, Status: Approved) superseding the prior draft RFC (Published: 2026-02-04, Status: Draft).

## Pilot Partners
- [Helix Logistics](../entities/helix-logistics.md)
- [Solis Retail Group](../entities/solis-retail-group.md)

## Release Schedule & Roadmap (Chronological Lineage)
- **Superseded Target (Status Report — Product Management, Published: 2026-03-31):** General Availability was originally planned for September 15, 2026.
- **Active Official Target (Status Report — Product Management, Published: 2026-06-30):** In the Q2 status report, [Jordan Hayes](../entities/jordan-hayes.md) announced a schedule realignment moving General Availability (GA) to **November 18, 2026** to accommodate third-party SOC2 compliance certification audits and extended security penetration testing.

## See also

- [Data Persistence Layer](data-persistence-layer.md)
- [Real-Time Transaction Engine](real-time-transaction-engine.md)
- [API Security and Governance Standards](api-security-and-governance-standards.md)
- [Helix Logistics](../entities/helix-logistics.md)
- [Solis Retail Group](../entities/solis-retail-group.md)
