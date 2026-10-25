import test from'node:test';import assert from'node:assert/strict';import{createApi}from'../api-handler.mjs';import{createCaseStore}from'../case-store.mjs';import{collectPublicReference}from'../medication-reference.mjs';
test('public reference retrieval reaches agent context and survives same-run polling without medicine mapping',async()=>{
const env={BRIGHT_DATA_API_TOKEN:'test-only',BRIGHT_DATA_UNLOCKER_ZONE:'test-zone'},store=createCaseStore({});let publicBody,prompt,source;
const provider={configured:true,provider:'CREAO',model:'test fixture',start:async(p,k,c)=>{prompt=p;source=c.sources.find(s=>s.id.startsWith('REF-'));return{runId:'same-reference-run',status:'running'}},read:async()=>({status:'completed',result:{answers:[{text:'A general public reference is available.',label:'GeneralEducation',sourceIds:[source.id],quotes:[{sourceId:source.id,text:source.text.slice(0,60)}]}],summary:'untrusted summary ignored',ordersExecuted:false}})};
const references=(topic,options)=>collectPublicReference(topic,{...options,fetch:async(url,init)=>{assert.equal(url,'https://api.brightdata.com/request');publicBody=JSON.parse(init.body);return{ok:true,text:async()=>'<article>'+('Famotidine public source fixture. '.repeat(25))+'</article>'}}});
const api=createApi({env,store,provider,references,retrieval:{configured:false}});async function call(url,body,token){let status,data;await api({url,method:body?'POST':'GET',body,headers:{host:'localhost',...(token?{authorization:'Bearer '+token}:{})}},{writeHead:s=>status=s,end:x=>data=JSON.parse(x)});return{status,data};}
const c=await call('/api/demo/start',{}),token=c.data.roleTokens.patient;
const start=await call('/api/chat',{message:'What is famotidine generally?',referenceTopicId:'famotidine',requestId:'reference-fixture-1'},token);assert.equal(start.status,200);assert.match(prompt,/Famotidine public source fixture/);assert.equal(start.data.evidence.reference.provider,'bright-data');assert.equal(publicBody.url,'https://my.clevelandclinic.org/health/drugs/18896-famotidine-tablets');assert.equal(JSON.stringify(publicBody).includes('Morgan'),false);
const result=await call('/api/chat/same-reference-run',null,token);assert.equal(result.data.status,'completed');assert.equal(result.data.evidence.reference.provider,'bright-data');assert.equal(result.data.answer.answers[0].label,'GeneralEducation');assert.equal(result.data.snapshot.medications[0].name,'Example medicine A (fictional)');
});

test('stored general references accept only the two exact approved medication pages',async()=>{
 const store=createCaseStore({}),c=await store.create(),token=c.roleTokens.patient;
 const add=url=>store.update(token,'reference-add',{source:{id:'REF-famotidine-test',kind:'reference',url,title:'General public reference',time:'2026-10-25T00:00:00Z',text:'Synthetic reference fixture'}});
 await assert.rejects(()=>add('https://my.clevelandclinic.org.evil.example/health/drugs/18896-famotidine-tablets'),/Invalid allowlisted/);
 await assert.rejects(()=>add('https://medlineplus.gov/unapproved-page'),/Invalid allowlisted/);
 const r=await add('https://my.clevelandclinic.org/health/drugs/18896-famotidine-tablets');assert.equal(r.snapshot.sources.at(-1).kind,'reference');assert.equal(r.snapshot.medications[0].name,'Example medicine A (fictional)');
});
