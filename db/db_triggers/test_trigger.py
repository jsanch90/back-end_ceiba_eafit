from mongotriggers import MongoTrigger
from pymongo import MongoClient

def notify_manager(op_document):
    print ('wake up! someone is adding me money')

client = MongoClient(host='localhost', port=27017)
triggers = MongoTrigger(client)

# listens to update/insert/delete, any of these will trigger the callback
triggers.register_op_trigger(notify_manager, 'my_account', 'my_transactions')
triggers.tail_oplog()

# make an operation to simulate interaction
client['my_account']['my_transactions'].insert_one({"balance": 1000})
triggers.stop_tail()