# Round 4 Results Report: Provenance-Driven Authority Reasoning Evaluation

**Experiment:** Evaluating Provenance Metadata Sufficiency for Resolving Complex Enterprise Authority Conflicts  
**Date:** September 14, 2026  
**Condition:** Round 4 (Structured Provenance + Temporal Metadata: `source_type`, `department/owner`, `status`, `published_at`, `effective_date`; No Numeric Authority Scores, Precedence Rankings, or Hardcoded Rules; Ground Truth Kept External)  
**Corpus:** 10 Synthetic Enterprise Documents (`raw-round-4/`) across 5 Complex Organizational Conflict Scenarios  

---

## 1. Experimental Setup & Corpus Summary

The Round 4 experiment tests whether structured qualitative provenance metadata alone is sufficient for the LLM Wiki to reason across multi-departmental hierarchies, legal/regulatory preemption, scoped exceptions, horizontal jurisdictional deadlocks, and draft lifecycles.

| File | `source_type` | `department` | `status` | Date Fields |
|---|---|---|---|---|
| `01-infosec-data-retention-policy.md` | `security_policy` | Information Security | `approved` | `published_at: 2026-02-10`, `effective_date: 2026-02-15` |
| `02-legal-regulatory-retention-guidance.md` | `legal_guidance` | Legal & Regulatory Affairs | `approved` | `published_at: 2026-03-05` |
| `03-corporate-travel-and-expense-policy.md` | `corporate_policy` | Finance & Corporate Operations | `official_policy` | `published_at: 2026-01-05`, `effective_date: 2026-01-15` |
| `04-executive-exception-infrastructure-incident-travel.md` | `executive_exception` | Executive Committee / Chief Operating Officer | `approved_exception` | `published_at: 2026-04-12`, `effective_date: 2026-04-12` |
| `05-data-anonymization-internal-standard.md` | `internal_standard` | Data Engineering & Analytics | `approved_internal_standard` | `published_at: 2026-01-20` |
| `06-eu-data-protection-board-guidance-advisory.md` | `regulatory_advisory` | Compliance / External Regulatory Liaison | `regulatory_guidance` | `published_at: 2026-04-18` |
| `07-procurement-vendor-selection-policy.md` | `procurement_policy` | Global Procurement & Sourcing | `approved` | `published_at: 2026-02-15`, `effective_date: 2026-03-01` |
| `08-engineering-rapid-tooling-adoption-standard.md` | `technical_standard` | Engineering Architecture Council | `approved` | `published_at: 2026-03-01`, `effective_date: 2026-03-01` |
| `09-incident-severity-and-escalation-policy.md` | `operational_policy` | IT Operations & SRE | `approved` | `published_at: 2024-11-10`, `effective_date: 2024-12-01` |
| `10-incident-management-framework-v2-draft.md` | `operational_policy` | IT Operations & SRE | `draft_revision` | `published_at: 2026-05-10` |

---

## 2. Detailed Conflict Case Evaluation Against Ground Truth

### Case 1: Cross-Functional Authority (Security Policy vs. Legal Guidance)
- **Sources:** `01-infosec-data-retention-policy.md` (30-day purge) vs. `02-legal-regulatory-retention-guidance.md` (36-month preservation)
- **Primary Page Inspected:** `concepts/data-retention-and-log-governance.md`
- **What the Wiki Says:**
  - Identifies that statutory legal preservation and litigation hold obligations (`legal_guidance` from Legal & Regulatory Affairs) legally supersede internal data minimization rules (`security_policy` from InfoSec).
  - Reconciles both requirements architecturally: operational databases purge active customer logs after 30 days (satisfying InfoSec attack-surface reduction), while records are streamed into an encrypted, access-restricted, append-only WORM archival store retained for 36 months (satisfying Legal discovery rules).
- **Ground Truth Evaluation:** **Complete Match.** Provenance metadata allowed the LLM to recognize external statutory primacy without discarding the technical security principle.

---

### Case 2: General Corporate Policy vs. Approved Executive Exception
- **Sources:** `03-corporate-travel-and-expense-policy.md` (Economy <8 hrs) vs. `04-executive-exception-infrastructure-incident-travel.md` (SRE Disaster Recovery Business Class >4 hrs)
- **Primary Page Inspected:** `concepts/corporate-travel-and-expense-standards.md`
- **What the Wiki Says:**
  - Affirms the general Finance travel policy (`official_policy`) as the global baseline for all standard employees.
  - Recognizes the COO/Executive Committee authorization (`approved_exception`) as a legally valid, narrow operational carve-out specifically governing SRE disaster recovery deployments during the 2026 data center migration.
- **Ground Truth Evaluation:** **Complete Match.** The wiki did not treat the exception as a contradiction or an invalidation of corporate policy, but correctly synthesized it as a hierarchically authorized scoped exception.

---

### Case 3: Internal Engineering Standard vs. External Regulatory Guidance
- **Sources:** `05-data-anonymization-internal-standard.md` (Salted SHA-256 replication to US) vs. `06-eu-data-protection-board-guidance-advisory.md` (EDPB ruling barring unapproved US transfer)
- **Primary Page Inspected:** `concepts/telemetry-privacy-and-cross-border-data-transfers.md`
- **What the Wiki Says:**
  - Determines that binding European Data Protection Board rulings (`regulatory_guidance` / External Liaison) legally preempt internal engineering data classifications (`approved_internal_standard` / Data Engineering).
  - Concludes that salted hashing constitutes pseudonymization under GDPR and mandates that autonomous replication of EU telemetry to US-East S3 buckets must be suspended pending localized processing mechanisms.
- **Ground Truth Evaluation:** **Complete Match.** Provenance metadata enabled the LLM to recognize that external regulatory compliance preempts internal technical conventions.

---

### Case 4: Conflicting Approved Policies from Co-Equal Departments (Horizontal Deadlock)
- **Sources:** `07-procurement-vendor-selection-policy.md` (3-bid RFP >$50k) vs. `08-engineering-rapid-tooling-adoption-standard.md` (Direct sole-source up to $100k)
- **Primary Page Inspected:** `concepts/software-sourcing-and-procurement-governance.md`
- **What the Wiki Says:**
  - Observes that both policies carry `status: approved` with the identical effective date (`2026-03-01`), originating from co-equal departments (**Global Procurement & Sourcing** vs. **Engineering Architecture Council**).
  - Breaks down the purchase bands:
    - Tooling <$50k: Fast-track engineering approved.
    - Software >$100k: Full Procurement RFP required.
    - Software/tooling between **$50,000 and $100,000**: Deadlock zone where Engineering authorizes sole-sourcing and Procurement prohibits it.
  - Concludes that neither department has unilateral jurisdiction over the other, classifying the $50k–$100k band as an **unresolved horizontal authority conflict requiring joint CFO / CTO executive reconciliation**.
- **Ground Truth Evaluation:** **Complete Match.** Rather than hallucinating a winner or picking one policy arbitrarily, the LLM correctly identified the exact jurisdictional overlap and flagged it for executive arbitration.

---

### Case 5: Older Approved Policy vs. Newer Draft Replacement
- **Sources:** `09-incident-severity-and-escalation-policy.md` (2024 Approved) vs. `10-incident-management-framework-v2-draft.md` (May 2026 Draft Revision)
- **Primary Page Inspected:** `concepts/production-incident-management-and-escalation-protocols.md`
- **What the Wiki Says:**
  - Establishes that the 2024 policy (`status: approved`, effective 2024-12-01) remains the **active, binding operating standard** (15-min VP briefing, 30-min email briefings).
  - Classifies the 2026 modernization proposal (`status: draft_revision`, published 2026-05-10) as an unratified proposal under discussion.
  - Directs teams to adhere to the approved 2024 standard until the draft receives formal Operations Review Board approval.
- **Ground Truth Evaluation:** **Complete Match.** Provenance status prevented the newer publication timestamp from prematurely overriding the approved operational standard.

---

## 3. Summary Assessment of Provenance Metadata

| Conflict Scenario | Ground Truth Target | Wiki Resolution with Provenance Metadata | Result |
|---|---|---|---|
| **1. Security vs. Legal** | Legal hold overrides purge; dual-tier storage | Recognized Legal primacy; operational purge + cold archive | **Pass** |
| **2. Policy vs. Exception** | Scoped carve-out for SRE by COO | General policy intact; narrow SRE exception authorized | **Pass** |
| **3. Internal vs. External** | External regulation preempts internal standard | GDPR/EDPB advisory preempts Data Engineering standard | **Pass** |
| **4. Co-Equal Department Clash** | Horizontal deadlock on $50k–$100k spend | Explicitly flags $50k–$100k gap for CFO/CTO sign-off | **Pass** |
| **5. Approved vs. Draft** | Approved policy remains active; draft is proposal | 2024 approved policy enforced; 2026 draft held in review | **Pass** |

---

## 4. Key Takeaways for Enterprise LLM Wiki Design

1. **Provenance Metadata is Sufficient for Hierarchy Reasoning:** Standard qualitative metadata fields (`source_type`, `department/owner`, `status`, `effective_date`) provide sufficient semantic context for the LLM to navigate vertical authority, external preemption, exceptions, and lifecycle states without needing artificial numerical weights.
2. **Horizontal Clashes are Correctly Flagged:** When co-equal entities issue conflicting approved policies without a hierarchy clue, the LLM accurately isolates the conflicting boundary ($50k–$100k) and requests executive governance rather than making an arbitrary choice.
3. **Draft Safety:** The presence of `status: draft_revision` prevents newer timestamps from breaking older active policies during ongoing review cycles.

---

## 5. Artifact Storage

- **Active Wiki:** `.wiki/` (16 pages, 10 sources, 1 entity, 5 concepts, 100% index coverage, 0 lint errors)
- **Round 4 Snapshot:** `.wiki-round-4/`
- **Runner Script:** `experiments-round4-runner.mjs`
- **Ground Truth Specification:** `docs/round-4-ground-truth-and-manifest.md`
