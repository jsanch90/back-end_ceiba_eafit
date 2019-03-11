from mongotriggers import MongoTrigger
from pymongo import MongoClient
from time import sleep

def notify_manager(op_document):
    print ('Document updated!')

client = MongoClient(host='localhost', port=27017)
triggers = MongoTrigger(client)

# listens to update
triggers.register_update_trigger(notify_manager, 'my_account', 'my_transactions')
triggers.tail_oplog()

while True:
    print("inside the bucle")
    sleep(20)
