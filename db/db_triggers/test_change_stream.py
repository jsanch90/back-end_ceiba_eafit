from pymongo import MongoClient

client = MongoClient(host='localhost', port=27017)
db = client.test

collection = db['inventory']

for i in collection.find():
    print(i)

cursor = db.inventory.watch(full_document='updateLookup')
document = next(cursor)
print(document)
print('xd')

