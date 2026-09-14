# Baseline findings

## Architecture inspected at b44df6a

The npm workspace contains a filesystem/MCP core and a VS Code extension.
`initWiki(workspace)` scaffolds `workspace/.wiki`; ingestion APIs instead take the
`.wiki` root. Markdown/frontmatter, index and log are the persisted representation.

Source inspection establishes these behaviors; they are not LLM experiment results:

- `packages/core/src/ingest.ts`: mechanical ingestion writes a 500-character source
  preview and updates index/log. Duplicate detection checks the filename-derived
  summary path, not a content hash. Force-ingestion rewrites the summary.
- `packages/core/src/ingest-context.ts`: the MCP context path extracts up to 200
  unique keywords from an initial character window, queries with the first 20,
  then removes newly created/updated paths from related results.
- `packages/core/src/query.ts`: title matches score 3, index-summary matches 2,
  body matches 1. Only pages with a title/summary match enter body scoring.
  Consequently a body-only fact can be unretrievable despite being present.
- `packages/vscode/src/llmIngest.ts`: the model sees source text (up to 60,000
  characters) and the full index, not existing page bodies. It returns summaries,
  entities, concepts and links. It does not call `ingestWithContext` for discovery.
  No explicit contradiction or authority protocol is present in this prompt.
- `packages/core/src/wiki.ts`: entity/concept creation writes same-slug files
  without a content merge. Extension enrichment then assigns `sources` to just
  the current source-summary path. This makes prior-claim and provenance loss
  plausible; actual model naming and overwrite frequency remain to be measured.
- `packages/vscode/src/chatParticipant.ts`: answers use the index and up to eight
  keyword-selected page bodies, each truncated to 3,000 characters. This differs
  from the core search API, which returns ranked excerpts without LLM answers.
- MCP tools expose write/update operations and prompts to an external agent;
  their availability is not evidence that the extension executes that workflow.
- Raw immutability is a workflow convention, not filesystem enforcement. Source
  removal and refresh/fix paths can delete generated pages. Baseline observation
  should avoid these mutations and verify evidence hashes.
- Page writes, index updates and log appends are separate filesystem operations.
  No transactional shared-page update is established by this inspection.

## Execution record

Node: 22.21.0. Initial `npm ci` failed under sandbox network permissions.
An authorized retry using npm 11.14.1 rejected esbuild peer resolution
(`0.28.1` locked versus `0.28.2` requested by resolution). Installation was retried
with `npm.cmd ci --legacy-peer-deps --no-audit --no-fund`; this is a recorded
environment configuration, not a lockfile or application change.

The legacy-peer installation succeeded (526 packages). The unchanged build passed
after an authorized retry outside the sandbox because esbuild could not read an
ancestor directory. Type-checking passed and all 466 tests in 26 files passed.
Neither package manifests nor the lockfile changed.

## Observed mechanical pilot

Artifacts: `runs/2026-09-14T18-38-30-085Z/`. See `config.json` for hashes and order,
`step-01.json` through `step-08.json` for operations and ranked queries, and the
nine full snapshots for initial and intermediate state. No model was involved.

- Eight arrivals produced eight source pages, zero entities and zero concepts.
  The two untyped Markdown files in the type histogram are index and log.
- Previously ingested source pages did not change. Only index/log changed on each
  arrival, alongside the added raw file and source preview.
- All raw source hashes remained unchanged. Final index coverage was 100% with
  zero status-reported orphans; coverage does not measure factual completeness.
- Identical content under `04-atlas-copy.md` produced a separate source page.
  Replaying `01-atlas.md` was skipped and left every file unchanged. The skipped
  replay included its own summary among related results because no created/updated
  paths were returned for exclusion.
- `Orion` returned zero matches at every checkpoint despite appearing in previews.
  This confirms the title/index-summary gate identified in source inspection.
- Final `Atlas` and `retention` searches each returned two pages. Both explicit
  as-of-date questions returned two results; these are retrieval outputs, not
  temporally reasoned answers.
- Related-page counts per arrival were 0, 1, 2, 2, 3, 4, 5, 2. No affected-page
  precision or recall is claimed without labels over an LLM-compiled snapshot.
- Total measured ingestion time was approximately 106 ms for eight documents.
  This is one local mechanical run, not a throughput benchmark.

The initial pilot establishes filesystem, duplicate and lexical-retrieval behavior.
It does not demonstrate the central LLM compilation behavior. Next, execute the
unchanged extension on the same evidence and review claim retention before adding
any discovery or contradiction variant.

LLM baseline: not executed. A terminal-only mechanical run cannot establish topic
emergence, synthesis, contradictions, answer quality or concurrent LLM updates.
Use the extension protocol in `README.md` before drawing those conclusions.
