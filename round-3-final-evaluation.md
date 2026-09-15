# Round 3 Final Wiki Evaluation

This report compares the successful claim-aware Round 3 output against the supplied ground truth. The evaluation reads the generated wiki and its `claims.json` metadata; it does not modify the wiki.

## Case 1: Temporal Update

**Classification: Pass**

### What the wiki concluded

The wiki correctly treats October 1 as the original launch target and November 1 as the current planned launch date. The earlier planning summary, the Project Atlas entity, and the central launch timeline were reconciled to preserve October 1 as historical context while presenting November 1 as current.

### Evidence

- [`wiki/claims.json`](.wiki/wiki/claims.json): the original `atlas-launch-date` claim says “Project Atlas is targeting an October 1 customer launch date” and has status `superseded`.
- The later `atlas-launch-date` claim says “Project Atlas rollout is now planned for November 1, delayed from the original October 1 target due to integration testing issues” and has status `current`.
- [`wiki/log.md`](.wiki/wiki/log.md): the second ingest records “reconciled 3 existing page(s).”
- [`wiki/entities/project-atlas.md`](.wiki/wiki/entities/project-atlas.md): “The launch was originally targeted for **October 1**, but this date has been **superseded** ... The rollout is now planned for **November 1**.”
- [`wiki/concepts/atlas-launch-timeline.md`](.wiki/wiki/concepts/atlas-launch-timeline.md): “This timeline has been **superseded**” and lists “**November 1**: revised launch date.”
- [`wiki/sources/01-atlas-planning-notes-summary.md`](.wiki/wiki/sources/01-atlas-planning-notes-summary.md): “That timeline has since been **superseded**” and states that the launch moved from October 1 to November 1.

### Comparison

The ground truth requires November 1 to be current and October 1 to be historical context. The wiki satisfies both requirements and resolves the earlier stale-page failure.

## Case 2: Draft vs. Final Decision

**Classification: Pass**

### What the wiki concluded

The wiki identifies PostgreSQL as the earlier proposal and DynamoDB as the final production datastore. Reconciliation updates the PostgreSQL page and the broader Atlas architecture material so the old choice is explicitly historical rather than current.

### Evidence

- [`wiki/claims.json`](.wiki/wiki/claims.json): the PostgreSQL `atlas-data-architecture` claim is marked `superseded`; the later DynamoDB claim for the same topic is marked `current`.
- [`wiki/sources/03-atlas-architecture-proposal-summary.md`](.wiki/wiki/sources/03-atlas-architecture-proposal-summary.md): the earlier proposal “has since been **superseded**” and the implementation will now use DynamoDB.
- [`wiki/sources/04-atlas-architecture-decision-summary.md`](.wiki/wiki/sources/04-atlas-architecture-decision-summary.md): “The teams decided to move forward with **DynamoDB** as the production datastore for Project Atlas, superseding the earlier PostgreSQL proposal.”
- [`wiki/entities/postgresql.md`](.wiki/wiki/entities/postgresql.md): “**This decision has been superseded**” and “PostgreSQL is no longer part of the current Atlas architecture.”
- [`wiki/entities/dynamodb.md`](.wiki/wiki/entities/dynamodb.md): DynamoDB is “the datastore selected for Project Atlas's production environment, replacing the earlier proposed PostgreSQL design.”

### Comparison

The ground truth requires DynamoDB to be current and PostgreSQL to be retained only as the earlier proposal or historical context. The wiki makes that distinction explicitly, so it passes.

## Case 3: Organizational Authority Conflict

**Classification: Pass**

### What the wiki concluded

The wiki preserves the two-day company-wide policy as governing. It also preserves Engineering's three-day arrangement as a temporary departmental pilot that exceeded the official limit and did not change the formal policy.

### Evidence

- [`wiki/claims.json`](.wiki/wiki/claims.json): the two-day `hybrid-work-remote-days` claim is marked `contradicted`; the later Engineering three-day claim for the same topic is `current` and explicitly says it exceeds the formal two-day limit without indication of approval.
- [`wiki/sources/05-employee-workplace-policy-summary.md`](.wiki/wiki/sources/05-employee-workplace-policy-summary.md): the policy allows remote work up to **two days per week** and says the limit cannot be unilaterally expanded by department managers.
- The same page records the Engineering arrangement as a “departmental pilot arrangement” that “does not constitute a change to the company-wide hybrid work policy.”
- [`wiki/concepts/hybrid-work-program.md`](.wiki/wiki/concepts/hybrid-work-program.md): “The two-day limit is a fixed company policy,” while the Engineering arrangement is temporary and applies only within Engineering.
- [`wiki/concepts/engineering-remote-schedule.md`](.wiki/wiki/concepts/engineering-remote-schedule.md): the three-day schedule “exceeds the two-day remote limit” and is planned for review at the end of the quarter.

### Comparison

The ground truth requires the two-day company policy to govern while allowing the three-day Engineering statement to remain as a conflicting departmental practice or compliance issue. The wiki explicitly makes that distinction and does not treat Engineering leadership as having changed the company-wide policy, so it passes.

## Case 4: Legitimate Differing Perspectives

**Classification: Pass**

### What the wiki concluded

The wiki preserves both perspectives on Acme: Sales views Acme as strategically important and a potential expansion opportunity, while Risk identifies elevated account risk and recommends controls. It treats the perspectives as different operational lenses on the same account, not as mutually exclusive facts.

### Evidence

- [`wiki/claims.json`](.wiki/wiki/claims.json): the Sales claim identifies Acme as strategically important and current; the Risk claim independently records elevated account risk and is also current.
- [`wiki/entities/acme.md`](.wiki/wiki/entities/acme.md): Acme is “a strategically important customer” with potential expansion across multiple business units, and Sales recommends prioritization and dedicated onboarding.
- [`wiki/sources/08-acme-risk-assessment-summary.md`](.wiki/wiki/sources/08-acme-risk-assessment-summary.md): Risk identifies **elevated account risk** and recommends limiting exposure, monitoring the account, and setting escalation criteria.
- [`wiki/concepts/acme-risk-assessment.md`](.wiki/wiki/concepts/acme-risk-assessment.md): the concerns “do not prevent the planned deployment” but should shape rollout size and pace, while noting the tension with Sales' expansion-focused view.

### Comparison

The ground truth says both claims are simultaneously valid: Acme is strategically important from Sales' perspective and presents elevated risk from Risk's perspective. The wiki preserves both current claims, does not mark either as superseded or contradicted, and keeps deployment possible with risk controls. The mention of “tension” describes an operational tradeoff rather than an unresolved factual contradiction, so it passes.

## Overall Round 3 Summary

**Result: 4 Pass, 0 Partial, 0 Fail.**

The successful claim-aware run resolved the two earlier propagation problems. It superseded October 1 with November 1 across the dependent launch pages and superseded PostgreSQL with DynamoDB across the architecture pages. It also preserved the authority distinction in the workplace case and retained both compatible Acme perspectives as current claims.