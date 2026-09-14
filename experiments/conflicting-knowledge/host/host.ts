import * as vscode from 'real-vscode';
import { readFile, writeFile, mkdir, readdir, copyFile, cp } from 'node:fs/promises';
import { join, resolve } from 'node:path';
import { createHash } from 'node:crypto';
import { execFileSync } from 'node:child_process';
import { llmIngest } from '../../../packages/vscode/src/llmIngest';
import { registerChatParticipant } from '../../../packages/vscode/src/chatParticipant';
import { initWiki } from '../../../packages/core/src/init';
import { handler, setRecord, wrapModel } from './observer';

const hash = (b: any) => createHash('sha256').update(b).digest('hex');
let running = false;
async function inventory(dir: string, prefix = ''): Promise<any> {
  const result: any = {};
  for (const e of (await readdir(dir, { withFileTypes: true })).sort((a,b) => a.name.localeCompare(b.name))) {
    if (e.isSymbolicLink()) throw new Error('Unexpected symlink');
    const p = prefix + e.name;
    if (e.isDirectory()) Object.assign(result, await inventory(join(dir,e.name),p+'/'));
    else result[p] = hash(await readFile(join(dir,e.name)));
  }
  return result;
}
export async function activate(context: any) {
  const base = resolve(context.extensionPath, '..');
  const save = (p: string, value: any) => writeFile(p, JSON.stringify(value,null,2)+'\n');
  const output = vscode.window.createOutputChannel('Conflict Research');
  context.subscriptions.push(output);
  const models = await vscode.lm.selectChatModels({vendor:'copilot'});
  await save(join(base,'model-preflight.json'), { date: new Date().toISOString(), vscode: vscode.version, models: models.map(m => ({id:m.id,family:m.family,vendor:m.vendor,version:m.version})), live_calls:0 });
  context.subscriptions.push(vscode.commands.registerCommand('conflictResearch.run', async () => {
    if(running) return;
    running = true;
    const run = join(base,'runs','A','host-'+new Date().toISOString().replace(/[:.]/g,'-'));
    await mkdir(run,{recursive:true});
    let observation: any = null;
    let stepDir = run;
    const token = new vscode.CancellationTokenSource();
    try {
      const manifestBytes = await readFile(join(base,'manifest.json'));
      const manifest = JSON.parse(manifestBytes.toString());
      const docs = new Map(manifest.documents.map((d:any)=>[d.id,d]));
      for(const doc of manifest.documents) if(hash(await readFile(join(base,doc.file)))!==doc.sha256) throw new Error('Source hash mismatch');
      const available = await vscode.lm.selectChatModels({vendor:'copilot'});
      if(!available.length) throw new Error('No Copilot model available');
      const repo = resolve(base,'../..');
      await save(join(run,'config.json'),{condition:'A',mode:'original-functions-observed',upstream:execFileSync('git',['rev-parse','HEAD'],{cwd:repo,encoding:'utf8'}).trim(), manifest_sha256:hash(manifestBytes),host_sha256:hash(await readFile(join(context.extensionPath,'out/host.cjs'))),vscode:vscode.version,repeats:3,requested_family:vscode.workspace.getConfiguration('llmwiki').get('modelFamily'),options:'unchanged',seed:'unavailable'});
      for(let repeat=1;repeat<=3;repeat++) for(const scenario of manifest.cases) {
        const caseDir = join(run,scenario.id,`r${repeat}`);
        const workspace = join(caseDir,'workspace');
        await initWiki(workspace);
        const root = join(workspace,'.wiki');
        registerChatParticipant({subscriptions:[]} as any,workspace,output);
        let prior: string | null = null;
        for(let step=0;step<=scenario.order.length;step++) {
          stepDir = join(caseDir,'steps',String(step).padStart(2,'0'));
          await mkdir(stepDir,{recursive:true});
          observation = {calls:[],logs:[],queries:[],step,source:step?scenario.order[step-1]:null};
          setRecord(observation);
          const log:any = {appendLine:(s:string)=>{observation.logs.push(s);output.appendLine(s);}};
          if(step) {
            const doc:any = docs.get(scenario.order[step-1]);
            const source = join(root,'raw',doc.file.split('/').at(-1));
            await copyFile(join(base,doc.file),source);
            observation.ingest = await llmIngest(source,root,false,log,{report(){}},token.token);
            if(observation.calls.length!==1 || observation.calls[0].error || !observation.logs.some((s:string)=>s.includes('[llmIngest] Parsed:'))) throw new Error('Ingestion did not produce verified model analysis');
          }
          const before = await inventory(root);
          await cp(root,join(stepDir,'state'),{recursive:true});
          await save(join(stepDir,'hashes.json'),before);
          if(prior) {
            let diff:any;
            try {diff=execFileSync('git',['diff','--no-index','--no-ext-diff','--',prior,join(stepDir,'state')],{encoding:'utf8'});}
            catch(e:any) {if(e.status!==1) throw e;diff=e.stdout;}
            await writeFile(join(stepDir,'changes.diff'),diff);
          }
          prior=join(stepDir,'state');
          const questions=step?manifest.queries:[manifest.queries[0]];
          for(const question of questions) {
            const answer:any={question,text:'',references:[]};
            const startCalls=observation.calls.length;
            await handler({prompt:question,model:wrapModel(available[0])},{history:[]},{progress(){},markdown(s:string){answer.text+=s;},anchor(uri:any,title:any){answer.references.push({path:uri.fsPath,title});},reference(){}},token.token);
            if(observation.calls.length!==startCalls+1 || observation.calls.at(-1).error) throw new Error('Query model failed');
            observation.queries.push(answer);
          }
          if(JSON.stringify(before)!==JSON.stringify(await inventory(root))) throw new Error('Query or capture changed wiki');
          for(const id of scenario.order.slice(0,step)) {
            const d:any=docs.get(id);
            if(before['raw/'+d.file.split('/').at(-1)]!==d.sha256) throw new Error('Raw source changed');
          }
          await save(join(stepDir,'observation.json'),observation);
          output.appendLine(`Completed ${scenario.id} r${repeat} step ${step}`);
        }
      }
      await save(join(run,'complete.json'),{completed:new Date().toISOString(),condition:'A'});
    } catch(error:any) {
      if(observation) await save(join(stepDir,'partial-observation.json'),observation);
      await save(join(run,'failure.json'),{error:String(error),stack:error.stack,date:new Date().toISOString()});
      vscode.window.showErrorMessage(`Conflict research stopped: ${String(error)}`);
    } finally {running=false;token.dispose();setRecord(null);}
  }));
  if(models.length) await vscode.commands.executeCommand('conflictResearch.run');
}
