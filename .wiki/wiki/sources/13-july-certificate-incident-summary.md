---
type: source
title: 13_july_certificate_incident.md
source_path: raw/13_july_certificate_incident.md
ingested: '2026-09-16'
created: '2026-09-16'
tags: []
---
# 13_july_certificate_incident.md

**Source:** raw/13_july_certificate_incident.md  
**Type:** .md  
**Size:** 541 bytes  
**Ingested:** 2026-09-16

## Content Preview

# Atlas Service Incident — July 7

Atlas experienced a 22-minute service interruption on July 7.

The incident investigation determined that an expired TLS certificate prevented one of the application's internal services from communicating with the loan processing service.

Engineering renewed the certificate and restored normal service.

The incident review identified the expired TLS certificate as the root cause of the outage.

Following the incident, Platform Engineering added autom…
