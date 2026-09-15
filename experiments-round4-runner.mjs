import { join, resolve } from 'node:path';
import { readFile, writeFile, cp, rm } from 'node:fs/promises';
import {
  initWiki,
  ingestSource,
  readIndex,
  writeIndex,
  readPage,
  writePage,
  createEntityPage,
  createConceptPage,
  addCrosslinks,
  appendEntry,
  lintWiki,
} from './packages/core/dist/index.js';

const WIKI_ROOT = resolve('.wiki');
const WIKI_DIR = join(WIKI_ROOT, 'wiki');
const RAW_DIR = resolve('raw-round-4');
const LOG_PATH = join(WIKI_DIR, 'log.md');
const INDEX_PATH = join(WIKI_DIR, 'index.md');

async function runRound4() {
  console.log('=== Step 0: Initializing clean wiki state for Round 4 ===');
  await rm('.wiki', { recursive: true, force: true });
  await initWiki('.');

  const now = new Date().toISOString();

  // ── Source 1: InfoSec Data Retention Policy ─────────────────────────────
  console.log('Ingesting Source 1: 01-infosec-data-retention-policy.md (security_policy, approved, 2026-02-10)');
  const res1 = await ingestSource(join(RAW_DIR, '01-infosec-data-retention-policy.md'), WIKI_ROOT, false, true);
  const sum1 = res1.pages_created[0] || 'sources/01-infosec-data-retention-policy-summary.md';
  await writePage(join(WIKI_DIR, sum1), {
    frontmatter: {
      type: 'summary',
      title: 'Information Security Standard: User Interaction Data & Log Retention Summary',
      tags: ['security', 'infosec', 'data-retention', 'privacy', 'logs'],
      created: now,
      sources: ['raw-round-4/01-infosec-data-retention-policy.md'],
    },
    body: `Information security policy (Source Type: Security Policy; Department: Information Security; Status: Approved; Published: February 10, 2026; Effective: February 15, 2026) issued under the authority of the CISO. Mandates strict data minimization and a maximum 30-day lifecycle retention window for all user interaction logs, customer support chats, AI model inference transcripts, web session telemetry, and API debug traces containing user identifiers. Requires automated TTL purge mechanisms across all production data stores.`
  });

  await createConceptPage(WIKI_DIR, 'Data Retention and Log Governance', `Enterprise standards and policies governing the lifecycle, retention, and purging of user interaction data, operational logs, and customer communications.

## Information Security Log Retention Policy
- **Classification:** Source Type: Security Policy | Department: Information Security | Status: Approved (Published: 2026-02-10, Effective: 2026-02-15)
- **Mandate:** Enforces a strict **thirty (30) day maximum retention window** for all operational logs, user telemetry, customer support chat transcripts, and AI inference data.
- **Objective:** Mitigate data breach liability, reduce credential leak attack surface, and enforce automated TTL deletion across all primary databases and backups.`, ['security', 'governance', 'data-retention']);

  await appendEntry(LOG_PATH, {
    verb: 'enriched',
    subject: sum1,
    details: 'Ingested InfoSec data retention standard; established Data Retention concept with 30-day purge rule.',
  });

  // ── Source 2: Legal Retention Guidance ───────────────────────────────────
  console.log('Ingesting Source 2: 02-legal-regulatory-retention-guidance.md (legal_guidance, approved, 2026-03-05)');
  const res2 = await ingestSource(join(RAW_DIR, '02-legal-regulatory-retention-guidance.md'), WIKI_ROOT, false, true);
  const sum2 = res2.pages_created[0] || 'sources/02-legal-regulatory-retention-guidance-summary.md';
  await writePage(join(WIKI_DIR, sum2), {
    frontmatter: {
      type: 'summary',
      title: 'Legal Advisory: Customer Communication Records Retention Summary',
      tags: ['legal', 'compliance', 'record-retention', 'litigation-hold', 'warranty'],
      created: now,
      sources: ['raw-round-4/02-legal-regulatory-retention-guidance.md'],
    },
    body: `Legal directive (Source Type: Legal Guidance; Department: Legal & Regulatory Affairs; Status: Approved; Published: March 5, 2026) issued by the General Counsel. Establishes mandatory statutory preservation obligations under commercial trade and consumer warranty regulations. Requires all customer interactions, support tickets, electronic chat records, and incident reports to be preserved in tamper-evident formats for a minimum of three (3) years (36 months). Deletion without legal concurrence is prohibited.`
  });

  await writePage(join(WIKI_DIR, 'concepts/data-retention-and-log-governance.md'), {
    frontmatter: {
      type: 'concept',
      title: 'Data Retention and Log Governance',
      tags: ['security', 'legal', 'governance', 'data-retention'],
      created: now,
      updated: now,
    },
    body: `Enterprise standards and policies governing the lifecycle, retention, and purging of user interaction data, operational logs, and customer communications.

## Departmental Mandates & Regulatory Requirements

### 1. Information Security Policy (Technical Attack Surface Minimization)
- **Classification:** Source Type: Security Policy | Department: Information Security | Status: Approved (Effective: 2026-02-15)
- **Requirement:** Hard deletion / TTL purging of user interaction logs, support chats, and API telemetry after **thirty (30) days** to minimize data exposure risk.

### 2. Legal Advisory & Statutory Preservation Directive (Legal & Commercial Protection)
- **Classification:** Source Type: Legal Guidance | Department: Legal & Regulatory Affairs | Status: Approved (Published: 2026-03-05)
- **Requirement:** Mandatory preservation of customer interaction records and dispute communications for a minimum of **three (3) years (36 months)** to satisfy statutory warranty laws and litigation hold discovery rules.

## Authority & Cross-Functional Reconciliation
- **Precedence Analysis:** External statutory preservation obligations and legal discovery requirements issued by the **Legal & Regulatory Affairs Department** take precedence over internal technical data minimization timelines. Routine automated purging of customer communications after 30 days violates statutory legal requirements.
- **Architectural Synthesis:** To comply with both mandates simultaneously:
  1. Primary operational databases, caches, and application debug indices should purge active customer logs after 30 days to satisfy InfoSec attack-surface reduction.
  2. The data pipeline must stream customer communication records into an encrypted, access-restricted, append-only WORM archival store retained for 36 months to satisfy Legal compliance.`
  });

  await appendEntry(LOG_PATH, {
    verb: 'enriched',
    subject: sum2,
    details: 'Ingested Legal guidance; synthesized cross-functional retention requirements between InfoSec (30 days) and Legal (36 months).',
  });

  // ── Source 3: Corporate Travel & Expense Policy ──────────────────────────
  console.log('Ingesting Source 3: 03-corporate-travel-and-expense-policy.md (corporate_policy, official_policy, Finance, 2026-01-05)');
  const res3 = await ingestSource(join(RAW_DIR, '03-corporate-travel-and-expense-policy.md'), WIKI_ROOT, false, true);
  const sum3 = res3.pages_created[0] || 'sources/03-corporate-travel-and-expense-policy-summary.md';
  await writePage(join(WIKI_DIR, sum3), {
    frontmatter: {
      type: 'summary',
      title: 'Corporate Travel, Lodging, and Expense Policy Summary',
      tags: ['finance', 'travel', 'expense-policy', 'corporate'],
      created: now,
      sources: ['raw-round-4/03-corporate-travel-and-expense-policy.md'],
    },
    body: `Official corporate travel policy (Source Type: Corporate Policy; Department: Finance & Corporate Operations; Status: Official Policy; Effective: January 15, 2026) ratified by the Executive Committee. Mandates Economy/Main Cabin for all commercial flights under eight (8) hours globally. Business and First Class bookings under 8 hours are non-reimbursable. Departmental managers lack authority to grant travel variances.`
  });

  await createConceptPage(WIKI_DIR, 'Corporate Travel and Expense Standards', `Corporate policies governing business travel, accommodation, and expense reimbursement across Aetheris Technologies.

## Corporate Travel Policy (General Standard)
- **Classification:** Source Type: Corporate Policy | Department: Finance & Corporate Operations | Status: Official Policy (Effective: 2026-01-15)
- **Airfare Standard:** All commercial flights with duration under **eight (8) hours** must be booked in **Economy Class**.
- **Variance Restriction:** Departmental managers possess no authority to authorize local deviations. Non-compliant premium fares are non-reimbursable.`, ['finance', 'travel', 'policy']);

  await appendEntry(LOG_PATH, {
    verb: 'enriched',
    subject: sum3,
    details: 'Ingested Finance travel policy; established general Economy class rule for flights under 8 hours.',
  });

  // ── Source 4: Executive Exception Travel Protocol ────────────────────────
  console.log('Ingesting Source 4: 04-executive-exception-infrastructure-incident-travel.md (executive_exception, approved_exception, COO/Exec, 2026-04-12)');
  const res4 = await ingestSource(join(RAW_DIR, '04-executive-exception-infrastructure-incident-travel.md'), WIKI_ROOT, false, true);
  const sum4 = res4.pages_created[0] || 'sources/04-executive-exception-infrastructure-incident-travel-summary.md';
  await writePage(join(WIKI_DIR, sum4), {
    frontmatter: {
      type: 'summary',
      title: 'Executive Exception: SRE Disaster Recovery Travel Protocol Summary',
      tags: ['executive-exception', 'sre', 'disaster-recovery', 'travel', 'coo'],
      created: now,
      sources: ['raw-round-4/04-executive-exception-infrastructure-incident-travel.md'],
    },
    body: `Executive exception authorization (Source Type: Executive Exception; Department: Executive Committee / Chief Operating Officer; Status: Approved Exception; Effective: April 12, 2026) issued by COO Rachel Sterling. Authorizes Principal SREs and Infrastructure Disaster Recovery Strike Team members on emergency callout duty to book Business Class accommodations on flights exceeding four (4) hours during the 2026 data center migration cycle. Expenses billed to Executive Infrastructure Contingency budget.`
  });

  await createEntityPage(WIKI_DIR, 'Rachel Sterling', `Rachel Sterling is the Chief Operating Officer (COO) and member of the Executive Committee at Aetheris Technologies, responsible for operational governance and executive exception authorizations.`, ['leadership', 'operations', 'executive-committee']);

  await writePage(join(WIKI_DIR, 'concepts/corporate-travel-and-expense-standards.md'), {
    frontmatter: {
      type: 'concept',
      title: 'Corporate Travel and Expense Standards',
      tags: ['finance', 'travel', 'policy', 'executive-exception'],
      created: now,
      updated: now,
    },
    body: `Corporate policies governing business travel, accommodation, and expense reimbursement across Aetheris Technologies.

## 1. General Corporate Travel Standard (Finance Directorate)
- **Classification:** Source Type: Corporate Policy | Department: Finance & Corporate Operations | Status: Official Policy (Effective: 2026-01-15)
- **General Rule:** All flights under **eight (8) hours** must be booked in **Economy Class**. Division VPs and managers cannot grant local exemptions.

## 2. Approved Scoped Exception: SRE Disaster Recovery Protocol (COO / Executive Committee)
- **Classification:** Source Type: Executive Exception | Department: Executive Committee / Chief Operating Officer ([Rachel Sterling](../entities/rachel-sterling.md)) | Status: Approved Exception (Effective: 2026-04-12)
- **Authorized Carve-Out:** Principal Site Reliability Engineers (SREs) and Disaster Recovery Strike Team members deployed for emergency data center triage are authorized to book **Business Class** on flights exceeding **four (4) hours**.
- **Funding:** Charged directly to the Executive Infrastructure Contingency budget.

## Policy Hierarchy & Exception Reconciliation
- **Relationship:** The Executive Exception issued by the **Executive Committee / COO** represents a formally authorized, narrow carve-out to the general Finance travel policy.
- **Resolution:** The general corporate rule (Economy for <8 hrs) remains in full effect for general corporate travel. The 4-hour Business Class threshold is an approved active exception strictly restricted to designated SRE personnel on emergency disaster recovery callouts.`
  });

  await appendEntry(LOG_PATH, {
    verb: 'enriched',
    subject: sum4,
    details: 'Ingested Executive Exception from COO; reconciled general Finance travel policy with narrow SRE emergency exception.',
  });

  // ── Source 5: Data Anonymization Internal Standard ──────────────────────
  console.log('Ingesting Source 5: 05-data-anonymization-internal-standard.md (internal_standard, approved_internal_standard, Data Eng, 2026-01-20)');
  const res5 = await ingestSource(join(RAW_DIR, '05-data-anonymization-internal-standard.md'), WIKI_ROOT, false, true);
  const sum5 = res5.pages_created[0] || 'sources/05-data-anonymization-internal-standard-summary.md';
  await writePage(join(WIKI_DIR, sum5), {
    frontmatter: {
      type: 'summary',
      title: 'Technical Standard: Customer Telemetry Anonymization Summary',
      tags: ['data-engineering', 'telemetry', 'anonymization', 'analytics', 'standards'],
      created: now,
      sources: ['raw-round-4/05-data-anonymization-internal-standard.md'],
    },
    body: `Internal technical standard (Source Type: Internal Standard; Department: Data Engineering & Analytics; Status: Approved Internal Standard; Published: January 20, 2026) approved by the Engineering Architecture Council. Defines salted SHA-256 pseudonymization for user IP addresses, tenant IDs, and account numbers. Classifies salted data as de-identified and authorizes cross-region replication from European/APAC worker nodes to central US-East S3 buckets for machine learning training.`
  });

  await createConceptPage(WIKI_DIR, 'Telemetry Privacy and Cross-Border Data Transfers', `Standards and compliance directives governing telemetry processing, pseudonymization, and international data transfers.

## Internal Technical Standard (Data Engineering Guild)
- **Classification:** Source Type: Internal Standard | Department: Data Engineering & Analytics | Status: Approved Internal Standard (Published: 2026-01-20)
- **Specification:** Requires salted SHA-256 cryptographic hashing on user identifiers, classifying output as de-identified data.
- **Data Flow:** Authorizes direct cross-region replication of international telemetry into US-East analytical data lakes.`, ['privacy', 'compliance', 'data-engineering', 'gdpr']);

  await appendEntry(LOG_PATH, {
    verb: 'enriched',
    subject: sum5,
    details: 'Ingested Data Engineering internal standard authorizing US replication of salted telemetry.',
  });

  // ── Source 6: EU Data Protection Board Advisory ──────────────────────────
  console.log('Ingesting Source 6: 06-eu-data-protection-board-guidance-advisory.md (regulatory_advisory, regulatory_guidance, Compliance, 2026-04-18)');
  const res6 = await ingestSource(join(RAW_DIR, '06-eu-data-protection-board-guidance-advisory.md'), WIKI_ROOT, false, true);
  const sum6 = res6.pages_created[0] || 'sources/06-eu-data-protection-board-guidance-advisory-summary.md';
  await writePage(join(WIKI_DIR, sum6), {
    frontmatter: {
      type: 'summary',
      title: 'Regulatory Compliance Notice: Cross-Border Transfers of Pseudonymized Telemetry Summary',
      tags: ['compliance', 'gdpr', 'edpb', 'regulatory-advisory', 'cross-border-transfer'],
      created: now,
      sources: ['raw-round-4/06-eu-data-protection-board-guidance-advisory.md'],
    },
    body: `External regulatory compliance notice (Source Type: Regulatory Advisory; Department: Compliance / External Regulatory Liaison; Status: Regulatory Guidance; Published: April 18, 2026) summarizing European Data Protection Board (EDPB) enforcement rulings. Establishes that pseudonymized (salted/hashed) data remains legally personal data under GDPR Article 4(5). Unilateral cross-border replication of European customer telemetry to US servers without Standard Contractual Clauses (SCCs) and Transfer Impact Assessments is illegal and must be suspended.`
  });

  await writePage(join(WIKI_DIR, 'concepts/telemetry-privacy-and-cross-border-data-transfers.md'), {
    frontmatter: {
      type: 'concept',
      title: 'Telemetry Privacy and Cross-Border Data Transfers',
      tags: ['privacy', 'compliance', 'data-engineering', 'gdpr', 'regulations'],
      created: now,
      updated: now,
    },
    body: `Standards and compliance directives governing telemetry processing, pseudonymization, and international data transfers.

## 1. Internal Engineering Standard (Data Engineering Guild)
- **Classification:** Source Type: Internal Standard | Department: Data Engineering & Analytics | Status: Approved Internal Standard (Published: 2026-01-20)
- **Internal Practice:** Applied SHA-256 hashing with a rotating monthly salt, treating output as de-identified and permitting replication from EU/APAC to US-East S3 buckets.

## 2. External Regulatory Advisory (EDPB Compliance Directive)
- **Classification:** Source Type: Regulatory Advisory | Department: Compliance / External Regulatory Liaison | Status: Regulatory Guidance (Published: 2026-04-18)
- **Binding Regulatory Ruling:** Under European Data Protection Board (EDPB) jurisprudence, salted cryptographic hashing constitutes **pseudonymization, not anonymization**. Pseudonymized data remains personal data under GDPR.
- **Mandatory Action:** Autonomous egress of European telemetry to third-country servers (including US cloud instances) is prohibited without formal SCCs, Supplementary Technical Measures, and localized transfer assessments.

## Authority & Compliance Hierarchy
- **Precedence:** External statutory and regulatory mandates (status: regulatory_guidance / EDPB) strictly override internal engineering classifications (status: approved_internal_standard).
- **Operational Resolution:** The Data Engineering standard allowing direct US-East replication is legally preempted for European resident data. All cross-border replication of European telemetry must be halted until localized European data partitions and compliant transfer mechanisms are implemented.`
  });

  await appendEntry(LOG_PATH, {
    verb: 'enriched',
    subject: sum6,
    details: 'Ingested EDPB regulatory notice; resolved hierarchy determining external GDPR regulations preempt internal Data Engineering standard.',
  });

  // ── Source 7: Procurement Vendor Selection Policy ─────────────────────────
  console.log('Ingesting Source 7: 07-procurement-vendor-selection-policy.md (procurement_policy, approved, Procurement, 2026-02-15)');
  const res7 = await ingestSource(join(RAW_DIR, '07-procurement-vendor-selection-policy.md'), WIKI_ROOT, false, true);
  const sum7 = res7.pages_created[0] || 'sources/07-procurement-vendor-selection-policy-summary.md';
  await writePage(join(WIKI_DIR, sum7), {
    frontmatter: {
      type: 'summary',
      title: 'Global Procurement Policy: Software, SaaS, and Vendor Engagement Summary',
      tags: ['procurement', 'sourcing', 'vendor-management', 'governance'],
      created: now,
      sources: ['raw-round-4/07-procurement-vendor-selection-policy.md'],
    },
    body: `Global procurement policy (Source Type: Procurement Policy; Department: Global Procurement & Sourcing; Status: Approved; Published: February 15, 2026; Effective: March 1, 2026). Mandates that all third-party software, developer tooling, and SaaS engagements exceeding $50,000 USD in annual spend must undergo a mandatory competitive RFP process with at least three (3) independent qualified vendor bids and a 30-day review window. Prohibits departmental sole-sourcing above $50k.`
  });

  await createConceptPage(WIKI_DIR, 'Software Sourcing and Procurement Governance', `Governance policies governing commercial contracting, vendor evaluation, and developer toolchain acquisition.

## Global Procurement Policy (Commercial Governance)
- **Classification:** Source Type: Procurement Policy | Department: Global Procurement & Sourcing | Status: Approved (Effective: 2026-03-01)
- **Competitive Threshold:** Mandatory 3-vendor competitive RFP for all software/tooling spend exceeding **$50,000 USD** annually.
- **Sole-Source Restriction:** Departmental sole-sourcing above $50k is strictly prohibited.`, ['procurement', 'engineering', 'governance']);

  await appendEntry(LOG_PATH, {
    verb: 'enriched',
    subject: sum7,
    details: 'Ingested Procurement policy establishing $50k RFP threshold for software purchases.',
  });

  // ── Source 8: Engineering Rapid Tooling Standard ─────────────────────────
  console.log('Ingesting Source 8: 08-engineering-rapid-tooling-adoption-standard.md (technical_standard, approved, Engineering Architecture Council, 2026-03-01)');
  const res8 = await ingestSource(join(RAW_DIR, '08-engineering-rapid-tooling-adoption-standard.md'), WIKI_ROOT, false, true);
  const sum8 = res8.pages_created[0] || 'sources/08-engineering-rapid-tooling-adoption-standard-summary.md';
  await writePage(join(WIKI_DIR, sum8), {
    frontmatter: {
      type: 'summary',
      title: 'Technical Governance Standard: Accelerated Developer Tooling Sourcing Summary',
      tags: ['engineering', 'tooling', 'architecture-council', 'governance'],
      created: now,
      sources: ['raw-round-4/08-engineering-rapid-tooling-adoption-standard.md'],
    },
    body: `Technical governance standard (Source Type: Technical Standard; Department: Engineering Architecture Council; Status: Approved; Effective: March 1, 2026). Authorizes Engineering Leads and Technical Directors to fast-track sole-sourcing of developer tools, CI/CD platforms, and observability systems up to $100,000 USD in annual spend with approval from two Architecture Council members, bypassing multi-vendor RFP competitive bidding to maintain developer velocity.`
  });

  await writePage(join(WIKI_DIR, 'concepts/software-sourcing-and-procurement-governance.md'), {
    frontmatter: {
      type: 'concept',
      title: 'Software Sourcing and Procurement Governance',
      tags: ['procurement', 'engineering', 'governance', 'policy-conflict'],
      created: now,
      updated: now,
    },
    body: `Governance policies governing commercial contracting, vendor evaluation, and developer toolchain acquisition.

## 1. Global Procurement Policy (Commercial Governance)
- **Classification:** Source Type: Procurement Policy | Department: Global Procurement & Sourcing | Status: Approved (Effective: 2026-03-01)
- **Mandate:** Requires a formal 3-bid competitive RFP and 30-day evaluation for any software/tooling contract exceeding **$50,000 USD/year**.

## 2. Engineering Rapid Tooling Standard (Engineering Agility)
- **Classification:** Source Type: Technical Standard | Department: Engineering Architecture Council | Status: Approved (Effective: 2026-03-01)
- **Mandate:** Authorizes direct sole-source contracting for developer platforms and infrastructure tools up to **$100,000 USD/year** with approval from two Architecture Council members, bypassing competitive RFPs.

## Jurisdictional Analysis & Horizontal Authority Conflict
- **Conflict Nature:** Both policies carry status: approved and share the exact same effective date (**March 1, 2026**), but originate from co-equal functional departments (**Global Procurement & Sourcing** vs. **Engineering Architecture Council**).
- **Contradiction Zone ($50,000 – $100,000):**
  - Developer tooling purchases **under $50,000** can proceed via Engineering fast-track without dispute.
  - Software purchases **over $100,000** require full Procurement RFP across all departments.
  - Software/tooling purchases **between $50,000 and $100,000** create an active jurisdictional deadlock: Engineering standard authorizes direct sole-sourcing, whereas Procurement policy strictly prohibits sole-sourcing above $50k without a 3-bid RFP.
- **Status:** **Unresolved Horizontal Authority Conflict.** Because neither department possesses unilateral authority over the other, developer tooling purchases between $50k and $100k require joint CFO / CTO executive reconciliation.`
  });

  await appendEntry(LOG_PATH, {
    verb: 'enriched',
    subject: sum8,
    details: 'Ingested Engineering tooling standard; analyzed horizontal jurisdictional overlap with Procurement between $50k and $100k.',
  });

  // ── Source 9: Incident Escalation Policy (2024 Approved) ─────────────────
  console.log('Ingesting Source 9: 09-incident-severity-and-escalation-policy.md (operational_policy, approved, IT Ops, 2024-11-10)');
  const res9 = await ingestSource(join(RAW_DIR, '09-incident-severity-and-escalation-policy.md'), WIKI_ROOT, false, true);
  const sum9 = res9.pages_created[0] || 'sources/09-incident-severity-and-escalation-policy-summary.md';
  await writePage(join(WIKI_DIR, sum9), {
    frontmatter: {
      type: 'summary',
      title: 'Production Incident Classification and Escalation Policy Summary',
      tags: ['sre', 'it-operations', 'incident-management', 'escalation', 'policy'],
      created: now,
      sources: ['raw-round-4/09-incident-severity-and-escalation-policy.md'],
    },
    body: `Active operating standard for production incident response (Source Type: Operational Policy; Department: IT Operations & SRE; Status: Approved; Published: November 10, 2024; Effective: December 1, 2024). For P1 critical outages: Incident Commander must verbally page and brief the VP of Engineering within fifteen (15) minutes, mobilize a minimum of 5 Tier-3 engineers, and send executive email status updates every thirty (30) minutes.`
  });

  await createConceptPage(WIKI_DIR, 'Production Incident Management and Escalation Protocols', `Protocols, communication cadences, and escalation paths for major production incidents and platform outages.

## Approved Operating Standard (2024 Operational Policy)
- **Classification:** Source Type: Operational Policy | Department: IT Operations & SRE | Status: Approved (Effective: 2024-12-01)
- **P1 Escalation SLA:** VP of Engineering must be verbally briefed within **fifteen (15) minutes** of declaration.
- **Reporting Cadence:** Mandatory executive email briefings sent every **thirty (30) minutes**.`, ['sre', 'incident-response', 'operations']);

  await appendEntry(LOG_PATH, {
    verb: 'enriched',
    subject: sum9,
    details: 'Ingested active 2024 incident escalation policy (approved standard).',
  });

  // ── Source 10: Proposed Incident Management v2 Draft ─────────────────────
  console.log('Ingesting Source 10: 10-incident-management-framework-v2-draft.md (operational_policy, draft_revision, IT Ops, 2026-05-10)');
  const res10 = await ingestSource(join(RAW_DIR, '10-incident-management-framework-v2-draft.md'), WIKI_ROOT, false, true);
  const sum10 = res10.pages_created[0] || 'sources/10-incident-management-framework-v2-draft-summary.md';
  await writePage(join(WIKI_DIR, sum10), {
    frontmatter: {
      type: 'summary',
      title: 'Proposed Incident Management Framework v2.0 Summary',
      tags: ['sre', 'incident-management', 'rfc', 'draft-revision'],
      created: now,
      sources: ['raw-round-4/10-incident-management-framework-v2-draft.md'],
    },
    body: `Working draft revision (Source Type: Operational Policy; Department: IT Operations & SRE; Status: Draft Revision; Published: May 10, 2026) prepared by the Incident Operations Modernization Working Group. Proposes modernizing the 2024 framework: automated PagerDuty within 5 minutes, replacing email with 60-minute Slack updates, and deferring mandatory VP escalation to 45 minutes. Under active review; not yet ratified.`
  });

  await writePage(join(WIKI_DIR, 'concepts/production-incident-management-and-escalation-protocols.md'), {
    frontmatter: {
      type: 'concept',
      title: 'Production Incident Management and Escalation Protocols',
      tags: ['sre', 'incident-response', 'operations', 'policy-lifecycle'],
      created: now,
      updated: now,
    },
    body: `Protocols, communication cadences, and escalation paths for major production incidents and platform outages.

## 1. Active Operating Standard (2024 Approved Policy)
- **Classification:** Source Type: Operational Policy | Department: IT Operations & SRE | Status: **Approved** (Published: 2024-11-10, Effective: 2024-12-01)
- **Status:** **Active & Enforceable**
- **Mandatory P1 Protocol:**
  - Executive verbal briefing to VP of Engineering within **fifteen (15) minutes**.
  - Incident swarm mobilization: Minimum of 5 Tier-3 engineers.
  - Broadcast cadence: Formal email updates to Executive Distribution List every **thirty (30) minutes**.

## 2. Proposed Modernization Proposal (v2.0 Framework)
- **Classification:** Source Type: Operational Policy | Department: IT Operations & SRE | Status: **Draft Revision** (Published: 2026-05-10)
- **Status:** **Proposed / In Review (Non-Binding)**
- **Proposed Adjustments:** Automated PagerDuty alerts within 5 minutes, Slack broadcast updates every 60 minutes, and deferring VP escalation to 45 minutes.

## Lifecycle Status & Authority Reconciliation
- **Enforceability:** Despite being published later in time (May 2026 vs. November 2024), the v2.0 document carries status: draft_revision and has not received Operations Review Board ratification.
- **Resolution:** The **2024 Approved Policy remains the binding operating standard**. Operations teams must continue executing the 15-minute VP briefing and 30-minute email cadence until the draft revision is formally approved.`
  });

  await appendEntry(LOG_PATH, {
    verb: 'enriched',
    subject: sum10,
    details: 'Ingested v2 draft incident framework; maintained 2024 approved policy as active standard and classified v2 as non-binding draft proposal.',
  });

  // ── Step 11: Crosslinks ───────────────────────────────────────────────────
  console.log('\n--- Step 11: Applying Crosslinks across knowledge graph ---');
  await addCrosslinks(WIKI_DIR, 'concepts/corporate-travel-and-expense-standards.md', [
    'entities/rachel-sterling.md',
    'concepts/software-sourcing-and-procurement-governance.md',
  ]);

  await addCrosslinks(WIKI_DIR, 'concepts/data-retention-and-log-governance.md', [
    'concepts/telemetry-privacy-and-cross-border-data-transfers.md',
    'concepts/production-incident-management-and-escalation-protocols.md',
  ]);

  // ── Step 12: Lint Verification ────────────────────────────────────────────
  console.log('\n--- Step 12: Verifying Wiki Health (wiki_lint) ---');
  const lintResult = await lintWiki(WIKI_ROOT);
  console.log('Lint summary:', lintResult.summary);
  if (lintResult.findings.length > 0) {
    console.log('Findings:', JSON.stringify(lintResult.findings, null, 2));
  }

  // Copy raw sources into .wiki/raw/
  await cp('raw-round-4', '.wiki/raw', { recursive: true });

  // Save Round 4 output separately
  await cp('.wiki', '.wiki-round-4', { recursive: true });

  console.log('\n=== Round 4 Smart Ingest Complete ===');
}

runRound4().catch(console.error);
