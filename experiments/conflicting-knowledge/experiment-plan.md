# Experiment 1: Conflicting Knowledge

Status: Phase 2 complete. Phase 3 live Condition A execution is underway through the isolated observation host. Copilot is bundled in VS Code and available through its model API. See host/README.md, model-preflight.json and run completion/failure markers. Early instrumentation-invalid attempts are excluded explicitly.
Branch: `enterprise-prototype`. Inspected upstream revision: `b44df6a`.
The earlier mechanical pilot is historical evidence, not this experiment's LLM control.

## Hypotheses and questions

H0: the existing extension sufficiently preserves and distinguishes the relevant
claims, evidence and current state for these controlled cases.
H1: some arrivals cause incorrect selection, loss of unaffected facts or attribution,
or unsupported reconciliation. Failures may arise from context or write behavior,
not necessarily model reasoning or Markdown's expressive limits.
H2: explicitly formatting existing authority/temporal information improves outcomes.
No hypothesis is assumed true. Report successes and regressions as well as failures.

Questions:

1. What survives each arrival in source summaries, synthesized pages and answers?
2. Does the system distinguish agreement, supersession, lower-authority disagreement,
   unresolved equal-authority conflict, partial update and ambiguity?
3. Does structured metadata help when facts, model and update code are held fixed?
4. Are observed failures attributable to missing context, generation, persistence,
   retrieval or evidence representation? Which causes remain indistinguishable?

## Inspected implementation

Paths below are relative to the repository root; line numbers refer to the inspected revision.

| Stage | Files/functions | Current behavior |
| --- | --- | --- |
| Entry | `packages/vscode/src/commands.ts:251`, ingest loop; `extension.ts:281`, watcher path | Command copies external sources into raw storage and calls `llmIngest` sequentially. Watcher/scan paths can also trigger ingestion. |
| Mechanical ingest | `packages/core/src/ingest.ts:30`, `ingestSource` | Creates a filename-slug source summary with a 500-character preview; updates index/log. Existing summary skips unless forced. No content-based duplicate detection. |
| Context | `packages/vscode/src/llmIngest.ts:62`, `llmIngest` | Extracts incoming source text and reads the full index after mechanical ingestion. Sends titles, paths, categories and index summaries; does not read existing entity/concept bodies into the prompt. |
| Generation | `packages/vscode/src/llmIngest.ts:159`, `callLlm` | Sends up to 60,000 source characters plus index. Requests JSON summary, entities, concepts and crosslinks. No explicit update decision or conflict-resolution field. |
| Page decisions | `packages/vscode/src/llmIngest.ts:101`, entity/concept loops | Model chooses names/content. New slug creates a page; an existing slug is written again. Different names may fragment one topic across pages. |
| Persistence | `packages/core/src/wiki.ts:35`, `writePage`; `:104`, `createEntityPage`; `:143`, `createConceptPage` | Writes complete content/frontmatter. Same-slug creation does not merge prior claims. Creation appends an index entry via `index-ops.ts` `addEntry`, so repeated paths may duplicate index entries. |
| Provenance | `packages/vscode/src/llmIngest.ts:103` and `:120` | Each generated entity/concept receives `sources = [current source-summary path]`. The summary retains `source_path` to raw evidence when its body is rewritten. Prior references are not unioned; incidental prose citations may survive only if generated. |
| Relationships | `packages/vscode/src/llmIngest.ts:136`, `addCrosslinks` | Model proposes links from index/new pages. Links are not a graph traversal used to retrieve old claim content for ingestion. |
| Separate MCP path | `packages/core/src/ingest-context.ts:146`, `ingestWithContext` | Mechanical ingest plus keyword search using first 20 extracted keywords, then excludes created/updated paths. The extension does not call this for its LLM ingestion. |
| Separate MCP updates | `packages/core/src/mcp/write-tools.ts:402`, `wiki_update_page` | Preserves existing frontmatter unless selected fields change; replaces body or appends text, with replacement taking precedence. No semantic claim merge. Agent must choose operations. |
| Query | `packages/core/src/query.ts:42`, `queryWiki`; `packages/vscode/src/chatParticipant.ts:129` | Title/index-summary match gates body scoring. Chat reads top eight results, up to 3,000 characters each, plus full index. Missing retrieval can hide otherwise preserved facts. |
| Model selection | `packages/vscode/src/modelSelection.ts:24`, `selectPreferredModel` | Configured Copilot family can fall back to another model. No model/failed analysis can leave mechanical output. Record actual identity, not just requested family. |

There is no typed contradiction, supersession, authority, effective-date or current
claim state in the ingestion response schema or enforced update logic. Markdown
can express these ideas voluntarily. Arbitrary frontmatter is possible, but does
not provide claim semantics by itself. MCP research/lint prompts mention
contradictory information; that is not an implemented contradiction detector or
the extension's ingestion prompt. The generated wiki AGENTS.md is not read by
`callLlm`. Raw immutability is a convention; verify bytes rather than assuming it.

## Proposed corpus and evaluator policy

Domain: fictional Northstar Standard Home Loan, one jurisdiction, owner-occupied
purchase loans, same borrower class and currency. No unstated scope exceptions.
Seven short Markdown documents, preferably 150-250 words each, stable document IDs
and descriptive filenames. Repeated subject naming encourages natural reuse but
does not force model page names. Exact prose will be frozen after plan review.

| ID | Source | Claims and explicit metadata |
| --- | --- | --- |
| A | 2025 approved policy | Maximum LTV 80%; maximum term 30 years; minimum credit score 680. Approved by Lending Policy Committee; published 2024-12-15; effective 2025-01-01. |
| G | Agreeing approved bulletin | Reaffirms all three A facts, same scope. Committee-approved; published/effective 2025-06-01; no replacement claim. |
| B | 2026 team notes | Says maximum LTV is 85%. Informal team notes dated 2026-02-01; explicitly not policy approval. No effective date. |
| C | 2026 approved replacement | Maximum LTV 82%; term 30 years; credit score 680. Committee-approved; published 2026-02-15; effective 2026-03-01; explicitly supersedes A on that date. |
| D | Conflicting approved directive | Maximum LTV 83%, same scope and approving committee as A. Published 2024-12-15; effective 2025-01-01. Explicitly no stated precedence or supersession relationship. |
| E | Partial approved amendment | Changes minimum credit score to 700 from 2026-02-01. Published 2026-01-15. Amends only A's score requirement; all other A terms remain unchanged, without repeating their values. |
| F | Ambiguous draft discussion | 'We may be able to go up to 85% for some applications; scope and approval are still to be confirmed.' Draft dated 2026-02-01; no effective date or approved policy change. |

All authority, dates and relationships above appear naturally in the source prose
for both conditions. The experiment must not hide decisive evidence from A and
then claim B improved reasoning by receiving new facts.

The fictional domain's interpretation rules are preregistered evaluator assumptions:
approved policy outranks informal/draft discussion; explicit replacement takes
effect on its stated date; a partial amendment changes only its named field;
equal-authority, equal-date incompatibility with no precedence stays unresolved.
These are not universal enterprise rules. To make the expected state objectively
recoverable, A's source prose states these governance rules, without mentioning
test cases or future source values. No external evaluator instructions are sent
to the model. A valid unresolved answer need not select a numeric winner.

| Case | Arrival order in fresh wiki | Expected final state and checks |
| --- | --- | --- |
| Agreement | A, G | LTV 80%, term 30, score 680. Both supporting sources traceable; no invented conflict. |
| Supersession | A, C | As of 2026-02-20: 80%; as of 2026-03-15: 82%. A historical, C current only after effective date; other fields intact. |
| Lower authority | A, B | LTV remains 80%; preserve and attribute the 85% disagreement as informal. Do not adopt 85% or invent a compromise. |
| Equal authority | A, D | Explicit unresolved 80% versus 83%, with both sources. No justified unique current LTV; term 30 and score 680 remain known. |
| Partial update | A, E | As of both query dates: score 700, LTV 80%, term 30. A's prior score 680 is historical; retain its unchanged claims. |
| Ambiguity | A, F | LTV 80%, term 30, score 680. 85% is tentative/underspecified, not a definite approved contradiction or policy change. |
| Combined sequence | A, B, C | After B: 80% approved versus 85% informal. After C: 80% before March 1, 82% after; 85% remains attributed informal disagreement. |

Every intermediate checkpoint has gold state based only on sources ingested so far.
Before any ingestion, expected answer is insufficient information. Source histories
must not incorporate later evidence retroactively. Gold labels are separate files
and never included in prompts. Gold states describe meaning, not required wording,
page count, filename or a prescribed representation.

## Conditions and run schedule

Condition A: unchanged VS Code `llmIngest` behavior, prompts and source bytes.
Condition B: the identical flow with one added, clearly delimited metadata block
on the incoming source message. Fields: source ID/type, authority (descriptive,
not a confidence score), publication date, effective date, supersedes and status.
Values only restate that source's prose; absent values are null. C's relationship
includes its effective date; do not retroactively mark A retired in its initial input.
No prior-source metadata catalog, new retrieval, old page bodies, resolution rules,
or claim schema is added. This tests metadata formatting/salience, not extra memory.
If incoming-only metadata proves insufficient, a catalog is a separate future condition.

Freeze model, source order, gold labels, queries and observer before baseline runs.
Run A once for all seven cases, inspect technical validity and complete evaluation,
then repeat all seven twice for three independent runs per case. Only after A is
documented run B with the same three repeats. Each case/repeat/condition starts
empty; B never starts from A's final wiki. No tuning against the scored cases.

Budget: 15 arrivals per sweep x 3 repeats x 2 conditions = 90 ingestion calls.
Three questions per post-ingestion checkpoint adds 270 answer calls. Initial empty
state is captured and queried once per case run (42 additional answer calls).
Report achieved counts if model access, latency or cost limits this schedule;
one valid run per condition/case is a pilot, not a variability estimate.
Later order-reversal tests are separate sensitivity analyses, not pooled here.
Because A precedes B, record provider/model versions and dates; provider drift
remains a limitation and may require an A repeat after B as a separately labeled check.

## Minimum harness proposal

Keep instrumentation under `experiments/conflicting-knowledge/`; no core edits.
Use an isolated VS Code extension-host driver invoking the actual imported
`llmIngest`, `initWiki` and core persistence functions. A test-build-only adapter
around the language-model request boundary records exact requests and streamed
responses while forwarding to the real selected Copilot model. No mock-generated
text counts as evidence. Do not reimplement the ingestion prompt or write loop.
Condition B's sole behavior delta is the metadata block at this boundary.

Before data collection, verify observer fidelity: captured A requests match
upstream construction, responses are forwarded unchanged, calls are neither
retried nor reordered, and snapshot/hash collection does not mutate the wiki.
Use a recorded response only for that instrumentation check, clearly excluded
from scored live runs. Compare an instrumented smoke run with the normal command's
flow; account for command/watcher bookkeeping separately. Prevent a second active
extension/watcher from ingesting the same files in driver workspaces.

Fallback if interception cannot preserve behavior: manual unchanged extension runs
with a snapshot helper and documented steps. Mark unavailable raw responses as
unavailable. Do not silently substitute MCP, another provider or core mechanical
ingestion. Confirm authenticated Copilot model access before scheduling live runs.

For each arrival:

1. Verify source hash and prior snapshot; copy the next immutable source into raw.
2. Capture request/model identity/options, start time and upstream output-channel log.
3. Await one complete ingestion; preserve raw response before parsing and all errors.
4. Snapshot full raw/wiki/schema, hashes and actual added/modified/deleted paths;
   save unified diffs. API 'created' arrays are not proof that a page was new.
5. Run the three fixed queries in separate fresh chat sessions, preserve answers,
   selected page paths and references. Keep metadata treatment ingestion-only:
   query prompt/code is identical across A and B, with no additional metadata.
6. Verify queries did not change wiki hashes. No save, refresh, lint-fix or manual
   content edits during a run. Read-only structural lint is allowed and recorded.

Queries, with identical wording at every post-ingestion checkpoint:

- 'For Northstar Standard Home Loan, what maximum LTV, maximum term and minimum
  credit score apply as of 2026-02-20? Cite the sources and state any uncertainty.'
- Same question with `2026-03-15` as the date.
- 'For Northstar Standard Home Loan, which claims agree, disagree, are tentative,
  or supersede earlier claims? Identify the claims and their sources.'

Query 3 explicitly probes conflict knowledge; report it separately from spontaneous
conflict labeling in generated pages. Query success alone does not prove that
ingestion compiled the conflict: answers may reconcile separate summaries at query time.

## Exact evaluation methodology

Evaluate three surfaces separately: (1) individual generated source summaries,
(2) all entity/concept pages about the domain, and (3) query answers. Raw evidence
retention is an integrity check, not successful compiled-knowledge preservation.
Missing synthesis pages count as unavailable synthesis, not as correct knowledge;
report their frequency. Follow claims across differently named pages; do not score
only a convenient canonical page. Flag inconsistent assertions across pages.

Unit: case x condition x repeat x checkpoint x as-of date x claim x surface.
Claim keys are scoped predicates, e.g. Northstar/standard/maximum-LTV; source A's
80% and C's 82% are distinct assertions about that key. Evaluate all three policy
fields plus each introduced alternative; historical preservation is a separate flag.
Source-summary accuracy is scored against its own evidence, not forced to become
the current policy after later sources arrive.

Proposed `claim-results.jsonl` columns (CSV/Markdown view generated from the same data):

`case_id, condition, repeat, checkpoint, as_of, claim_key, surface, old_claim,
new_claim, expected_state, actual_text, page_or_answer, evidence_spans,
old_preserved, new_preserved, both_mentioned, contradiction_explicit,
supersession_correct, current_state_correct, provenance_level,
unsupported_reconciliation, disposition, reviewer, rationale`.

Flags use true/false/not-applicable/not-measured. Preserve verbatim output spans
and evidence references for each judgment. Disposition is retained/replaced/both/
omitted/unresolved; it does not substitute for correctness flags.

Scoring rules:

- Current-state correctness: exact applicable value(s), scope and temporal status;
  unresolved equal-authority conflict is correct only when both alternatives and
  absence of justified precedence are made clear. 'Not enough information' alone
  is insufficient when the conflict and evidence are available.
- Conflict preservation: both incompatible assertions remain identifiable and
  attributed. Their mere presence in separate raw files is insufficient. Explicit
  contradiction detection additionally requires labeling their incompatibility.
- Supersession: old value retained as historical, new value applied only on its
  effective date. A replacement without this distinction fails historical-state
  scoring even if the new numeric answer is correct.
- Partial updates: score changed credit threshold and untouched term/LTV separately.
  Absence of untouched facts is omission, not automatically incorrect truth selection.
- Provenance: 0 = missing/incorrect support; 1 = resolvable supporting page-to-raw
  chain; 2 = unambiguous statement-to-source attribution supported by exact evidence.
  Level 2 can be achieved in ordinary prose; no typed claim implementation is required.
  Record source IDs lost versus the prior snapshot and all expected supporting IDs.
- Unsupported reconciliation: asserted compromise, scope exception, precedence or
  other explanation absent from evidence. Merely reporting uncertainty is not a failure.
- Ambiguity/agreement: definite conflict claims where none is established are false
  positives. Do not penalize accurately labeled tentative disagreement.

Mechanical checks compute hashes, diffs, link resolution, page/index changes and
numeric occurrence candidates. Human review decides entailment, scope, modality,
authority and temporal status. Review artifacts with condition labels concealed
where practical; metadata may reveal the treatment. A second reviewer independently
scores all disputed/failure rows and at least 20% of remaining rows when available.
Retain original labels and adjudication; disclose single-reviewer results otherwise.

Aggregate counts and denominators, separately per surface/case/condition:

- Incorrect overwrites / transitions with previously correct applicable knowledge.
- Correct unresolved conflicts / equal-authority conflict opportunities; separately
  count conflicts left unacknowledged or incorrectly resolved.
- Incorrect truth selections / current-state evaluation rows.
- Lost attribution / previously attributed assertion-source pairs eligible to survive.
- Unsupported reconciliations / evaluated generated claim rows.
- Successful updates / update transitions: changed fact correct, unaffected facts
  retained and required historical/source distinctions preserved.
- Correct current states / evaluable claim rows, and full-case success count.
- Run inconsistency / matched case-checkpoint-claim groups: fraction with different
  semantic labels across three runs; prose-only variation does not count.

Report paired A/B percentage-point differences per matched case/checkpoint and
case-level averages so longer cases do not dominate. Show raw repeat outcomes;
three runs are descriptive, not statistically independent claim-row evidence.
Do not report significance or general enterprise effectiveness from this corpus.
Zero denominators are not-applicable. Failed calls/parse errors/fallback are recorded
as execution failures, excluded from semantic denominators and included in a
separate attempted-run reliability rate. Preserve partial snapshots; reruns get
new IDs and never replace failed evidence.

## Artifacts after review

```text
experiments/conflicting-knowledge/
  experiment-plan.md
  corpus/*.md
  manifest.json                 # order, IDs, hashes, factual metadata
  evaluation/gold.json          # expected state per checkpoint/date; never prompt input
  runner/                      # small host driver and observation adapter
  runs/<condition>/<case>/<repeat>/
    config.json                # source/build/harness hashes, model, runtime, options
    initial/                   # complete snapshot
    steps/<n>/                 # snapshot, diff, request, response, logs, queries
    claim-results.jsonl
  experiment-results.md        # A/B counts, examples, failures, limits
  design-implications.md        # supported implications and unresolved alternatives
```

No outputs or conclusions are created in this planning phase. The existing pilot
artifacts remain intact. New run records pin source revision, dirty diff and harness
hashes; model seed/temperature or provider revision unavailable through upstream
must be explicitly marked unavailable. Do not change upstream options to force determinism.

## Representation investigation and decision rules

Classify failure location using request -> response -> persisted diff -> retrieval
-> answer. Missing prior facts in the request support investigating context retention;
correct response lost during persistence supports investigating write semantics.
Preserved pages omitted from query context support investigating retrieval. These
do not alone demonstrate that Markdown cannot represent the necessary state.

For each observed failure ask whether prose with source links could express the
missing distinction: claim, evidence, authority, date, contradiction, supersession,
current versus historical. Cite a successful Markdown example when observed.
Discuss a minimal representation example only as a proposal, never as a run output.
If B helps, identify which cases improved; this bundled treatment cannot establish
which individual metadata field caused the improvement without later ablations.

Typed claims may merit a subsequent experiment if distinctions are repeatedly lost
or cannot be reliably evaluated/traced. A graph database, numerical confidence,
automated truth-selection algorithm, production storage and scale work remain
unjustified by this experiment alone. Record sufficient existing behavior explicitly.

Phase 2 artifacts: `corpus/`, `manifest.json`, and `evaluation/gold.json` with an
evaluator README. The seven sources are 174-186 words each. Phase 3 instrumentation
and execution remain pending; no observed outcomes are implied by the gold states.
