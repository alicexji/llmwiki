# Round 3 Results Report: Source & Provenance Metadata Evaluation

**Experiment:** Source Type & Provenance Metadata Impact on Conflict Resolution in Microsoft LLM Wiki  
**Date:** September 14, 2026  
**Condition:** Round 3 (Structured Temporal + Provenance Metadata Added: `published_at`, `effective_date`, `source_type`, `department`, `status`; No Numeric Authority Scores or Hardcoded Rules; Document Prose, Ingestion Order, Prompts, & Architecture Unchanged)  
**Corpus:** 10 Synthetic Enterprise Documents (`Aetheris Financial Technologies / Project Meridian`)  

---

## 1. Provenance & Temporal Metadata Schema

Structured YAML frontmatter was added to all 10 raw source files, capturing organizational provenance without numerical authority rankings:

| Sequence | Source Document | `source_type` | `department` | `status` | Date Fields |
|---|---|---|---|---|---|
| 1 | `01-project-meridian-charter.md` | `program_charter` | Engineering / Product Management | `approved` | `published_at: 2026-01-15` |
| 2 | `02-architecture-rfc-draft-data-layer.md` | `rfc` | Architecture | `draft` | `published_at: 2026-02-04` |
| 3 | `03-architecture-decision-record-adr-014.md` | `architecture_decision_record` | Architecture | `approved` | `published_at: 2026-03-18` |
| 4 | `04-engineering-all-hands-meeting-notes.md` | `meeting_notes` | Engineering | `informal_notes` | `published_at: 2026-04-10` |
| 5 | `05-corporate-workplace-policy-hr-2026.md` | `corporate_policy` | Human Resources / Executive Committee | `official_policy` | `effective_date: 2026-01-01`<br>`published_at: 2026-01-01` |
| 6 | `06-q1-meridian-executive-status-update.md` | `status_report` | Product Management | `published` | `published_at: 2026-03-31` |
| 7 | `07-q2-meridian-executive-status-update.md` | `status_report` | Product Management | `published` | `published_at: 2026-06-30` |
| 8 | `08-enterprise-sales-account-review-helix.md` | `strategic_account_review` | Enterprise Sales | `proposal` | `published_at: 2026-05-12` |
| 9 | `09-enterprise-risk-and-credit-assessment-helix.md` | `risk_assessment` | Risk Management | `approved_underwriting_policy` | `published_at: 2026-05-20` |
| 10 | `10-security-audit-and-api-governance.md` | `security_standard` | Information Security | `mandatory_standard` | `published_at: 2026-06-15` |

---

## 2. Evaluation of Conflict Cases (Round 3 vs. Rounds 1 & 2)

### Case 1: Temporal Update (Release Schedule)
- **Sources:** `06-q1-meridian-executive-status-update.md` $\rightarrow$ `07-q2-meridian-executive-status-update.md`
- **Primary Page:** `concepts/project-meridian.md`
- **What the Wiki Ultimately Says:** Confirms the active General Availability target as **November 18, 2026**, explicitly identifying the March 31, 2026 status report (Sept 15 target) as superseded by the June 30, 2026 status report.
- **Role of Provenance Metadata:** Both documents share identical source types (`source_type: status_report`), department (`department: Product Management`), and status (`status: published`). Because their institutional standing is identical, the temporal ordering (`published_at: 2026-06-30` vs. `2026-03-31`) acts as a deterministic clean supersession.
- **Ground Truth Match:** **Yes (Complete Match)**

---

### Case 2: Draft $\rightarrow$ Final (Persistence Architecture)
- **Sources:** `02-architecture-rfc-draft-data-layer.md` $\rightarrow$ `03-architecture-decision-record-adr-014.md`
- **Primary Page:** `concepts/data-persistence-layer.md`
- **What the Wiki Ultimately Says:** Synthesizes the architecture decision lineage within the Architecture Department: the exploratory RFC (`source_type: rfc`, `status: draft`, 2026-02-04) proposed PostgreSQL/Citus, while the final approved standard (`source_type: architecture_decision_record`, `status: approved`, 2026-03-18) adopted **Amazon DynamoDB with DAX**.
- **Role of Provenance Metadata:** The status progression (`draft` $\rightarrow$ `approved`) within the same functional owner (`department: Architecture`) allows the wiki to structure the concept page into an explicit decision lifecycle without treating the two documents as conflicting equals.
- **Ground Truth Match:** **Yes (Complete Match)**

---

### Case 3: Authority Conflict (Hybrid Attendance Schedule) — *Key Focus*
- **Sources:** `04-engineering-all-hands-meeting-notes.md` $\rightarrow$ `05-corporate-workplace-policy-hr-2026.md`
- **Primary Page:** `concepts/workplace-and-hybrid-work-guidelines.md`
- **What the Wiki Ultimately Says:**
  1. **Official Corporate Policy (Binding):** Governs all employees globally with `source_type: corporate_policy`, `department: Human Resources / Executive Committee`, and `status: official_policy`. Enforces minimum 3 days on-site (**max 2 days remote**) and explicitly denies departmental managers the authority to grant variances.
  2. **Departmental Remark (Non-Binding):** Categorizes VP Marcus Vance's statement (3 days remote) as `source_type: meeting_notes`, `department: Engineering`, and `status: informal_notes`.
  3. **Authority Resolution:** Rather than simply flagging an unresolved contradiction, the wiki resolves that the **official Corporate Policy is the legally enforceable standard (max 2 days remote)**, clarifying that the 3-day mention in the engineering sync was an informal departmental preference lacking policy authorization.
- **Comparison across Rounds:**
  - *Round 1 (Prose Only):* Flagged contradiction side-by-side; unable to determine which statement took precedence.
  - *Round 2 (Temporal Metadata Only):* Flagged contradiction with date context (April 10 meeting was newer than Jan 1 policy, but the policy barred manager exemptions).
  - *Round 3 (Provenance Metadata Added):* **Successfully Resolved.** Provenance metadata (`corporate_policy` from `Executive Committee` with `status: official_policy` vs. `meeting_notes` from `Engineering` with `status: informal_notes`) gave the LLM the institutional context needed to recognize policy hierarchy over informal meeting remarks without requiring hardcoded numeric scores.
- **Ground Truth Match:** **Yes (Complete Match)**

---

### Case 4: Valid Differing Perspectives (Commercial Sales vs. Credit Risk)
- **Sources:** `08-enterprise-sales-account-review-helix.md` $\rightarrow$ `09-enterprise-risk-and-credit-assessment-helix.md`
- **Primary Page:** `entities/helix-logistics.md`
- **What the Wiki Ultimately Says:** The entity page synthesizes both perspectives into distinct, complementary governance categories:
  - *Commercial Assessment (Growth Proposal):* `source_type: strategic_account_review`, `department: Enterprise Sales`, `status: proposal` ($4.2M ARR, 18M transactions/mo, proposing 15% discount).
  - *Underwriting Assessment (Mandatory Policy):* `source_type: risk_assessment`, `department: Risk Management`, `status: approved_underwriting_policy` (3.8x leverage, mandating $2.5M reserve escrow, prohibiting fee concessions).
  - *Synthesis:* Explains that the sales document represents a business opportunity proposal, while the risk document defines mandatory counterparty guardrails governing contract execution.
- **Role of Provenance Metadata:** Metadata cleanly separates commercial proposals from binding risk policies, preventing either department from overwriting the other's domain while clarifying their relationship.
- **Ground Truth Match:** **Yes (Complete Match)**

---

## 3. Comprehensive Comparison Across All 3 Rounds

| Conflict Case | Round 1 (Baseline Prose) | Round 2 (+ Temporal Metadata) | Round 3 (+ Provenance Metadata) |
|---|---|---|---|
| **1. Temporal Update**<br>*(Q1 GA vs Q2 GA)* | Resolved Nov 18 GA from prose context | Resolved Nov 18 GA with exact timeline dates | Resolved Nov 18 GA with verified document status & dates |
| **2. Draft $\rightarrow$ Final**<br>*(RFC Citus vs ADR DynamoDB)* | Resolved DynamoDB as final decision | Resolved DynamoDB with chronological dates | Resolved DynamoDB with explicit `draft` $\rightarrow$ `approved` lifecycle |
| **3. Authority Conflict**<br>*(HR Policy vs VP Meeting)* | Flagged contradiction side-by-side | Flagged contradiction with timeline dates | **Resolved:** Corporate policy (`official_policy`) recognized as binding over informal meeting notes (`informal_notes`) |
| **4. Differing Perspectives**<br>*(Sales vs Risk on Helix)* | Preserved both perspectives | Preserved both perspectives with dates | Preserved both perspectives, framing `proposal` vs `approved_underwriting_policy` |

---

## 4. Key Takeaways & Enterprise Architecture Insights

1. **Temporal metadata alone is insufficient for organizational hierarchy:** In Round 2, the newer document (April meeting) contradicted the older document (January policy), preventing temporal ordering from resolving authority.
2. **Provenance metadata resolves hierarchy naturally:** Without artificial scoring systems, providing standard enterprise metadata fields (`source_type`, `department`, `status`) allows LLM reasoning to identify binding policies vs. informal discussions.
3. **Preservation of valid disagreement:** Provenance metadata allows divergent departmental views (Sales proposals vs. Risk policies) to coexist constructively by contextualizing their institutional roles.

---

## 5. Artifact Storage

- **Active Wiki:** `.wiki/` (23 pages, 10 sources, 8 entities, 5 concepts, 100% index coverage, 0 lint errors)
- **Round 3 Snapshot:** `.wiki-round-3/`
- **Runner Script:** `experiments-round3-runner.mjs`
