import test from'node:test';import assert from'node:assert/strict';import{caseNamespace,caseDocuments,caseSearchQuery,createElasticContext}from'../elastic-context.mjs';import{initialCase}from'../case-core.mjs';
test('case namespace and revision are mandatory search filters, never client inputs',()=>{const c=initialCase('case-one');c.revision=4;const q=caseSearchQuery({snapshot:c,secret:'server-only-test',query:'pending result'});assert.notEqual(caseNamespace(c.caseId,'server-only-test'),caseNamespace('case-two','server-only-test'));assert.deepEqual(q.query.bool.filter,[{term:{namespace:caseNamespace(c.caseId,'server-only-test')}},{term:{revision:4}}]);assert.equal(caseDocuments(c,'server-only-test').length,c.sources.filter(s=>s.kind!=='patient').length);assert.throws(()=>caseNamespace('',''))});
test('unconfigured Elastic stays honestly local and performs no request',async()=>{let calls=0;const a=createElasticContext({}, {fetchImpl:()=>{calls++;throw Error()}}),r=await a.retrieve(initialCase('one'),'results');assert.equal(r.provider,'case-sources');assert.equal(r.status,'not-configured');assert.equal(calls,0)});

test('only patient-reviewed recollections enter the search corpus',()=>{
 const c=initialCase('owned-case');assert.equal(caseDocuments(c,'test-secret').some(d=>d.sourceId==='P1'),false);
 c.timeline[0].reviewed=true;assert.equal(caseDocuments(c,'test-secret').find(d=>d.sourceId==='P1').label,'PatientReported');
 c.intakeDraft={text:'PRIVATE UNSAVED DRAFT'};assert.equal(JSON.stringify(caseDocuments(c,'test-secret')).includes('PRIVATE UNSAVED'),false);
});

test('Elastic response must match owned namespace and exact revision as well as source text',async()=>{
 const c=initialCase('owned-case');c.revision=5;const secret='server-test-secret',doc=caseDocuments(c,secret).find(d=>d.sourceId==='C2');
 const adapter=createElasticContext({ELASTICSEARCH_URL:'https://elastic.example',ELASTICSEARCH_API_KEY:'test-only',CARE_SIDE_SECRET:secret},{fetchImpl:async(url,init)=>{
  if(init.method==='HEAD')return{ok:true,status:200};
  if(url.includes('_bulk'))return{ok:true,json:async()=>({errors:false})};
  return{ok:true,json:async()=>({hits:{hits:[{_source:{...doc,namespace:caseNamespace('other-case',secret)}},{_source:{...doc,revision:4}},{_source:doc}]}})};
 }});
 const result=await adapter.retrieve(c,'specimen collected');assert.equal(result.provider,'Elastic');assert.equal(result.searchKind,'keyword');assert.equal(result.count,1);assert.deepEqual(result.sources.map(s=>s.id),['C2']);
});
