# Experiment protocols

## Active research sequence

The research sequence has changed. **Experiment 1 is now Conflicting Knowledge**:
see [the proposed plan](conflicting-knowledge/experiment-plan.md) for inspected
code paths, controlled lending cases, Condition A/B definitions and scoring.
Phase 2 is complete: seven sources, a hashed manifest and checkpoint-specific gold
states are under `conflicting-knowledge/`. Phase 3 now uses the isolated observation
host in `conflicting-knowledge/host/`. Copilot is bundled in VS Code 1.137.0 and
available through the model API; the earlier extension-list check missed it.
See `model-preflight.json`, the host README and run completion/failure markers.
The earlier mechanical pilot and its artifacts remain valid historical records,
but are not the LLM control for the new experiment.

The numbered sections below preserve the original research backlog; their numbers
are historical, not the active execution order. In particular, the new metadata-only
Condition B replaces the old proposed contradiction-prompt variant for Experiment 1.

## Record for every run

Record ID, question/hypothesis, baseline or variant, upstream commit, harness commit
or hash, dirty diff, lockfile hash, runtime/platform, input hashes, initial snapshot,
source arrival order, configuration and prompt/model identity. Preserve each
operation and error, output snapshots, query answers/rankings, metrics, conclusions,
and limitations. A missing observation is `not measured`, never a successful result.
Keep evaluator labels outside the model context. Review labels before comparing
variants and preserve disagreements between reviewers.

## 01 - Baseline behavior

Question: what does the implementation actually compile and retrieve incrementally?
Input: pilot manifest, empty wiki, fixed order; repeat and reverse-order runs later.
Implementation: unchanged core, unchanged VS Code/Copilot, and (later) a separately
identified MCP client/model workflow. Never pool these results.
Output: snapshots after each arrival, API results, logs, queries and LLM answers.
Metrics: pages by type, actual changed/deleted pages, link counts/lint findings,
source hashes, duplicate handling, ranked query results, latency and failure count.
For LLM runs manually score concept emergence, claim retention and answer support.
Conclusion status: core pilot runnable; LLM baseline pending authenticated execution.

## 02 - Affected-page discovery

Question: which previously existing pages should receive each new claim?
Input: frozen baseline snapshots before each arrival; human-label affected pages
and supporting source spans using actual page paths, allowing multiple valid pages.
Compare current MCP keyword discovery, extension full-index context, semantic
retrieval, graph neighbors and hybrid retrieval as distinct configurations.
First run alternatives read-only over identical snapshots; do not change ingestion.
Record candidate paths, ranks, scores, retrieval parameters/model, time and labels.
Metrics: precision/recall at 5/10, missed affected pages, irrelevant candidates,
and downstream claim retention only in a later controlled ingestion comparison.
Empty expected sets require a separate false-positive rate, not division by zero.
Status: planned; no comparative effectiveness claim yet.

## 03 - Contradiction handling

Question: are incompatible claims retained with scope and attribution?
Input: retention policy versus informal note, then equal-authority conflicting
policies in the expanded corpus. Distinguish conflicts from scoped exceptions.
Compare unchanged prompts to an isolated prompt variant requiring both claims,
evidence references and unresolved status. Preserve exact prompts/responses.
Metrics: conflicting-pair detection precision/recall, both-claim retention,
unsupported reconciliation, silent replacement and answer attribution accuracy.
Status: planned; mechanical previews alone cannot measure LLM reconciliation.

## 04 - Authority and temporal validity

Question: can answers distinguish publication, effective date and authority?
Input: old approved policy, newer informal note, future-effective replacement,
and a stale policy arriving last. Metadata is domain-specific, not a universal rank.
Compare baseline text only with explicit metadata plus a documented policy:
approved policies outrank informal notes; replacements apply only on effective date.
Queries use explicit as-of dates before/after the replacement. Evaluate unresolved
equal-authority conflicts separately. Keep supersession separate from arrival order.
Metrics: current-claim accuracy, stale-claim use, future-policy leakage and correct
abstention. Record which metadata fields were necessary through ablation runs.
Status: planned; metadata does not automatically become authoritative knowledge.

## 05 - Provenance

Question: can a reviewer trace important generated statements to supporting evidence?
Input: multi-source pages and contradictory claims from frozen LLM snapshots.
Compare existing page-level references with an isolated sidecar mapping statement
IDs/spans to source IDs, content hashes and exact evidence spans. Keep raw files intact.
Metrics: supported-claim coverage, correct evidence attribution, invalid references,
and reviewer trace time. A resolving source link alone does not prove entailment.
Status: planned; determine whether sidecars add value before changing storage.

## 06 - Incremental consistency and concurrency

Question: which facts or metadata are lost when sources affect the same page?
Input: identical initial snapshot and updates A/B sharing entities and concepts.
Start A then B and B then A. Next use isolated workers with controlled barriers at
read/write boundaries in an experimental adapter, recording the exact schedule.
Compare with uncontrolled simultaneous runs separately; repeat each schedule.
Inspect page bodies, source references, index and log, not just final page count.
Metrics: claim loss relative to expected union (accounting for supersession), lost
index/log entries, duplicate entries, broken links and run-to-run divergence.
Whole-page versus structured representation remains a research question; no storage
migration or locking change until evidence identifies a failure and useful remedy.
Status: planned; sequential core source previews do not exercise shared LLM pages.

## Corpus expansion

Grow the pilot into 30-100 immutable documents across retention, access, incident
response and service ownership. Add same-content/different-name duplicates,
same-basename/different-directory collisions, paraphrases, long sources with decisive
claims past truncation limits, equal-authority conflicts, scope exceptions, explicit
supersession, and multi-hop dependencies. Version manifests and evaluation labels.
