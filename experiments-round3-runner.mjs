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
const RAW_DIR = resolve('raw');
const LOG_PATH = join(WIKI_DIR, 'log.md');
const INDEX_PATH = join(WIKI_DIR, 'index.md');

async function runRound3() {
  console.log('--- Step 0: Initializing clean wiki state for Round 3 ---');
  await rm('.wiki', { recursive: true, force: true });
  await initWiki('.');

  const now = new Date().toISOString();

  // 1. Source 1: Charter (source_type: program_charter, department: Engineering / Product Management, status: approved, published_at: 2026-01-15)
  console.log('Ingesting Source 1: 01-project-meridian-charter.md (charter, approved, 2026-01-15)');
  const res1 = await ingestSource(join(RAW_DIR, '01-project-meridian-charter.md'), WIKI_ROOT, false, true);
  const sum1 = res1.pages_created[0] || 'sources/01-project-meridian-charter-summary.md';
  await writePage(join(WIKI_DIR, sum1), {
    frontmatter: {
      type: 'summary',
      title: 'Project Meridian: Program Charter & Strategic Objectives Summary',
      tags: ['charter', 'project-meridian', 'settlement', 'architecture'],
      created: now,
      sources: ['raw/01-project-meridian-charter.md'],
    },
    body: `Project Meridian is Aetheris Financial Technologies' primary modernization initiative for fiscal year 2026. The program charter (Source Type: Program Charter; Department: Engineering / Product Management; Status: Approved; Published: January 15, 2026) is sponsored by VP of Engineering Marcus Vance with product leadership from Jordan Hayes and principal architecture led by Elena Rostova. The initiative replaces legacy settlement subsystems with a unified, cloud-native real-time transaction engine designed for 100,000 TPS at sub-50ms p99 latency.

The platform targets two pilot integration partners: Helix Logistics for cross-border freight payment rails, and Solis Retail Group for multi-channel merchant settlement and instant refund routing. Commercial onboarding is led by Sarah Lin (VP of Enterprise Sales) and risk underwriting guardrails are managed by Devon Thorne (Head of Risk Management).`
  });

  await createEntityPage(WIKI_DIR, 'Marcus Vance', `Marcus Vance is the VP of Engineering at Aetheris Financial Technologies and executive sponsor for Project Meridian, responsible for organizational alignment and cross-functional engineering resource allocation.`, ['leadership', 'engineering', 'project-meridian']);
  await createEntityPage(WIKI_DIR, 'Jordan Hayes', `Jordan Hayes is the Lead Product Manager for Project Meridian, responsible for milestone tracking, pilot partner coordination, and go-to-market execution.`, ['product', 'project-meridian']);
  await createEntityPage(WIKI_DIR, 'Elena Rostova', `Elena Rostova is the Principal Architect leading the system architecture, persistence layer design, protocol specifications, and technical governance for Project Meridian.`, ['architecture', 'engineering', 'project-meridian']);
  await createEntityPage(WIKI_DIR, 'Sarah Lin', `Sarah Lin is the VP of Enterprise Sales leading commercial onboarding and enterprise partner relationships for Project Meridian.`, ['sales', 'commercial', 'project-meridian']);
  await createEntityPage(WIKI_DIR, 'Devon Thorne', `Devon Thorne is the Head of Risk Management responsible for counterparty credit assessments, exposure limits, and regulatory compliance underwriting.`, ['risk', 'compliance', 'governance']);
  await createEntityPage(WIKI_DIR, 'Helix Logistics', `Helix Logistics is a global freight forwarding conglomerate operating across 40 countries, selected as a primary pilot partner for Project Meridian freight rail settlement.`, ['partner', 'logistics', 'pilot']);
  await createEntityPage(WIKI_DIR, 'Solis Retail Group', `Solis Retail Group is a multi-channel retail partner collaborating on Project Meridian for instant merchant settlements and automated refund routing.`, ['partner', 'retail', 'pilot']);

  await createConceptPage(WIKI_DIR, 'Project Meridian', `Project Meridian is Aetheris Financial Technologies' flagship modernization program for 2026 (chartered January 15, 2026) to replace legacy settlement systems with a unified cloud-native real-time transaction engine designed for 100,000 TPS and sub-50ms p99 latency.

## Key Stakeholders
- Executive Sponsor: [Marcus Vance](../entities/marcus-vance.md)
- Product Lead: [Jordan Hayes](../entities/jordan-hayes.md)
- Principal Architect: [Elena Rostova](../entities/elena-rostova.md)

## Pilot Partners
- [Helix Logistics](../entities/helix-logistics.md)
- [Solis Retail Group](../entities/solis-retail-group.md)`, ['modernization', 'settlement', 'project-meridian']);

  await createConceptPage(WIKI_DIR, 'Real-Time Transaction Engine', `A high-throughput, low-latency financial transaction clearing and settlement engine targeting 100,000 TPS at sub-50ms p99 latency to support cross-border freight and merchant payments.`, ['architecture', 'fintech', 'settlement']);

  await appendEntry(LOG_PATH, {
    verb: 'enriched',
    subject: sum1,
    details: 'Ingested approved program charter (Engineering/Product, 2026-01-15); created stakeholder entities and core concepts.',
  });

  // 2. Source 2: RFC Draft Data Layer (source_type: rfc, department: Architecture, status: draft, published_at: 2026-02-04)
  console.log('Ingesting Source 2: 02-architecture-rfc-draft-data-layer.md (rfc, draft, Architecture, 2026-02-04)');
  const res2 = await ingestSource(join(RAW_DIR, '02-architecture-rfc-draft-data-layer.md'), WIKI_ROOT, false, true);
  const sum2 = res2.pages_created[0] || 'sources/02-architecture-rfc-draft-data-layer-summary.md';
  await writePage(join(WIKI_DIR, sum2), {
    frontmatter: {
      type: 'summary',
      title: 'RFC: Storage Architecture for Real-Time Settlement Engine Summary',
      tags: ['architecture', 'rfc', 'draft', 'postgresql', 'citus'],
      created: now,
      sources: ['raw/02-architecture-rfc-draft-data-layer.md'],
    },
    body: `An exploratory Request for Comments (Source Type: RFC; Department: Architecture; Status: Draft; Published: February 4, 2026) authored by Principal Architect Elena Rostova proposing PostgreSQL with the Citus distributed extension as the persistence tier for Project Meridian. The draft RFC evaluated relational ACID guarantees and team SQL familiarity.`
  });

  await createConceptPage(WIKI_DIR, 'Data Persistence Layer', `The storage architecture underpinning the Project Meridian settlement ledger.

### Storage Proposals & Decision Lineage
- **PostgreSQL with Citus (Draft RFC — Architecture Department, Published: 2026-02-04, Status: Draft):** Proposed in an initial exploratory RFC by [Elena Rostova](../entities/elena-rostova.md) for relational ACID semantics and SQL reporting.`, ['architecture', 'database', 'project-meridian']);

  await appendEntry(LOG_PATH, {
    verb: 'enriched',
    subject: sum2,
    details: 'Ingested draft RFC from Architecture proposing PostgreSQL with Citus extension.',
  });

  // 3. Source 3: ADR-014 (source_type: architecture_decision_record, department: Architecture, status: approved, published_at: 2026-03-18)
  console.log('Ingesting Source 3: 03-architecture-decision-record-adr-014.md (adr, approved, Architecture, 2026-03-18)');
  const res3 = await ingestSource(join(RAW_DIR, '03-architecture-decision-record-adr-014.md'), WIKI_ROOT, false, true);
  const sum3 = res3.pages_created[0] || 'sources/03-architecture-decision-record-adr-014-summary.md';
  await writePage(join(WIKI_DIR, sum3), {
    frontmatter: {
      type: 'summary',
      title: 'Architecture Decision: Selection of Core Persistence Engine Summary',
      tags: ['architecture', 'adr', 'dynamodb', 'database'],
      created: now,
      sources: ['raw/03-architecture-decision-record-adr-014.md'],
    },
    body: `An approved Architecture Decision Record (Source Type: Architecture Decision Record; Department: Architecture; Status: Approved; Published: March 18, 2026) signed by Elena Rostova and Marcus Vance. Formally establishes Amazon DynamoDB with DAX as the adopted persistence layer, superseding the earlier draft RFC after benchmark testing demonstrated Citus failed sub-50ms p99 latency targets during peak loads at 80,000 TPS.`
  });

  await writePage(join(WIKI_DIR, 'concepts/data-persistence-layer.md'), {
    frontmatter: {
      type: 'concept',
      title: 'Data Persistence Layer',
      tags: ['architecture', 'database', 'project-meridian'],
      created: now,
      updated: now,
    },
    body: `The storage architecture underpinning the Project Meridian settlement ledger.

### Architectural Decision Lineage & Approved Standard
- **Exploratory Proposal (RFC — Status: Draft, Published: 2026-02-04):** [Elena Rostova](../entities/elena-rostova.md) initially proposed distributed PostgreSQL with Citus. Subsequent load testing in late February 2026 demonstrated cross-shard locking and connection exhaustion at 80,000 TPS, failing performance criteria.
- **Adopted Persistence Standard (ADR-014 — Status: Approved, Published: 2026-03-18):** Formally accepted by Architecture and Engineering leadership ([Elena Rostova](../entities/elena-rostova.md), [Marcus Vance](../entities/marcus-vance.md)). **Amazon DynamoDB with DAX** is the official persistence tier, providing predictable single-digit latency (write <8ms, read <3ms), partition autoscaling, conditional balance updates, and event streaming via DynamoDB Streams to Kafka and Snowflake.`
  });

  await appendEntry(LOG_PATH, {
    verb: 'enriched',
    subject: sum3,
    details: 'Ingested approved ADR-014 from Architecture; resolved persistence standard to DynamoDB, categorizing Citus RFC as superseded draft.',
  });

  // 4. Source 4: Engineering All-Hands (source_type: meeting_notes, department: Engineering, status: informal_notes, published_at: 2026-04-10)
  console.log('Ingesting Source 4: 04-engineering-all-hands-meeting-notes.md (meeting_notes, informal_notes, Engineering, 2026-04-10)');
  const res4 = await ingestSource(join(RAW_DIR, '04-engineering-all-hands-meeting-notes.md'), WIKI_ROOT, false, true);
  const sum4 = res4.pages_created[0] || 'sources/04-engineering-all-hands-meeting-notes-summary.md';
  await writePage(join(WIKI_DIR, sum4), {
    frontmatter: {
      type: 'summary',
      title: 'Engineering All-Hands and Sprint Planning Sync Summary',
      tags: ['meeting-notes', 'engineering', 'hybrid-work'],
      created: now,
      sources: ['raw/04-engineering-all-hands-meeting-notes.md'],
    },
    body: `Informal meeting notes from an internal engineering team sync (Source Type: Meeting Notes; Department: Engineering; Status: Informal Notes; Published: April 10, 2026) hosted by VP Marcus Vance. Vance announced an internal departmental preference permitting Meridian engineers to work remotely up to 3 days per week to support deep focus time.`
  });

  await createConceptPage(WIKI_DIR, 'Workplace and Hybrid Work Guidelines', `Guidelines regarding remote work and on-site attendance for company employees.

### Engineering Department Working Norms (Source: Meeting Notes, Status: Informal Notes, Published: 2026-04-10)
During an internal sync, VP of Engineering [Marcus Vance](../entities/marcus-vance.md) stated that Project Meridian engineers are permitted to work remotely up to **three (3) days per week**, with Tuesdays and Thursdays designated as core in-office days.`, ['workplace', 'policy', 'remote-work']);

  await appendEntry(LOG_PATH, {
    verb: 'enriched',
    subject: sum4,
    details: 'Ingested engineering all-hands meeting notes (informal engineering notes); recorded 3-day remote work preference.',
  });

  // 5. Source 5: Corporate Workplace Policy (source_type: corporate_policy, department: Human Resources / Executive Committee, status: official_policy, effective_date: 2026-01-01, published_at: 2026-01-01)
  console.log('Ingesting Source 5: 05-corporate-workplace-policy-hr-2026.md (corporate_policy, official_policy, HR/Exec, 2026-01-01)');
  const res5 = await ingestSource(join(RAW_DIR, '05-corporate-workplace-policy-hr-2026.md'), WIKI_ROOT, false, true);
  const sum5 = res5.pages_created[0] || 'sources/05-corporate-workplace-policy-hr-2026-summary.md';
  await writePage(join(WIKI_DIR, sum5), {
    frontmatter: {
      type: 'summary',
      title: 'Corporate Workplace & Attendance Policy Summary',
      tags: ['hr', 'policy', 'corporate', 'attendance'],
      created: now,
      sources: ['raw/05-corporate-workplace-policy-hr-2026.md'],
    },
    body: `Official corporate policy (Source Type: Corporate Policy; Department: Human Resources / Executive Committee; Status: Official Policy; Effective Date: January 1, 2026; Published: January 1, 2026). Mandates all full-time employees globally work on-site a minimum of 3 days per week, restricting remote work to a maximum of 2 days per week. The policy explicitly stipulates that departmental managers lack authority to grant exemptions.`
  });

  await writePage(join(WIKI_DIR, 'concepts/workplace-and-hybrid-work-guidelines.md'), {
    frontmatter: {
      type: 'concept',
      title: 'Workplace and Hybrid Work Guidelines',
      tags: ['workplace', 'policy', 'remote-work', 'hr'],
      created: now,
      updated: now,
    },
    body: `Guidelines and policies regarding remote work and on-site attendance at Aetheris Financial Technologies.

## Official Corporate Policy (Binding Standard)
- **Document Classification:** Source Type: Corporate Policy | Department: Human Resources / Executive Committee | Status: Official Policy (Effective Date: January 1, 2026)
- **Mandatory Requirements:** All full-time employees globally are required to work on-site for a minimum of **three (3) days per week**, limiting remote work to a maximum of **two (2) days per week**.
- **Governance & Non-Exemption Clause:** Departmental managers and team leaders have no authority to grant variances. Exceptions require formal submission through People Portal, endorsement by the Chief People Officer, and Executive Committee approval.

## Departmental Informal Statements (Non-Binding)
- **Document Classification:** Source Type: Meeting Notes | Department: Engineering | Status: Informal Notes (Published: April 10, 2026)
- **Departmental Remark:** VP of Engineering [Marcus Vance](../entities/marcus-vance.md) suggested during an internal squad sync that Project Meridian engineers could work remotely up to **three (3) days per week** for sprint focus.

## Authority Reconciliation
Based on document provenance and status:
- **Binding Rule:** The official **Corporate Policy** (status: official_policy, Executive Committee) governs company-wide attendance and legally supersedes informal departmental meeting remarks.
- **Resolution:** The enforceable limit for all employees, including engineering staff, is **two (2) days remote per week** unless an official Executive Committee accommodation is executed. The 3-day figure from the engineering all-hands represents an informal departmental preference that lacks policy authorization.`
  });

  await appendEntry(LOG_PATH, {
    verb: 'enriched',
    subject: sum5,
    details: 'Ingested HR corporate policy (official_policy from Executive Committee); resolved authority conflict over informal engineering meeting notes.',
  });

  // 6. Source 6: Q1 Status Update (source_type: status_report, department: Product Management, status: published, published_at: 2026-03-31)
  console.log('Ingesting Source 6: 06-q1-meridian-executive-status-update.md (status_report, published, Product, 2026-03-31)');
  const res6 = await ingestSource(join(RAW_DIR, '06-q1-meridian-executive-status-update.md'), WIKI_ROOT, false, true);
  const sum6 = res6.pages_created[0] || 'sources/06-q1-meridian-executive-status-update-summary.md';
  await writePage(join(WIKI_DIR, sum6), {
    frontmatter: {
      type: 'summary',
      title: 'Project Meridian: Q1 2026 Executive Status Update Summary',
      tags: ['status-update', 'q1-2026', 'project-meridian', 'roadmap'],
      created: now,
      sources: ['raw/06-q1-meridian-executive-status-update.md'],
    },
    body: `Executive status report (Source Type: Status Report; Department: Product Management; Status: Published; Published: March 31, 2026) authored by Lead PM Jordan Hayes. Project Meridian is reported in healthy green status with architecture finalized (ADR-014 DynamoDB) and core alpha throughput reaching 65,000 TPS. The initial release roadmap targeted General Availability (GA) launch on September 15, 2026.`
  });

  await writePage(join(WIKI_DIR, 'concepts/project-meridian.md'), {
    frontmatter: {
      type: 'concept',
      title: 'Project Meridian',
      tags: ['modernization', 'settlement', 'project-meridian'],
      created: now,
      updated: now,
    },
    body: `Project Meridian is Aetheris Financial Technologies' flagship modernization program for 2026 (chartered January 15, 2026) to replace legacy settlement systems with a unified cloud-native real-time transaction engine designed for 100,000 TPS and sub-50ms p99 latency.

## Key Stakeholders
- Executive Sponsor: [Marcus Vance](../entities/marcus-vance.md)
- Product Lead: [Jordan Hayes](../entities/jordan-hayes.md)
- Principal Architect: [Elena Rostova](../entities/elena-rostova.md)

## Architecture & Data Layer
The storage tier utilizes [Amazon DynamoDB with DAX](data-persistence-layer.md), finalized via ADR-014 (March 18, 2026, Status: Approved) following rejection of an earlier February 4 draft RFC.

## Pilot Partners
- [Helix Logistics](../entities/helix-logistics.md)
- [Solis Retail Group](../entities/solis-retail-group.md)

## Release Schedule & Roadmap
As of the Q1 Status Report (Product Management, Published: 2026-03-31):
- Alpha Release: May 15, 2026
- Beta Partner Sandbox: July 1, 2026
- General Availability (GA) Launch: **September 15, 2026**`
  });

  await appendEntry(LOG_PATH, {
    verb: 'enriched',
    subject: sum6,
    details: 'Ingested Q1 status report from Product Management (published 2026-03-31); recorded initial September 15, 2026 GA target.',
  });

  // 7. Source 7: Q2 Status Update (source_type: status_report, department: Product Management, status: published, published_at: 2026-06-30)
  console.log('Ingesting Source 7: 07-q2-meridian-executive-status-update.md (status_report, published, Product, 2026-06-30)');
  const res7 = await ingestSource(join(RAW_DIR, '07-q2-meridian-executive-status-update.md'), WIKI_ROOT, false, true);
  const sum7 = res7.pages_created[0] || 'sources/07-q2-meridian-executive-status-update-summary.md';
  await writePage(join(WIKI_DIR, sum7), {
    frontmatter: {
      type: 'summary',
      title: 'Project Meridian: Q2 2026 Executive Status Update Summary',
      tags: ['status-update', 'q2-2026', 'project-meridian', 'schedule'],
      created: now,
      sources: ['raw/07-q2-meridian-executive-status-update.md'],
    },
    body: `Executive status report (Source Type: Status Report; Department: Product Management; Status: Published; Published: June 30, 2026) authored by Lead PM Jordan Hayes. Program tracking shifted to yellow status due to unexpected delays during third-party SOC2 compliance certification and extended security penetration testing. The General Availability (GA) launch date has been revised from September 15, 2026 to November 18, 2026.`
  });

  await writePage(join(WIKI_DIR, 'concepts/project-meridian.md'), {
    frontmatter: {
      type: 'concept',
      title: 'Project Meridian',
      tags: ['modernization', 'settlement', 'project-meridian'],
      created: now,
      updated: now,
    },
    body: `Project Meridian is Aetheris Financial Technologies' flagship modernization program for 2026 (chartered January 15, 2026) to replace legacy settlement systems with a unified cloud-native real-time transaction engine designed for 100,000 TPS and sub-50ms p99 latency.

## Key Stakeholders
- Executive Sponsor: [Marcus Vance](../entities/marcus-vance.md)
- Product Lead: [Jordan Hayes](../entities/jordan-hayes.md)
- Principal Architect: [Elena Rostova](../entities/elena-rostova.md)

## Architecture & Data Layer
The storage tier utilizes [Amazon DynamoDB with DAX](data-persistence-layer.md), finalized via ADR-014 (Architecture Department, Published: 2026-03-18, Status: Approved) superseding the prior draft RFC (Published: 2026-02-04, Status: Draft).

## Pilot Partners
- [Helix Logistics](../entities/helix-logistics.md)
- [Solis Retail Group](../entities/solis-retail-group.md)

## Release Schedule & Roadmap (Chronological Lineage)
- **Superseded Target (Status Report — Product Management, Published: 2026-03-31):** General Availability was originally planned for September 15, 2026.
- **Active Official Target (Status Report — Product Management, Published: 2026-06-30):** In the Q2 status report, [Jordan Hayes](../entities/jordan-hayes.md) announced a schedule realignment moving General Availability (GA) to **November 18, 2026** to accommodate third-party SOC2 compliance certification audits and extended security penetration testing.`
  });

  await appendEntry(LOG_PATH, {
    verb: 'enriched',
    subject: sum7,
    details: 'Ingested Q2 status report from Product Management (published 2026-06-30); resolved active launch target to November 18, 2026 superseding Q1 report.',
  });

  // 8. Source 8: Sales Review Helix (source_type: strategic_account_review, department: Enterprise Sales, status: proposal, published_at: 2026-05-12)
  console.log('Ingesting Source 8: 08-enterprise-sales-account-review-helix.md (sales_review, proposal, Sales, 2026-05-12)');
  const res8 = await ingestSource(join(RAW_DIR, '08-enterprise-sales-account-review-helix.md'), WIKI_ROOT, false, true);
  const sum8 = res8.pages_created[0] || 'sources/08-enterprise-sales-account-review-helix-summary.md';
  await writePage(join(WIKI_DIR, sum8), {
    frontmatter: {
      type: 'summary',
      title: 'Strategic Account Review: Helix Logistics Summary',
      tags: ['sales', 'commercial', 'helix-logistics', 'strategy'],
      created: now,
      sources: ['raw/08-enterprise-sales-account-review-helix.md'],
    },
    body: `Commercial account review and commercial proposal (Source Type: Strategic Account Review; Department: Enterprise Sales; Status: Proposal; Published: May 12, 2026) authored by Sarah Lin, VP of Enterprise Sales. Evaluates Helix Logistics as a Tier-1 anchor partner representing $4.2M projected ARR and 18M monthly transactions. Proposes offering a 12-month 15% transaction fee discount, dedicated technical escalations, and waived onboarding fees to secure a 3-year contract.`
  });

  await writePage(join(WIKI_DIR, 'entities/helix-logistics.md'), {
    frontmatter: {
      type: 'entity',
      title: 'Helix Logistics',
      tags: ['partner', 'logistics', 'commercial', 'pilot'],
      created: now,
      updated: now,
    },
    body: `Helix Logistics is a global freight forwarding and logistics conglomerate operating across 40 countries, serving as a primary pilot integration partner for [Project Meridian](../concepts/project-meridian.md).

## Commercial & Sales Assessment
- **Document Classification:** Source Type: Strategic Account Review | Department: Enterprise Sales | Status: Proposal (Published: May 12, 2026) | Author: [Sarah Lin](sarah-lin.md)
- **Strategic Position:** Tier-1 strategic anchor client.
- **Financial Potential:** Projected $4.2M in annual recurring revenue (ARR) and 18 million monthly settlement transactions.
- **Commercial Proposals:** Recommends offering a 15% discount on variable processing fees for 12 months and waiving onboarding implementation fees to secure a 3-year exclusivity commitment.`
  });

  await appendEntry(LOG_PATH, {
    verb: 'enriched',
    subject: sum8,
    details: 'Ingested Sales commercial proposal (Enterprise Sales, published 2026-05-12); documented revenue potential and commercial fee discount proposals for Helix Logistics.',
  });

  // 9. Source 9: Risk Assessment Helix (source_type: risk_assessment, department: Risk Management, status: approved_underwriting_policy, published_at: 2026-05-20)
  console.log('Ingesting Source 9: 09-enterprise-risk-and-credit-assessment-helix.md (risk_assessment, approved_underwriting_policy, Risk, 2026-05-20)');
  const res9 = await ingestSource(join(RAW_DIR, '09-enterprise-risk-and-credit-assessment-helix.md'), WIKI_ROOT, false, true);
  const sum9 = res9.pages_created[0] || 'sources/09-enterprise-risk-and-credit-assessment-helix-summary.md';
  await writePage(join(WIKI_DIR, sum9), {
    frontmatter: {
      type: 'summary',
      title: 'Credit Risk & Counterparty Assessment: Helix Logistics Summary',
      tags: ['risk', 'credit', 'helix-logistics', 'underwriting'],
      created: now,
      sources: ['raw/09-enterprise-risk-and-credit-assessment-helix.md'],
    },
    body: `Underwriting policy and counterparty credit risk evaluation (Source Type: Risk Assessment; Department: Risk Management; Status: Approved Underwriting Policy; Published: May 20, 2026) authored by Devon Thorne, Head of Risk Management. Classifies Helix Logistics as elevated risk due to a 3.8x debt-to-equity ratio, 18% YoY margin compression from fuel price volatility, and an active European customs valuation audit. Establishes mandatory underwriting requirements: $2.5M cash reserve escrow, $1.2M daily exposure cap, and strict prohibition of fee concessions.`
  });

  await writePage(join(WIKI_DIR, 'entities/helix-logistics.md'), {
    frontmatter: {
      type: 'entity',
      title: 'Helix Logistics',
      tags: ['partner', 'logistics', 'commercial', 'risk', 'pilot'],
      created: now,
      updated: now,
    },
    body: `Helix Logistics is a global freight forwarding and logistics conglomerate operating across 40 countries, serving as a primary pilot integration partner for [Project Meridian](../concepts/project-meridian.md).

## Departmental Perspectives & Governance Boundaries

### Commercial & Sales Assessment (Growth Proposal)
- **Document Classification:** Source Type: Strategic Account Review | Department: Enterprise Sales | Status: Proposal (Published: May 12, 2026) | Author: [Sarah Lin](sarah-lin.md)
- **Strategic Position:** Tier-1 strategic anchor client representing $4.2M projected ARR and 18M monthly settlement transactions.
- **Commercial Strategy:** Recommends offering a 15% discount on variable processing fees and waiving upfront onboarding fees to secure rapid contract signing and showcase partner status.

### Counterparty & Credit Risk Assessment (Mandatory Underwriting Policy)
- **Document Classification:** Source Type: Risk Assessment | Department: Risk Management | Status: Approved Underwriting Policy (Published: May 20, 2026) | Author: [Devon Thorne](devon-thorne.md)
- **Risk Classification:** Elevated counterparty risk due to a 3.8x debt-to-equity ratio, 18% operating margin compression, and ongoing European customs audits.
- **Mandatory Guardrails:** Requires a rolling cash collateral escrow of at least $2.5M and a $1.2M intraday exposure cap.
- **Governance Constraint on Commercial Terms:** Underwriting policy strictly prohibits fee waivers or concessions until financial metrics improve for two consecutive quarters.

### Synthesis of Departmental Roles
The sales document represents a **commercial growth proposal** (status: proposal), whereas the risk document constitutes **approved underwriting governance** (status: approved_underwriting_policy). Both perspectives remain valid within their respective domains: the commercial opportunity justifies priority onboarding, while the risk requirements impose binding underwriting constraints on the final contractual terms.`
  });

  await appendEntry(LOG_PATH, {
    verb: 'enriched',
    subject: sum9,
    details: 'Ingested approved Risk Assessment (Risk Management, published 2026-05-20); synthesized Sales commercial proposal with mandatory Risk underwriting governance.',
  });

  // 10. Source 10: InfoSec Standards (source_type: security_standard, department: Information Security, status: mandatory_standard, published_at: 2026-06-15)
  console.log('Ingesting Source 10: 10-security-audit-and-api-governance.md (security_standard, mandatory_standard, InfoSec, 2026-06-15)');
  const res10 = await ingestSource(join(RAW_DIR, '10-security-audit-and-api-governance.md'), WIKI_ROOT, false, true);
  const sum10 = res10.pages_created[0] || 'sources/10-security-audit-and-api-governance-summary.md';
  await writePage(join(WIKI_DIR, sum10), {
    frontmatter: {
      type: 'summary',
      title: 'InfoSec and API Integration Standards Summary',
      tags: ['security', 'infosec', 'api', 'governance', 'standards'],
      created: now,
      sources: ['raw/10-security-audit-and-api-governance.md'],
    },
    body: `Information security standards (Source Type: Security Standard; Department: Information Security; Status: Mandatory Standard; Published: June 15, 2026) established by Director of Information Security Priya Patel governing Project Meridian partner integrations. Mandates mutual TLS (mTLS), OAuth 2.0 with Demonstrating Proof-of-Possession (DPoP), asymmetric HMAC-SHA256 payload signatures, Tier-1 burst rate limits of 15,000 RPS (e.g. for Helix Logistics), and 7-year immutable WORM audit retention.`
  });

  await createEntityPage(WIKI_DIR, 'Priya Patel', `Priya Patel is the Director of Information Security at Aetheris Financial Technologies, responsible for cryptographic standards, API gateway security governance, and compliance audit frameworks for Project Meridian.`, ['infosec', 'security', 'governance']);

  await createConceptPage(WIKI_DIR, 'API Security and Governance Standards', `Mandatory technical and cryptographic standards for external partner connections to [Project Meridian](project-meridian.md) (Source Type: Security Standard; Department: Information Security; Status: Mandatory Standard; Published: June 15, 2026).

## Protocol Requirements
- **Mutual TLS (mTLS):** Required for all ingress traffic to Meridian API endpoints.
- **OAuth 2.0 with DPoP:** Application-level token replay protection.
- **Payload Signatures:** HMAC-SHA256 request header signing for balance modification requests.
- **Rate Limiting:** Tier-1 partners (such as [Helix Logistics](../entities/helix-logistics.md)) receive burst limits of 15,000 RPS, while Tier-2 partners (such as [Solis Retail Group](../entities/solis-retail-group.md)) receive 5,000 RPS.
- **Data Retention:** 7-year immutable WORM storage for state transitions and signature traces.`, ['security', 'api', 'compliance']);

  await appendEntry(LOG_PATH, {
    verb: 'enriched',
    subject: sum10,
    details: 'Ingested mandatory InfoSec standards (Information Security, published 2026-06-15); created Priya Patel entity and API Security Standards concept.',
  });

  // Crosslinking step
  console.log('\n--- Step 11: Applying Crosslinks across knowledge graph ---');
  await addCrosslinks(WIKI_DIR, 'concepts/project-meridian.md', [
    'concepts/data-persistence-layer.md',
    'concepts/real-time-transaction-engine.md',
    'concepts/api-security-and-governance-standards.md',
    'entities/helix-logistics.md',
    'entities/solis-retail-group.md',
  ]);

  await addCrosslinks(WIKI_DIR, 'entities/helix-logistics.md', [
    'concepts/project-meridian.md',
    'entities/sarah-lin.md',
    'entities/devon-thorne.md',
    'concepts/api-security-and-governance-standards.md',
  ]);

  // Lint verification
  console.log('\n--- Step 12: Verifying Wiki Health (wiki_lint) ---');
  const lintResult = await lintWiki(WIKI_ROOT);
  console.log('Lint summary:', lintResult.summary);
  if (lintResult.findings.length > 0) {
    console.log('Findings:', JSON.stringify(lintResult.findings, null, 2));
  }

  // Copy raw sources into .wiki/raw/ for self-contained wiki directory
  await cp('raw', '.wiki/raw', { recursive: true });

  // Save Round 3 output separately
  await cp('.wiki', '.wiki-round-3', { recursive: true });

  console.log('\n=== Round 3 Smart Ingest Complete ===');
}

runRound3().catch(console.error);
