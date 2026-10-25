import os
from uagents import Agent,Context
from uagents.resolver import RulesBasedResolver
from uagents_core.contrib.protocols.chat import ChatMessage,ChatAcknowledgement,TextContent
address='agent1q0lj46rp8jfh4h40qn679j9wh7kmezxwcyxz3n02rmlkqzpurvxs639x39l'
a=Agent(name='Richard ACP smoke client',seed='careside-public-acp-smoke',port=8104,endpoint=['http://127.0.0.1:8104/submit'],resolve=RulesBasedResolver({address:os.getenv('FETCH_TEST_ENDPOINT','http://127.0.0.1:8103/submit')}),publish_agent_details=False)
sent=False
@a.on_interval(period=10)
async def send(ctx:Context):
    global sent
    if not sent:
        sent=True
        await ctx.send(address,ChatMessage(content=[TextContent(type='text',text='Show sample blood collection status.')]))
@a.on_message(ChatAcknowledgement)
async def ack(ctx:Context,sender:str,msg:ChatAcknowledgement): print('ACP_ACKNOWLEDGED',flush=True)
@a.on_message(ChatMessage)
async def reply(ctx:Context,sender:str,msg:ChatMessage):
    print('ACP_REPLY_RECEIVED',any(isinstance(x,TextContent) and bool(x.text) for x in msg.content),flush=True)
if __name__=='__main__': a.run()
