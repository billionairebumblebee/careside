import unittest
from agent import intent
class TestIntent(unittest.TestCase):
 def test_fixed_intents(self):
  self.assertEqual(intent('show sample blood status'),'collection')
  self.assertEqual(intent('when can I leave'),'discharge')
  self.assertEqual(intent('medicine given?'),'medicine')
  self.assertEqual(intent('x'*601),'unsupported')
if __name__=='__main__':unittest.main()
