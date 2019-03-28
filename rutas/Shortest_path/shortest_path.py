import pandas as pd
import numpy as np 
from Graph import Graph
from dijkstra import dijkstra

#Data format (origin, destination, cost)
#data = pd.read_excel(open('_H7_BYD_C.xlsx', 'rb'),sheet_name='H7_BYD1_ConsumptionYang')
#data = pd.read_csv('test_data.csv',sep=',')
data = pd.read_csv('data_csv_half.csv',sep=',')#data csv

def clear_fails(reg):
    if reg == 'fail':
        return float(2)
    else:
        return float(reg)

map(clear_fails,data['V'])

routes = Graph()

for i in range(len(data)):
    routes.add_edge(data['O'][i],data['D'][i],data['V'][i])

print(dijkstra(routes,'Z1','Z2'))