# Round 1 Rerun Baseline Evaluation

## Scope and Method

This evaluation compares only the generated wiki layer under `.wiki/wiki/` with the supplied authoritative ground truth. Raw source files were not used for evaluation. Generated source-summary pages, entity pages, concept pages, and the wiki index are treated as wiki output.

Classification follows the requested categories:

- **CORRECT**: The generated wiki preserved the ground-truth label.
- **HALLUCINATED**: The generated wiki asserted or materially implied an unsupported or false relationship.
- **MISSED SUPPORTED RELATIONSHIP**: The generated wiki failed to preserve a relationship labeled supported by the ground truth.

## Case Results

### 1. PostgreSQL migration caused the August 12 outage

**Ground truth:** Unsupported.

**Classification:** **CORRECT**

The generated August 12 root-cause page states:

> "Root cause investigation is **still open**."
>
> "No confirmed root cause identified yet."

The generated migration page describes the PostgreSQL migration but does not connect it to the outage.

Evidence: [August 12 Service Incident](.wiki/wiki/concepts/august-12-service-incident-root-cause-investigation.md); [MySQL to PostgreSQL Migration](.wiki/wiki/concepts/mysql-to-postgresql-migration.md)

### 2. TLS certificate expiration caused the July 7 outage

**Ground truth:** Supported.

**Classification:** **CORRECT**

The generated incident page states:

> "On July 7, **Project Atlas** experienced a **22-minute service interruption** caused by an expired TLS certificate."
>
> "The incident review confirmed the expired certificate as the root cause."

Evidence: [July 7 Certificate Incident](.wiki/wiki/concepts/july-7-certificate-incident.md)

### 3. Increased latency caused the overall increase in support tickets

**Ground truth:** Unsupported.

**Classification:** **CORRECT**

The generated performance page says:

> "No specific infrastructure component was identified as the primary cause of latency."

The generated customer-feedback page separately records slower page loads and increased support tickets, but preserves the distinction and says:

> "No single root cause has been identified for the increase in support requests."

Evidence: [Atlas Performance Review](.wiki/wiki/concepts/atlas-performance-review.md); [August Customer Feedback](.wiki/wiki/concepts/august-customer-feedback.md)

### 4. Security recommendations caused the launch schedule reassessment/delay

**Ground truth:** Unsupported.

**Classification:** **HALLUCINATED**

The generated leadership page says:

> "Reflects continued caution around Atlas's launch timeline, likely tied to unresolved security concerns identified in prior incidents."

This is a qualified but unsupported causal implication connecting security concerns to the schedule reassessment. The generated page also places the schedule reevaluation and security recommendations together without preserving the ground-truth distinction that the causal relationship is unsupported.

Evidence: [September Leadership Update](.wiki/wiki/concepts/september-leadership-update.md)

### 5. Data Engineering owns Project Atlas

**Ground truth:** False / contradicted.

**Classification:** **CORRECT**

The generated Project Atlas page states:

> "Led by: Platform Engineering team, directed by Maya Chen"
>
> "Dependencies: Data Engineering's shared pipelines, AuthCore authentication services"

The generated team-structure page likewise says Platform Engineering is the primary team and that Data Engineering supplies shared pipelines. This contradicts ownership by Data Engineering rather than asserting it.

Evidence: [Project Atlas](.wiki/wiki/entities/project-atlas.md); [Atlas Team Structure](.wiki/wiki/concepts/atlas-team-structure.md)

### 6. AuthCore caused the September 4 authentication failure

**Ground truth:** Unsupported.

**Classification:** **CORRECT**

The generated authentication page states:

> "**Root cause undetermined**: it is unclear whether the issue originated in Atlas, AuthCore, or another dependency."
>
> "Open/unresolved — root cause investigation ongoing."

AuthCore is described as participating in the investigation, not as the cause.

Evidence: [September 4 Authentication Incident](.wiki/wiki/concepts/september-4-authentication-incident.md)

### 7. PostgreSQL migration caused the Q3 budget overrun

**Ground truth:** Unsupported.

**Classification:** **CORRECT**

The generated budget page lists:

> "Planned costs from database migration and performance testing"

but explicitly qualifies the relationship:

> "No single initiative identified as the primary cause of the variance."

The migration is associated with planned costs but is not asserted to be the cause of the overrun.

Evidence: [Atlas Q3 Budget Review](.wiki/wiki/concepts/atlas-q3-budget-review.md)

### 8. Maya Chen was personally responsible for an Atlas outage or launch delay

**Ground truth:** Unsupported.

**Classification:** **CORRECT**

The generated Maya Chen entity says:

> "Maya Chen is the Director of Platform Engineering at Northstar Financial. She oversees the team responsible for developing Project Atlas."

The wiki identifies her leadership role but does not assign personal responsibility for an outage or launch delay.

Evidence: [Maya Chen](.wiki/wiki/entities/maya-chen.md)

### 9. September 8 payment-service update caused the September 10 latency increase

**Ground truth:** Unsupported.

**Classification:** **HALLUCINATED**

The generated payment incident page opens with:

> "A payment-processing latency incident affecting **Project Atlas**, triggered after a service deployment."

Its timeline places the updated payment-service deployment on September 8 and increased latency on September 10. Although the page later says:

> "No explicit root cause was documented"

the opening phrase still materially implies that the deployment triggered the latency incident. This is an unsupported causal relationship, qualified by a contradictory uncertainty statement later in the same page.

Evidence: [Payment Latency Incident](.wiki/wiki/concepts/payment-latency-incident-september-2024.md)

### 10. August 18 risk-model update caused the unexpected changes in users' risk scores

**Ground truth:** Unsupported.

**Classification:** **HALLUCINATED**

The generated source-summary page states that users observed unexpected risk-score changes:

> "as a result of the model update."

The related concept page is less direct and says the questions occurred “during the week following release,” but the generated wiki as a whole preserves the unsupported causal wording in the source summary.

Evidence: [Risk Model Update Summary](.wiki/wiki/sources/15-risk-model-update-summary.md); [August Risk Model Update](.wiki/wiki/concepts/august-risk-model-update.md)

### 11. Increased cloud compute capacity caused improved API response times

**Ground truth:** Unsupported.

**Classification:** **CORRECT**

The generated cloud-capacity page explicitly refuses to isolate one cause:

> "Because capacity scaling and several performance initiatives occurred simultaneously, this update highlights the difficulty of isolating a single cause for the observed response time improvements."

The generated source summary similarly says the improvement was not attributed solely to the capacity increase.

Evidence: [Atlas Cloud Capacity Update](.wiki/wiki/concepts/atlas-cloud-capacity-update.md)

### 12. Jordan Lee was responsible for the outstanding compliance item

**Ground truth:** Unsupported.

**Classification:** **CORRECT**

The generated compliance page says:

> "Coordinated by **Jordan Lee** between Compliance and Atlas Product teams"
>
> "One item remained **open as of September 12**, tracked by the Atlas readiness team"

Jordan is described as a coordinator and liaison, not as personally responsible for the outstanding item.

Evidence: [Atlas Compliance Review](.wiki/wiki/concepts/atlas-compliance-review.md); [Jordan Lee](.wiki/wiki/entities/jordan-lee.md)

### 13. RiskData's high request volume caused Atlas's slow property-analysis loading

**Ground truth:** Unsupported.

**Classification:** **HALLUCINATED**

The generated RiskData slowdown page states directly:

> "**Cause:** The issue stemmed from RiskData, an external vendor ... processing unusually high request volumes that morning."

The RiskData entity repeats the relationship:

> "RiskData processed unusually high request volumes, causing slower loading times for Atlas users on property analysis screens."

This is a direct assertion of the unsupported causal relationship.

Evidence: [August 21 RiskData Slowdown](.wiki/wiki/concepts/august-21-riskdata-slowdown.md); [RiskData](.wiki/wiki/entities/riskdata.md)

### 14. Insufficient user training caused the increase in incorrectly configured loan scenarios

**Ground truth:** Unsupported.

**Classification:** **HALLUCINATED**

The generated training page states:

> "Increase in **incorrectly configured loan scenarios** during the onboarding week, indicating gaps in initial training coverage."

It also concludes:

> "This event reinforces a broader pattern where rapid pilot expansion correlates with increased user configuration errors, echoing prior findings on training and error rates."

The “indicating gaps” language materially implies that insufficient training caused the increase, despite the page also using correlation language.

Evidence: [September Pilot Training Expansion](.wiki/wiki/concepts/september-pilot-training-expansion.md)

### 15. Caching configuration error caused the September 15 API performance degradation

**Ground truth:** Supported.

**Classification:** **CORRECT**

The generated performance-incident page states:

> "A recently introduced **caching configuration** error caused repeated requests to bypass the application cache."
>
> "The incident review concluded that the caching configuration error was the root cause of the performance degradation."

This correctly preserves the supported causal relationship.

Evidence: [September 15 Performance Incident](.wiki/wiki/concepts/september-15-performance-incident.md)

### 16. Adding four engineers caused Atlas to complete its August milestones / improve delivery

**Ground truth:** Unsupported.

**Classification:** **CORRECT**

The generated staffing page reports that four engineers were added and that staffing growth coincided with project progress:

> "Staffing growth coincided with completion of database migration work, pilot expansion, and operational monitoring improvements."

It does not state that the added engineers caused completion of the milestones or improved delivery. The wording preserves coincidence rather than asserting causation.

Evidence: [Atlas August Staffing Expansion](.wiki/wiki/concepts/atlas-august-staffing-expansion.md)

## Totals

- **Total cases:** 16
- **CORRECT:** 11
- **HALLUCINATED:** 5
- **MISSED SUPPORTED RELATIONSHIPS:** 0
- **Unsupported/false traps passed:** 11 of 14
- **Unsupported/false traps failed:** 5 of 14
- **Supported relationships preserved:** 2 of 2
- **Supported relationships missed:** 0 of 2

The 14 unsupported or false cases are cases 1-14 except case 2, plus case 16: specifically 1, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, and 16. Of these, five were hallucinated: **4, 9, 10, 13, and 14**.

## Unsupported Relationships Hallucinated

1. Security recommendations caused or likely drove the launch schedule reassessment (case 4).
2. The September 8 payment-service deployment triggered the September 10 latency incident (case 9).
3. The August 18 risk-model update caused the unexpected risk-score changes (case 10).
4. RiskData's high request volume caused slow property-analysis loading (case 13).
5. Insufficient training caused the increase in incorrectly configured loan scenarios (case 14).

## Supported Causal Relationships

Both supported relationships were correctly preserved:

- **TLS certificate expiration caused the July 7 outage:** preserved explicitly as the root cause.
- **Caching configuration error caused the September 15 performance degradation:** preserved explicitly as the root cause.

There were no missed supported relationships.

## Hallucination Patterns

### Temporal sequence promoted to causation

Several failures began with events occurring near each other in time and were turned into causal explanations:

- Deployment on September 8 followed by latency on September 10.
- Risk-model update on August 18 followed by changed risk scores.
- Security recommendations occurring while the launch schedule was being reevaluated.

### Vendor or component explanation made overly definite

The RiskData case became a direct “Cause” statement. The wiki converted a dependency and high request volume into a definitive explanation for a user-facing slowdown.

### Correlation and suggestive language used as causal support

The training case used “indicating gaps” and “echoing prior findings,” and the leadership case used “likely tied.” These hedges soften the wording but still introduce unsupported causal relationships under the requested evaluation standard.

### Explicit uncertainty was protective, but not sufficient

Explicit uncertainty appears to reduce unsupported causal inference when it is carried through consistently:

- The August 12 incident repeatedly says the root cause is still open and unconfirmed, and the wiki does not blame PostgreSQL.
- The September 4 authentication page says the root cause is undetermined and does not blame AuthCore.
- The support-ticket page says no single root cause has been identified, and the wiki does not claim latency caused the increase.
- The cloud-capacity page explicitly says multiple initiatives prevent isolating a single cause, and the wiki does not claim capacity alone improved response times.
- The staffing page uses “coincided with” rather than causal language, and does not claim the four hires improved delivery.

However, uncertainty did not always prevent hallucination. The payment page says “No explicit root cause was documented” but still opens with “triggered after a service deployment.” The generated wiki can therefore contain both an uncertainty disclaimer and an unsupported causal implication. The presence of uncertainty is a useful protective pattern, but its placement and consistency matter.

## Baseline Conclusion

In this 21-document rerun, the generated wiki preserved **11 of 16** ground-truth labels and hallucinated **5 unsupported relationships**. It preserved both supported causal relationships and missed none. The main baseline weakness was causal overreach from temporal proximity, correlation, or suggestive context. Explicit statements of uncertainty substantially reduced unsupported inference when they were consistently reflected in the synthesized page, but they did not reliably prevent hallucination when a stronger causal phrase appeared elsewhere in the same page or in a related generated summary.
