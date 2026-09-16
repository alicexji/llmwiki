---
type: source
title: 11_authentication_incident.md
source_path: raw/11_authentication_incident.md
ingested: '2026-09-16'
created: '2026-09-16'
tags: []
---
This brief incident note describes intermittent login failures affecting Atlas users on September 4. Atlas relies on **AuthCore** for user authentication, and during the incident the Atlas team observed elevated authentication error rates, prompting them to contact AuthCore as part of the investigation. Service returned to normal later that same morning.

Notably, the root cause has not been determined at the time of writing. The document explicitly states it is unclear whether the failures originated within Atlas itself, within AuthCore, or another dependency in the chain. AuthCore is actively assisting Northstar (the parent organization) with the ongoing investigation, indicating an open collaborative effort to resolve the ambiguity.

This short update contrasts with other more detailed incident reports in the wiki, as it captures an early, unresolved state of investigation rather than a completed root-cause analysis.

## See also

- [AuthCore](../entities/authcore.md)
- [Project Atlas](../entities/project-atlas.md)
- [Northstar Financial](../entities/northstar-financial.md)
- [September 4 Authentication Incident](../concepts/september-4-authentication-incident.md)
