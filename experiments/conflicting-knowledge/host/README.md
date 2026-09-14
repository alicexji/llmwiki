# Condition A observation host

Build and check from repository root:

```powershell
node experiments/conflicting-knowledge/host/check-observer.mjs
node experiments/conflicting-knowledge/host/build.mjs
code --new-window --extensionDevelopmentPath=C:/Users/alice/workspace/llmwiki/experiments/conflicting-knowledge/host C:/Users/alice/workspace/llmwiki/experiments/conflicting-knowledge/runs/A/agreement-r1/workspace
```

This development extension automatically runs Condition A when Copilot models are
available: seven cases, three repeats, each with a fresh workspace. It imports the
original `llmIngest` and chat participant registration. A build-only VS Code adapter
captures model requests/responses and captures the registered chat handler for
invocation with an empty history. It does not activate upstream raw-file watchers.
The model setting's default matches upstream; actual model identity is recorded
and must remain stable within a host session. No Condition B code is present.

The adapter forwards the same message/options/token objects, accesses streaming
text once and yields every fragment unchanged. Its fixture check covers frozen
model objects, stream accessor count, unchanged text, and error propagation. The
fixture is instrumentation verification, not evidence about LLM behavior.

Differences from the normal UI: invocation and snapshots are automated; chat output
is collected as text and reference objects rather than rendered; file-copy commands
and watchers are bypassed. No separate normal-UI parity run has been performed.
This limitation must accompany results; all original ingestion/query prompts,
parsing, retrieval, write and link functions are imported rather than recreated.

Each run preserves config/build hash, initial and post-ingestion state, unified
diffs, source hashes, actual requests/responses, ingestion logs and query outputs.
Malformed responses, model errors and source-integrity failures stop a run; failures
and partial observations remain on disk. A `complete.json` is the completion marker.
Snapshots alone do not establish success. Early excluded attempts have explicit
`exclusion.json` files. Keep those out of semantic evaluation.

Copilot is bundled in this VS Code 1.137.0 installation; `--list-extensions` omits it.
`model-preflight.json` records the real language-model API enumeration. The earlier
extension-list preflight was insufficient to determine availability.
