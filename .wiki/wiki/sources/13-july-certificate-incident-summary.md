---
type: source
title: 13_july_certificate_incident.md
source_path: raw/13_july_certificate_incident.md
ingested: '2026-09-16'
created: '2026-09-16'
tags: []
---
This source describes a 22-minute service interruption to Project Atlas that occurred on July 7. The incident investigation determined that an expired TLS certificate prevented internal communication between an application service and the loan processing service, causing the outage.

Engineering resolved the issue by renewing the certificate, which restored normal service. The post-incident review confirmed the expired TLS certificate as the definitive root cause.

As a preventative measure, Platform Engineering implemented automated certificate expiration monitoring to avoid recurrence of similar failures in the future.
