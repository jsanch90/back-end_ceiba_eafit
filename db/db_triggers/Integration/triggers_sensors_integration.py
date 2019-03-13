from mongotriggers import MongoTrigger
from pymongo import MongoClient
import RPi.GPIO as GPIO
import serial
import json

#Relays config
relayPin1 = 38 #relay 1
relayPin2 = 40 #relay 2

GPIO.setmode(GPIO.BOARD)
GPIO.setup(relayPin1, GPIO.OUT)
GPIO.setup(relayPin2, GPIO.OUT)

#DB config
client = MongoClient(host='localhost', port=27017)
db = client.test_relays
triggers = MongoTrigger(client)

#Arduino_serial config
port = "/dev/ttyACM0" # USB port where Arduino is connected
s1 = serial.Serial(port,9600) # Start the serial port
s1.flushInput()

def make_json(line):
    parts = line.split(',')
    var_names = parts[0].split(';')
    values = parts[1].strip('\r\n').split(';')
    json_body=''
    #print(var_names)
    #print(values)
    for i in range(len(var_names)):
        if i == len(var_names):
            json_body+='{0}:{1}\n'.format(var_names[i],values[i])
        json_body+='{0}:{1},\n'.format(var_names[i],values[i])
    last_comma_index = json_body.rfind(',')
    json_body = json_body[:last_comma_index]+json_body[last_comma_index+1:]
    return '{\n'+'{0}'.format(json_body)+'}'

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

def send_register_to_db(json_record):
    body = json.loads(json_record)
    print(body)

triggers.register_update_trigger(set_relays_state, 'test_relays', 'relays')
triggers.tail_oplog()

while True:
    if s1.inWaiting()>0:
        line = s1.readline()
        if len(line) > 1:
            send_register_to_db(make_json(line))