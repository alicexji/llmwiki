# Round 2 Wiki Evaluation

This evaluation compares the freshly regenerated wiki against the supplied ground truth for the four cases. The report is based on the generated pages after the eight-file reingestion.

## Case 1: Temporal Update

**Classification: Fail**

### What the wiki concluded

The generated source summary for the delivery update correctly records that the rollout moved to November 1. However, the central `Customer Rollout Timeline` concept still identifies October 1 as the launch date and was not updated to represent November 1 as current.

### Evidence

- [`sources/02-atlas-delivery-update-summary.md`](.wiki/wiki/sources/02-atlas-delivery-update-summary.md): “Engineering estimates roughly **three additional weeks** are needed for remediation and regression testing, pushing the planned rollout date to **November 1**.”
- [`concepts/customer-rollout-timeline.md`](.wiki/wiki/concepts/customer-rollout-timeline.md): “The rollout timeline for Project Atlas centers on an **October 1 launch date**.”
- The same concept lists “**Mid-September to October 1**: Final validation and deployment prep (~2 weeks)” and links to both source summaries, but does not mark October 1 as historical or state that November 1 supersedes it.

### Comparison

The ground truth requires November 1 to be represented as the current planned launch date, with October 1 retained only as historical context. The wiki contains the new date in the later source summary but leaves the old date as the current date in the timeline concept. This represents the old date as current and fails the required temporal reconciliation.

## Case 2: Draft vs. Final Decision

**Classification: Pass**

### What the wiki concluded

The wiki distinguishes the earlier PostgreSQL proposal from the final DynamoDB decision. PostgreSQL is described as proposed, pending review, while the later architecture-decision page and DynamoDB entity identify DynamoDB as the selected production datastore and explicitly state that it replaces or supersedes the PostgreSQL design.

### Evidence

- [`entities/postgresql.md`](.wiki/wiki/entities/postgresql.md): “**PostgreSQL** is the relational database selected as the **proposed** primary production database for Project Atlas.”
- [`concepts/atlas-data-architecture-proposal.md`](.wiki/wiki/concepts/atlas-data-architecture-proposal.md): “This proposal represents a specific architectural decision within the broader Project Atlas initiative,” and its evidence remains scoped to a proposal “**Pending review with the platform team before implementation**.”
- [`concepts/atlas-architecture-decision-dynamodb-adoption.md`](.wiki/wiki/concepts/atlas-architecture-decision-dynamodb-adoption.md): the teams “decided to adopt **DynamoDB** instead of a relational (PostgreSQL) design.”
- The same concept states: “This decision supersedes the earlier **Shared Data-Access Layer** approach built around PostgreSQL.”
- [`entities/dynamodb.md`](.wiki/wiki/entities/dynamodb.md): “**DynamoDB** is a managed NoSQL datastore selected as the production database for **Project Atlas**, replacing an earlier proposed relational (PostgreSQL) design.”

### Comparison

The ground truth requires DynamoDB to be current and PostgreSQL to remain only as the earlier proposal or historical context. The regenerated wiki makes that distinction: PostgreSQL is explicitly proposed, while DynamoDB is selected and described as replacing the earlier design. It does not present the two architectures as equally current, so it passes.

## Case 3: Organizational Authority Conflict

**Classification: Pass**

### What the wiki concluded

The wiki preserves the two-day company policy and separately records a three-day engineering arrangement. The three-day arrangement is scoped to engineering teams and the upcoming quarter, and is described as temporary or experimental rather than as a company-wide policy replacement.

### Evidence

- [`concepts/hybrid-work-program.md`](.wiki/wiki/concepts/hybrid-work-program.md): “A company policy allowing employees to work remotely **up to two days per week**.”
- The same concept states that changes to the number of remote days must go through the formal workplace policy process and that “Department managers cannot independently expand remote day allowances.”
- [`concepts/engineering-team-remote-schedule.md`](.wiki/wiki/concepts/engineering-team-remote-schedule.md): engineering leadership decided on “**three days per week**” for engineering teams.
- The same concept describes it as “specific to engineering org and framed as a quarter-based experiment” and says the policy “will be revisited at end of quarter, indicating a trial/temporary status.”

### Comparison

The ground truth requires the two-day company policy to govern while allowing the engineering three-day statement to remain as a departmental practice or unresolved compliance issue. The wiki identifies the two-day rule as the company policy and scopes the three-day arrangement to engineering and a temporary quarter. It does not claim that engineering leadership successfully changed the company-wide policy, so it passes.

## Case 4: Legitimate Differing Perspectives

**Classification: Pass**

### What the wiki concluded

The wiki preserves both Sales' strategic view and Risk's cautionary view of Acme. It records Acme as strategically important and a potential expansion opportunity, while separately recording elevated account risk and recommending controls on the rollout. The two perspectives are not treated as mutually exclusive.

### Evidence

- [`concepts/acme-account-review.md`](.wiki/wiki/concepts/acme-account-review.md): “It identifies Acme as a high-priority strategic customer” and recommends prioritizing Acme and assigning dedicated onboarding support.
- [`entities/acme.md`](.wiki/wiki/entities/acme.md): Acme is “strategically important for the initial rollout of Project Atlas,” with possible expansion across multiple business units.
- [`concepts/acme-risk-assessment.md`](.wiki/wiki/concepts/acme-risk-assessment.md): “Acme presents **elevated account risk** due to recent negative changes in financial position” and outstanding contractual dependencies.
- The same concept recommends limiting initial exposure, monitoring the account, and establishing escalation criteria, while stating that the assessment “does not block the planned Atlas deployment.”
- [`sources/08-acme-risk-assessment-summary.md`](.wiki/wiki/sources/08-acme-risk-assessment-summary.md): the risk concerns should inform the rollout's “size and pacing,” rather than preventing deployment.

### Comparison

The ground truth says both statements are simultaneously valid: Acme is strategically important from the Sales perspective and presents elevated risk from the Risk perspective. The wiki retains both claims, preserves their source contexts, and combines them operationally by pairing account prioritization with exposure limits and monitoring. It does not discard either perspective or characterize them as a factual contradiction, so it passes.

## Overall Round 2 Summary

**Result: 3 Pass, 1 Fail.**

The fresh run improved architecture reconciliation: it correctly separated the PostgreSQL proposal from the final DynamoDB decision. It also handled the authority-scoped workplace case and the legitimate Sales/Risk perspectives correctly. The remaining failure is temporal reconciliation: the later November 1 launch update was captured in its source summary but did not replace October 1 in the central rollout timeline concept.