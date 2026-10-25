import test from'node:test';import assert from'node:assert/strict';import{createApi}from'../api-handler.mjs';import{createCaseStore}from'../case-store.mjs';
test('caregiver and staff cannot invoke private patient retrieval, including after revocation',async()=>{
 const store=createCaseStore({});let reads=0,starts=0;const api=createApi({env:{},store,provider:{configured:true,start:async()=>{starts++;throw Error('must not start')}},retrieval:{configured:true,retrieve:async()=>{reads++;throw Error('must not retrieve')}}});
 async function call(url,body,token){let status,data;await api({url,method:'POST',body,headers:{host:'localhost',...(token?{authorization:'Bearer '+token}:{})}},{writeHead:s=>status=s,end:x=>data=JSON.parse(x)});return{status,data};}
 const c=await call('/api/demo/start',{}),patient=c.data.roleTokens.patient;
 const a=await call('/api/family/authorize',{audience:'Synthetic caregiver',allowQuestions:true},patient),family=a.data.familyToken;
 const request={message:'What is in the chart?',requestId:'forbidden-retrieval-1',namespace:'other-case'};
 assert.equal((await call('/api/chat',request,family)).status,403);
 assert.equal((await call('/api/chat',request,c.data.roleTokens.staff)).status,403);
 await call('/api/family/revoke',{},patient);assert.equal((await call('/api/chat',request,family)).status,403);
 assert.equal(reads,0);assert.equal(starts,0);
});
