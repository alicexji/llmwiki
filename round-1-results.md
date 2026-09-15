# Round 1 Testing Results

## Case 1: Temporal Update

**Result: Fail**

The wiki contains the correct update in the delivery-related pages:

- [02-atlas-delivery-update-summary.md](.wiki/wiki/sources/02-atlas-delivery-update-summary.md#L11) says the launch was pushed to **November 1**, "superseding the previously planned launch date."
- [integration-testing-delay.md](.wiki/wiki/concepts/integration-testing-delay.md#L15) also states that the delay pushed the launch to **November 1**.

However, earlier generated pages still present October 1 as the current target:

- [atlas-launch-timeline.md](.wiki/wiki/concepts/atlas-launch-timeline.md#L13) says the timeline "targets an **October 1** customer rollout."
- [project-atlas.md](.wiki/wiki/entities/project-atlas.md#L13) describes Project Atlas as targeted for **October 1**.

Because the wiki simultaneously contains an explicit November 1 update and stale pages that describe October 1 as the current target, it does not maintain one resolved current launch date.

## Case 2: Draft vs. Final Decision

**Result: Fail**

The final decision is correctly captured in:

- [04-atlas-architecture-decision-summary.md](.wiki/wiki/sources/04-atlas-architecture-decision-summary.md#L11), which says **DynamoDB will be the production datastore** and that the decision is finalized.
- [dynamodb-datastore-decision.md](.wiki/wiki/concepts/dynamodb-datastore-decision.md#L15), which says DynamoDB replaces the previously proposed relational design.

But the earlier proposal remains represented as a current production choice:

- [postgresql.md](.wiki/wiki/entities/postgresql.md#L13) says PostgreSQL "is the relational database selected as the primary production database for Project Atlas."
- [atlas-data-architecture.md](.wiki/wiki/concepts/atlas-data-architecture.md#L13) presents PostgreSQL as part of the Atlas architecture, though it does identify that page as a proposal.

The wiki therefore represents DynamoDB and PostgreSQL inconsistently, with PostgreSQL still described as selected rather than clearly historical. This meets the failure criterion for treating both architectures as current choices.

## Case 3: Organizational Authority Conflict

**Result: Pass**

The wiki represents the company-wide two-day rule as governing:

- [hybrid-work-program.md](.wiki/wiki/concepts/hybrid-work-program.md#L14) says the company program permits remote work for up to **two days per week**.
- The same page states that the two-day limit "cannot be expanded by individual department managers" and that policy changes require formal approval ([hybrid-work-program.md](.wiki/wiki/concepts/hybrid-work-program.md#L19-L20)).

It also preserves the Engineering arrangement separately:

- [three-day-remote-schedule.md](.wiki/wiki/concepts/three-day-remote-schedule.md#L13) records an engineering leadership arrangement allowing **three days per week** for the upcoming quarter.

The generated wiki does not explicitly label the Engineering arrangement unauthorized, but it keeps it scoped to Engineering while the company-wide page establishes the governing two-day policy. That satisfies the expected behavior: the governing policy is represented correctly, and the departmental practice is retained as context.

## Case 4: Legitimate Differing Perspectives

**Result: Pass**

The wiki preserves both perspectives without treating them as mutually exclusive:

- [acme-launch-prioritization.md](.wiki/wiki/concepts/acme-launch-prioritization.md#L16) describes Acme as one of the most strategically important customers for the initial rollout.
- [acme-risk-assessment.md](.wiki/wiki/concepts/acme-risk-assessment.md#L16) records elevated account risk.
- [acme.md](.wiki/wiki/entities/acme.md#L15) preserves the elevated-risk assessment, while also noting that the concerns "do not block the Atlas rollout" and should influence its size and pace ([acme.md](.wiki/wiki/entities/acme.md#L17)).

The wiki does not discard either perspective, claim that one supersedes the other, or describe strategic importance and risk as a factual contradiction. It preserves both claims in their respective Sales and Risk pages. It does not fully synthesize them into one unified statement, but synthesis was desirable rather than required for a Pass.

## Overall Round 1 Summary

Round 1 produced:

- **Case 1: Fail** — November 1 was generated correctly, but stale October 1 pages remained current-looking.
- **Case 2: Fail** — DynamoDB was correctly finalized, but PostgreSQL remained described as selected.
- **Case 3: Pass** — The company-wide two-day rule remained governing while the Engineering three-day arrangement was preserved.
- **Case 4: Pass** — Sales opportunity and elevated risk were both retained as compatible perspectives.

**Overall: 2 Pass, 2 Fail.** The main weakness was failure to propagate temporal and decision updates into previously generated canonical pages.
