# Round 1 Results Report: Conflict Reconciliation Baseline

**Experiment:** Baseline Conflict Resolution in Microsoft LLM Wiki  
**Date:** September 14, 2026  
**Condition:** Round 1 Baseline (Natural Language Prose Only — No Structured Metadata, No Authority Scores, Default Prompts)  
**Corpus:** 10 Synthetic Enterprise Documents (`Aetheris Financial Technologies / Project Meridian`)  

---

## 1. Ingestion Execution & Order

The 10 synthetic raw sources were ingested in the following sequential order through the smart-ingest pipeline:

| Sequence | Source Document | Document Character |
|---|---|---|
| 1 | `raw/01-project-meridian-charter.md` | Program charter & stakeholder roles |
| 2 | `raw/02-architecture-rfc-draft-data-layer.md` | Architecture RFC (Draft proposal: PostgreSQL/Citus) |
| 3 | `raw/03-architecture-decision-record-adr-014.md` | Approved decision record (ADR-014: DynamoDB with DAX) |
| 4 | `raw/04-engineering-all-hands-meeting-notes.md` | Engineering all-hands sync notes (3 days remote allowance) |
| 5 | `raw/05-corporate-workplace-policy-hr-2026.md` | Official Corporate HR Policy (Max 2 days remote) |
| 6 | `raw/06-q1-meridian-executive-status-update.md` | Q1 Status update (Initial GA: September 15, 2026) |
| 7 | `raw/07-q2-meridian-executive-status-update.md` | Q2 Status update (Revised GA: November 18, 2026) |
| 8 | `raw/08-enterprise-sales-account-review-helix.md` | Enterprise Sales review (Helix: Tier-1 strategic, fee discounts) |
| 9 | `raw/09-enterprise-risk-and-credit-assessment-helix.md` | Credit Risk assessment (Helix: High risk, mandatory escrow, no discounts) |
| 10 | `raw/10-security-audit-and-api-governance.md` | InfoSec standards (mTLS, DPoP, Tier-1 rate limits) |

---

## 2. Wiki Synthesis & Conflict Reconciliation Analysis

### Scenario A: Temporal Update (Release Schedule)
- **Sources Involved:** `06-q1-meridian-executive-status-update.md` (Source 6) $\rightarrow$ `07-q2-meridian-executive-status-update.md` (Source 7)
- **Primary Page Inspected:** `concepts/project-meridian.md`
- **What the Wiki Says:** The page documents the initial Q1 release schedule targeting September 15, 2026, and synthesizes the subsequent Q2 schedule realignment moving General Availability (GA) to **November 18, 2026** due to third-party SOC2 compliance and security penetration testing audits.
- **Conflict Behavior:** **Preserved Historical Progression with Active Resolution.** The wiki identified November 18, 2026 as the active target while maintaining the lineage of the earlier schedule.
- **Matches Ground Truth:** **Yes.**

---

### Scenario B: Draft $\rightarrow$ Final (Persistence Architecture)
- **Sources Involved:** `02-architecture-rfc-draft-data-layer.md` (Source 2) $\rightarrow$ `03-architecture-decision-record-adr-014.md` (Source 3)
- **Primary Page Inspected:** `concepts/data-persistence-layer.md`
- **What the Wiki Says:** The page records the initial draft proposal (distributed PostgreSQL with Citus evaluated in February) and documents the final approved decision (Amazon DynamoDB with DAX via ADR-014 in March) following benchmark testing where PostgreSQL failed latency requirements under 80,000 TPS peak load.
- **Conflict Behavior:** **Resolved Decision with Draft Preserved as Context.** DynamoDB is recognized as the adopted standard; the Citus proposal is preserved as evaluated prior work.
- **Matches Ground Truth:** **Yes.**

---

### Scenario C: Authority Conflict (Hybrid Attendance Schedule)
- **Sources Involved:** `04-engineering-all-hands-meeting-notes.md` (Source 4) $\rightarrow$ `05-corporate-workplace-policy-hr-2026.md` (Source 5)
- **Primary Page Inspected:** `concepts/workplace-and-hybrid-work-guidelines.md`
- **What the Wiki Says:** The page presents both the official Corporate HR Policy (minimum 3 days on-site / max 2 days remote, prohibiting departmental exemptions) and the engineering sync announcement by VP Marcus Vance (permitting 3 days remote for Meridian engineers). It appends an explicit note highlighting the conflicting attendance requirements.
- **Conflict Behavior:** **Preserved Both Claims and Flagged Contradiction.** Because neither document possessed explicit authority tier metadata, the LLM did not discard the VP's verbal statements, but juxtaposed them against the HR policy and flagged the tension.
- **Matches Ground Truth:** **Partial / Baseline Limitation.** In an enterprise hierarchy, the corporate HR policy legally overrides departmental meeting statements. In this baseline (natural language only, no authority weighting), flagging the contradiction for human review was the safest outcome.

---

### Scenario D: Valid Differing Perspectives (Commercial vs. Risk Evaluation)
- **Sources Involved:** `08-enterprise-sales-account-review-helix.md` (Source 8) $\rightarrow$ `09-enterprise-risk-and-credit-assessment-helix.md` (Source 9)
- **Primary Page Inspected:** `entities/helix-logistics.md`
- **What the Wiki Says:** The entity page maintains dedicated sections for both departments:
  - *Enterprise Sales Perspective:* Tier-1 strategic growth partner ($4.2M ARR, 18M transactions/mo), advocating fee discounts and waived onboarding fees.
  - *Risk Management Perspective:* High-risk counterparty (3.8x debt leverage, margin compression, customs audit), mandating a $2.5M collateral escrow and strictly prohibiting fee concessions.
- **Conflict Behavior:** **Preserved Both Perspectives Side-by-Side.** Neither perspective overwrote or invalidated the other.
- **Matches Ground Truth:** **Yes.** Enterprise entities legitimately have multi-faceted, domain-specific assessments that must coexist.

---

## 3. Summary of Baseline Findings

| Conflict Type | Test Case | Baseline Behavior Observed | Matches Ground Truth? |
|---|---|---|---|
| **Temporal Update** | Q1 GA ($9/15$) vs Q2 GA ($11/18$) | Active date resolved to Nov 18; Q1 target kept in history | **Yes** |
| **Draft $\rightarrow$ Final** | RFC Citus vs ADR DynamoDB | Final decision adopted; RFC retained as exploratory draft | **Yes** |
| **Authority Conflict** | VP meeting notes ($3$d) vs HR policy ($2$d) | Both claims retained side-by-side; contradiction flagged | **Partial** (Human triage required) |
| **Differing Perspectives** | Sales (growth) vs Risk (guardrails) | Both departmental views retained in separate sections | **Yes** |
