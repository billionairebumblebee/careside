import test from 'node:test';
import assert from 'node:assert/strict';
import {initialCase,validateAnalysis} from '../case-core.mjs';
const c=initialCase('source-qa');
const answer=(text,label,id,quote)=>({summary:'Source review',answers:[{text,label,sourceIds:[id],quotes:[{sourceId:id,text:quote}]}],unknowns:[],ordersExecuted:false});
test('order-only exact quote cannot establish administration',()=>assert.throws(()=>validateAnalysis(answer('Example medicine A was administered at 08:20.','Confirmed','M1',c.sources.find(x=>x.id==='M1').text),c),/administration/));
test('irrelevant real chart quote cannot establish discharge time',()=>assert.throws(()=>validateAnalysis(answer('You can leave the hospital at noon.','Confirmed','M1',c.sources.find(x=>x.id==='M1').text),c),/discharge/));
test('general education cannot cite chart even with real quote',()=>assert.throws(()=>validateAnalysis(answer('The medicine decreases stomach acid.','GeneralEducation','M1',c.sources.find(x=>x.id==='M1').text),c),/source type/));
test('nonexistent supporting quote is rejected',()=>assert.throws(()=>validateAnalysis(answer('The specimen was collected.','Confirmed','C2','invented passage'),c),/quotation/));
test('pending result cannot become normal result',()=>assert.throws(()=>validateAnalysis(answer('The results are normal.','Confirmed','C2',c.sources.find(x=>x.id==='C2').text),c),/normal/));
test('source-backed status retains inspectable quotation and unknown remains unknown',()=>{const quote=c.sources.find(x=>x.id==='M1').text;const r=validateAnalysis(answer('Example medicine A is ordered; administration is not recorded.','Confirmed','M1',quote),c);assert.equal(r.answers[0].quotes[0].text,quote);const u=validateAnalysis({summary:'Discharge timing is unknown.',answers:[{text:'The supplied record does not establish when you can leave.',label:'Unknown',sourceIds:[],quotes:[]}],ordersExecuted:false},c);assert.equal(u.answers[0].label,'Unknown')});

test('raw summary cannot bypass validated answers',()=>{const r=validateAnalysis({summary:'You can leave at noon. Medicine A was given.',answers:[],ordersExecuted:false},c);assert.ok(!/noon|was given/.test(r.summary));});
test('noun administration assertion cannot use order-only real quote',()=>assert.throws(()=>validateAnalysis(answer('Administration occurred at08:20.','Confirmed','M1',c.sources.find(x=>x.id==='M1').text),c),/administration/));
test('valid negative administration status remains usable',()=>{const r=validateAnalysis(answer('The medicine is ordered, not administered.','Confirmed','M1',c.sources.find(x=>x.id==='M1').text),c);assert.match(r.answers[0].text,/not administered/);});
