# Expected states: evaluator only

Do not ingest this directory or the manifest. Only the seven files under `corpus/`
are source evidence. The manifest supplies arrival order and the incoming metadata
block for a later Condition B; it is not itself model input.

`gold.json` defines exact source excerpts and complete expected states referenced
by each case/checkpoint/date. Each case starts empty. Do not ingest all seven
documents into one wiki: that would mix isolated scenarios. The combined case is
specifically A, B, C. These are expected states, not observed experiment results.

| Case | After A | After second source | After third source |
| --- | --- | --- | --- |
| Agreement | 80%, 30 years, 680 | Same values; A and G agree | N/A |
| Supersession | 80%, 30 years, 680 | LTV 80% on February 20; 82% on March 15; other values unchanged | N/A |
| Lower authority | 80%, 30 years, 680 | Same approved values; B asserts informal 85% | N/A |
| Equal authority | 80%, 30 years, 680 | LTV unresolved: A 80% vs D 83%; term 30, score 680 | N/A |
| Partial update | 80%, 30 years, 680 | LTV 80%, term 30, score 700; only prior score historical | N/A |
| Ambiguity | 80%, 30 years, 680 | Same approved values; F's possible 85% is tentative | N/A |
| Combined | 80%, 30 years, 680 | Same approved values; B asserts informal 85% | A before March 1, C afterward; B still informal |

Both as-of dates are in 2026. Historical means the source assertion is preserved
with its past applicability, not erased. C is not applied before its effective date.
E's metadata uses a field-scoped supersedes relation, not whole-document retirement.
A's input status remains approved; it is not retrospectively edited after C arrives.

For query 3, use the relationships in the checkpoint's two date-specific states:
describe the transition explicitly rather than selecting an implicit 'today'. Score
source summaries against their own assertions. Score synthesized pages and answers
using applicable states. The complete scoring protocol remains in experiment-plan.md.

Limitations: these short documents deliberately state scope and governance clearly.
That makes the oracle defensible, but is easier than ambiguous real enterprise
evidence. The amendment deliberately omits unchanged numbers. A failure there must
be distinguished from a model never receiving A's body during later ingestion.
