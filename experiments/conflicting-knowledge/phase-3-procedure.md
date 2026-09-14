# Phase 3: unchanged extension control

Update: Copilot is bundled in VS Code 1.137.0, so the earlier extension-list
preflight missed it. Live automated capture now uses `host/README.md`; the manual
procedure below remains a fallback. See `model-preflight.json` for API availability.

Live execution requires GitHub Copilot Chat installed, signed in, and exposing a
Copilot language model to VS Code. The preflight on 2026-09-14 found no installed
Copilot extension in the default profile. No live model calls have been made.

This is the manual fallback allowed by the experiment plan. It invokes the normal
extension commands; the capture helper never ingests or supplies model responses.
Raw model responses are unavailable through upstream logging on successful calls;
record that limitation rather than treating a summary as the raw response.

## Setup and execution

1. Enable authenticated Copilot Chat in the VS Code profile used for the extension
   development host. Build the unchanged extension with `npm.cmd run build`.
2. From the repository root, run:

   ```powershell
   node experiments/conflicting-knowledge/capture.mjs validate
   node experiments/conflicting-knowledge/capture.mjs prepare agreement-r1 agreement
   ```

3. Open the resulting empty `runs/A/agreement-r1/workspace` folder in a development
   host using the repository's `packages/vscode` extension development path. Avoid
   a second installed LLM Wiki instance. Use the existing authenticated VS Code
   profile. Initialize through `LLM Wiki: Initialize Wiki`.
4. Select the intended model with `LLM Wiki: Select Model`. Record actual model,
   VS Code and Copilot extension versions, settings, and all fallback messages in
   `runs/A/agreement-r1/environment.md`. Never count mechanical fallback as success.
5. Capture the initialized state:

   ```powershell
   node experiments/conflicting-knowledge/capture.mjs snapshot agreement-r1 00
   ```

6. Ask the first manifest question in a fresh `@wiki` chat for the empty state.
   Retain the verbatim answer and references in the snapshot folder. Then ingest A
   using the ordinary file command, wait for enrichment to finish, retain the LLM
   Wiki Output channel log, and capture checkpoint `01` with the same command.
7. At every post-ingestion checkpoint, ask all three manifest queries, each in a
   fresh chat. Preserve verbatim answers and references as `query-1.md` through
   `query-3.md` beside the snapshot. Record errors and actual model identity. Do not
   save query pages, refresh/fix, manually edit wiki content, or retry inside a run.
8. Ingest G and capture `02`. Other cases use their own manifest order and fresh
   run/workspace IDs. Complete all seven cases for repeat 1 before repeats 2 and 3.
   The combined case has a third arrival/checkpoint. Never ingest gold labels.

The helper refuses existing run/checkpoint IDs, validates source hashes and expected
raw arrival prefixes, captures full byte-preserving trees and unified diffs, and
checks that the wiki did not change during capture. It does not certify enrichment,
answer correctness, model availability, or identity. Retain operational evidence
separately; missing evidence must remain not-measured. Check wiki hashes before
and after queries as specified in the plan.

## Reporting

Retain partial/failed runs. Run configuration stays `prepared-not-executed` until
operational evidence is reviewed; preparation is not a completed baseline. Use the
plan's claim evaluation schema for later scoring. Condition B remains Phase 5.
