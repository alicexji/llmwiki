---
type: source
title: 11_authentication_incident.md
source_path: raw/11_authentication_incident.md
ingested: '2026-09-16'
created: '2026-09-16'
tags: []
---
This brief incident note describes intermittent login failures affecting Atlas users on September 4. The Atlas platform relies on AuthCore, a third-party authentication service, and during the incident the team observed elevated authentication error rates, prompting outreach to AuthCore for joint investigation. Service returned to normal later the same morning.

Notably, the root cause remains unresolved: the document explicitly states it has not been determined whether the failures originated within Atlas itself, within AuthCore, or from another upstream dependency. AuthCore is continuing to assist Northstar Financial with the investigation, indicating an ongoing, unclosed incident rather than a fully diagnosed one.

## See also

- [September 4 Authentication Incident](../concepts/september-4-authentication-incident.md)
- [Project Atlas](../entities/project-atlas.md)
- [AuthCore](../entities/authcore.md)
- [Northstar Financial](../entities/northstar-financial.md)
