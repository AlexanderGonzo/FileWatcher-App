import itertools
import json

with open('./songList.json') as f:
    jsons = json.load(f)

items = itertools.chain.from_iterable(list(d.items()) for d in jsons["Songs"])

jsons["Songs"] = { k:[i[1] for i in sorted(set(g))] 
                           for k,g in itertools.groupby(sorted(items), key=lambda x: x[0]) }   
print(jsons)
json.dump(jsons, open('./newfile.json.json', 'w+'), indent=4)


