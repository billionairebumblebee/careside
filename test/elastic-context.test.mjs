import test from'node:test';import assert from'node:assert/strict';import{caseNamespace,caseDocuments,caseSearchQuery,createElasticContext,validateIndexMapping}from'../elastic-context.mjs';import{initialCase}from'../case-core.mjs';
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
  if(url.includes('_mapping'))return{ok:true,json:async()=>compatibleMapping()};
  if(url.includes('_bulk'))return{ok:true,json:async()=>({errors:false})};
  return{ok:true,json:async()=>({hits:{hits:[{_source:{...doc,namespace:caseNamespace('other-case',secret)}},{_source:{...doc,revision:4}},{_source:doc}]}})};
 }});
 const result=await adapter.retrieve(c,'specimen collected');assert.equal(result.provider,'Elastic');assert.equal(result.searchKind,'keyword');assert.equal(result.count,1);assert.deepEqual(result.sources.map(s=>s.id),['C2']);
});

const IDX='careside-private-context-v1';
const compatibleMapping=(extra={})=>({[IDX]:{mappings:{dynamic:'strict',properties:{namespace:{type:'keyword'},revision:{type:'integer'},sourceId:{type:'keyword'},kind:{type:'keyword'},label:{type:'keyword'},time:{type:'date'},title:{type:'text'},text:{type:'text'},...extra}}}});
const envOf=(more={})=>({ELASTICSEARCH_URL:'https://elastic.example',ELASTICSEARCH_API_KEY:'test-only',CARE_SIDE_SECRET:'server-test-secret',...more});
function mockElastic({mapping,exists=true}={}){const calls=[];const fetchImpl=async(url,init)=>{const path=new URL(url).pathname;calls.push(init.method+' '+path);
 if(init.method==='HEAD')return{ok:exists,status:exists?200:404};
 if(init.method==='PUT')return{ok:true,json:async()=>({acknowledged:true})};
 if(path.endsWith('/_mapping'))return{ok:true,json:async()=>mapping};
 if(path.includes('_bulk'))return{ok:true,json:async()=>({errors:false})};
 return{ok:true,json:async()=>({hits:{hits:[]}})};};return{calls,fetchImpl};}

test('existing compatible index mapping is accepted and reused without PUT',async()=>{
 const m=mockElastic({mapping:compatibleMapping()});const a=createElasticContext(envOf(),{fetchImpl:m.fetchImpl});const r=await a.retrieve(initialCase('c1'),'specimen');
 assert.equal(r.provider,'Elastic');assert.equal(m.calls.filter(c=>c.startsWith('GET')&&c.endsWith('/_mapping')).length,1);assert.equal(m.calls.some(c=>c.startsWith('PUT')),false);
});
test('existing incompatible index mapping fails closed before any indexing or search',async()=>{
 const bad=[
  compatibleMapping({namespace:{type:'text'}}),compatibleMapping({revision:{type:'keyword'}}),compatibleMapping({sourceId:{type:'text'}}),compatibleMapping({text:{type:'keyword'}}),
  {[IDX]:{mappings:{}}},{},null];
 for(const mapping of bad){const m=mockElastic({mapping});const a=createElasticContext(envOf(),{fetchImpl:m.fetchImpl});
  await assert.rejects(()=>a.retrieve(initialCase('c1'),'specimen'),/Elastic index mapping incompatible/);
  assert.equal(m.calls.some(c=>c.includes('_bulk')||c.includes('_search')),false);}
});
test('semantic mode requires semantic_text mapping and fails closed otherwise',async()=>{
 const noSem=mockElastic({mapping:compatibleMapping()});
 await assert.rejects(()=>createElasticContext(envOf({ELASTIC_SEMANTIC:'true'}),{fetchImpl:noSem.fetchImpl}).retrieve(initialCase('c1'),'specimen'),/incompatible/);
 const wrong=mockElastic({mapping:compatibleMapping({semantic:{type:'text'}})});
 await assert.rejects(()=>createElasticContext(envOf({ELASTIC_SEMANTIC:'true'}),{fetchImpl:wrong.fetchImpl}).retrieve(initialCase('c1'),'specimen'),/incompatible/);
 const ok=mockElastic({mapping:compatibleMapping({semantic:{type:'semantic_text'}})});
 const r=await createElasticContext(envOf({ELASTIC_SEMANTIC:'true'}),{fetchImpl:ok.fetchImpl}).retrieve(initialCase('c1'),'specimen');assert.equal(r.searchKind,'hybrid-semantic-keyword');
});
test('missing index is created with the strict mapping (PUT preserved) and not mapping-validated',async()=>{
 const m=mockElastic({exists:false});const a=createElasticContext(envOf(),{fetchImpl:m.fetchImpl});await a.retrieve(initialCase('c1'),'specimen');
 assert.equal(m.calls.filter(c=>c.startsWith('PUT')).length,1);assert.equal(m.calls.some(c=>c.endsWith('/_mapping')),false);
});
test('concurrent first retrievals share one initialization and one mapping check',async()=>{
 const m=mockElastic({mapping:compatibleMapping()});const a=createElasticContext(envOf(),{fetchImpl:m.fetchImpl});
 await Promise.all([a.retrieve(initialCase('c1'),'one'),a.retrieve(initialCase('c2'),'two'),a.retrieve(initialCase('c3'),'three')]);
 assert.equal(m.calls.filter(c=>c.startsWith('HEAD')).length,1);assert.equal(m.calls.filter(c=>c.endsWith('/_mapping')).length,1);
 await a.retrieve(initialCase('c4'),'later');assert.equal(m.calls.filter(c=>c.endsWith('/_mapping')).length,1);
});
test('validateIndexMapping accepts a single renamed concrete index behind an alias',()=>{
 assert.doesNotThrow(()=>validateIndexMapping({'careside-private-context-v1-000001':compatibleMapping()[IDX]}));
 assert.throws(()=>validateIndexMapping({a:compatibleMapping()[IDX],b:compatibleMapping()[IDX]}),/incompatible/);
});
