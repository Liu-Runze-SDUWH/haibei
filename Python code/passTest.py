import jwt
import requests
import csv

# 以下三项需要自行配置
APPID = ""
TOKEN = ""
EncodingAESKey = ""

with open('final-test.csv', 'r') as f:
    reader = csv.reader(f)
    result = list(reader)

no_match = 0
wrong_count = 0
half_correct_count = 0
correct_count = 0
total_count = 0

for i in range(1, len(result)):
    query = result[i][1]
    ground_truth_intent = int(result[i][4])
    data = {"userid": "1"}
    signed_data = jwt.encode(data, EncodingAESKey, "HS256")
    data2 = {"signature": signed_data, "query": query}
    r = requests.post(url="https://openai.weixin.qq.com/openapi/aibot/%s" % TOKEN, data=data2)
    response = r.json()
    print(response)
    test_intent = response["answer"]
    if response['ans_node_name'] == 'NO_MATCH':
        no_match += 1
    elif int(ground_truth_intent) == int(test_intent):
        correct_count += 1
    elif response['opening'] != '':
        wrong_count += 1
        for item in response['options']:
            if item['title'] == result[int(ground_truth_intent)][1]:
                wrong_count -= 1
                half_correct_count += 1
                break
    else:
        wrong_count += 1
    total_count += 1

print("no_match: %d" % no_match)
print("wrong_count: %d" % wrong_count)
print("half_correct_count: %d" % half_correct_count)
print("correct_count: %d" % correct_count)
print("total_accuracy: %f" % (float(correct_count + half_correct_count) / total_count))
