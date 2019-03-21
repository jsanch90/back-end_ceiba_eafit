import pandas as pd

OD_Finales = pd.read_excel(open('InfoConsumos.xlsm', 'rb'),sheet_name='OD_Finales')

PointsO = list(OD_Finales["PointsO_1"])
PointsD = list(OD_Finales["PointsD_1"])

PointsO_unique = set(PointsO) # Origin points without repetition.
PointsD_unique = set (PointsD) # Destination points without repetition. 

pairs = list(zip(PointsO,PointsD))
routes = dict()

for i,j in pairs :
    if not i in routes:
        routes[i]=[j]
    else:
        routes[i].append(j)

dest_origin = []
dest_origin_remaining = []

for i in PointsD_unique:
    for j in PointsO_unique:
        if j in routes[i] :
            dest_origin.append((i,j))
        else:
            dest_origin_remaining.append((i,j))


dest_origin_remaining_to_lists = [list(t) for t in zip(*dest_origin_remaining)]

dest_origin_remaining_to_dataframe = pd.DataFrame({'PointsO':dest_origin_remaining_to_lists[0],'PointsD':dest_origin_remaining_to_lists[1]})
dest_origin_remaining_to_dataframe.to_csv('./remaining_routes.csv',sep=',',index=False)




