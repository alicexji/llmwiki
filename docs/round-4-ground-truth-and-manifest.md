# Round 4 Corpus Manifest & Ground Truth Evaluation Framework

**Purpose:** Evaluation benchmark for Round 4 testing whether structured provenance metadata (`source_type`, `department`, `status`, `published_at`, `effective_date`) alone—without numeric authority scores or precedence rules—is sufficient for the LLM Wiki to resolve complex, ambiguous enterprise authority conflicts.

---

## 1. Corpus Manifest

The Round 4 test corpus consists of 10 standalone source documents stored in `raw-round-4/`:

| File | `source_type` | `department` | `status` | Date Fields | Topic / Domain |
|---|---|---|---|---|---|
| `01-infosec-data-retention-policy.md` | `security_policy` | Information Security | `approved` | `published_at: 2026-02-10`<br>`effective_date: 2026-02-15` | Mandates 30-day hard purge of user interaction and chat logs |
| `02-legal-regulatory-retention-guidance.md` | `legal_guidance` | Legal & Regulatory Affairs | `approved` | `published_at: 2026-03-05` | Mandates 3-year (36-month) preservation of customer communications |
| `03-corporate-travel-and-expense-policy.md` | `corporate_policy` | Finance & Corporate Operations | `official_policy` | `published_at: 2026-01-05`<br>`effective_date: 2026-01-15` | Mandates Economy class for all flights under 8 hours globally |
| `04-executive-exception-infrastructure-incident-travel.md` | `executive_exception` | Executive Committee / Chief Operating Officer | `approved_exception` | `published_at: 2026-04-12`<br>`effective_date: 2026-04-12` | Authorizes Business Class for SRE Disaster Recovery team on emergency flights >4 hrs |
| `05-data-anonymization-internal-standard.md` | `internal_standard` | Data Engineering & Analytics | `approved_internal_standard` | `published_at: 2026-01-20` | Authorizes salted SHA-256 pseudonymized telemetry replication to US-East data lake |
| `06-eu-data-protection-board-guidance-advisory.md` | `regulatory_advisory` | Compliance / External Regulatory Liaison | `regulatory_guidance` | `published_at: 2026-04-18` | Advises EDPB ruling: pseudonymization is personal data; unapproved US transfer is prohibited |
| `07-procurement-vendor-selection-policy.md` | `procurement_policy` | Global Procurement & Sourcing | `approved` | `published_at: 2026-02-15`<br>`effective_date: 2026-03-01` | Mandates 3-bid competitive RFP for software/tools over $50k annual spend |
| `08-engineering-rapid-tooling-adoption-standard.md` | `technical_standard` | Engineering Architecture Council | `approved` | `published_at: 2026-03-01`<br>`effective_date: 2026-03-01` | Authorizes direct sole-sourcing of developer tools up to $100k annual spend |
| `09-incident-severity-and-escalation-policy.md` | `operational_policy` | IT Operations & SRE | `approved` | `published_at: 2024-11-10`<br>`effective_date: 2024-12-01` | Active incident policy: P1 requires VP verbal briefing within 15 mins, 30-min email updates |
| `10-incident-management-framework-v2-draft.md` | `operational_policy` | IT Operations & SRE | `draft_revision` | `published_at: 2026-05-10` | Draft proposal: P1 automated PagerDuty within 5 mins, Slack updates every 60 mins, VP escalation deferred |

---

## 2. Ground Truth & Expected Conflict Resolution Behaviors

### Conflict Case 1: Cross-Functional Authority (Security Policy vs. Legal Guidance)
- **Sources:** `01-infosec-data-retention-policy.md` vs. `02-legal-regulatory-retention-guidance.md`
- **Tension:** InfoSec mandates 30-day hard purge to minimize breach surface; Legal mandates 36-month minimum retention for statutory warranty liability and litigation discovery holds.
- **Intended Ground Truth:** 
  - Statutory and regulatory legal hold requirements legally supersede internal security hygiene purge schedules. Customer communications and chat logs cannot be deleted after 30 days.
  - However, to honor InfoSec data minimization objectives, the preserved data should be quarantined into encrypted, restricted-access cold storage rather than remaining in operational production databases.
- **Evaluation Criteria for Provenance Metadata:**
  - Does provenance metadata (`security_policy` vs. `legal_guidance`) allow the LLM to identify that Legal preservation obligations take legal precedence over routine deletion schedules, while reconciling the operational requirement for secure storage?
  - Or does it treat them as equally approved conflicting mandates and flag a contradiction?

---

### Conflict Case 2: General Corporate Policy vs. Approved Executive Exception
- **Sources:** `03-corporate-travel-and-expense-policy.md` vs. `04-executive-exception-infrastructure-incident-travel.md`
- **Tension:** Corporate Finance policy mandates Economy for all flights <8 hours and denies departmental variance authority; Executive Exception from COO/Executive Committee permits Business Class for SRE Disaster Recovery deployments >4 hours.
- **Intended Ground Truth:**
  - The executive exception is a valid, narrow carve-out authorized by superior executive authority (COO / Executive Committee).
  - General corporate travel remains Economy-only for standard employees, while the approved exception strictly applies to the designated SRE disaster recovery strike team during active migration incidents.
- **Evaluation Criteria for Provenance Metadata:**
  - Does the LLM recognize that `status: approved_exception` from `department: Executive Committee / Chief Operating Officer` creates a valid scoped exception to `status: official_policy` from `Finance`, rather than seeing a direct contradiction?

---

### Conflict Case 3: Internal Engineering Standard vs. External Regulatory Guidance
- **Sources:** `05-data-anonymization-internal-standard.md` vs. `06-eu-data-protection-board-guidance-advisory.md`
- **Tension:** Internal engineering standard classifies salted hash as de-identified and authorizes cross-region replication to US-East; External EDPB advisory clarifies pseudonymized data is legally personal data and prohibits unapproved cross-border transfer.
- **Intended Ground Truth:**
  - External binding regulatory requirements supersede internal technical definitions. Pseudonymized European customer telemetry cannot be replicated to US-East data lakes without formal SCCs and localized transfer impact assessments. The internal engineering standard is legally preempted for EU resident data.
- **Evaluation Criteria for Provenance Metadata:**
  - Does provenance metadata (`internal_standard` vs. `regulatory_advisory`) enable the LLM to recognize that external regulatory compliance mandates override internal engineering convenience?

---

### Conflict Case 4: Two Conflicting Approved Policies from Different Departments (Jurisdictional Clash)
- **Sources:** `07-procurement-vendor-selection-policy.md` vs. `08-engineering-rapid-tooling-adoption-standard.md`
- **Tension:** Procurement policy (`status: approved`) requires 3-bid RFP for software spend >$50k; Engineering Architecture standard (`status: approved`) authorizes direct sole-sourcing of developer tools up to $100k.
- **Intended Ground Truth:**
  - This is a genuine horizontal jurisdictional conflict between two co-equal departments with overlapping mandates for purchases between $50,000 and $100,000.
  - Neither department possesses unilateral authority over the other. The correct resolution is to **explicitly flag the jurisdictional gap and identify the spend band ($50k–$100k) requiring joint CFO/CTO executive reconciliation**, while noting that tools <$50k follow fast-track engineering and tools >$100k require full RFP procurement.
- **Evaluation Criteria for Provenance Metadata:**
  - Does provenance metadata highlight the horizontal jurisdiction clash between co-equal approved standards rather than arbitrarily picking one winner?

---

### Conflict Case 5: Older Approved Policy vs. Newer Draft Replacement
- **Sources:** `09-incident-severity-and-escalation-policy.md` vs. `10-incident-management-framework-v2-draft.md`
- **Tension:** 2024 policy is approved (15-min VP briefing, 30-min email updates); 2026 proposed framework is newer in time (May 2026) but is a draft revision (5-min PagerDuty, 60-min Slack, deferred VP escalation).
- **Intended Ground Truth:**
  - The older 2024 policy (`status: approved`) remains the active, enforceable operational standard.
  - The 2026 framework (`status: draft_revision`) is an unapproved working proposal under review and cannot be executed as the active escalation protocol despite its newer publication date.
- **Evaluation Criteria for Provenance Metadata:**
  - Does the LLM correctly use `status: approved` vs. `status: draft_revision` to prevent the newer timestamp from prematurely superseding the active operational policy?
