# Project Atlas Architecture Review

The platform and Atlas engineering teams completed their review of the proposed data architecture.

During the review, concerns were raised about the operational requirements of the proposed relational design at the expected Atlas workload. The team evaluated an alternative design using DynamoDB.

The implementation will use DynamoDB as the production datastore for Atlas. The platform team will provide the standard DynamoDB deployment configuration, and the Atlas team will update the service design accordingly.

Engineering can now proceed with implementation based on this architecture.