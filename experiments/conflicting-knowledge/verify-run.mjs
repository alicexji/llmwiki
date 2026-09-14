import { readFile, readdir, writeFile } from 'node:fs/promises';
import { createHash } from 'node:crypto';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import assert from 'node:assert/strict';

const base=dirname(fileURLToPath(import.meta.url));
const id=process.argv[2];
if(!/^host-[a-zA-Z0-9-]+$/.test(id??'')) throw new Error('Supply host run directory name');
const run=join(base,'runs','A',id);
const read=async p=>JSON.parse(await readFile(p,'utf8'));
const manifest=await read(join(base,'manifest.json'));
const config=await read(join(run,'config.json'));
const sha=b=>createHash('sha256').update(b).digest('hex');
assert.equal(config.manifest_sha256,sha(await readFile(join(base,'manifest.json'))));
const summary={run:id,condition:'A',status:'in-progress',checkpoints:0,ingestions:0,queries:0,calls:0,models:[],cases:[],source_integrity:true,snapshot_integrity:true,semantic_evaluation:'not performed'};
const models=new Set();
for(const scenario of manifest.cases) for(let repeat=1;repeat<=config.repeats;repeat++) {
  const item={case:scenario.id,repeat,checkpoints:0,ingestions:0,queries:0};
  for(let step=0;step<=scenario.order.length;step++) {
    const dir=join(run,scenario.id,`r${repeat}`,'steps',String(step).padStart(2,'0'));
    let obs;
    try {obs=await read(join(dir,'observation.json'));} catch(e) {if(e.code==='ENOENT')continue;throw e;}
    const hashes=await read(join(dir,'hashes.json'));
    for(const [path,expected] of Object.entries(hashes)) assert.equal(sha(await readFile(join(dir,'state',path))),expected,path);
    const sourceIds=scenario.order.slice(0,step);
    assert.equal(Object.keys(hashes).filter(p=>p.startsWith('raw/')).length,sourceIds.length);
    for(const sourceId of sourceIds) {
      const doc=manifest.documents.find(d=>d.id===sourceId);
      assert.equal(hashes['raw/'+doc.file.split('/').at(-1)],doc.sha256);
    }
    assert.equal(obs.calls.length,step?4:1);
    assert.equal(obs.queries.length,step?3:1);
    if(step) {
      const doc=manifest.documents.find(d=>d.id===scenario.order[step-1]);
      const incoming=obs.calls[0].messages[1]._content.map(c=>c.value??'').join('');
      assert.ok(incoming.endsWith(await readFile(join(base,doc.file),'utf8')),'Source prompt differs');
      item.ingestions++;summary.ingestions++;
    }
    for(const call of obs.calls) {assert.ok(!call.error);assert.ok(call.finished);models.add(call.model.id);}
    item.checkpoints++;item.queries+=obs.queries.length;
    summary.checkpoints++;summary.queries+=obs.queries.length;summary.calls+=obs.calls.length;
  }
  if(item.checkpoints)summary.cases.push(item);
}
summary.models=[...models];
assert.ok(models.size<=1,'Models changed');
const rootFiles=await readdir(run);
if(rootFiles.includes('failure.json'))summary.status='failed-partial';
if(rootFiles.includes('complete.json')) {
  assert.equal(summary.checkpoints,66);assert.equal(summary.ingestions,45);assert.equal(summary.queries,156);
  summary.status='complete';
  await writeFile(join(run,'verification.json'),JSON.stringify(summary,null,2)+'\n');
}
console.log(JSON.stringify(summary,null,2));
