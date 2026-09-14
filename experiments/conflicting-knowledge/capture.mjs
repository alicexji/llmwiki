import { readFile, writeFile, readdir, mkdir, cp } from 'node:fs/promises';
import { createHash } from 'node:crypto';
import { execFileSync } from 'node:child_process';
import { dirname, join, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const base = dirname(fileURLToPath(import.meta.url));
const repo = resolve(base, '../..');
const manifest = JSON.parse(await readFile(join(base, 'manifest.json'), 'utf8'));
const sha = bytes => createHash('sha256').update(bytes).digest('hex');
const [command, runId, label] = process.argv.slice(2);
const safe = value => typeof value === 'string' && /^[a-zA-Z0-9_-]+$/.test(value);
const git = (...args) => execFileSync('git', args, { cwd: repo, encoding: 'utf8' });
const json = (path, value) => writeFile(path, JSON.stringify(value, null, 2) + '\n', { flag: 'wx' });

async function files(directory, prefix = '') {
  const result = {};
  for (const entry of (await readdir(directory, { withFileTypes: true })).sort((a, b) => a.name.localeCompare(b.name))) {
    const name = prefix + entry.name;
    if (entry.isSymbolicLink()) throw new Error(`Unexpected symlink: ${name}`);
    if (entry.isDirectory()) Object.assign(result, await files(join(directory, entry.name), name + '/'));
    else result[name] = sha(await readFile(join(directory, entry.name)));
  }
  return result;
}

async function validate() {
  for (const doc of manifest.documents) {
    if (sha(await readFile(join(base, doc.file))) !== doc.sha256) throw new Error(`Source changed: ${doc.id}`);
  }
}

await validate();
if (command === 'validate') {
  console.log('All seven immutable source hashes match the manifest. No model called.');
} else if (command === 'prepare' && safe(runId) && manifest.cases.some(c => c.id === label)) {
  const run = join(base, 'runs', 'A', runId);
  await mkdir(join(base, 'runs', 'A'), { recursive: true });
  await mkdir(run); // Refuse to reuse any prior run, including a failed attempt.
  await mkdir(join(run, 'workspace'));
  await json(join(run, 'config.json'), {
    condition: 'A', case_id: label, run_id: runId, status: 'prepared-not-executed',
    mode: 'manual-unchanged-extension', started: new Date().toISOString(),
    upstream_commit: git('rev-parse', 'HEAD').trim(), tracked_diff: git('diff', 'HEAD'),
    git_status: git('status', '--short'), node: process.version,
    manifest_sha256: sha(await readFile(join(base, 'manifest.json'))),
    helper_sha256: sha(await readFile(fileURLToPath(import.meta.url))),
    lockfile_sha256: sha(await readFile(join(repo, 'package-lock.json'))),
    order: manifest.cases.find(c => c.id === label).order,
    actual_model: 'not-measured', raw_model_response: 'unavailable-in-upstream-output-log',
  });
  console.log(`Prepared empty workspace: ${join(run, 'workspace')}`);
} else if (command === 'snapshot' && safe(runId) && /^\d{2}$/.test(label ?? '')) {
  const run = join(base, 'runs', 'A', runId);
  const config = JSON.parse(await readFile(join(run, 'config.json'), 'utf8'));
  const step = Number(label);
  if (step > config.order.length) throw new Error('Checkpoint exceeds case length');
  const root = join(run, 'workspace', '.wiki');
  const before = await files(root);
  const expected = config.order.slice(0, step).map(id => manifest.documents.find(d => d.id === id));
  const expectedRaw = Object.fromEntries(expected.map(d => ['raw/' + d.file.split('/').at(-1), d.sha256]));
  const actualRaw = Object.fromEntries(Object.entries(before).filter(([p]) => p.startsWith('raw/')));
  if (JSON.stringify(Object.entries(actualRaw).sort()) !== JSON.stringify(Object.entries(expectedRaw).sort())) {
    throw new Error('Raw evidence does not match the expected arrival prefix');
  }
  const snapshots = join(run, 'snapshots');
  const previous = step === 0 ? null : join(snapshots, String(step - 1).padStart(2, '0'));
  const old = previous ? JSON.parse(await readFile(join(previous, 'hashes.json'), 'utf8')) : {};
  await mkdir(snapshots, { recursive: true });
  const dest = join(snapshots, label);
  await mkdir(dest);
  await cp(root, join(dest, 'state'), { recursive: true, errorOnExist: true, force: false });
  const copied = await files(join(dest, 'state'));
  const after = await files(root);
  if (JSON.stringify(before) !== JSON.stringify(after) || JSON.stringify(before) !== JSON.stringify(copied)) {
    await json(join(dest, 'invalid.json'), { reason: 'Wiki changed while capturing; retained for diagnosis' });
    throw new Error('Snapshot invalid: wiki changed during capture');
  }
  await json(join(dest, 'hashes.json'), copied);
  const changes = { added: [], modified: [], deleted: [] };
  for (const path of new Set([...Object.keys(old), ...Object.keys(copied)])) {
    if (!(path in old)) changes.added.push(path);
    else if (!(path in copied)) changes.deleted.push(path);
    else if (old[path] !== copied[path]) changes.modified.push(path);
  }
  await json(join(dest, 'observation.json'), {
    captured: new Date().toISOString(), step, sources: config.order.slice(0, step), changes,
    llm_success: 'not-verified-by-snapshot; retain model and enrichment logs separately',
  });
  if (previous) {
    let diff;
    try { diff = git('diff', '--no-index', '--no-ext-diff', '--', join(previous, 'state'), join(dest, 'state')); }
    catch (error) { if (error.status !== 1) throw error; diff = error.stdout; }
    await writeFile(join(dest, 'changes.diff'), diff, { flag: 'wx' });
  }
  console.log(`Captured ${dest}; snapshot does not certify LLM success.`);
} else {
  throw new Error('Usage: node capture.mjs validate | prepare <unique-run-id> <case-id> | snapshot <run-id> <00|01|02|03>');
}
