import { mkdir, readFile, writeFile, readdir, copyFile } from 'node:fs/promises';
import { createHash } from 'node:crypto';
import { execFileSync } from 'node:child_process';
import { dirname, join, relative } from 'node:path';
import { fileURLToPath } from 'node:url';
import { performance } from 'node:perf_hooks';
import { initWiki, ingestWithContext, queryWiki, getWikiStatus, lintWiki,
  readIndex, readPage, listPages, getPageLinks } from '../packages/core/dist/index.js';

const here = dirname(fileURLToPath(import.meta.url));
const repo = dirname(here);
const corpus = join(here, 'corpora', 'pilot');
const manifestBytes = await readFile(join(corpus, 'manifest.json'));
const manifest = JSON.parse(manifestBytes);
const hash = (bytes) => createHash('sha256').update(bytes).digest('hex');
const git = (...args) => execFileSync('git', args, { cwd: repo, encoding: 'utf8' });
const run = join(here, 'runs', new Date().toISOString().replace(/[:.]/g, '-'));
await mkdir(run, { recursive: true });
const workspace = join(run, 'workspace');
const root = join(workspace, '.wiki');
const save = async (name, value) => writeFile(join(run, name), JSON.stringify(value, null, 2) + '\n');

async function snapshot(directory, prefix = '') {
  const files = {};
  for (const entry of (await readdir(directory, { withFileTypes: true })).sort((a, b) => a.name.localeCompare(b.name))) {
    const path = prefix ? `${prefix}/${entry.name}` : entry.name;
    if (entry.isDirectory()) Object.assign(files, await snapshot(join(directory, entry.name), path));
    else if (entry.isFile()) files[path] = await readFile(join(directory, entry.name), 'utf8');
  }
  return files;
}

const sourceHashes = {};
for (const doc of manifest.documents) sourceHashes[doc.file] = hash(await readFile(join(corpus, doc.file)));
const config = {
  mode: 'core-mechanical-with-context', llm_executed: false,
  started: new Date().toISOString(), upstream_commit: git('rev-parse', 'HEAD').trim(),
  branch: git('branch', '--show-current').trim(), git_status: git('status', '--short'),
  tracked_diff: git('diff', 'HEAD'), node: process.version, platform: process.platform,
  lockfile_sha256: hash(await readFile(join(repo, 'package-lock.json'))),
  harness_sha256: hash(await readFile(fileURLToPath(import.meta.url))),
  manifest_sha256: hash(manifestBytes), source_sha256: sourceHashes,
  manifest, force: false, dry_run: false, initial_state: 'empty',
};
await save('config.json', config);
await save('init.json', await initWiki(workspace));
let previous = await snapshot(root);
await save('snapshot-00.json', previous);
const steps = [];
try {
  // Preserve source order explicitly; filesystem enumeration never selects arrivals.
  for (const [offset, doc] of manifest.documents.entries()) {
    await copyFile(join(corpus, doc.file), join(root, 'raw', doc.file));
    const started = performance.now();
    const result = await ingestWithContext(join(root, 'raw', doc.file), root, false, false);
    const elapsed_ms = performance.now() - started;
    const current = await snapshot(root);
    const queries = [];
    for (const query of manifest.queries) queries.push(await queryWiki(query, root, false));
    const paths = new Set([...Object.keys(previous), ...Object.keys(current)]);
    const changes = { added: [], modified: [], deleted: [] };
    for (const path of paths) {
      if (!(path in previous)) changes.added.push(path);
      else if (!(path in current)) changes.deleted.push(path);
      else if (previous[path] !== current[path]) changes.modified.push(path);
    }
    const pages = await listPages(join(root, 'wiki'));
    const page_types = {};
    for (const pagePath of pages) {
      const page = await readPage(pagePath);
      const type = page.frontmatter.type ?? 'untyped';
      page_types[type] = (page_types[type] ?? 0) + 1;
    }
    const raw_unchanged = {};
    for (const arrived of manifest.documents.slice(0, offset + 1)) {
      raw_unchanged[arrived.file] = hash(await readFile(join(root, 'raw', arrived.file))) === sourceHashes[arrived.file];
    }
    const step = { step: offset + 1, source: doc.file, elapsed_ms, result, changes,
      page_types, markdown_links: Object.entries(current).filter(([p]) => p.startsWith('wiki/'))
        .reduce((sum, [, content]) => sum + getPageLinks(content).length, 0),
      raw_unchanged, queries, index: await readIndex(join(root, 'wiki', 'index.md')),
      status: await getWikiStatus(root), lint: await lintWiki(root) };
    steps.push(step);
    const number = String(offset + 1).padStart(2, '0');
    await save(`step-${number}.json`, step);
    await save(`snapshot-${number}.json`, current);
    previous = current;
    if (result.ingest.status !== 'success' || Object.values(raw_unchanged).includes(false)) {
      throw new Error(`Baseline failed at ${doc.file}; inspect step-${number}.json`);
    }
  }
  const replay = await ingestWithContext(join(root, 'raw', manifest.documents[0].file), root, false, false);
  await save('duplicate-replay.json', { result: replay, files_unchanged: JSON.stringify(previous) === JSON.stringify(await snapshot(root)) });
  await save('summary.json', { status: 'complete', llm_executed: false, steps: steps.length,
    final_status: steps.at(-1).status, page_types: steps.at(-1).page_types,
    source_integrity: steps.every(s => Object.values(s.raw_unchanged).every(Boolean)),
    total_ingest_ms: steps.reduce((sum, s) => sum + s.elapsed_ms, 0),
    limitations: ['No LLM executed', 'No semantic, authority, claim provenance or concurrency variant executed'] });
  console.log(`Baseline artifacts: ${relative(repo, run)}`);
} catch (error) {
  await save('failure.json', { message: String(error), stack: error.stack, completed_steps: steps.length });
  throw error;
}
