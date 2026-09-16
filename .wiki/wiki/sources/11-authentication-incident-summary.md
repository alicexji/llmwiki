---
type: source
title: 11_authentication_incident.md
source_path: raw/11_authentication_incident.md
ingested: '2026-09-16'
created: '2026-09-16'
tags: []
---
This short incident note documents intermittent login failures affecting Atlas users on September 4. Atlas relies on **AuthCore** for user authentication, and elevated authentication error rates were observed during the incident window. The Atlas team engaged AuthCore as part of the investigation, and service returned to normal later that same morning.

Notably, the root cause has not been determined at the time of writing — it remains unclear whether the failures originated within Atlas itself, within AuthCore, or in another dependency. AuthCore is continuing to assist Northstar Financial with the ongoing investigation, indicating this is treated as an open/unresolved incident rather than a closed one.

## See also

- [September 4 Authentication Incident](../concepts/september-4-authentication-incident.md)
- [AuthCore](../entities/authcore.md)
- [Project Atlas](../entities/project-atlas.md)
- [Northstar Financial](../entities/northstar-financial.md)
