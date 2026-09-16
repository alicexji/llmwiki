---
type: source
title: 13_july_certificate_incident.md
source_path: raw/13_july_certificate_incident.md
ingested: '2026-09-16'
created: '2026-09-16'
tags: []
---
This brief incident report documents a 22-minute service interruption in Project Atlas on July 7, caused by an expired TLS certificate that blocked communication between an internal application service and the loan processing service. Engineering resolved the immediate issue by renewing the certificate, restoring normal operations.

The post-incident review confirmed the expired certificate as the root cause. As a preventative measure, Platform Engineering implemented automated certificate expiration monitoring to avoid recurrence of similar outages in the future.

## See also

- [July 7 Certificate Incident](../concepts/july-7-certificate-incident.md)
- [Project Atlas](../entities/project-atlas.md)
- [Platform Engineering](../entities/platform-engineering.md)
- [Product Lending](../entities/product-lending.md)
