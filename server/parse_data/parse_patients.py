import csv
import json

counts = {}

with open('diabetic_data.csv', 'rb') as csvfile:
    spamreader = csv.reader(csvfile, delimiter=',')
    # i = 0
    for row in spamreader:
        r = tuple(row)
        if r not in counts:
            counts[r] = 0
        counts[r] += 1

# print counts

expandedCounts = {}

schemaList = ["Caucasian", "AfricanAmerican", "Asian", "Hispanic", "Other", "?", "Female", "Male", "Unknown/Invalid", "[0-10)", "[10-20)", "[20-30)", "[30-40)", "[40-50)", "[50-60)", "[60-70)", "[70-80)", "[80-90)", "[90-100)"]
schema = {}
for i in range(len(schemaList)):
    schema[schemaList[i]] = i

matrix = [ [ 0 for j in range(len(schema))] for i in range(len(schema))]


for key in counts:
    matrix[schema[key[0]]][schema[key[1]]] += counts[key]
    matrix[schema[key[0]]][schema[key[2]]] += counts[key]
    matrix[schema[key[1]]][schema[key[2]]] += counts[key]

    # if key[0:2] not in expandedCounts:
    #     expandedCounts[key[0:2]] = 0
    # expandedCounts[key[0:2]] += counts[key]

    # if key[1:3] not in expandedCounts:
    #     expandedCounts[key[1:3]] = 0
    # expandedCounts[key[1:3]] += counts[key]

    # if key[0:3:2] not in expandedCounts:
    #     expandedCounts[key[0:3:2]] = 0
    # expandedCounts[key[0:3:2]] += counts[key]

print json.dumps(matrix, indent=4, separators=(',', ': '))

