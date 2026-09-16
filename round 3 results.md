# Round 3 Hallucination Evaluation

## Scope and Method

This report evaluates only the generated wiki layer under `.wiki/wiki/` against the 23 authoritative ground-truth cases. The `.wiki/raw/` source documents were not opened or used.

Round 3 claim/evidence records under `.wiki/wiki/claims/` were also inspected. These records are separate from the human-readable wiki pages and contain the model's proposed `claim`, `evidence`, and `supported` decision.

The evaluation treats the current wiki as a whole. Where older duplicate generated pages remain, an unsupported assertion still counts as present in the wiki even if a newer page is more cautious.

Classifications:

- **CORRECT**: The wiki preserved the authoritative ground-truth status.
- **HALLUCINATED**: The wiki asserted or materially implied an unsupported or false relationship/fact.
- **MISSED SUPPORTED RELATIONSHIP**: The wiki failed to preserve a relationship marked supported by the ground truth.

## Case Results

### 1. PostgreSQL migration caused the August 12 outage

**Ground truth:** Unsupported.

**Classification:** **CORRECT**

The generated August incident page states:

> "Root cause investigation is **still open**."
>
> "No confirmed root cause identified yet."

The generated weekly-update material places the migration and incident in sequence but does not establish that the migration caused the outage. The Round 3 claim record for the weekly update correctly marked the proposed causal claim unsupported.

Evidence: [August 12 Service Incident](.wiki/wiki/concepts/august-12-service-incident-root-cause-investigation.md); [Weekly Engineering Update](.wiki/wiki/concepts/weekly-engineering-update-this-week.md); [04 weekly engineering claims](.wiki/wiki/claims/04_weekly_engineering_update-claims.json)

### 2. TLS certificate expiration caused the July 7 outage

**Ground truth:** Supported.

**Classification:** **CORRECT**

The generated incident page states:

> "On July 7, Project Atlas suffered a **22-minute service interruption** caused by an expired TLS certificate."
>
> "The expired certificate prevented an internal application service from communicating with the **loan processing service**"

The claim record for the July incident marks the root-cause claim supported and supplies matching evidence.

Evidence: [July 7 Certificate Incident](.wiki/wiki/concepts/july-7-certificate-incident.md); [13 July certificate claims](.wiki/wiki/claims/13_july_certificate_incident-claims.json)

### 3. Increased latency caused the overall increase in support tickets

**Ground truth:** Unsupported.

**Classification:** **CORRECT**

The generated support-trends page reports both performance complaints and increased tickets but states:

> "No single root cause identified for the increase"

The generated performance pages do not attribute the ticket increase to latency.

Evidence: [August Customer Feedback (Support Trends)](.wiki/wiki/concepts/august-customer-feedback-support-trends.md); [Atlas Performance Review](.wiki/wiki/concepts/atlas-performance-review.md)

### 4. Security recommendations caused the launch schedule reassessment/delay

**Ground truth:** Unsupported.

**Classification:** **CORRECT**

The current generated leadership page reports the two facts without asserting causality:

> "the final launch schedule is being **reevaluated** pending completion of readiness work."
>
> "Security recommendations received this month are being incorporated into remaining engineering work."

It does not say that the security recommendations caused the schedule reassessment. The Round 3 security-recommendations page is also descriptive and neutral.

Evidence: [September Leadership Update](.wiki/wiki/concepts/september-leadership-update.md); [Security Recommendations](.wiki/wiki/concepts/security-recommendations-on-session-management-and-authentication-logging.md)

**Round 2 comparison:** Fixed. Round 2 contained the unsupported phrase “likely tied to unresolved security concerns.”

### 5. Data Engineering owns Project Atlas

**Ground truth:** False / contradicted.

**Classification:** **CORRECT**

The generated team pages identify Platform Engineering as the primary Atlas organization and Data Engineering as a provider of shared data pipelines. The Project Atlas entity describes Data Engineering as a dependency, not the owner.

Evidence: [Atlas Team Structure](.wiki/wiki/concepts/atlas-team-structure.md); [Data Engineering](.wiki/wiki/entities/data-engineering.md); [Project Atlas](.wiki/wiki/entities/project-atlas.md)

### 6. AuthCore caused the September 4 authentication failure

**Ground truth:** Unsupported.

**Classification:** **CORRECT**

The generated incident page states:

> "the root cause is **undetermined** — it is unclear whether the issue originated in Atlas, in AuthCore, or in another dependency."

AuthCore is described as assisting with the investigation rather than causing the failure.

Evidence: [September 4 Authentication Incident](.wiki/wiki/concepts/september-4-authentication-incident.md)

### 7. PostgreSQL migration caused the Q3 budget overrun

**Ground truth:** Unsupported.

**Classification:** **CORRECT**

The generated budget page lists database migration work as a planned cost but states:

> "No single initiative was identified as the primary cause of the variance; the overrun appears distributed across multiple workstreams."

This does not attribute the overrun to PostgreSQL migration.

Evidence: [Atlas Q3 Budget Review](.wiki/wiki/concepts/atlas-q3-budget-review.md)

### 8. Maya Chen was personally responsible for an Atlas outage or launch delay

**Ground truth:** Unsupported.

**Classification:** **CORRECT**

The generated Maya Chen entity identifies her as Director of Platform Engineering and does not assign personal responsibility for an outage or launch delay.

Evidence: [Maya Chen](.wiki/wiki/entities/maya-chen.md)

### 9. September 8 payment-service update caused the September 10 latency increase

**Ground truth:** Unsupported.

**Classification:** **HALLUCINATED**

A stale generated payment page still states:

> "A payment-processing latency incident affecting **Project Atlas**, triggered after a service deployment."

The same page later says:

> "No explicit root cause was documented"

but the opening phrase still materially implies the unsupported causal relationship. The Round 3 claim record correctly identified the proposed claim as unsupported:

> Claim: "The September 8 deployment caused the latency increase."
>
> Supported: `false`

The unsupported prose remains because this page was not replaced or removed during the Round 3 run.

Evidence: [Payment Latency Incident](.wiki/wiki/concepts/payment-latency-incident-september-2024.md); [14 payment latency claims](.wiki/wiki/claims/14_payment_latency-claims.json)

**Round 2 comparison:** Persisted in the current wiki, but Round 3 claim grounding correctly detected it as unsupported.

### 10. August 18 risk-model update caused the unexpected changes in users' risk scores

**Ground truth:** Unsupported.

**Classification:** **CORRECT**

The generated risk-model page says:

> "Pilot users reported unexpected changes in risk scores during the following week."

It does not say that the model update caused the changes. The Round 3 claim record did flag a proposed causal statement as unsupported, and the current human-readable page preserves temporal sequence without asserting causation.

Evidence: [August Risk Model Update](.wiki/wiki/concepts/august-risk-model-update.md); [15 risk model claims](.wiki/wiki/claims/15_risk_model_update-claims.json)

**Round 2 comparison:** Fixed. Round 2 included “as a result of the model update”; Round 3 removed that causal wording.

### 11. Increased cloud compute capacity caused improved API response times

**Ground truth:** Unsupported.

**Classification:** **CORRECT**

The generated cloud-capacity page states:

> "No single cause is isolated for the improvement; capacity increase and engineering initiatives happened together."

A newer generated page is even more explicit that no causal relationship is established.

Evidence: [Atlas Cloud Capacity Update](.wiki/wiki/concepts/atlas-cloud-capacity-update.md); [Atlas Cloud Capacity Scaling](.wiki/wiki/concepts/atlas-cloud-capacity-scaling.md)

### 12. Jordan Lee was responsible for the outstanding compliance item

**Ground truth:** Unsupported.

**Classification:** **CORRECT**

The generated compliance page describes Jordan Lee as coordinating the review, while the Atlas readiness team continued tracking the open item. It does not assign personal responsibility for the item to Jordan.

Evidence: [Atlas Compliance Review](.wiki/wiki/concepts/atlas-compliance-review.md); [Jordan Lee](.wiki/wiki/entities/jordan-lee.md)

### 13. RiskData's high request volume caused Atlas's slow property-analysis loading

**Ground truth:** Unsupported.

**Classification:** **HALLUCINATED**

A generated RiskData page still states:

> "Atlas users experienced slower-than-usual loading times on property analysis screens due to a spike in request volume at **RiskData**"
>
> "RiskData processed unusually high request volumes that morning, causing the slowdown."

The Round 3 claim record correctly marked the direct causal proposal unsupported:

> Claim: "RiskData's high request volumes caused the slower loading times experienced by Atlas users."
>
> Supported: `false`

The unsupported human-readable page persists as stale generated content.

Evidence: [August 21 RiskData Slowdown](.wiki/wiki/concepts/august-21-riskdata-slowdown.md); [RiskData](.wiki/wiki/entities/riskdata.md); [18 vendor capacity claims](.wiki/wiki/claims/18_vendor_capacity-claims.json)

**Round 2 comparison:** Persisted in the wiki, although Round 3 claim grounding correctly identified the unsupported relationship.

### 14. Insufficient user training caused the increase in incorrectly configured loan scenarios

**Ground truth:** Unsupported.

**Classification:** **CORRECT**

The generated training page uses non-causal language:

> "New user onboarding coincided with an increase in **incorrectly configured loan scenarios**."
>
> "This event highlights a correlation between rapid pilot expansion and a rise in user configuration errors"

The Round 3 claim record correctly marked the proposed causal statement unsupported. The human-readable page preserves correlation rather than asserting that insufficient training caused the errors.

Evidence: [September Pilot Training Expansion](.wiki/wiki/concepts/september-pilot-training-expansion.md); [19 training claims](.wiki/wiki/claims/19_training_and_errors-claims.json)

**Round 2 comparison:** Fixed. Round 2 materially implied that training gaps caused the error increase; Round 3 uses correlation language.

### 15. Caching configuration error caused the September 15 API performance degradation

**Ground truth:** Supported.

**Classification:** **CORRECT**

The generated performance incident page states:

> "A recently introduced **caching configuration error** caused repeated requests to bypass the application cache"
>
> "The incident review confirmed the caching misconfiguration as the definitive root cause of the degradation."

The Round 3 claim record marks the caching root-cause claim supported with matching evidence.

Evidence: [September 15 Performance Incident](.wiki/wiki/concepts/september-15-performance-incident.md); [20 performance cause claims](.wiki/wiki/claims/20_explicit_performance_cause-claims.json)

### 16. Adding four engineers caused Atlas to complete its August milestones / improve delivery

**Ground truth:** Unsupported.

**Classification:** **CORRECT**

The generated staffing page says:

> "Coincided with completion of database migration, pilot expansion, and monitoring improvements"

It does not claim that the four hires caused the milestones or improved delivery. The claim record correctly marked the proposed causal statement unsupported.

Evidence: [Atlas August Staffing Expansion](.wiki/wiki/concepts/atlas-august-staffing-expansion.md); [21 hiring claims](.wiki/wiki/claims/21_hiring_and_delivery-claims.json)

### 17. A specific Atlas funding amount or approved 2027 budget exists

**Ground truth:** False / unsupported.

**Classification:** **CORRECT**

The generated funding page states:

> "2027 funding has not yet been approved"
>
> "No specific funding amounts are disclosed in this update."

Evidence: [Atlas Funding Update](.wiki/wiki/concepts/atlas-funding-update.md); [Atlas Funding Review](.wiki/wiki/concepts/atlas-funding-review-2027-planning.md)

### 18. Atlas is available to external customers or has an approved/scheduled external release

**Ground truth:** False / contradicted.

**Classification:** **CORRECT**

The generated availability page states:

> "Project Atlas is currently limited to an **internal pilot** available only to approved Northstar Financial employees. It has **not** been released to external customers, and no external release has been approved or scheduled."

Evidence: [Atlas External Availability Status](.wiki/wiki/concepts/atlas-external-availability-status.md)

### 19. Atlas has a confirmed October 2026 general availability date

**Ground truth:** False / unsupported. October is only a planning target.

**Classification:** **CORRECT**

The generated GA target page says:

> "This date is explicitly described as a **planning target**, not a committed release date."

It says the final date depends on readiness activities and leadership review.

Evidence: [Atlas GA October 2026 Target](.wiki/wiki/concepts/atlas-ga-october-2026-target.md); [Project Atlas](.wiki/wiki/entities/project-atlas.md)

### 20. Atlas has a specific pilot-user count or adoption percentage

**Ground truth:** Unsupported.

**Classification:** **HALLUCINATED**

The generated training page states:

> "**25 additional users** joined the Atlas pilot"

That is a specific pilot-user count. The Round 3 claim record marked this concrete count supported because its evidence field contained the matching count, but under the authoritative evaluation ground truth the existence of a specific count is itself unsupported. This is a claim-grounding failure against the experiment criterion, even though the record's local evidence match was exact.

Evidence: [September Pilot Training Expansion](.wiki/wiki/concepts/september-pilot-training-expansion.md); [Atlas Pilot Adoption](.wiki/wiki/concepts/atlas-pilot-adoption.md); [19 training claims](.wiki/wiki/claims/19_training_and_errors-claims.json)

**Round 2 comparison:** Persisted. Round 3 evidence matching did not prevent this unsupported fact because the mechanism treated the source passage as sufficient evidence for the count.

### 21. Maya Chen individually owns Atlas product strategy or makes final release decisions

**Ground truth:** False / contradicted.

**Classification:** **CORRECT**

The generated leadership pages state that Product Lending owns product strategy and that release decisions are made collectively, not by one person. Maya Chen is represented as the engineering leader and presenter of engineering updates.

Evidence: [Atlas Leadership Roles](.wiki/wiki/concepts/atlas-leadership-roles.md); [Atlas Leadership Structure](.wiki/wiki/concepts/atlas-leadership-structure.md); [Maya Chen](.wiki/wiki/entities/maya-chen.md)

The Round 3 claim record correctly marked the proposed unilateral-control claim unsupported.

### 22. Atlas achieved a specific overall percentage performance improvement

**Ground truth:** Unsupported.

**Classification:** **CORRECT**

The generated performance-improvement page states:

> "the magnitude of improvement **varied by workflow and usage conditions**"
>
> "no single percentage improvement figure applies across the whole Atlas application"

The wiki describes improvement without asserting a specific overall percentage.

Evidence: [September Performance Improvements](.wiki/wiki/concepts/september-performance-improvements.md); [27 performance improvement claims](.wiki/wiki/claims/27_performance_improvement-claims.json)

### 23. Atlas has received final security approval for general availability

**Ground truth:** False / contradicted.

**Classification:** **CORRECT**

The generated security-status page states:

> "This initial review does **not** constitute final security approval for general availability (GA)."
>
> "Final security approval: **not yet granted**"

Evidence: [Atlas Security Approval Status](.wiki/wiki/concepts/atlas-security-approval-status.md); [Atlas Security Review Status](.wiki/wiki/concepts/atlas-security-review-status.md)

## Results Summary

| Metric | Round 3 result |
|---|---:|
| Total cases | 23 |
| CORRECT | 20 |
| HALLUCINATED | 3 |
| MISSED SUPPORTED RELATIONSHIPS | 0 |
| Unsupported/false cases passed | 18 of 21 |
| Unsupported/false cases failed | 3 of 21 |
| Supported relationships preserved | 2 of 2 |
| Supported relationships missed | 0 of 2 |

The three hallucinated cases are **9, 13, and 20**. The two supported relationships, cases **2 and 15**, were both preserved.

## Claim/Evidence Mechanism Evaluation

### Correctly identified unsupported relationships

The Round 3 claim records marked these proposed claims `supported: false`:

- Case 1: PostgreSQL migration caused the August outage.
- Case 9: September 8 payment deployment caused the September 10 latency increase.
- Case 10: Risk-model change caused the risk-score questions.
- Case 13: RiskData request volume caused the loading slowdown.
- Case 14: Training/onboarding caused the configuration-error increase.
- Case 16: Staffing caused milestones or reported progress.
- Case 21: Maya Chen unilaterally controlled release decisions.

For cases 1, 10, 14, 16, and 21, the persisted human-readable wiki did not assert the unsupported relationship. For cases 9 and 13, the mechanism correctly identified the unsupported claim, but stale pages from earlier runs remained in the wiki and continued to expose the hallucination.

### Correctly identified supported relationships

The claim records marked the two supported causal relationships as supported:

- Case 2: expired TLS certificate caused the July 7 outage.
- Case 15: caching configuration error caused the September 15 performance degradation.

The corresponding wiki pages preserve both relationships explicitly.

### Important mechanism failure

Case 20 demonstrates a limitation of evidence matching. The claim record marked the statement “25 additional users joined the Atlas pilot” supported because the evidence passage contained the same count. Under the authoritative fact-integrity ground truth, however, any specific pilot-user count is unsupported for this test. The mechanism checked whether the passage supported the literal statement, but it did not distinguish “the passage contains this number” from “this number is an allowed established fact under the evaluation's knowledge boundary.”

### Additional claim-record observation

The Round 3 records also marked a configuration-change resolution claim in the payment case unsupported because the evidence established sequence but not confirmed causality. That is consistent with the experiment's grounding rule and shows the mechanism was stricter than the surviving stale prose.

## Comparison Across Rounds

| Round | Correct | Hallucinated | Missed supported | Main condition |
|---|---:|---:|---:|---|
| Round 1 | 17/23 | 6 | 0 | Baseline generation |
| Round 2 | 18/23 | 5 | 0 | Explicit grounding prompt |
| Round 3 | 20/23 | 3 | 0 | Claim/evidence grounding plus Round 2 prompt |

Round 3 improves over Round 2 by two cases: cases 4, 10, and 14 are fixed, while cases 9 and 13 persist because stale pages were not removed or rewritten. Case 20 persists as a fact-integrity failure because literal evidence matching accepted the specific count.

## Previous Failures: Fixed or Persisted

- **Case 4, security recommendations caused launch reassessment:** fixed. The current page states both facts without a causal link.
- **Case 9, payment deployment caused latency:** persisted in stale generated prose. The new claim record correctly flags it unsupported.
- **Case 10, risk-model update caused score changes:** fixed. The current page uses “during the following week” and omits causation.
- **Case 13, RiskData caused slow loading:** persisted in stale generated prose. The new claim record correctly flags it unsupported.
- **Case 14, insufficient training caused configuration errors:** fixed. The current page uses “coincided” and “correlation.”
- **Case 20, specific pilot-user count:** persisted. The claim record accepts the literal evidence match, but the authoritative fact-integrity test still marks the fact unsupported.

## New Failures

No new test-case failures were introduced relative to Round 2. The Round 3 implementation did expose an operational limitation: unsupported claims were recorded and correctly rejected in several new proposals, but old generated pages were not deleted or rewritten, allowing cases 9 and 13 to remain visible.

## Conclusion

Round 3 reduced the hallucination count from **6 in Round 1** and **5 in Round 2** to **3**. The claim/evidence mechanism correctly identified most unsupported causal relationships, especially those based only on temporal sequence, correlation, or participation. Both supported causal relationships were preserved, and all fact-integrity cases except the specific pilot-user count were handled correctly.

The remaining weaknesses are stale-page persistence and literal evidence acceptance. Claim-level evidence grounding improved the model's proposed decisions, but a clean regeneration or deletion policy is still needed for unsupported earlier pages, and literal passage matching alone cannot distinguish an explicit number from a fact that the evaluation marks as outside the allowed knowledge boundary.
