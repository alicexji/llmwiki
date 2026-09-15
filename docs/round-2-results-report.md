# Round 2 Results Report: Structured Temporal Metadata Evaluation

**Experiment:** Temporal Metadata Impact on Conflict Resolution in Microsoft LLM Wiki  
**Date:** September 14, 2026  
**Condition:** Round 2 (Structured Temporal Metadata Added: `published_at`, `effective_date`; Natural Prose, Ingestion Order, Prompts, & Architecture Unchanged; No Source-Type or Authority Metadata)  
**Corpus:** 10 Synthetic Enterprise Documents (`Aetheris Financial Technologies / Project Meridian`)  

---

## 1. Temporal Metadata Configuration

Structured YAML frontmatter was added to the raw source files without altering the prose bodies or the sequential ingestion order:

| Sequence | Source Document | Structured Temporal Metadata |
|---|---|---|
| 1 | `raw/01-project-meridian-charter.md` | `published_at: 2026-01-15` |
| 2 | `raw/02-architecture-rfc-draft-data-layer.md` | `published_at: 2026-02-04` |
| 3 | `raw/03-architecture-decision-record-adr-014.md` | `published_at: 2026-03-18` |
| 4 | `raw/04-engineering-all-hands-meeting-notes.md` | `published_at: 2026-04-10` |
| 5 | `raw/05-corporate-workplace-policy-hr-2026.md` | `effective_date: 2026-01-01`, `published_at: 2026-01-01` |
| 6 | `raw/06-q1-meridian-executive-status-update.md` | `published_at: 2026-03-31` |
| 7 | `raw/07-q2-meridian-executive-status-update.md` | `published_at: 2026-06-30` |
| 8 | `raw/08-enterprise-sales-account-review-helix.md` | `published_at: 2026-05-12` |
| 9 | `raw/09-enterprise-risk-and-credit-assessment-helix.md` | `published_at: 2026-05-20` |
| 10 | `raw/10-security-audit-and-api-governance.md` | `published_at: 2026-06-15` |

---

## 2. Evaluation of Conflict Cases (Round 2 vs. Round 1 Baseline)

### Case 1: Temporal Update (Release Schedule)
- **Sources:** `06-q1-meridian-executive-status-update.md` (`published_at: 2026-03-31`) $\rightarrow$ `07-q2-meridian-executive-status-update.md` (`published_at: 2026-06-30`)
- **Primary Page:** `concepts/project-meridian.md`
- **What the Wiki Ultimately Says:** The page documents the March 31, 2026 schedule targeting September 15, 2026 as superseded, and confirms the active General Availability launch date as **November 18, 2026** following the June 30, 2026 executive status update.
- **Comparison to Baseline:**
  - *Baseline (Round 1):* Correctly resolved November 18, 2026 via natural language cues.
  - *Round 2:* Temporal metadata grounded the exact chronological progression with explicit document publication dates (2026-03-31 vs. 2026-06-30), making the supersession relationship deterministic and verifiable.
- **Ground Truth Match:** **Yes (Match)**

---

### Case 2: Draft $\rightarrow$ Final (Persistence Architecture)
- **Sources:** `02-architecture-rfc-draft-data-layer.md` (`published_at: 2026-02-04`) $\rightarrow$ `03-architecture-decision-record-adr-014.md` (`published_at: 2026-03-18`)
- **Primary Page:** `concepts/data-persistence-layer.md`
- **What the Wiki Ultimately Says:** The page records the initial proposal (PostgreSQL with Citus, published 2026-02-04) and the final approved architectural decision (Amazon DynamoDB with DAX, published 2026-03-18).
- **Comparison to Baseline:**
  - *Baseline (Round 1):* Resolved DynamoDB as final based on document titles and text.
  - *Round 2:* Provides explicit chronological timeline anchoring the RFC proposal prior to the ADR decision.
- **Ground Truth Match:** **Yes (Match)**

---

### Case 3: Authority Conflict (Hybrid Attendance Schedule)
- **Sources:** `04-engineering-all-hands-meeting-notes.md` (`published_at: 2026-04-10`) $\rightarrow$ `05-corporate-workplace-policy-hr-2026.md` (`effective_date: 2026-01-01`, `published_at: 2026-01-01`)
- **Primary Page:** `concepts/workplace-and-hybrid-work-guidelines.md`
- **What the Wiki Ultimately Says:** The page records the Corporate Workplace Policy (effective Jan 1, 2026; max 2 days remote, prohibiting departmental exceptions) and the engineering all-hands meeting notes (April 10, 2026; 3 days remote). It flags an unresolved contradiction regarding whether a later departmental meeting can override an earlier corporate policy.
- **Comparison to Baseline:**
  - *Baseline (Round 1):* Flagged contradiction based purely on text.
  - *Round 2:* Temporal metadata demonstrates the limits of time-only ordering: the engineering meeting is chronologically newer (April 10 vs. Jan 1), but the earlier HR policy explicitly denies departmental managers the authority to grant variances. Without authority metadata, the system correctly refrains from blindly letting the newer date supersede the policy.
- **Ground Truth Match:** **Partial (Requires Authority Tier Metadata)**

---

### Case 4: Valid Differing Perspectives (Commercial Sales vs. Credit Risk)
- **Sources:** `08-enterprise-sales-account-review-helix.md` (`published_at: 2026-05-12`) $\rightarrow$ `09-enterprise-risk-and-credit-assessment-helix.md` (`published_at: 2026-05-20`)
- **Primary Page:** `entities/helix-logistics.md`
- **What the Wiki Ultimately Says:** The entity page preserves both the Sales perspective (published 2026-05-12: $4.2M ARR strategic anchor, recommending fee discounts) and Risk perspective (published 2026-05-20: 3.8x leverage high-risk counterparty, mandating $2.5M escrow and prohibiting fee discounts).
- **Comparison to Baseline:**
  - *Baseline (Round 1):* Preserved both perspectives side-by-side.
  - *Round 2:* Preserved both perspectives with exact publication dates. The 8-day temporal difference did not cause false supersession because both are domain-specific analyses rather than conflicting factual revisions.
- **Ground Truth Match:** **Yes (Match)**

---

## 3. Comparison Matrix: Round 1 vs. Round 2

| Conflict Case | Round 1 (Baseline Prose) | Round 2 (Temporal Metadata) | Difference / Key Takeaway |
|---|---|---|---|
| **1. Temporal Update** | Resolved Nov 18 GA | Resolved Nov 18 GA with exact dates | Clearer lineage and deterministic supersession |
| **2. Draft $\rightarrow$ Final** | Resolved DynamoDB ADR | Resolved DynamoDB ADR with RFC date | Chronological progression anchored |
| **3. Authority Conflict** | Flagged contradiction | Flagged contradiction with timeline context | Proves temporal metadata alone cannot resolve authority conflicts |
| **4. Differing Perspectives** | Both views preserved | Both views preserved with dates | Temporal difference does not corrupt valid coexisting views |

---

## 4. Output Storage

- **Active Wiki:** `.wiki/` (23 pages, 10 sources, 8 entities, 5 concepts, 100% index coverage, 0 lint errors)
- **Round 2 Snapshot:** `.wiki-round-2/`
- **Runner Script:** `experiments-round2-runner.mjs`
