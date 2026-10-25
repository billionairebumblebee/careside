import test from'node:test';import assert from'node:assert/strict';import{initialCase,mutateCase,viewCase}from'../case-core.mjs';
const act=(c,role,action,payload,id)=>mutateCase(c,role,action,payload,{id,time:'2026-10-25T15:30:00Z'});
test('dictation remains private draft until corrected patient confirmation, then stays reported',()=>{
let c=act(initialCase('intake'),'patient','intake-draft',{text:'I remember around seven.',inputMethod:'dictation'},'draft-1');assert.equal(c.timeline.length,3);assert.equal(viewCase(c,'staff').intakeDraft,undefined);
c=act(c,'patient','family-authorize',{audience:'Alex',allowQuestions:true},'auth');assert.equal(viewCase(c,'family').intakeDraft,undefined);
c=act(c,'patient','intake-confirm',{draftId:'draft-1',text:'I remember around eight, not seven.'},'confirm');const t=c.timeline.at(-1);assert.equal(t.text,'I remember around eight, not seven.');assert.equal(t.label,'PatientReported');assert.equal(t.reviewed,true);assert.equal(viewCase(c,'family').timeline.some(x=>x.id===t.id),false);
const again=act(c,'patient','intake-confirm',{draftId:'draft-1',text:'Changed after confirmation'},'repeat');assert.equal(again.timeline.length,c.timeline.length);assert.equal(again.timeline.at(-1).text,t.text);
});
test('staff and family cannot confirm a patient narrative or choose an unreviewed draft id',()=>{const c=initialCase('roles');assert.throws(()=>act(c,'staff','intake-draft',{text:'a'},'d'));assert.throws(()=>act(c,'patient','intake-confirm',{draftId:'unknown',text:'a'},'c'),/Review/);});
