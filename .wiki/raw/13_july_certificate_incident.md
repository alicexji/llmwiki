# Atlas Service Incident — July 7

Atlas experienced a 22-minute service interruption on July 7.

The incident investigation determined that an expired TLS certificate prevented one of the application's internal services from communicating with the loan processing service.

Engineering renewed the certificate and restored normal service.

The incident review identified the expired TLS certificate as the root cause of the outage.

Following the incident, Platform Engineering added automated certificate expiration monitoring.