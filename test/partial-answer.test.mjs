import test from'node:test';import assert from'node:assert/strict';import{initialCase,validateAnalysis,validateAnalysisSections}from'../case-core.mjs';
test('mixed-source section stays withheld Unknown while independently valid answers remain',()=>{
 const c=initialCase('partial-case'),good={text:'General definition only.',label:'GeneralEducation',sourceIds:['R1'],quotes:[{sourceId:'R1',text:'ordered means requested'}]},bad={text:'Mixed chart and reference assertion.',label:'Confirmed',sourceIds:['M1','R1'],quotes:[{sourceId:'M1',text:'Example medicine A ordered.'},{sourceId:'R1',text:'ordered means requested'}]};
 assert.throws(()=>validateAnalysis({answers:[bad],ordersExecuted:false},c),/source type/);
 const r=validateAnalysisSections({summary:'UNTRUSTED RAW SUMMARY',answers:[good,bad],ordersExecuted:false},c);assert.equal(r.partial,true);assert.equal(r.withheldSections,1);assert.equal(r.answers[0].label,'GeneralEducation');assert.equal(r.answers[1].label,'Unknown');assert.match(r.answers[1].text,/withheld/);assert.equal(r.summary.includes(bad.text),false);assert.equal(r.summary.includes('UNTRUSTED'),false);
});
test('all invalid sections produce no answer and executable output is never accepted',()=>{
 const c=initialCase('invalid-case'),bad={text:'You can leave at noon.',label:'Confirmed',sourceIds:['M1'],quotes:[{sourceId:'M1',text:'Example medicine A ordered.'}]};
 assert.throws(()=>validateAnalysisSections({answers:[bad],ordersExecuted:false},c),/No answer sections/);
 assert.throws(()=>validateAnalysisSections({answers:[{text:'Anything',label:'Unknown',sourceIds:[]}],ordersExecuted:true},c),/no valid structured/);
});
