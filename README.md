[TOC]



# 海贝助手——提供信用政策查询服务的微信小程序

<div style="float: right;">（本篇文章约6000字，完整阅读时长16min）</div>

<center>项目开发成员：山东大学（威海）数学与统计学院 2019级数据科学与人工智能实验班</center>

<center>刘润泽 王晨晔 虞若凡 李文博 王一脉 韩泽宇</center>

## 一、简介

海贝助手是一款政务查询小程序，旨在为文登市居民提供信用分**（海贝分）**相关政策的查询服务，帮助居民更好地了解文登市信用政策，推进信用文登建设。

海贝助手的主要功能：**机器人对话、查看信用文档**。

- 机器人对话：用户可以通过**文字/语音**输入的方式与机器人对话，从而获得想了解的信用政策。

- 查看信用文档：用户可以通过**多级目录**来索引到感兴趣的政策内容，也可以通过**输入关键词搜索**整个信用文档（《威海市文登区社会成员信用积分和信用评价管理办法》）。



### （一）已录入海贝助手的信用政策

#### 1、《威海市文登区社会成员信用积分和信用评价管理办法》

- 打开方式：点击小程序主页 ”信用文档“ 进入

- 检索方式：支持多级目录索引、关键词搜索、机器人问答

- 文件来源：[区委办公室 区政府办公室关于印发《威海市文登区社会成员信用积分和信用评价管理办法》《威海市文登区农村居民信用积分评价办法》的通知](http://wdcredit.gov.cn/upload/files/2021/1/关于印发《威海市文登区社会成员信用积分和信用评价管理办法》《威海市文登区农村居民信用积分评价办法》的通知(2)(1).pdf)



#### 2、《关于印发威海市文登区信用“五进”工程专项工作推进方案的通知》

- 打开方式：点击小程序主页 ”信用进企业/校园/机关/农村/社区“ 进入

- 检索方式：支持原PDF文件的在线浏览

- 文件来源：[关于印发威海市文登区信用“五进”工程专项工作推进方案的通知](http://wdcredit.gov.cn/upload/files/2020/10/%E5%85%B3%E4%BA%8E%E5%8D%B0%E5%8F%91%E5%A8%81%E6%B5%B7%E5%B8%82%E6%96%87%E7%99%BB%E5%8C%BA%E4%BF%A1%E7%94%A8%E2%80%9C%E4%BA%94%E8%BF%9B%E2%80%9D%E5%B7%A5%E7%A8%8B%E4%B8%93%E9%A1%B9%E5%B7%A5%E4%BD%9C%E6%8E%A8%E8%BF%9B%E6%96%B9%E6%A1%88%E7%9A%84%E9%80%9A%E7%9F%A5(1).pdf)



#### 3、信用惠民政策

- 打开方式：点击小程序主页 ”信用惠民政策“ 进入

- 检索方式：支持图片格式的浏览

- 文件来源：[文登区信用惠民政策措施清单（第一批）](http://wdcredit.gov.cn/contents/11/368.html)    [文登区信用惠民政策措施清单（第二批）](http://wdcredit.gov.cn/contents/11/3647.html)



## 二、对话机器人

### （一）市场调研

机器人对话是海贝助手的核心功能，目前市面上有多种智能对话机器人的解决方案，且技术都较为成熟，主流的开放对话平台有**科大讯飞、阿里云云小蜜、微信对话开放平台**等。我们对这三个平台进行了功能调研，最终选择使用微信对话开放平台作为我们的对话机器人平台。

我们将这三个平台的功能、优缺点进行了对比，从下表可以看出，微信对话平台针对微信小程序有天生的**稳定**优势，且**调用方便**，**没有额外费用**。我们也可以使用微信对话平台接入其他平台的API，以充分完善对话机器人。

三大平台对比：

| 功能\平台                | 微信对话开放平台               | 阿里云云小蜜   | 科大讯飞 |
| ------------------------ | ------------------------------ | -------------- | -------- |
| 语音合成                 | O                              | X              | O        |
| 语音识别                 | O                              | X              | O        |
| 自然语言处理             | O                              | O              | O        |
| 人机交互技术             | O                              | O              | O        |
| 多轮对话                 | O                              | O              | O        |
| 通用话术                 | O                              | O              | O        |
| 开放API                  | O                              | O              | O        |
| 预置功能                 | O                              | O              | X        |
| 批量导入                 | O                              | O              | X        |
| 关键词问答               | O                              | O              | O        |
| 是否可以应用于微信小程序 | O                              | O              | O        |
| 数据统计                 | O                              | O              | X        |
| 费用                     | 免费                           | 90天免费1000次 | 收费     |
| 稳定性                   | 很高（小程序直接调用对话插件） | 高             | 高       |



### （二）微信对话开放平台介绍

微信对话开放平台以提供串联微信生态内外的服务流程为核心，提供全网多样的流程化服务能力，为开发者和非开发者提供完备，高效，简易的可配置服务，可通过微信公众号、小程序、第三方平台接入。对话系统由微信对话提供技术支持，应用业内最领先的语义理解模型。创建流程简单、易用，无需深入学习自然语言处理技术，只需提供对话语料，即可零基础搭建智能客服平台与行业普通（问答型）或高级（任务型）智能对话技能。

微信对话开放平台的几大优势：**功能强大、简单易用、免费调用、支持批量上传、接口丰富**。

#### 1、基本概念

##### （1）意图

意图是指用户在对话交互中发出的主要请求或动作，每个意图对应着用户一个真实需求，一个技能由一个或多个意图组成。

例如当用户说“从北京南站到天津站”，用户的目的就是为了对这段行程进行导航，对应着用户“从北京南站到天津站发起导航”的需求。

##### （2）技能

技能是满足用户特定需求的一个应用，它通过多轮对话交互来完成。

例如，在一个根据天气推荐穿衣的技能中，用户将先针对“获知明天北京天气如何”这个需求，提问“今天北京天气怎么样”，这时会进入该技能的天气查询意图，天气是触发该技能的关键词，至此第一轮对话完成；随后用户为了“知道明天的天气应该穿什么”这个需求，再次提问“在北京明天应该穿什么”，这时机器人将跳转到“按天气推荐穿衣”这个意图下进行回答。至此，这个技能满足了根据天气推荐穿衣的应用。



#### 2、参考资料

##### （1）平台使用官方文档

[使用文档](https://developers.weixin.qq.com/doc/aispeech/platform/INTRODUCTION.html)

##### （2）平台使用教学视频

[教学视频](https://support.qq.com/products/61913/faqs/54118)



### （三）机器人配置

#### 1、初级技能

##### （1）录入范围

根据小程序开发要求，我们在初级技能中对每一条海贝分的加减分政策及直接定级政策进行了适配与录入。

具体范围包括《威海市文登区社会成员信用积分和信用评价管理办法》及附件1——个人信用信息评价标准、附件2——社会法人信用信息评价标准，各类信息共录入545条（csv格式），并进行了录入二次核对，确保录入问法标准。



<img src="https://tva1.sinaimg.cn/large/008eGmZEly1godx897iuxj31e20u07wh.jpg" alt="屏幕快照 2021-03-09 下午8.20.51" style="zoom:25%;" />

<center>csv文件</center>



##### （2）录入方法及格式

微信对话开放平台提供了初级技能**批量上传**功能，将所有问题以**csv文件**格式保存即可上传至平台服务器。

基本格式如下：

平台支持开发者在用户问法中加入**“()”、“|”、“&&”**三种规则符号。其中：

```text
"()": 必选符号，必须成对出现，不允许嵌套；

“|”: 或，仅出现在括号内；

“&&”：连接符；
```

> 注：以上正则符号均必须为英文符号； 使用方式： 用“()”将用户问法分割为多个条件；条件之间用“&&”定义无序、有序；用“|”定义条件可选等。



<img src="/Users/liurunze/Downloads/新建文件夹 (2)/QQ图片20210302152327.png" alt="QQ图片20210302152327" style="zoom:25%;" />

<center>录入示例</center>



录入语法基本可总结为：**“发语词+关键词+结构连接词+次关键词+结语词”**的格式，对于部分较复杂的问题则进行了更为细致的整理与总结。

对于识别阈值，普遍设置为**0.8**，对于部分效果不尽如人意的问题，则对应进行阈值调整。

另外，为了更好的满足用户体验，我们对每一条问题设置了相对应的标准问题，如“请问受到表彰奖励的加分多少？”这样在用户没有完全准确的匹配到相关内容时，可在联想出的五条问题处一目了然的看到次相关问题并进行选择。

并且，我们对所有问题进行了格式的统一和完善，格式大致为：**个人/法人——领域——方面——具体内容**。



##### （3）问法规则

在录入与调试的过程中，我们也在不断增加与补充问法规则，基本规则为：**请尽可能准确的表述您的问题，对于其中的关键词应尽量准确，另外减少不必要的语气助词与逻辑关系词，如“吗？”，”在...中“之类，这样可以相当程度上提高命中的准确度。**

具体问法规则如下：

> *1、本对话机器人所回答内容均来自《威海市文登区社会成员信用积分和信用评价管理办法》以及《威海市文登区农村居民信用积分评价办法》，文登区政府对所回答问题答案享有最终解释权。*
>
> *2、您可以在此平台中询问任何关于信用积分与信用评级的相关内容，脱离于此的问题均为无效问题。*
>
> *3、您需要准确地描述所提问内容的关键信息，如果关键信息与事实情况有所偏差，可能造成回答出现错误或无法得到答案，增减分实际标准请以本平台所提供标准问题为准。*
>
> *4、您可以这样问：*
>
> “请问违反计划生育政策扣多少分”
>
> *“请问参加志愿服务加多少分”*
>
> “请问被法院列为失信被执行人名单有什么后果”
>
> *5、如果您的问题表述为：*
>
> *“请问扣多少分”*
>
> *“请问志愿活动”*
>
> *“请问犯法扣多少分”*
>
> *这样不完整或模糊的表述，所得到的回答可能出现问题或错误。*
>
> *6、如果机器人的回答未使您满意或未能解决您的问题，您可以在机器人的回答下面寻找其余相关问题及答案，如果您依然感到困惑不解，您可以查阅本平台所提供给您的完整文档或更改您的提问方式为更准确具体的问题。*
>
> *7、如果您不清楚想要了解的内容，可以输入“开始引导”来进行对话引导*



#### 2、高级技能

为了更好的实现对不清楚文档内容的**引导**，我们加入了一定的高级技能来对用户进行引导，让用户可以快速上手并寻找到所问问题的答案，同时我们也发现了对话开放平台的一些自身问题以及bug，并及时地反馈给了对话平台的开发者及管理人员。

我们将问题详细地划分为**八级**，具体划分如下思维导图所示。

<img src="https://tva1.sinaimg.cn/large/008eGmZEly1goagmou70sj30u02lob29.jpg" alt="开始引导" style="zoom:20%;" />

<center>用户引导的对话结构</center>



### （四）机器人测试及优化

#### 1、通过性测试

为了检测所有录入机器人的问题是否能够正确回答（使用标准问题提问），我们对所有问题进行了通过性测试，确保每个问题能够正常运行。

在二（二）1、初级技能中，已经介绍过录入的csv文件格式及内容，录入的信用政策共计**545条**，在本次测试中，此文件被重命名为"final-test.csv"。此外，为方便查看测试结果，我们将将回答所在的列替换为数字1到545。

##### （1）测试代码（passTest.py）

（代码来自https://github.com/WeChatAI/openai_tools，是微信对话平台官方提供的测试代码，由于此GitHub仓库较长时间未维护，以下代码为修改调试后成功运行的版本。APPID、TOKEN、EncodingAESKey需要自行配置。开放接口使用教程：https://developers.weixin.qq.com/doc/aispeech/platform/INTERFACEDOCUMENT.html）

```python
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
```



##### （2）response

调用接口返回的response为json格式，包含技能名称、回答等信息，具体结构如下：

```json
{
  'ans_node_id': 8693139,
  'ans_node_name': '守信信息_社会公益',
  'answer': '捐款100—1000元的，每100元加1分+10捐款1001—5000元的，每400元加1分+10捐款5001—10000元的，每500元加1分+10捐款1万元以上的，每1000元加1分+10（捐款每年最多加40分）',
  'answer_open': 1,
  'answer_type': 'text',
  'article': '',
  'confidence': 1,
  'create_time': '1615038729091',
  'dialog_session_status': 'COMPLETE',
  'dialog_status': 'COMPLETE',
  'event': '',
  'from_user_name': '1',
  'intent_confirm_status': '',
  'is_default_answer': False,
  'list_options': False,
  'msg': [
    {
      'ans_node_id': 8693139,
      'ans_node_name': '守信信息_社会公益',
      'article': '',
      'confidence': 1,
      'content': '捐款100—1000元的，每100元加1分+10捐款1001—5000元的，每400元加1分+10捐款5001—10000元的，每500元加1分+10捐款1万元以上的，每1000元加1分+10（捐款每年最多加40分）',
      'debug_info': '',
      'event': '',
      'list_options': False,
      'msg_type': 'text',
      'opening': '',
      'request_id': 32610,
      'resp_title': '请问捐款加多少分',
      'scene_status': 's_Not_Started@',
      'session_id': '',
      'status': 'GENERAL_FAQ',
      'take_options_only': False
    }
  ],
  'msg_id': '1615038729091',
  'opening': '',
  'request_id': 32610,
  'ret': 0,
  'scene_status': 's_Not_Started@',
  'session_id': '',
  'skill_id': '1264950',
  'skill_name': '守信信息_社会公益',
  'slot_info': [],
  'slots_info': [],
  'status': 'GENERAL_FAQ',
  'take_options_only': False,
  'title': '请问捐款加多少分',
  'to_user_name': 'MJbO06kClHwaDsH6BTgPSV4eTM0vbK',
  'msgtype': 'text',
  'query': '请问捐款加多少分'
}
```



##### （3）测试结果

准确率：**100%**，545条问题均能正确回答



<img src="https://tva1.sinaimg.cn/large/008eGmZEly1godri6lpv1j30uu0iqdid.jpg" alt="1111" style="zoom:25%;" />



```python
# 结果说明
no_match：未匹配到的问题数量
wrong_count：回答错误的问题数量
half_correct_count：回答未匹配到，但下方列表匹配到的问题数量
correct_count：完全正确的问题数量
total_accuracy：准确率
```



#### 2、准确率优化

##### （1）问法须知

微信对话开放平台提供了丰富的调用接口，可以调用第三方API完成个性化的任务型服务技能。为了方便用户使用，提高准确率，首先我们推荐用户浏览我们的**问法须知**（第一次打开机器人时弹出，此问法须知总结于用户体验及感受，经过多次更改形成现有版本），当用户问法过于模糊或超出问答范围无法匹配到正确的意图时，机器人会再次返回问法须知，用户可根据问法须知再此明确自己的问题，以便找到问题答案。

##### （2）意图相似度及意图优先级

根据多次测试结果，我们对一些较为特殊、出现问题的条目设置了单独的**意图相似度和意图优先级**。

在机器人投入使用后，我们可以根据用户反馈适当调整限制阈值，以给用户更好的使用体验。

##### （3）模型标注

微信开放平台提供了模型标注功能，机器人管理员在后台可以对已完成的对话进行**数据标注**，从而可以优化机器人回答的准确率。

![img](/Users/liurunze/Downloads/新建文件夹 (2)/v2-667869b932f89a17366b45898d7b929f_1440w.png)

<center>模型标注示例</center>

##### （4）效果统计

微信对话开放平台中提供了**效果统计**功能，其会自动统计机器人回答准确率、召回率、F1-score、AUC等统计量评估运行效果。

![img](/Users/liurunze/Downloads/新建文件夹 (2)/v2-bebcd1313124a01baf9471da281687fa_1440w.png)

<center>微信对话开放平台-效果统计</center>

##### （5）人工客服

此外，若用户在使用过程中遇到了不可解决的问题或对我们的机器人有任何建议或意见，用户可以转**人工客服**进行解决或反馈。人工客服也会看到用户未识别的问题并主动接入进行回答，目前人工客服测试效果良好，反馈速度较快。



#### 3、准确率测试

准确率是机器人回答效果的重要体现，准确率的高低将直接影响用户的使用体验。我们使用组内未录入问题的同学提出的**"问法——答案"对**作为测试数据（答案使用1-545数字表示），使用Python程序对准确率进行测试，通过检验标准答案与机器人的回答是否一致判断是否回答正确。

##### （1）测试代码（calculateAccuracy.py）

```Python
import jwt
import requests
import csv

# 以下三项需要自行配置
APPID = ""
TOKEN = ""
EncodingAESKey = ""

fin = open("wcy4.txt", 'r')
with open('final-test.csv', 'r') as f:
    reader = csv.reader(f)
    result = list(reader)

no_match = 0
wrong_count = 0
half_correct_count = 0
correct_count = 0
total_count = 0

for line in fin.readlines():
    query, ground_truth_intent = line.strip().split()
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

fin.close()
```



##### （2）测试文件结构

```json
问题 正确答案
问题 正确答案
问题 正确答案
```



##### （3）测试结果

准确率：**95.8%**，109条问题均能正确回答，5条问题回答未匹配到，但下方列表匹配到，5条问题回答错误



<img src="https://tva1.sinaimg.cn/large/008eGmZEly1godsgf25k2j30uu0iq0vr.jpg" alt="2222" style="zoom:25%;" />



```python
# 结果说明
no_match：未匹配到的问题数量
wrong_count：回答错误的问题数量
half_correct_count：回答未匹配到，但下方列表匹配到的问题数量
correct_count：完全正确的问题数量
total_accuracy：准确率
```



## 三、微信小程序

小程序在开发上使用了组件丰富的**Vant组件库**和色彩搭配较好的**ColorUi组件库**，界面简洁明了，颜色样式美观，用户体验良好。

### （一）首页

小程序的首页提供了常用功能的入口，页面整体采用简洁设计，同时突出重点功能，层次上错落有致，提供了各页面的导航入口，侧重分明，逻辑清晰。



<img src="https://tva1.sinaimg.cn/large/e6c9d24ely1go70brbx9mj20n01dshdt.jpg" alt="IMG_3029" style="zoom:25%;" />

<center>小程序首页</center>



### （二）机器人对话页面

通过语音/文本输入与机器人对话，以询问信用政策问题。



<img src="https://tva1.sinaimg.cn/large/e6c9d24ely1go70qqhz5cj20n01dstl9.jpg" alt="IMG_3031" style="zoom:25%;" />

<center>对话机器人页面</center>



#### 1、快速提问功能

点击下方胶囊内预置的问题，可进行快速的固定语句提问。

胶囊内的问题包括**联想到的相近问题**和**高频问题**，用户不需要手动输入，点击问题可直接提问。



#### 2、普通提问功能

- 文字：以文本形式输入问题并发送，即可得到答复。
- 语音：点击左下按钮切换至语音输入，按住语音键后说出问题，松开语音键，得到答复。

准确率极高，同时包含用户引导功能，500余条数据涵盖了官方文档的各个方面。



#### 3、用户引导功能

用户输入**”开始引导“**即可唤醒机器人的引导功能，机器人会以回答的形式逐级将**可跳转的链接**进行展示，用户可以点击回答中的**引导链接**细分范围，直到链接到最后某具体领域，机器人会把该领域**所有问题**的标准问法发送给用户，用户可以通过点击某条标准问法获得其对应答案。

具体流程如下图所示：

<img src="https://tva1.sinaimg.cn/large/008eGmZEly1godywobsc2j30n03rwh56.jpg" alt="IMG_3079" style="zoom:20%;" />

<center>引导示例</center>



#### 4、语音播放功能

在提问后提供文字回答，点击播放按钮即可语音播放回答。



### （三）信用文档页面

该页面主要展示了**《威海市文登区社会成员信用积分和信用评价管理办法》**全文，政策内容经分类处理，页面层级明确、色调统一。

#### 1、政策内容与目录

上下滑动政策目录以浏览政策内容。点击菜单后弹出**分级折叠菜单**，通过点击条目标题**跳转**至相应政策内容。

政策内容在确保完整性的前提下进行了**分类**，以确保查询的便利。

分级目录采用了**三级分层**，逻辑性更强，分类更完善。

与市面上的小程序（如民法典）不同，跳转功能的实现并不会影响政策区域的内容展示，例如跳转至条目以上的内容被删去或仅保留跳转至条目。在跳转后，政策内容将定位至该标题下内容，且仍能够正常执行上下滑动操作，查看邻近的政策内容。



<img src="https://tva1.sinaimg.cn/large/008eGmZEly1godyz2s3x6j30n01dsajq.jpg" alt="IMG_3085" style="zoom:25%;" />

<center>多级目录</center>



#### 2、搜索功能

在上方搜索栏输入内容，点击搜索，原政策文件区域将展示搜索结果。

搜索关键词被着重**红色标记**，帮助用户更加便利地浏览搜索结果。



<img src="https://tva1.sinaimg.cn/large/008eGmZEly1godyykb7vyj30n01dsn8v.jpg" alt="IMG_3084" style="zoom:25%;" />

<center>搜索示例</center>



## 四、相关资料



![qrcode](https://tva1.sinaimg.cn/large/e6c9d24ely1go70ahfmr4j2076076t9n.jpg)

<center>海贝助手二维码</center>



[bilibili（b站）视频链接](https://www.bilibili.com/video/BV1fU4y1H7sv)



[GitHub链接](https://github.com/Liu-Runze-SDUWH/haibei)



<img src="https://tva1.sinaimg.cn/large/008eGmZEly1goahw59phuj30u029ztle.jpg" alt="IMG_3063" style="zoom:25%;" />

<center>微信小程序工程目录树</center>

