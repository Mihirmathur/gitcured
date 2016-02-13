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

for key in counts:
    if key[0:2] not in expandedCounts:
        expandedCounts[key[0:2]] = 0
    expandedCounts[key[0:2]] += counts[key]

    if key[1:3] not in expandedCounts:
        expandedCounts[key[1:3]] = 0
    expandedCounts[key[1:3]] += counts[key]

    if key[0:3:2] not in expandedCounts:
        expandedCounts[key[0:3:2]] = 0
    expandedCounts[key[0:3:2]] += counts[key]

print expandedCounts


# count = 0
# for key in expandedCounts:
#     count += expandedCounts[key]

# print count

