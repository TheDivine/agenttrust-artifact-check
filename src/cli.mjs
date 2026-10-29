import fs from 'node:fs';
import {inspect,approve,verifyArtifact} from './index.mjs';
try {
 const [cmd,root,record,reviewer,...flags]=process.argv.slice(2); let result;
 if(cmd==='inspect') { result=inspect(root); process.exitCode=result.decision==='BLOCK'?2:result.decision==='REVIEW'?3:0; }
 else if(cmd==='approve') result=approve(root,record,reviewer,flags.includes('--ack-review'));
 else if(cmd==='verify') { result=verifyArtifact(root,JSON.parse(fs.readFileSync(record,'utf8'))); process.exitCode=result.valid?0:2; }
 else throw Error('Usage: cli.mjs inspect DIR | approve DIR RECORD REVIEWER [--ack-review] | verify DIR RECORD');
 console.log(JSON.stringify(result,null,2));
} catch(e) { console.error(JSON.stringify({decision:'ERROR',error:e.message})); process.exitCode=1; }
