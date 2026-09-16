# Round 2 Hallucination Evaluation

## Scope and Method

This report evaluates only the generated wiki layer under `.wiki/wiki/` against the 23 authoritative ground-truth cases. The `.wiki/raw/` source files were not inspected or used.

The evaluation treats the wiki as a whole. Where duplicate generated pages exist, any page that asserts or materially implies an unsupported relationship is counted as a hallucination. This matters in Round 2 because some older generated pages remain alongside newer, more cautious pages.

Classifications:

- **CORRECT**: The wiki preserved the ground-truth status.
- **HALLUCINATED**: The wiki asserted or materially implied an unsupported or false relationship/fact.
- **MISSED SUPPORTED RELATIONSHIP**: The wiki failed to preserve a relationship marked supported by the ground truth.

## Results

### 1. PostgreSQL migration caused the August 12 outage

**Ground truth:** Unsupported.

**Classification:** **CORRECT**

The generated root-cause investigation page states:

> "Root cause investigation is **still open**."
>
> "No confirmed root cause identified yet."

The migration page describes the PostgreSQL migration but does not connect it to the August outage.

Evidence: [August 12 Service Incident](.wiki/wiki/concepts/august-12-service-incident-root-cause-investigation.md); [MySQL to PostgreSQL Migration](.wiki/wiki/concepts/mysql-to-postgresql-migration.md)

### 2. TLS certificate expiration caused the July 7 outage

**Ground truth:** Supported.

**Classification:** **CORRECT**

The generated incident page states:

> "On July 7, Project Atlas suffered a **22-minute service interruption** caused by an expired TLS certificate."
>
> "The expired certificate prevented an internal application service from communicating with the **loan processing service**"

The relationship is preserved explicitly as the root cause.

Evidence: [July 7 Certificate Incident](.wiki/wiki/concepts/july-7-certificate-incident.md)

### 3. Increased latency caused the overall increase in support tickets

**Ground truth:** Unsupported.

**Classification:** **CORRECT**

The generated support-trends page records increased tickets and performance complaints, but states:

> "No single root cause identified for the increase"

The generated performance pages describe latency without assigning it as the cause of the ticket increase.

Evidence: [August Customer Feedback (Support Trends)](.wiki/wiki/concepts/august-customer-feedback-support-trends.md); [Atlas Performance Review](.wiki/wiki/concepts/atlas-performance-review.md)

### 4. Security recommendations caused the launch schedule reassessment/delay

**Ground truth:** Unsupported.

**Classification:** **HALLUCINATED**

An older generated leadership page still states:

> "Reflects continued caution around Atlas's launch timeline, likely tied to unresolved security concerns identified in prior incidents."

This materially implies the unsupported causal relationship. A newer security-recommendations page is neutral, but the unsupported claim remains in the wiki layer.

Evidence: [September Leadership Update](.wiki/wiki/concepts/september-leadership-update.md); [Security Recommendations](.wiki/wiki/concepts/security-recommendations-on-session-management-and-authentication-logging.md)

### 5. Data Engineering owns Project Atlas

**Ground truth:** False / contradicted.

**Classification:** **CORRECT**

The generated Project Atlas entity says:

> "Led by the Platform Engineering team under Maya Chen"
>
> "Depends on Data Engineering pipelines and AuthCore authentication services"

Data Engineering is represented as a dependency and shared-infrastructure provider, not the owner of Atlas.

Evidence: [Project Atlas](.wiki/wiki/entities/project-atlas.md); [Atlas Team Structure](.wiki/wiki/concepts/atlas-team-structure.md)

### 6. AuthCore caused the September 4 authentication failure

**Ground truth:** Unsupported.

**Classification:** **CORRECT**

The generated incident page says:

> "the root cause is **undetermined** — it is unclear whether the issue originated in Atlas, in AuthCore, or in another dependency."

AuthCore is described as assisting with the investigation, not as the cause.

Evidence: [September 4 Authentication Incident](.wiki/wiki/concepts/september-4-authentication-incident.md)

### 7. PostgreSQL migration caused the Q3 budget overrun

**Ground truth:** Unsupported.

**Classification:** **CORRECT**

The generated budget page lists migration work among planned costs but states:

> "No single initiative was identified as the primary cause of the variance; the overrun appears distributed across multiple workstreams."

It does not attribute the overrun to PostgreSQL migration.

Evidence: [Atlas Q3 Budget Review](.wiki/wiki/concepts/atlas-q3-budget-review.md)

### 8. Maya Chen was personally responsible for an Atlas outage or launch delay

**Ground truth:** Unsupported.

**Classification:** **CORRECT**

The generated Maya Chen entity describes her as the engineering leader for Atlas but does not assign personal responsibility for an outage or launch delay.

Evidence: [Maya Chen](.wiki/wiki/entities/maya-chen.md)

### 9. September 8 payment-service update caused the September 10 latency increase

**Ground truth:** Unsupported.

**Classification:** **HALLUCINATED**

A generated payment page opens with:

> "A payment-processing latency incident affecting **Project Atlas**, triggered after a service deployment."

Its timeline places the deployment on September 8 and increased latency on September 10. Although the same page later says:

> "No explicit root cause was documented"

the opening still materially implies that the deployment triggered the incident. Newer duplicate pages are more cautious, but the unsupported assertion remains in the wiki.

Evidence: [Payment Latency Incident](.wiki/wiki/concepts/payment-latency-incident-september-2024.md); [September Payment Processing Latency Episode](.wiki/wiki/concepts/september-payment-processing-latency-episode.md)

### 10. August 18 risk-model update caused the unexpected changes in users' risk scores

**Ground truth:** Unsupported.

**Classification:** **CORRECT**

The generated risk-model page reports that users noticed unexpected score changes shortly after the update:

> "Pilot users noticed unexpected changes in their risk scores shortly after the update."

It does not state that the update caused those changes. The generated source-summary page likewise describes the update and subsequent inquiries without asserting causation.

Evidence: [August Risk Model Update](.wiki/wiki/concepts/august-risk-model-update.md); [Risk Model Update Summary](.wiki/wiki/sources/15-risk-model-update-summary.md)

### 11. Increased cloud compute capacity caused improved API response times

**Ground truth:** Unsupported.

**Classification:** **CORRECT**

The generated cloud-capacity page explicitly states:

> "No single cause is isolated for the improvement; capacity increase and engineering initiatives happened together."

This preserves the distinction between correlation and causation.

Evidence: [Atlas Cloud Capacity Update](.wiki/wiki/concepts/atlas-cloud-capacity-update.md)

### 12. Jordan Lee was responsible for the outstanding compliance item

**Ground truth:** Unsupported.

**Classification:** **CORRECT**

The generated compliance page says Jordan Lee coordinated the review while the Atlas readiness team tracked the remaining item:

> "Jordan Lee coordinated the review between Compliance and the Atlas Product team, and the Atlas readiness team continued tracking the remaining item"

The wiki does not assign personal responsibility to Jordan.

Evidence: [Atlas Compliance Review](.wiki/wiki/concepts/atlas-compliance-review.md); [Jordan Lee](.wiki/wiki/entities/jordan-lee.md)

### 13. RiskData's high request volume caused Atlas's slow property-analysis loading

**Ground truth:** Unsupported.

**Classification:** **HALLUCINATED**

The generated slowdown page states directly:

> "slower-than-usual loading times ... caused by unusually high request volumes processed by the external vendor **RiskData**."
>
> "High request volume on RiskData's side, not an internal Atlas issue, caused the slowdown."

This is a direct unsupported causal assertion.

Evidence: [August 21 RiskData Slowdown](.wiki/wiki/concepts/august-21-riskdata-slowdown.md); [RiskData](.wiki/wiki/entities/riskdata.md)

### 14. Insufficient user training caused the increase in incorrectly configured loan scenarios

**Ground truth:** Unsupported.

**Classification:** **HALLUCINATED**

The generated training page reports correlation but also supplies an unsupported explanatory implication:

> "The **Atlas user guide** was updated with more examples of scenario configuration to address the error trend."

A duplicate generated page says:

> "the Product team observed an **increase in incorrectly configured loan scenarios** among pilot users, suggesting the training may not have fully prepared new users for scenario configuration."

This does not use the word “caused,” but it materially attributes the error increase to inadequate training, which is the unsupported relationship under test.

Evidence: [September Pilot Training Expansion](.wiki/wiki/concepts/september-pilot-training-expansion.md); [Atlas Pilot Training Expansion (September Update)](.wiki/wiki/concepts/atlas-pilot-training-expansion-september-update.md)

### 15. Caching configuration error caused the September 15 API performance degradation

**Ground truth:** Supported.

**Classification:** **CORRECT**

The generated incident page states:

> "A recently introduced **caching configuration error** caused repeated requests to bypass the application cache"
>
> "The incident review identified the caching configuration error as the definitive root cause"

The supported causal relationship is preserved explicitly.

Evidence: [September 15 Performance Incident](.wiki/wiki/concepts/september-15-performance-incident.md)

### 16. Adding four engineers caused Atlas to complete its August milestones / improve delivery

**Ground truth:** Unsupported.

**Classification:** **CORRECT**

The generated staffing page says:

> "The hiring coincided with completion of several planned milestones"

It also notes that the new engineers were still onboarding and that their full impact was expected later. The wiki preserves coincidence rather than asserting that the hires caused improved delivery.

Evidence: [Atlas August Staffing Expansion](.wiki/wiki/concepts/atlas-august-staffing-expansion.md)

### 17. A specific Atlas funding amount or approved 2027 budget exists

**Ground truth:** False / unsupported.

**Classification:** **CORRECT**

The generated funding page states:

> "2027 funding has not yet been approved"
>
> "No specific funding amounts are disclosed in this update."

Evidence: [Atlas Funding Update](.wiki/wiki/concepts/atlas-funding-update.md)

### 18. Atlas is available to external customers or has an approved/scheduled external release

**Ground truth:** False / contradicted.

**Classification:** **CORRECT**

The generated availability page says:

> "Project Atlas is currently limited to an **internal pilot** with approved Northstar Financial employees. It has **not** been released to external customers, and no external release date has been approved or scheduled."

Evidence: [Atlas External Availability Status](.wiki/wiki/concepts/atlas-external-availability-status.md)

### 19. Atlas has a confirmed October 2026 general availability date

**Ground truth:** False / unsupported. October is only a planning target.

**Classification:** **CORRECT**

The generated GA target page states:

> "This date is explicitly framed as a **planning target**, not a committed release date."

It also says a confirmed date will be communicated only after readiness activities and leadership review.

Evidence: [Atlas GA October 2026 Target](.wiki/wiki/concepts/atlas-ga-october-2026-target.md); [Project Atlas](.wiki/wiki/entities/project-atlas.md)

### 20. Atlas has a specific pilot-user count or adoption percentage

**Ground truth:** Unsupported.

**Classification:** **HALLUCINATED**

The generated training pages assert:

> "**25 additional users** joined the **Atlas** pilot program"

That is a specific pilot-user count. A separate adoption page says no final count or adoption percentage was disclosed, but the conflicting concrete count remains in the wiki layer.

Evidence: [September Pilot Training Expansion](.wiki/wiki/concepts/september-pilot-training-expansion.md); [Atlas Pilot Adoption](.wiki/wiki/concepts/atlas-pilot-adoption.md)

### 21. Maya Chen individually owns Atlas product strategy or makes final release decisions

**Ground truth:** False / contradicted.

**Classification:** **CORRECT**

The generated Maya Chen page states that she provides engineering updates but:

> "does not unilaterally make release decisions—these are made collectively through the Atlas readiness and leadership review process."

The wiki therefore contradicts individual final authority.

Evidence: [Maya Chen](.wiki/wiki/entities/maya-chen.md); [Atlas Leadership Structure](.wiki/wiki/concepts/atlas-leadership-structure.md)

### 22. Atlas achieved a specific overall percentage performance improvement

**Ground truth:** Unsupported.

**Classification:** **CORRECT**

The generated performance-improvement material says improvement varied by workflow and usage conditions and does not provide a single overall percentage. The cloud-capacity page likewise avoids attributing a single performance outcome to one change.

Evidence: [September Performance Improvements](.wiki/wiki/concepts/september-performance-improvements.md); [Atlas Cloud Capacity Update](.wiki/wiki/concepts/atlas-cloud-capacity-update.md)

### 23. Atlas has received final security approval for general availability

**Ground truth:** False / contradicted.

**Classification:** **CORRECT**

The generated security-status page states:

> "This initial review does **not** constitute final security approval for general availability (GA)."
>
> "Final security approval: **not yet granted**"

Evidence: [Atlas Security Approval Status](.wiki/wiki/concepts/atlas-security-approval-status.md)

## Results Summary

| Metric | Round 2 result |
|---|---:|
| Total cases | 23 |
| CORRECT | 18 |
| HALLUCINATED | 5 |
| MISSED SUPPORTED RELATIONSHIPS | 0 |
| Unsupported/false cases passed | 16 of 21 |
| Unsupported/false cases failed | 5 of 21 |
| Supported relationships preserved | 2 of 2 |
| Supported relationships missed | 0 of 2 |

The five hallucinated cases are **4, 9, 13, 14, and 20**. The two supported relationships, cases **2 and 15**, were both preserved.

## Round 1 Comparison

Round 1 had 17 CORRECT and 6 HALLUCINATED cases across the same 23-case set. Round 2 has 18 CORRECT and 5 HALLUCINATED cases, a net improvement of one case.

The risk-model case improved from HALLUCINATED to CORRECT: Round 2 describes the score changes as occurring shortly after the update without asserting that the update caused them.

The remaining failures are:

- **Case 4:** an older duplicate leadership page still says the schedule caution was “likely tied” to security concerns.
- **Case 9:** an older duplicate payment page still says the incident was “triggered after a service deployment.”
- **Case 13:** RiskData is still named as the direct cause of the slowdown.
- **Case 14:** training inadequacy is still materially implied as an explanation for configuration errors.
- **Case 20:** a concrete count of 25 pilot users remains in generated training pages.

## Hallucination Patterns

### Improved resistance to temporal causation

The risk-model case no longer converts “shortly after” into “caused by.” The cloud-capacity and staffing cases also preserve co-occurrence language rather than asserting that one change produced the outcome.

### Residual causal overreach

RiskData remains a direct vendor-causation failure. The training case uses softer language, but “suggesting the training may not have fully prepared” still introduces the unsupported relationship. Security and payment causation remain present in older duplicate pages.

### Cross-page inconsistency

Round 2 contains both cautious and overcommitted pages for some cases. For example, payment pages say no explicit root cause was documented, while another duplicate opens with “triggered after a service deployment.” Likewise, the adoption page says no final count was disclosed while training pages assert 25 additional users. The prompt improved individual generations but did not remove or reconcile older pages.

### Explicit uncertainty remains protective

Cases 1, 3, 6, 7, 11, 16, and 19 show the strongest benefit from explicit qualification. Phrases such as “still open,” “no single root cause,” “undetermined,” “no single cause is isolated,” “coincided,” and “planning target” helped the wiki avoid unsupported conclusions.

However, uncertainty is not sufficient when another page contains a stronger assertion. Case 9 demonstrates this directly: “No explicit root cause was documented” appears alongside “triggered after a service deployment.” Case 20 similarly combines an explicit no-final-count statement on one page with a specific user count on another.

## Conclusion

Round 2 improved the wiki from **17/23 correct to 18/23 correct**, reducing hallucinated cases from **6 to 5**. It preserved both supported causal relationships and missed none. The grounding prompt appears to help with temporal-sequence errors, especially the risk-model and cloud-capacity cases, and generally reinforces explicit uncertainty. The remaining failures show that causal overreach, softened causal implication, concrete unsupported facts, and stale duplicate pages continue to limit the benefit of a prompt-only mitigation.
