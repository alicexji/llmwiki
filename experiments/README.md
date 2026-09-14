# Enterprise prototype research

Upstream baseline: `b44df6a` on branch `enterprise-prototype`. The original packages,
prompts, dependencies, and wiki schema remain unchanged. This directory is an
external measurement harness, not a new application architecture.

## Minimal structure

- `corpora/pilot/`: immutable synthetic evidence and an ordered manifest.
- `protocols.md`: questions, comparisons, metrics, and completion criteria.
- `run-baseline.mjs`: invokes the existing core APIs without replacing behavior.
- `runs/<unique-id>/`: configuration, full snapshots, per-step results and metrics.
- `baseline-findings.md`: observed results and limitations, separate from hypotheses.

Start with eight documents; expand to 30-100 only after the pilot establishes a
usable measurement protocol. Keep each new source revision as a distinct file.
Metadata in the manifest is evaluation-only in the baseline: it is not injected
into prompts. A metadata-aware experiment must explicitly record how it exposes
those fields to the model. Do not expose expected answers to ingestion.

## Run the mechanical baseline

From the repository root:

```powershell
npm ci
npm run build
npm test
npm run lint
node experiments/run-baseline.mjs
```

On this machine npm 11.14.1 rejected the lockfile's default peer resolution;
`npm.cmd ci --legacy-peer-deps --no-audit --no-fund` installed the existing lockfile
successfully. Use that recorded configuration to reproduce the pilot environment.

Each invocation creates a fresh workspace and never reuses a previous wiki.
Snapshots contain the complete wiki, schema, and raw evidence as JSON text maps;
these are intentionally retained for this small synthetic corpus. Reports include
hashes, actual file changes, API responses, retrieval rankings, duration, status,
and lint results. Timing includes local filesystem overhead, not LLM latency.
Snapshot differences include timestamps; compare content separately when checking
repeatability. Core API bookkeeping is not assumed to equal actual page changes.

## Complete the original LLM baseline

The automated runner measures **core mechanical ingestion and context discovery**.
It does not run Copilot, simulate a model, or establish LLM answer quality.
The extension and MCP agent workflows are separate baselines, not interchangeable.

1. Build the unchanged extension. Open a fresh, isolated folder in an extension
   development host with `packages/vscode` as the extension development path.
2. Initialize via `LLM Wiki: Initialize Wiki`. Select an available Copilot model.
   Record actual model identity/family, VS Code/extension versions, date, settings,
   and fallback/error messages. Do not accept mechanical fallback as an LLM run.
3. Ingest each pilot file individually in manifest order through the normal command.
   Wait for completion before the next file; retain the Output channel log.
4. Copy the full `.wiki` tree to a numbered snapshot outside the active workspace
   after every source. Record wall time and actual added/modified/deleted files.
   Hash raw evidence before and after. Avoid refresh/fix until snapshots are saved:
   those commands can mutate the wiki.
5. Ask the manifest questions in fresh `@wiki` conversations at each checkpoint.
   Preserve answers and displayed references verbatim. Record which source claims
   survive, which disappear, and whether both sides of conflicts are attributed.
6. Repeat at least three times with the same order/model, then reverse the update
   order in separate runs. Retain failed and partial runs. Model parameters or raw
   responses not exposed by upstream should be marked unavailable, not inferred.

Use the record template in `protocols.md` for manual runs. Authenticated Copilot
access is required to finish this baseline; headless core tests cannot establish it.
No enterprise retrieval, claim storage, or concurrency fix is proposed yet.
