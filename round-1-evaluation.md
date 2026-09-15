# Round 1 Wiki Evaluation

This evaluation compares the frozen generated wiki against the supplied ground truth. The wiki was read as generated; no wiki content was modified, regenerated, linted, fixed, or re-ingested during evaluation.

## Case 1: Temporal Update

**Classification: Fail**

### What the wiki concluded

The source summary for the delivery update correctly states that the rollout was delayed and that the planned launch date was pushed to November 1. However, the generated `Atlas Launch Timeline` concept still presents October 1 as the active target. It links to the November source but does not update its own current timeline.

### Evidence

- [`sources/02-atlas-delivery-update-summary.md`](.wiki/wiki/sources/02-atlas-delivery-update-summary.md): “Engineering estimates approximately **three additional weeks** are needed for remediation and regression testing, pushing the planned launch date to **November 1**.”
- [`concepts/atlas-launch-timeline.md`](.wiki/wiki/concepts/atlas-launch-timeline.md): “The **Atlas Launch Timeline** targets an **October 1** customer rollout.”
- The same concept lists “**Around October 1**: Sales begins customer communications,” while linking to the November delivery update.

### Comparison

The ground truth requires November 1 to be represented as the current planned launch date, with October 1 retained only as historical context. The wiki preserves the new date in a source summary but leaves October 1 as the current date in the central timeline concept. This leaves the current launch date unresolved and represents the old date as current, meeting the failure condition.

## Case 2: Draft vs. Final Decision

**Classification: Fail**

### What the wiki concluded

The generated architecture-review concept correctly says that DynamoDB was selected and superseded the earlier proposal. But the generated PostgreSQL entity still states that PostgreSQL was selected as the primary production database, without marking that statement as historical or limited to the earlier proposal. The result contains contradictory current claims.

### Evidence

- [`concepts/atlas-architecture-review.md`](.wiki/wiki/concepts/atlas-architecture-review.md): “The outcome: DynamoDB was selected as the production datastore.”
- [`concepts/atlas-architecture-review.md`](.wiki/wiki/concepts/atlas-architecture-review.md): “This decision supersedes the earlier **Atlas Data Architecture Proposal**.”
- [`entities/postgresql.md`](.wiki/wiki/entities/postgresql.md): “**PostgreSQL** is the relational database selected as the primary production database for Project Atlas.”
- [`entities/dynamodb.md`](.wiki/wiki/entities/dynamodb.md): “**DynamoDB** is a NoSQL database service selected as the production datastore for **Project Atlas**, replacing an earlier relational (PostgreSQL) design.”

### Comparison

The ground truth requires DynamoDB to be the current architecture decision and PostgreSQL to be retained only as the earlier proposal or historical context. Although the architecture-review and DynamoDB pages reach the correct final decision, the PostgreSQL entity explicitly presents PostgreSQL as selected. The wiki therefore represents PostgreSQL and DynamoDB as simultaneously current choices, which is a failure under the stated criteria.

## Case 3: Organizational Authority Conflict

**Classification: Pass**

### What the wiki concluded

The wiki represents the two-day limit as the company hybrid-work policy and separately records a temporary three-day arrangement for engineering teams. It preserves the departmental arrangement without promoting it to the governing company-wide policy.

### Evidence

- [`concepts/hybrid-work-program.md`](.wiki/wiki/concepts/hybrid-work-program.md): “A company policy allowing employees to work remotely **up to two days** per standard work week.”
- [`concepts/hybrid-work-program.md`](.wiki/wiki/concepts/hybrid-work-program.md): “Any changes to the number of allowed remote days must go through the formal workplace policy approval process” and “Department managers cannot independently expand remote day allowances.”
- [`concepts/three-day-remote-schedule.md`](.wiki/wiki/concepts/three-day-remote-schedule.md): “A scheduling arrangement decided by engineering leadership allowing **three days of remote work per week** for engineering teams during the upcoming quarter.”
- [`concepts/three-day-remote-schedule.md`](.wiki/wiki/concepts/three-day-remote-schedule.md): “To be **revisited at the end of the quarter** for potential adjustment.”

### Comparison

The ground truth requires the two-day company policy to govern while allowing the engineering statement to remain as a departmental practice or compliance issue. The wiki does this: the two-day limit is explicitly identified as company policy, while the three-day statement is scoped to engineering and the upcoming quarter. It does not claim that engineering leadership changed the company-wide policy, so it satisfies the expected behavior.

## Case 4: Legitimate Differing Perspectives

**Classification: Pass**

### What the wiki concluded

The wiki preserves both perspectives on Acme. Sales treats Acme as strategically important and recommends prioritizing the account; Risk identifies elevated account risk and recommends controls. Neither page treats one perspective as superseding the other.

### Evidence

- [`concepts/acme-account-review.md`](.wiki/wiki/concepts/acme-account-review.md): “Acme is considered one of the most strategically important customers for the initial Atlas rollout.”
- [`concepts/acme-account-review.md`](.wiki/wiki/concepts/acme-account-review.md): “Recommendation to prioritize Acme and provide dedicated onboarding support.”
- [`concepts/acme-risk-assessment.md`](.wiki/wiki/concepts/acme-risk-assessment.md): “identifying elevated account risk due to financial position changes and outstanding contractual dependencies.”
- [`concepts/acme-risk-assessment.md`](.wiki/wiki/concepts/acme-risk-assessment.md): “Limit initial exposure during rollout,” “Monitor the account closely,” and “Establish clear escalation criteria before expanding the relationship.”
- [`sources/08-acme-risk-assessment-summary.md`](.wiki/wiki/sources/08-acme-risk-assessment-summary.md): “These concerns do not block the planned Atlas deployment but inform decisions on rollout **size and pace** for the Acme account.”

### Comparison

The ground truth says both claims are simultaneously valid: Acme is strategically important and presents elevated risk. The wiki preserves both claims, keeps them in their respective Sales and Risk contexts, and does not characterize them as mutually exclusive or as a supersession conflict. It therefore passes. The generated pages do not explicitly synthesize the two into one recommendation, but synthesis is desirable rather than required by the classification criteria.

## Overall Round 1 Summary

**Result: 2 Pass, 2 Fail.**

The wiki handled scoped organizational policy and genuinely different business perspectives well. Its main weakness was state reconciliation across sequential sources: the central launch timeline retained October 1 after the November update, and the PostgreSQL entity retained a current-sounding claim after DynamoDB became the final decision. In both failures, a later source summary contained the correct update, but the earlier generated knowledge page was not revised consistently.