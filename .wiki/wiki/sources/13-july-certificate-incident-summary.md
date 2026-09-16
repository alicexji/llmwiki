---
type: source
title: 13_july_certificate_incident.md
source_path: raw/13_july_certificate_incident.md
ingested: '2026-09-16'
created: '2026-09-16'
tags: []
---
This brief incident report describes a 22-minute service interruption in Project Atlas on July 7, caused by an expired TLS certificate that prevented an internal application service from communicating with the loan processing service. Engineering resolved the issue by renewing the certificate, restoring normal service quickly.

The post-incident review formally identified the expired certificate as the root cause. As a corrective action, Platform Engineering implemented automated certificate expiration monitoring to prevent recurrence of similar outages in the future.

## See also

- [July 7 Certificate Incident](../concepts/july-7-certificate-incident.md)
- [Project Atlas](../entities/project-atlas.md)
- [Platform Engineering](../entities/platform-engineering.md)
