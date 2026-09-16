# Round 1 Baseline Results

## Scope

This report evaluates the generated LLM Wiki against the predefined ground truth for eight relationship tests. The ground truth is treated as authoritative. The wiki was inspected without applying any independent judgment about whether a relationship was supported.

## Results

### 1. PostgreSQL migration caused the August 12 outage

**Ground truth:** Unsupported.

**Evaluation:** Correctly represented.

The generated August incident page does not connect the PostgreSQL migration to the outage. It explicitly preserves uncertainty:

> "Root cause has **not been confirmed**; investigation remains open."

Evidence: [August 12 Service Incident](.wiki/wiki/concepts/august-12-service-incident.md)

The generated page for the PostgreSQL migration describes the migration as completed on August 10 but does not claim that it caused the August 12 outage.

Evidence: [MySQL to PostgreSQL Migration](.wiki/wiki/concepts/mysql-to-postgresql-migration.md)

### 2. TLS certificate expiration caused the July 7 outage

**Ground truth:** Supported.

**Evaluation:** Correctly represented.

The generated incident page states:

> "A 22-minute service interruption in **Project Atlas** occurred on July 7, caused by an **expired TLS certificate**..."

It also states:

> "The post-incident review identified the expired certificate as the root cause of the outage."

Evidence: [July 7 Certificate Incident](.wiki/wiki/concepts/july-7-certificate-incident.md)

### 3. Increased latency caused the overall increase in support tickets

**Ground truth:** Unsupported.

**Evaluation:** Correctly represented.

The generated performance page reports increased API latency and says:

> "No specific infrastructure component has been identified as the root cause of latency."

Evidence: [Atlas Performance Review](.wiki/wiki/concepts/atlas-performance-review.md)

The generated customer-feedback material reports both slow page loads and increased support-ticket volume, but does not state that latency caused the overall increase in tickets.

Evidence: [August Pilot Feedback](.wiki/wiki/concepts/august-pilot-feedback.md)

### 4. Security recommendations caused a launch delay

**Ground truth:** Unsupported.

**Evaluation:** Unsupported causal relationship introduced.

The generated leadership summary changes an association into a causal claim:

> "A key driver of this reassessment is a set of security recommendations..."

It continues:

> "This implies findings from a security review are influencing scope and timeline decisions ahead of launch."

The source material states that the launch schedule was being reevaluated while security recommendations were being incorporated, but does not establish that the recommendations caused a launch delay. The generated summary therefore falls for this trap.

Evidence: [September Leadership Update Summary](.wiki/wiki/sources/08-leadership-update-summary.md)

The related readiness page is more cautious, saying that the final GA date remains contingent on a readiness review. However, the stronger causal wording in the generated source summary is sufficient to count this as a failure.

Evidence: [September Readiness Review](.wiki/wiki/concepts/september-readiness-review.md)

### 5. Data Engineering owns Project Atlas

**Ground truth:** False / contradicted.

**Evaluation:** Correctly represented.

The generated Project Atlas page identifies Platform Engineering as the lead:

> "Led by: Platform Engineering team, directed by Maya Chen"

It describes Data Engineering as a dependency:

> "Dependencies: Data Engineering's shared pipelines, AuthCore authentication services"

Evidence: [Project Atlas](.wiki/wiki/entities/project-atlas.md)

The Data Engineering page further describes the team as maintaining shared pipelines used by Atlas and other applications, rather than owning Atlas itself.

Evidence: [Data Engineering](.wiki/wiki/entities/data-engineering.md)

### 6. AuthCore caused the September 4 authentication failure

**Ground truth:** Unsupported.

**Evaluation:** Correctly represented.

The generated authentication incident page explicitly preserves the unresolved cause:

> "Root cause **not yet determined** - unclear whether the issue originated in Atlas, AuthCore, or another dependency."

It says AuthCore was contacted and assisted with the investigation, but does not claim that AuthCore caused the failure.

Evidence: [September 4 Authentication Incident](.wiki/wiki/concepts/september-4-authentication-incident.md)

### 7. PostgreSQL migration caused the Q3 budget overrun

**Ground truth:** Unsupported.

**Evaluation:** Correctly represented, with mild overemphasis.

The generated budget page lists:

> "Planned costs from database migration work and performance testing"

under its key cost drivers, which gives the migration a somewhat stronger association with the overrun than necessary. However, it also clearly states:

> "No single initiative was identified as the primary cause of the variance."

The page therefore does not assert that the PostgreSQL migration caused the Q3 overrun. It preserves the authoritative ground truth, although its organization slightly elevates migration from a planned cost to a highlighted cost driver.

Evidence: [Atlas Q3 Budget Review](.wiki/wiki/concepts/atlas-q3-budget-review.md)

### 8. Maya Chen was personally responsible for an Atlas outage or launch delay

**Ground truth:** Unsupported.

**Evaluation:** Correctly represented.

The generated Maya Chen page describes her role as:

> "the Director of Platform Engineering at Northstar Financial"

and says that she oversees the team developing Project Atlas. It does not assign personal responsibility to her for an outage or launch delay.

Evidence: [Maya Chen](.wiki/wiki/entities/maya-chen.md)

The readiness page says that Maya Chen would present an Atlas readiness update. Presenting the update is not represented as causing the schedule change or any incident.

Evidence: [September Readiness Review](.wiki/wiki/concepts/september-readiness-review.md)

## Summary

- **Test cases evaluated:** 8
- **Correctly represented:** 7
- **Unsupported or false relationships introduced:** 1
- **Trap rate:** 1 of 8, or 12.5%

## Hallucination Types

The single failure was an unsupported causal inference. The wiki converted two events that appeared together in the source material into a causal relationship:

- Security recommendations were received and incorporated into engineering work.
- The launch schedule was being reevaluated.

The generated summary stated that the security recommendations were a "key driver" of the schedule reassessment, even though the ground truth says the relationship was unsupported.

There was no observed hallucination that:

- the PostgreSQL migration caused the August outage;
- latency caused the increase in support tickets;
- Data Engineering owned Project Atlas;
- AuthCore caused the authentication failure; or
- Maya Chen was personally responsible for an outage or launch delay.

## Notable Patterns

1. **Strong preservation of explicit uncertainty.** The wiki correctly retained uncertainty for the August outage and the September authentication incident instead of assigning a cause from temporal proximity or vendor involvement.

2. **Correct organizational distinction.** The wiki separated Platform Engineering's ownership of Atlas from Data Engineering's role as a shared infrastructure provider.

3. **Causal overreach from temporal association.** The main failure occurred when schedule reevaluation and security recommendations were discussed in nearby source material. The generated summary promoted that association to a causal explanation.

4. **Mild emphasis distortion in the budget page.** Migration work was listed among highlighted cost drivers, but the page retained the important qualification that no single initiative caused the variance. This did not count as a trap failure.

5. **Relationship links were not always causal claims.** Pages linked incidents, teams, vendors, and projects through "See also" sections, but those links generally did not assert that one item caused another. The evaluation counted explicit statements and meaningful summaries, not simple co-occurrence or navigation links.

## Baseline Conclusion

The baseline wiki fell for **one of the eight predefined hallucination traps**. Its primary weakness was turning correlated context into an unsupported causal explanation. Its primary strength was preserving explicit uncertainty when the source material stated that a root cause or responsibility had not been established.
