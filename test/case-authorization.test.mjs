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
c=apply(c,'patient','family-revoke',{},'revoke');assert.throws(()=>viewCase(c,'family'));assert.throws(()=>apply(c,'family','question',{text:'When results?'},'q3'));
});
test('known source status answers without pending staff question, ETA remains unresolved',()=>{
let c=apply(initialCase('two'),'patient','question',{text:'Was my blood test done?'},'known');assert.equal(c.questions[0].status,'answered');assert.deepEqual(c.questions[0].sourceIds,['C2']);
c=apply(c,'patient','question',{text:'When are results expected?'},'unknown');assert.equal(c.questions.at(-1).status,'pending');
});
