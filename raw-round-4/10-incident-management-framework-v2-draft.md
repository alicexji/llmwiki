---
source_type: operational_policy
department: IT Operations & SRE
status: draft_revision
published_at: 2026-05-10
---

# Proposed Incident Management Framework v2.0 (RFC-OPS-2026-02)

Prepared by the Incident Operations Modernization Working Group within IT Operations & SRE for review and feedback across engineering and operations teams.

## 1. Motivation for Modernization
Our legacy 2024 incident escalation protocols impose heavy overhead during early triage, generating unnecessary executive interruptions during minor threshold crossings and fracturing responder focus through manual email status reporting.

## 2. Proposed v2 Workflow & Escalation Adjustments
This draft revision proposes updating the existing 2024 operating policy with the following streamlined protocols:
- **Automated P1 Notification:** Transition from manual phone trees to automated PagerDuty broadcast notifications dispatched within **five (5) minutes** of automated metric alert correlation.
- **Asynchronous Status Updates:** Replace 30-minute executive email blasts with live status updates posted every **sixty (60) minutes** to a dedicated executive Slack broadcast channel (`#incidents-live-exec`).
- **Targeted VP Escalation:** Defer mandatory VP of Engineering escalation until an incident remains uncontained after **forty-five (45) minutes**, allowing technical squads initial uninterrupted focus.

## 3. Feedback and Ratification Schedule
This document is an active draft revision under discussion. Teams are invited to submit feedback prior to submission to the Operations Review Board for formal approval.
