"""
mongodb version = 2.4.1
pymongo version = 3.2
"""

from mongotriggers import MongoTrigger
from pymongo import MongoClient
import RPi.GPIO as GPIO

relayPin1 = 38 #relay 1
relayPin2 = 40 #relay 2

GPIO.setmode(GPIO.BOARD)
GPIO.setup(relayPin1, GPIO.OUT)
GPIO.setup(relayPin2, GPIO.OUT)

client = MongoClient(host='localhost', port=27017)
db = client.test_relays
triggers = MongoTrigger(client)

#callback function, this function is called when some register is updated in the database
def set_relays_state(op_document=None):
    state_rel_1 = db.relays.find({"relay" : 1})[0]['state']
    state_rel_2 = db.relays.find({"relay" : 2})[0]['state']

    if int(state_rel_1) == 1:
        print(int(state_rel_1), ' rel_1 state')
        GPIO.output(relayPin1,GPIO.LOW)
    else:
        print(int(state_rel_1), ' rel_1 state')
        GPIO.output(relayPin1,GPIO.HIGH)

    if int(state_rel_2) == 1:
        print(int(state_rel_2), ' rel_2 state')
        GPIO.output(relayPin2,GPIO.LOW)
    else:
        print(int(state_rel_2), ' rel_2 state')
        GPIO.output(relayPin2,GPIO.HIGH)
    
    print('Document updated!')

#starting 
set_relays_state()

# listens to update
triggers.register_update_trigger(set_relays_state, 'test_relays', 'relays')
triggers.tail_oplog()

