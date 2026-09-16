# Atlas Performance Incident — September 15

Atlas experienced elevated API response times on September 15 between 10:20 AM and 11:05 AM.

Engineering's investigation determined that a recently introduced caching configuration caused repeated requests to bypass the application cache.

The resulting increase in database queries caused API response times to rise during periods of heavy usage.

Engineering corrected the caching configuration at 11:02 AM. Performance returned to normal shortly afterward.

The incident review identified the caching configuration error as the root cause of the performance degradation.