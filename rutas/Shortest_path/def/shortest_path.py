from dijkstar import Graph, find_path
import pandas as pd

data = pd.read_csv('data_csv.csv',sep=',')

pd.to_numeric(data['V'])
pd.to_numeric(data['Dis'])
pd.to_numeric(data['Time'])
data['O']  = data['O'].astype(str)
data['D']  = data['D'].astype(str)

registers = list(zip(data['O'],data['D'],data['Dis'],data['Time']))
routes = dict()

for i,j,k,l in registers :
    if not i in routes:
        routes[i]=[(j,k,l)]
    else:
        routes[i].append((j,k,l))

#Graph object
routes_graph = Graph()

#Building the graph
for i in range(len(data)):
    routes_graph.add_edge(data['O'][i],data['D'][i],{'cost': data['V'][i]})

cost_func = lambda u, v, e, prev_e: e['cost']

##################################################################
route = find_path(routes_graph, 'Z1', 'Z2', cost_func=cost_func)[0]
##################################################################

distance = 0
time = 0

for i in range(len(route)-1):
    temp = routes[route[i]]
    for j in temp:
        if route[i+1] in j:
            distance += j[1]
            time += j[2]

print ('Route: ',route)
print ('Time: ',time)
print ('Distance: ', distance)

    