import test from'node:test';import assert from'node:assert/strict';import{createApi}from'../api-handler.mjs';
test('transient poll failure retains existing run without creating or failing a job',async()=>{
let starts=0,updates=0;const store={owned:async()=>({role:'patient',snapshot:{jobs:[{runId:'existing-run',status:'running'}]}}),update:async()=>{updates++}};
const provider={start:async()=>{starts++},read:async()=>{throw Object.assign(Error('temporary network failure'),{transient:true})}};
const api=createApi({store,provider});let status,result;await api({url:'/api/chat/existing-run',method:'GET',headers:{host:'localhost',authorization:'Bearer owned'}},{writeHead:s=>status=s,end:s=>result=JSON.parse(s)});
assert.equal(status,200);assert.equal(result.status,'running');assert.equal(result.runId,'existing-run');assert.equal(result.retryable,true);assert.equal(starts,0);assert.equal(updates,0);
});
