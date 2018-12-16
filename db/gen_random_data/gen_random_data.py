from random import uniform, choice
from pymongo import MongoClient
from random import randrange
from datetime import timedelta, datetime

client = MongoClient('localhost', 27017)
db = client.Ceiba
collection = db.ceiba_datas


def random_date(start, end):
    delta = end - start
    int_delta = (delta.days * 24 * 60 * 60) + delta.seconds
    random_second = randrange(int_delta)
    return start + timedelta(seconds=random_second)


# num : number of records that we want generate
# l_limit, u_limit -> data range
def add_data(num, l_limit, u_limit):
    options = ["Battery","Voltage","Current"]
    data = []
    d1 = datetime.strptime('1/1/2017 1:30 PM', '%m/%d/%Y %I:%M %p')
    d2 = datetime.strptime('1/1/2018 4:50 AM', '%m/%d/%Y %I:%M %p')
    while num > 0:
        x = {"measure": choice(options), "value": uniform(
            l_limit, u_limit), "date_time": random_date(d1, d2)}
        data.append(x)
        num = num - 1
    collection.insert_many(data)


add_data(80, 50, 60)
