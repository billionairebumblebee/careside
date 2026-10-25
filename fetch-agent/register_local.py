import os
from pathlib import Path
import httpx
from dotenv import load_dotenv
from uagents_core.identity import Identity
load_dotenv(Path(__file__).resolve().parents[1]/'.env')
key=os.getenv('CARESIDE_AGENTVERSE_API_KEY')
if not key:raise SystemExit('Approved CareSide mailbox key is not configured.')
with httpx.Client(timeout=60) as c:
 info=c.get('http://127.0.0.1:8103/agent_info');info.raise_for_status();j=info.json()
 if j['address']!=Identity.from_seed(os.environ['CARESIDE_FETCH_SEED'],0).address:raise SystemExit('Unexpected local agent identity.')
 r=c.post('http://127.0.0.1:8103/connect',json={'user_token':key,'agent_type':'uagent'})
 r.raise_for_status();v=r.json();print('CareSide Agentverse registration success:',bool(v.get('success')))
 if not v.get('success'):print(str(v.get('detail','Unavailable')).replace(key,'[redacted]')[:400])

