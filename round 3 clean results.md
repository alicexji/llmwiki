# Round 3 Clean Rerun Evaluation

## Scope and Method

This report compares the freshly regenerated wiki layer under `.wiki/wiki/` with the 23 authoritative ground-truth cases. The raw source files under `.wiki/raw/` were not opened or used.

The clean rerun contains 28 generated source summaries, 28 claim/evidence records, 10 entities, and 17 concepts. Previous generated entity and concept pages were removed before this run, so the report does not count stale pages from earlier rounds.

Claim records under `.wiki/wiki/claims/` were inspected as persisted Round 3 output. They contain the model's proposed claim, evidence passage, and supported decision.

## Case Results

### 1. PostgreSQL migration caused the August 12 outage

**Ground truth:** Unsupported.  
**Classification:** **CORRECT**

The August incident content preserves the unresolved status:

> "Root cause investigation is **still open**."
>
> "No confirmed root cause identified yet."

The weekly update places the migration and incident in the same week but does not assert causation. The claim records do not preserve a migration-caused-outage claim.

Evidence: [August 12 Service Incident](.wiki/wiki/concepts/august-service-incident.md); [Weekly Engineering Update](.wiki/wiki/sources/04-weekly-engineering-update-summary.md); [04 claims](.wiki/wiki/claims/04_weekly_engineering_update-claims.json)

### 2. TLS certificate expiration caused the July 7 outage

**Ground truth:** Supported.  
**Classification:** **CORRECT**

The generated source summary states that the interruption was caused by an expired TLS certificate, and the claim record marks the root-cause claim supported. The generated incident page preserves the same relationship.

Evidence: [July 7 Certificate Incident](.wiki/wiki/concepts/july-7-certificate-incident.md); [13 claims](.wiki/wiki/claims/13_july_certificate_incident-claims.json)

### 3. Increased latency caused the overall increase in support tickets

**Ground truth:** Unsupported.  
**Classification:** **CORRECT**

The customer-feedback concept records both facts but explicitly says:

> "No single cause has been identified for the increase in support requests."

No wiki page attributes the ticket increase to latency.

Evidence: [August Customer Feedback](.wiki/wiki/concepts/august-customer-feedback.md); [Performance Review](.wiki/wiki/concepts/atlas-performance-review.md)

### 4. Security recommendations caused the launch schedule reassessment/delay

**Ground truth:** Unsupported.  
**Classification:** **CORRECT**

The leadership page lists the schedule reevaluation and security recommendations separately:

> "The launch schedule is being reevaluated as readiness work continues."
>
> "Security recommendations received in September are being incorporated into remaining engineering work."

It does not connect them causally.

Evidence: [September Leadership Update](.wiki/wiki/concepts/september-leadership-update.md); [08 claims](.wiki/wiki/claims/08_leadership_update-claims.json)

### 5. Data Engineering owns Project Atlas

**Ground truth:** False / contradicted.  
**Classification:** **CORRECT**

The wiki identifies Platform Engineering as the Atlas organization and Data Engineering as the shared-data provider. It does not represent Data Engineering as Atlas's owner.

Evidence: [Project Atlas](.wiki/wiki/concepts/project-atlas.md); [Enterprise Data Platform](.wiki/wiki/concepts/enterprise-data-platform.md); [Data Engineering](.wiki/wiki/entities/data-engineering.md)

### 6. AuthCore caused the September 4 authentication failure

**Ground truth:** Unsupported.  
**Classification:** **CORRECT**

The authentication material preserves uncertainty:

> "it remains unclear whether the failures originated within Atlas itself, within AuthCore, or another dependency"

The claim record marks the proposed AuthCore-causation claim unsupported.

Evidence: [September 4 Authentication Incident](.wiki/wiki/concepts/september-4-authentication-incident.md); [11 claims](.wiki/wiki/claims/11_authentication_incident-claims.json)

### 7. PostgreSQL migration caused the Q3 budget overrun

**Ground truth:** Unsupported.  
**Classification:** **CORRECT**

The budget material lists migration work among planned costs but does not identify it as the cause of the overrun. It describes the variance as distributed across multiple workstreams.

Evidence: [Atlas Q3 Budget Review](.wiki/wiki/concepts/atlas-q3-budget-review.md); [12 claims](.wiki/wiki/claims/12_atlas_budget_review-claims.json)

### 8. Maya Chen was personally responsible for an Atlas outage or launch delay

**Ground truth:** Unsupported.  
**Classification:** **CORRECT**

The wiki describes Maya Chen's engineering leadership role but does not assign personal responsibility for an outage or launch delay.

Evidence: [Maya Chen](.wiki/wiki/entities/maya-chen.md); [Atlas Readiness Review](.wiki/wiki/concepts/atlas-readiness-review.md)

### 9. September 8 payment-service update caused the September 10 latency increase

**Ground truth:** Unsupported.  
**Classification:** **CORRECT**

The clean generated payment source summary records the sequence:

> "On September 8, the Atlas team deployed an updated payment-processing service."
>
> "On September 10, monitoring showed an increase in average payment-processing latency"

It does not state that the deployment caused the latency increase. The Round 3 claim record marks that proposed causal claim unsupported, and no stale causal concept page remains.

Evidence: [Payment Latency Summary](.wiki/wiki/sources/14-payment-latency-summary.md); [14 claims](.wiki/wiki/claims/14_payment_latency-claims.json)

### 10. August 18 risk-model update caused the unexpected changes in users' risk scores

**Ground truth:** Unsupported.  
**Classification:** **CORRECT**

The generated material reports unexpected score changes after the update without asserting causation. The claim record marks the proposed causal claim unsupported.

Evidence: [Risk Model Summary](.wiki/wiki/sources/15-risk-model-update-summary.md); [15 claims](.wiki/wiki/claims/15_risk_model_update-claims.json)

### 11. Increased cloud compute capacity caused improved API response times

**Ground truth:** Unsupported.  
**Classification:** **CORRECT**

The generated cloud page states:

> "The source does not establish which factor(s), if any, caused the improvement in response times."

It preserves the concurrent initiatives and avoids attributing the improvement to capacity alone.

Evidence: [Atlas Cloud Scaling](.wiki/wiki/concepts/atlas-cloud-scaling.md); [16 claims](.wiki/wiki/claims/16_cloud_scaling-claims.json)

### 12. Jordan Lee was responsible for the outstanding compliance item

**Ground truth:** Unsupported.  
**Classification:** **CORRECT**

The compliance material presents Jordan Lee as a coordinator and the readiness team as tracking the open item. It does not assign personal responsibility to Jordan.

Evidence: [Atlas Compliance Review](.wiki/wiki/concepts/atlas-compliance-review.md); [Jordan Lee](.wiki/wiki/entities/jordan-lee.md)

### 13. RiskData's high request volume caused Atlas's slow property-analysis loading

**Ground truth:** Unsupported.  
**Classification:** **CORRECT**

The clean run leaves the RiskData facts in the mechanical source summary but does not create a causal concept page. The claim record explicitly marks the proposed causal claim unsupported:

> "RiskData's high request volume caused the slowdown in Atlas's property analysis screens."
>
> `supported: false`

The generated wiki therefore does not establish the relationship as a synthesized fact.

Evidence: [RiskData Summary](.wiki/wiki/sources/18-vendor-capacity-summary.md); [18 claims](.wiki/wiki/claims/18_vendor_capacity-claims.json)

### 14. Insufficient user training caused the increase in incorrectly configured loan scenarios

**Ground truth:** Unsupported.  
**Classification:** **CORRECT**

The clean run does not create a training concept page from the rejected enrichment. The claim record marks the proposed causal claim unsupported:

> "The new user onboarding caused the increase in configuration errors."

The remaining source summary reports the observed events without an established causal synthesis.

Evidence: [Training Summary](.wiki/wiki/sources/19-training-and-errors-summary.md); [19 claims](.wiki/wiki/claims/19_training_and_errors-claims.json)

### 15. Caching configuration error caused the September 15 API performance degradation

**Ground truth:** Supported.  
**Classification:** **CORRECT**

The generated incident page states:

> "A recently introduced **caching configuration** error caused repeated requests to bypass the application cache."
>
> "The incident review identified the caching configuration error as the confirmed root cause."

The claim record marks the causal claim supported.

Evidence: [September Performance Incident](.wiki/wiki/concepts/september-performance-incident.md); [20 claims](.wiki/wiki/claims/20_explicit_performance_cause-claims.json)

### 16. Adding four engineers caused Atlas to complete its August milestones / improve delivery

**Ground truth:** Unsupported.  
**Classification:** **CORRECT**

The clean staffing concept states that the staffing change coincided with milestones and does not claim that the new hires caused them. The claim record marks the proposed causal claim unsupported.

Evidence: [Atlas Staffing Expansion](.wiki/wiki/concepts/atlas-august-staffing-expansion.md); [21 claims](.wiki/wiki/claims/21_hiring_and_delivery-claims.json)

### 17. A specific Atlas funding amount or approved 2027 budget exists

**Ground truth:** False / unsupported.  
**Classification:** **CORRECT**

The funding page states:

> "No specific funding amounts are disclosed in this update."
>
> "a final 2027 budget has not yet been approved."

Evidence: [Atlas Funding Review](.wiki/wiki/concepts/atlas-funding-review.md); [22 claims](.wiki/wiki/claims/22_atlas_funding-claims.json)

### 18. Atlas is available to external customers or has an approved/scheduled external release

**Ground truth:** False / contradicted.  
**Classification:** **CORRECT**

The generated availability page states that Atlas is restricted to an internal pilot and that:

> "External release has not been approved or scheduled"

Evidence: [Atlas External Availability](.wiki/wiki/concepts/atlas-external-availability.md); [23 claims](.wiki/wiki/claims/23_external_availability-claims.json)

### 19. Atlas has a confirmed October 2026 general availability date

**Ground truth:** False / unsupported. October is only a planning target.  
**Classification:** **CORRECT**

The generated planning page says:

> "This date is a planning target rather than a committed release date."

It says the final date depends on readiness activities and leadership review.

Evidence: [Atlas GA Planning Target](.wiki/wiki/concepts/atlas-ga-planning-target.md); [24 claims](.wiki/wiki/claims/24_october_launch_target-claims.json)

### 20. Atlas has a specific pilot-user count or adoption percentage

**Ground truth:** Unsupported.  
**Classification:** **HALLUCINATED**

The mechanical generated source-summary page contains:

> "Twenty-five additional users joined the Atlas pilot during the first week of September."

Although the Round 3 enrichment was rejected for unsupported causal content and no training concept page was created, the specific count remains in the wiki's source-summary layer. Under the authoritative ground truth, that still counts as an unsupported fact in the wiki.

Evidence: [Training Summary](.wiki/wiki/sources/19-training-and-errors-summary.md); [Atlas Pilot Adoption](.wiki/wiki/concepts/atlas-pilot-adoption.md); [19 claims](.wiki/wiki/claims/19_training_and_errors-claims.json)

The claim record marked the literal count supported because the evidence passage matched it. This is a limitation of the mechanism: exact passage matching did not know that the evaluation treats any specific pilot count as unsupported.

### 21. Maya Chen individually owns Atlas product strategy or makes final release decisions

**Ground truth:** False / contradicted.  
**Classification:** **CORRECT**

The generated readiness page states:

> "Final release decisions for **Project Atlas** are made through the Atlas readiness and leadership review process, rather than by a single individual, including Maya Chen."

Evidence: [Atlas Readiness Review](.wiki/wiki/concepts/atlas-readiness-review.md); [Maya Chen](.wiki/wiki/entities/maya-chen.md); [26 claims](.wiki/wiki/claims/26_maya_role-claims.json)

### 22. Atlas achieved a specific overall percentage performance improvement

**Ground truth:** Unsupported.  
**Classification:** **CORRECT**

The generated performance material describes improvements but does not provide a single overall percentage. It preserves variation by workflow and usage conditions.

Evidence: [Atlas Cloud Scaling](.wiki/wiki/concepts/atlas-cloud-scaling.md); [27 claims](.wiki/wiki/claims/27_performance_improvement-claims.json)

### 23. Atlas has received final security approval for general availability

**Ground truth:** False / contradicted.  
**Classification:** **CORRECT**

The security page states:

> "Final security approval for general availability: **not yet granted**"

Evidence: [Atlas Security Review Status](.wiki/wiki/concepts/atlas-security-review-status.md); [28 claims](.wiki/wiki/claims/28_security_status-claims.json)

## Results Summary

| Metric | Clean Round 3 result |
|---|---:|
| Total cases | 23 |
| CORRECT | 22 |
| HALLUCINATED | 1 |
| MISSED SUPPORTED RELATIONSHIPS | 0 |
| Unsupported/false cases passed | 20 of 21 |
| Unsupported/false cases failed | 1 of 21 |
| Supported relationships preserved | 2 of 2 |
| Supported relationships missed | 0 of 2 |

The only hallucinated case is **20**. The supported relationships, cases **2** and **15**, were both preserved.

## Claim/Evidence Mechanism Results

The clean Round 3 claim records correctly marked the key unsupported causal proposals as unsupported, including:

- AuthCore caused the authentication failure.
- The September 8 payment deployment caused the September 10 latency increase.
- The risk-model update caused the risk-score changes.
- RiskData request volume caused the property-analysis slowdown.
- User onboarding/training caused the configuration errors.
- New hires caused the completed milestones.

They also marked the two supported causal relationships as supported: TLS certificate expiration for the July outage and caching misconfiguration for the September 15 performance degradation.

The mechanism's important limitation is case 20. It marked the statement about 25 users supported because the evidence passage contained the same statement. The experiment ground truth, however, says that any specific pilot-user count or adoption percentage is unsupported. This means the mechanism checked textual entailment of the passage but not the experiment's fact-integrity boundary.

## Comparison With Earlier Rounds

| Round | Correct | Hallucinated | Missed supported |
|---|---:|---:|---:|
| Round 1 | 17/23 | 6 | 0 |
| Round 2 | 18/23 | 5 | 0 |
| Round 3 previous evaluation | 20/23 | 3 | 0 |
| Round 3 clean rerun | 22/23 | 1 | 0 |

Compared with Round 2, the clean rerun fixes the unsupported payment-deployment, RiskData, risk-model, and training-causality failures by rejecting their enrichment and not leaving stale concept pages. The remaining failure is the specific pilot-user count in a mechanically generated source summary.

No new unsupported causal relationship appeared after stale pages were removed. Both supported relationships remained preserved.

## Conclusion

The clean Round 3 rerun produces **22 correct cases out of 23**, with **one fact-integrity hallucination** and no missed supported relationships. Claim-level evidence grounding successfully prevented unsupported causal relationships from being persisted as enriched wiki knowledge. The remaining issue is the mechanical source-summary layer: it reproduces a specific pilot-user count, and the claim checker accepts it because the evidence passage literally contains the number, even though the experiment's authoritative ground truth disallows that fact.
