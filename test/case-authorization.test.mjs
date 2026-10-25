import test from 'node:test';import assert from 'node:assert/strict';import{initialCase,mutateCase,viewCase}from'../case-core.mjs';
const apply=(c,role,action,payload,id)=>mutateCase(c,role,action,payload,{id,time:'2026-10-24T10:00:00'});
test('explicit caregiver consent, shared exception dedup, single answer fanout and revoke',()=>{
let c=initialCase('one');assert.throws(()=>apply(c,'family','question',{text:'When are results expected?'},'q0'));
c=apply(c,'patient','family-authorize',{audience:'Alex',allowQuestions:true},'auth');
c=apply(c,'patient','question',{text:'When are results expected?'},'q1');c=apply(c,'family','question',{text:'When will the results arrive?'},'q2');
assert.equal(c.questions.length,1);assert.equal(c.questions[0].originals.length,2);
c=apply(c,'staff','staff-update',{questionId:'q1',text:'The simulated team has no confirmed result time.'},'s1');
assert.equal(viewCase(c,'family').questions[0].answer,c.questions[0].answer);assert.equal(viewCase(c,'family').questions[0].originals,undefined);
const again=apply(c,'staff','staff-update',{questionId:'q1',text:c.questions[0].answer},'s2');assert.equal(again.sources.length,c.sources.length);
c=apply(c,'family','question',{text:'When will results come?'},'repeat');assert.equal(c.questions.length,1);assert.equal(c.questions[0].status,'answered');
c=apply(c,'patient','family-revoke',{},'revoke');assert.throws(()=>viewCase(c,'family'));assert.throws(()=>apply(c,'family','question',{text:'When results?'},'q3'));
});
test('known source status answers without pending staff question, ETA remains unresolved',()=>{
let c=apply(initialCase('two'),'patient','question',{text:'Was my blood test done?'},'known');assert.equal(c.questions[0].status,'answered');assert.deepEqual(c.questions[0].sourceIds,['C2']);
c=apply(c,'patient','question',{text:'When are results expected?'},'unknown');assert.equal(c.questions.at(-1).status,'pending');
});
test('atomic case job reservation rejects concurrent work and preserves one upstream receipt',()=>{
let c=apply(initialCase('jobs'),'patient','job-reserve',{jobRequestId:'first'},'reserve');
assert.throws(()=>apply(c,'patient','job-reserve',{jobRequestId:'second'},'second'),/already/);
c=apply(c,'patient','job',{job:{requestId:'first',runId:'upstream-one',status:'running'}},'started');
assert.equal(c.jobs.length,1);assert.equal(c.jobs[0].runId,'upstream-one');
assert.equal(viewCase(c,'staff').activeJob,null);assert.equal(viewCase(c,'patient').activeJob.runId,'upstream-one');
});
test('patient narrative remains patient reported until reviewed and never becomes staff evidence',()=>{
let c=apply(initialCase('narrative'),'patient','patient-report',{text:'I remember the sample being taken before breakfast.'},'report');
const t=c.timeline.at(-1);assert.equal(t.label,'PatientReported');assert.equal(t.reviewed,false);assert.equal(c.sources.at(-1).kind,'patient');
c=apply(c,'patient','review',{entryIds:[t.id]},'review');assert.equal(c.timeline.at(-1).label,'PatientReported');assert.equal(c.timeline.at(-1).reviewed,true);
assert.throws(()=>apply(c,'staff','patient-report',{text:'Changed story'},'wrong'));
});
