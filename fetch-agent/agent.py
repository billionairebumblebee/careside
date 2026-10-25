"""Public CareSide synthetic ACP demo. Never accepts or retrieves real patient cases."""
import os, re, time
from pathlib import Path
from collections import deque
import httpx
from dotenv import load_dotenv
from uagents import Agent, Context, Protocol
from uagents_core.contrib.protocols.chat import ChatMessage,ChatAcknowledgement,TextContent,EndSessionContent,chat_protocol_spec
load_dotenv(Path(__file__).resolve().parents[1]/'.env')
protocol=Protocol(spec=chat_protocol_spec)
seen={}; requests=deque()
BASE='https://careside.vercel.app'
def intent(text):
 if len(text)>600:return 'unsupported'
 if re.search(r'\b(discharge|leave|go home)\b',text,re.I):return 'discharge'
 if re.search(r'\b(blood|specimen|collect(?:ed|ion)|test status)\b',text,re.I):return 'collection'
 if re.search(r'\b(medicine|medication|administered|given)\b',text,re.I):return 'medicine'
 return 'help'
async def answer(text):
 action=intent(text)
 if action in ['help','unsupported']:return 'CareSide public synthetic demo only. Ask “show sample blood collection status”, “sample medicine status”, or “prepare a sample discharge question”. Do not send personal health information. I cannot access private CareSide cases or contact hospital staff.'
 # Only fixed synthetic actions are sent to CareSide. User message is never forwarded.
 async with httpx.AsyncClient(timeout=15) as client:
  r=await client.post(BASE+'/api/demo/start',json={});r.raise_for_status();case=r.json();snapshot=case['snapshot']
  if action=='collection':
   source=next(s for s in snapshot['sources'] if s['id']=='C2')
   return 'SYNTHETIC EXAMPLE — authorized-source confirmed: '+source['text']+' Source: '+source['title']+' at '+source['time']+'. Pending does not mean normal. No real chart was read.'
  if action=='medicine':
   med=snapshot['medications'][0]
   return 'SYNTHETIC EXAMPLE — '+med['name']+'. Order: '+med['orderStatus']+'. Administration: '+med['administrationStatus']+'. An order does not establish a dose was given. No treatment action occurred.'
  token=case['roleTokens']['patient']
  q=await client.post(BASE+'/api/questions',headers={'Authorization':'Bearer '+token},json={'text':'When can I leave?','requestId':'public-synthetic-discharge'});q.raise_for_status()
  pending=[x for x in q.json()['snapshot']['questions'] if x['status']=='pending']
  return 'SYNTHETIC EXAMPLE — discharge timing is unknown. Created '+str(len(pending))+' pending question in an isolated fictional case: “When can I leave?” No real hospital staff were contacted. Open '+BASE+' to try the private patient/caregiver demo.'
@protocol.on_message(ChatMessage)
async def handle(ctx:Context,sender:str,msg:ChatMessage):
 await ctx.send(sender,ChatAcknowledgement(acknowledged_msg_id=msg.msg_id))
 key=(sender,str(msg.msg_id));now=time.monotonic()
 while requests and requests[0]<now-3600:requests.popleft()
 if key in seen:reply=seen[key]
 elif len(requests)>=40:reply='The public synthetic demo is at its request limit. No case or staff action was performed.'
 else:
  requests.append(now)
  try:reply=await answer(' '.join(x.text for x in msg.content if isinstance(x,TextContent)))
  except Exception:reply='The synthetic demo is unavailable. No real case was accessed and no staff were contacted.'
  if len(seen)>300:seen.clear()
  seen[key]=reply
 await ctx.send(sender,ChatMessage(content=[TextContent(type='text',text=reply),EndSessionContent(type='end-session')]))
@protocol.on_message(ChatAcknowledgement)
async def ack(ctx:Context,sender:str,msg:ChatAcknowledgement):pass
if __name__=='__main__':
 a=Agent(name='Richard CareSide Synthetic Companion',seed=os.environ['CARESIDE_FETCH_SEED'],port=8003,mailbox=True,publish_agent_details=True,description='Public synthetic hospital communication demo: source-labelled example collection and medication status, or create an isolated fictional staff question. No real patient charts, diagnosis or hospital contact. Never send personal health information.')
 a.include(protocol,publish_manifest=True);a.run()
