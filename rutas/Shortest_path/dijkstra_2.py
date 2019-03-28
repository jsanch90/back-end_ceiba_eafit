from dijkstar import Graph, find_path
import pandas as pd
import numpy as np 

data = pd.read_csv('data_csv.csv',sep=',')#data csv
#data = pd.read_csv('test_data.csv',sep=',')

def clear_fails(reg):
    if reg == 'fail':
        return float(2)
    else:
        return float(reg)

map(clear_fails,data['V'])

graph = Graph()

for i in range(len(data)):
    cost = 0
    if type(data['V'][i]) == 'str':
        cost = 2
    else:
        cost = data['V'][i]
    graph.add_edge(data['O'][i],data['D'][i],{'cost': cost})

cost_func = lambda u, v, e, prev_e: e['cost']
print(find_path(graph, 'Z1', 'Z2', cost_func=cost_func))

