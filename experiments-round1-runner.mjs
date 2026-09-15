import { join, resolve } from 'node:path';
import { readFile, writeFile } from 'node:fs/promises';
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

async function runFullPipeline() {
  console.log('--- Step 0: Initializing clean wiki state ---');
  await initWiki('.');

  const sourcesInOrder = [
    '01-project-meridian-charter.md',
    '02-architecture-rfc-draft-data-layer.md',
    '03-architecture-decision-record-adr-014.md',
    '04-engineering-all-hands-meeting-notes.md',
    '05-corporate-workplace-policy-hr-2026.md',
    '06-q1-meridian-executive-status-update.md',
    '07-q2-meridian-executive-status-update.md',
    '08-enterprise-sales-account-review-helix.md',
    '09-enterprise-risk-and-credit-assessment-helix.md',
    '10-security-audit-and-api-governance.md',
  ];

  const now = new Date().toISOString();

  // 1. Source 1: Charter
  console.log('Ingesting Source 1: 01-project-meridian-charter.md');
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
    body: `Project Meridian is Aetheris Financial Technologies' primary modernization initiative for fiscal year 2026, sponsored by VP of Engineering Marcus Vance with product leadership from Jordan Hayes and principal architecture led by Elena Rostova. The program aims to replace fragmented legacy settlement subsystems with a unified, cloud-native real-time transaction engine targeting 100,000 transactions per second (TPS) with sub-50ms p99 latency.

The platform targets two pilot integration partners: Helix Logistics for cross-border freight payment rails, and Solis Retail Group for multi-channel merchant settlement and instant refund routing. Commercial onboarding is led by Sarah Lin (VP of Enterprise Sales) and risk underwriting guardrails are managed by Devon Thorne (Head of Risk Management).`
  });

  await createEntityPage(WIKI_DIR, 'Marcus Vance', `Marcus Vance is the VP of Engineering at Aetheris Financial Technologies and executive sponsor for Project Meridian, responsible for organizational alignment and cross-functional engineering resource allocation.`, ['leadership', 'engineering', 'project-meridian']);
  await createEntityPage(WIKI_DIR, 'Jordan Hayes', `Jordan Hayes is the Lead Product Manager for Project Meridian, responsible for milestone tracking, pilot partner coordination, and go-to-market execution.`, ['product', 'project-meridian']);
  await createEntityPage(WIKI_DIR, 'Elena Rostova', `Elena Rostova is the Principal Architect leading the system architecture, persistence layer design, protocol specifications, and technical governance for Project Meridian.`, ['architecture', 'engineering', 'project-meridian']);
  await createEntityPage(WIKI_DIR, 'Sarah Lin', `Sarah Lin is the VP of Enterprise Sales leading commercial onboarding and enterprise partner relationships for Project Meridian.`, ['sales', 'commercial', 'project-meridian']);
  await createEntityPage(WIKI_DIR, 'Devon Thorne', `Devon Thorne is the Head of Risk Management responsible for counterparty credit assessments, exposure limits, and regulatory compliance underwriting.`, ['risk', 'compliance', 'governance']);
  await createEntityPage(WIKI_DIR, 'Helix Logistics', `Helix Logistics is a global freight forwarding conglomerate operating across 40 countries, selected as a primary pilot partner for Project Meridian freight rail settlement.`, ['partner', 'logistics', 'pilot']);
  await createEntityPage(WIKI_DIR, 'Solis Retail Group', `Solis Retail Group is a multi-channel retail partner collaborating on Project Meridian for instant merchant settlements and automated refund routing.`, ['partner', 'retail', 'pilot']);

  await createConceptPage(WIKI_DIR, 'Project Meridian', `Project Meridian is Aetheris Financial Technologies' flagship modernization program for 2026 to replace legacy settlement systems with a unified cloud-native real-time transaction engine designed for 100,000 TPS and sub-50ms p99 latency.

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
    details: 'Ingested program charter; created core stakeholder entities and project concepts.',
  });

  // 2. Source 2: RFC Draft Data Layer
  console.log('Ingesting Source 2: 02-architecture-rfc-draft-data-layer.md');
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
    body: `A working draft request for comments authored in early February 2026 by Principal Architect Elena Rostova proposing PostgreSQL with the Citus distributed extension as the persistence tier for Project Meridian. The proposal highlights relational ACID guarantees for balance reconciliation, existing team SQL expertise, and direct SQL reporting capabilities.`
  });

  await createConceptPage(WIKI_DIR, 'Data Persistence Layer', `The storage architecture underpinning the Project Meridian settlement ledger.

### Storage Proposals
- **PostgreSQL with Citus (Draft RFC):** Proposed in February 2026 by [Elena Rostova](../entities/elena-rostova.md) for relational ACID semantics, SQL reporting, and leveraging existing backend team expertise.`, ['architecture', 'database', 'project-meridian']);

  await appendEntry(LOG_PATH, {
    verb: 'enriched',
    subject: sum2,
    details: 'Ingested RFC draft proposing PostgreSQL with Citus extension.',
  });

  // 3. Source 3: ADR-014
  console.log('Ingesting Source 3: 03-architecture-decision-record-adr-014.md');
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
    body: `An approved Architecture Decision Record finalized on March 18, 2026 by Elena Rostova and Marcus Vance. The decision formally selects Amazon DynamoDB with DynamoDB Accelerator (DAX) as the core persistence engine for Project Meridian, replacing the earlier PostgreSQL/Citus RFC proposal after benchmarks showed Citus failed sub-50ms p99 latency targets during peak load tests at 80,000 TPS.`
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

### Evaluation & Final Decision
- **PostgreSQL with Citus (Draft Proposal):** Initially proposed in early February 2026 by [Elena Rostova](../entities/elena-rostova.md) for relational ACID guarantees. Benchmark testing in late February revealed cross-shard locking and connection pool exhaustion under 80,000 TPS peak loads, failing latency targets.
- **Amazon DynamoDB with DAX (Approved Decision):** Formally selected and approved on March 18, 2026 (ADR-014) by [Elena Rostova](../entities/elena-rostova.md) and [Marcus Vance](../entities/marcus-vance.md) as the primary persistence layer. It provides predictable single-digit millisecond latency (write <8ms, read <3ms), partition autoscaling, conditional write balance validations, and event streaming via DynamoDB Streams to Kafka and Snowflake.`
  });

  await appendEntry(LOG_PATH, {
    verb: 'enriched',
    subject: sum3,
    details: 'Ingested ADR-014; updated Data Persistence Layer concept to reflect DynamoDB adoption replacing PostgreSQL draft.',
  });

  // 4. Source 4: Engineering All-Hands
  console.log('Ingesting Source 4: 04-engineering-all-hands-meeting-notes.md');
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
    body: `Notes from the engineering all-hands meeting on April 10, 2026 hosted by VP Marcus Vance. The team reviewed Meridian Q2 sprint goals and Vance announced that engineering members contributing to Project Meridian are granted permission to work remotely up to 3 days per week to support deep focus time, with Tuesdays and Thursdays as core in-office days.`
  });

  await createConceptPage(WIKI_DIR, 'Workplace and Hybrid Work Guidelines', `Guidelines regarding remote work and on-site attendance for company employees.

### Engineering Working Model (April 2026 Meeting Notes)
According to announcements by VP of Engineering [Marcus Vance](../entities/marcus-vance.md) during the April 10, 2026 engineering all-hands sync, engineers working on Project Meridian are permitted to work remotely up to **three (3) days per week**, with Tuesdays and Thursdays designated as core collaborative in-office days.`, ['workplace', 'policy', 'remote-work']);

  await appendEntry(LOG_PATH, {
    verb: 'enriched',
    subject: sum4,
    details: 'Ingested engineering all-hands meeting notes; recorded 3-day remote work guideline for engineering.',
  });

  // 5. Source 5: Corporate Workplace Policy
  console.log('Ingesting Source 5: 05-corporate-workplace-policy-hr-2026.md');
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
    body: `Official company workplace policy issued by People & Culture / Human Resources and approved by the Executive Committee, effective January 2026. The policy mandates all full-time employees work on-site a minimum of 3 days per week, permitting remote work for a maximum of 2 days per week. The policy specifies that departmental managers and team leads do not have the authority to grant exemptions.`
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

### Corporate Workplace Policy (Official HR Policy)
The official Corporate Workplace & Attendance Policy issued by Human Resources and approved by the Executive Committee (effective January 2026) establishes:
- All full-time employees must work on-site for a minimum of **three (3) days per week**.
- Remote work is limited to a maximum of **two (2) days per week**.
- Departmental managers and team leads are explicitly prohibited from granting exemptions or variances without formal Executive Committee and Chief People Officer approval.

### Engineering Department Stated Norms (All-Hands Sync)
During the April 10, 2026 engineering all-hands meeting, VP of Engineering [Marcus Vance](../entities/marcus-vance.md) stated that Project Meridian engineers are permitted to work remotely up to **three (3) days per week** (with Tuesdays and Thursdays on-site). 

*Note on conflicting attendance requirements:* The official HR policy restricts remote work to 2 days per week and denies departmental exemption authority, whereas the engineering leadership stated a 3-day remote allowance for project engineers.`
  });

  await appendEntry(LOG_PATH, {
    verb: 'enriched',
    subject: sum5,
    details: 'Ingested HR corporate policy; synthesized official policy against engineering all-hands statement on hybrid schedule.',
  });

  // 6. Source 6: Q1 Status Update
  console.log('Ingesting Source 6: 06-q1-meridian-executive-status-update.md');
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
    body: `Executive status update covering Q1 2026 prepared by Lead PM Jordan Hayes. Project Meridian is operating under green status with architecture finalized (ADR-014 DynamoDB) and core ingestion alpha tests reaching 65,000 TPS. The release roadmap schedules Alpha for May 15, Beta for July 1, and General Availability (GA) launch on September 15, 2026.`
  });

  await writePage(join(WIKI_DIR, 'concepts/project-meridian.md'), {
    frontmatter: {
      type: 'concept',
      title: 'Project Meridian',
      tags: ['modernization', 'settlement', 'project-meridian'],
      created: now,
      updated: now,
    },
    body: `Project Meridian is Aetheris Financial Technologies' flagship modernization program for 2026 to replace legacy settlement systems with a unified cloud-native real-time transaction engine designed for 100,000 TPS and sub-50ms p99 latency.

## Key Stakeholders
- Executive Sponsor: [Marcus Vance](../entities/marcus-vance.md)
- Product Lead: [Jordan Hayes](../entities/jordan-hayes.md)
- Principal Architect: [Elena Rostova](../entities/elena-rostova.md)

## Architecture & Data Layer
The storage tier utilizes [Amazon DynamoDB with DAX](data-persistence-layer.md), finalized via ADR-014 after testing rejected an earlier PostgreSQL/Citus draft proposal.

## Pilot Partners
- [Helix Logistics](../entities/helix-logistics.md)
- [Solis Retail Group](../entities/solis-retail-group.md)

## Release Schedule & Milestones
As of the Q1 2026 status report:
- Alpha Release: May 15, 2026
- Beta Partner Sandbox: July 1, 2026
- General Availability (GA) Launch: **September 15, 2026**`
  });

  await appendEntry(LOG_PATH, {
    verb: 'enriched',
    subject: sum6,
    details: 'Ingested Q1 status update; recorded September 15, 2026 GA launch target.',
  });

  // 7. Source 7: Q2 Status Update
  console.log('Ingesting Source 7: 07-q2-meridian-executive-status-update.md');
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
    body: `Executive status update covering Q2 2026 prepared by Lead PM Jordan Hayes. Program tracking shifted to yellow status due to unexpected delays during third-party SOC2 compliance certification and extended security penetration testing. The General Availability (GA) launch date has been revised from September 15, 2026 to November 18, 2026.`
  });

  await writePage(join(WIKI_DIR, 'concepts/project-meridian.md'), {
    frontmatter: {
      type: 'concept',
      title: 'Project Meridian',
      tags: ['modernization', 'settlement', 'project-meridian'],
      created: now,
      updated: now,
    },
    body: `Project Meridian is Aetheris Financial Technologies' flagship modernization program for 2026 to replace legacy settlement systems with a unified cloud-native real-time transaction engine designed for 100,000 TPS and sub-50ms p99 latency.

## Key Stakeholders
- Executive Sponsor: [Marcus Vance](../entities/marcus-vance.md)
- Product Lead: [Jordan Hayes](../entities/jordan-hayes.md)
- Principal Architect: [Elena Rostova](../entities/elena-rostova.md)

## Architecture & Data Layer
The storage tier utilizes [Amazon DynamoDB with DAX](data-persistence-layer.md), finalized via ADR-014 after testing rejected an earlier PostgreSQL/Citus draft proposal.

## Pilot Partners
- [Helix Logistics](../entities/helix-logistics.md)
- [Solis Retail Group](../entities/solis-retail-group.md)

## Release Schedule & Timeline Updates
- **Initial Target (Q1 Status):** General Availability was planned for September 15, 2026.
- **Revised Schedule (Q2 Status):** In the Q2 2026 report, [Jordan Hayes](../entities/jordan-hayes.md) announced a schedule realignment shifting General Availability (GA) to **November 18, 2026** due to third-party SOC2 compliance certification audits and extended security penetration testing.`
  });

  await appendEntry(LOG_PATH, {
    verb: 'enriched',
    subject: sum7,
    details: 'Ingested Q2 status update; updated release schedule to reflect revised November 18, 2026 GA launch date.',
  });

  // 8. Source 8: Sales Review Helix
  console.log('Ingesting Source 8: 08-enterprise-sales-account-review-helix.md');
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
    body: `Strategic commercial account review prepared in mid-May 2026 by Sarah Lin, VP of Enterprise Sales. Helix Logistics is evaluated as our premier Tier-1 strategic anchor customer representing $4.2M projected ARR and 18M monthly settlement transactions. Lin recommends offering a 15% transaction fee discount for 12 months, dedicated escalation support, and waived onboarding fees to secure a 3-year contract.`
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
According to a strategic account review by VP of Enterprise Sales [Sarah Lin](sarah-lin.md) (May 2026):
- **Strategic Tier:** Tier-1 strategic anchor client.
- **Projected Value:** $4.2M in annual recurring revenue (ARR) and 18 million monthly settlement transactions.
- **Commercial Strategy:** Recommends offering a 15% discount on variable processing fees for 12 months and waiving onboarding implementation fees to secure a 3-year exclusivity commitment.`
  });

  await appendEntry(LOG_PATH, {
    verb: 'enriched',
    subject: sum8,
    details: 'Ingested Sales account review; documented commercial positioning and fee discount recommendations for Helix Logistics.',
  });

  // 9. Source 9: Risk Assessment Helix
  console.log('Ingesting Source 9: 09-enterprise-risk-and-credit-assessment-helix.md');
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
    body: `Counterparty credit risk assessment prepared in late May 2026 by Devon Thorne, Head of Risk Management. Helix Logistics is classified as elevated counterparty risk due to a 3.8x debt-to-equity ratio, an 18% YoY operating margin compression from fuel price volatility, and an active European customs valuation audit. The Risk Committee mandates a $2.5M cash reserve escrow, a $1.2M daily exposure cap, and strictly rejects any fee waivers or billing concessions.`
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

## Departmental Perspectives & Assessments

### Commercial & Sales Assessment (Enterprise Sales)
From the perspective of Enterprise Sales led by [Sarah Lin](sarah-lin.md) (May 2026):
- **Strategic Positioning:** Tier-1 strategic anchor client representing $4.2M projected ARR and 18M monthly settlement transactions.
- **Commercial Recommendations:** Proposes offering a 15% discount on variable processing fees and waiving upfront onboarding fees to secure rapid contract signing and showcase partner status.

### Counterparty & Credit Risk Assessment (Risk Management)
From the underwriting evaluation conducted by Head of Risk Management [Devon Thorne](devon-thorne.md) (May 2026):
- **Risk Classification:** High-risk counterparty with elevated exposure due to a 3.8x debt-to-equity ratio, 18% operating margin compression, and ongoing European customs audits.
- **Risk Guardrails & Requirements:** Mandates a rolling cash reserve escrow of at least $2.5M and a $1.2M intraday exposure cap. Fee waivers or concessions are strictly prohibited under risk governance rules.`
  });

  await appendEntry(LOG_PATH, {
    verb: 'enriched',
    subject: sum9,
    details: 'Ingested Risk assessment; updated Helix Logistics entity page to capture both Sales opportunity and Risk guardrail perspectives.',
  });

  // 10. Source 10: InfoSec Standards
  console.log('Ingesting Source 10: 10-security-audit-and-api-governance.md');
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
    body: `Information security standards established in June 2026 by Director of Information Security Priya Patel governing Project Meridian partner integrations. Mandates mutual TLS (mTLS), OAuth 2.0 with Demonstrating Proof-of-Possession (DPoP), asymmetric HMAC-SHA256 payload signatures, Tier-1 burst rate limits of 15,000 RPS (e.g. for Helix Logistics), and 7-year immutable WORM audit retention.`
  });

  await createEntityPage(WIKI_DIR, 'Priya Patel', `Priya Patel is the Director of Information Security at Aetheris Financial Technologies, responsible for cryptographic standards, API gateway security governance, and compliance audit frameworks for Project Meridian.`, ['infosec', 'security', 'governance']);

  await createConceptPage(WIKI_DIR, 'API Security and Governance Standards', `Mandatory technical and cryptographic standards for external partner connections to [Project Meridian](project-meridian.md).

## Protocol Requirements
- **Mutual TLS (mTLS):** Required for all ingress traffic to Meridian API endpoints.
- **OAuth 2.0 with DPoP:** Application-level token replay protection.
- **Payload Signatures:** HMAC-SHA256 request header signing for balance modification requests.
- **Rate Limiting:** Tier-1 partners (such as [Helix Logistics](../entities/helix-logistics.md)) receive burst limits of 15,000 RPS, while Tier-2 partners (such as [Solis Retail Group](../entities/solis-retail-group.md)) receive 5,000 RPS.
- **Data Retention:** 7-year immutable WORM storage for state transitions and signature traces.`, ['security', 'api', 'compliance']);

  await appendEntry(LOG_PATH, {
    verb: 'enriched',
    subject: sum10,
    details: 'Ingested InfoSec standards; created Priya Patel entity and API Security Standards concept.',
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

  console.log('\n=== Round 1 Smart Ingest Complete ===');
}

runFullPipeline().catch(console.error);


