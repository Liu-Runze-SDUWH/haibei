import Page from '../../common/page';
import Dialog from '../../dist/dialog/dialog';
const app = getApp()
var plugin = requirePlugin("chatbot");
Page({
  data: {
    statusBarHeight: "",
    openid: "",
    confirmed: false,

  },
  onLoad: function (options) {
    this.onClickConfirm()
    this.data.openid = app.globalData.openid;
    wx.getSystemInfo({
      success: res => {
        let isIOS = res.system.indexOf("iOS") > -1;
        let navHeight = 0;
        if (!isIOS) {
          navHeight = 48;
        } else {
          navHeight = 44;
        }
        this.setData({
          status: res.statusBarHeight,
          navHeight: navHeight,
          statusBarHeight: res.statusBarHeight + navHeight
        })
        console.log('statusBarHeight', this.data.statusBarHeight)
      }
    })
    setTimeout(() => {
      plugin.init({
        appid: "2mxCAajvjIDg1CABS6fPqrtlLBk10k",
        openid: this.data.openid,
        // textToSpeech: true,
        guideList: ['开始引导', '海贝分是什么', '海贝分有什么用', '怎么查我的海贝分'],
        welcome: '欢迎使用海贝助手对话机器人，您可以在对话框内手动或语音输入您想要了解的问题，如果您对询问的方法有所困惑或不了解，您可以输入“问法规则”来查询提问的基本规则，如果您对询问的内容不确定，您可以输入“开始引导”来进行对话引导，希望我能解决您的问题，祝您使用愉快！',
        // background: "#eee",
        guideCardHeight: 50,
        // operateCardHeight: 120,
        history: true,
        // historySize: 60,
        // navHeight: this.data.statusBarHeight,
        hideMovableButton: true,
        robotHeader: "cloud://waimai-t0mfg.7761-waimai-t0mfg-1301103474/logo2.png",
        // robotName: "海贝助手",
        // userHeader: "", // 用户头像
        // userName: "海贝助手", // 用户昵称
        // anonymous: false, // 是否允许匿名用户评价，默认为false，设为ture时，未传递userName、userHeader两个字段时将弹出登录框
        success: () => {
          console.log("plugin initialized")
          this.setData({
            flag: true
          })
        },
        fail: error => {},
      });
    }, 200)
  },
  getQueryCallback: function (e) {

  },
  goBackHome: function () {
    wx.navigateBack({
      delta: 1
    })
  },
  back: function () {
    this.goBackHome()
  },
  onConfirm() {
    this.setData({
      confirmed: true
    })
  },
  onClickConfirm() {
    Dialog.alert({
      title: '问法须知',
      message: '\n1、本对话机器人所回答内容均来自《威海市文登区社会成员信用积分和信用评价管理办法》以及《威海市文登区农村居民信用积分评价办法》，文登区政府对所回答问题答案享有最终解释权。\n\n2、您可以在此平台中询问任何关于信用积分与信用评级的相关内容，脱离于此的问题均为无效问题。\n\n3、您需要准确地描述所提问内容的关键信息，如果关键信息与事实情况有所偏差，可能造成回答出现错误或无法得到答案，增减分实际标准请以本平台所提供标准问题为准。\n\n4、您可以这样问：\n“请问违反计划生育政策扣多少分”\n“请问参加志愿服务加多少分”\n“请问被法院列为失信被执行人名单有什么后果”\n\n5、如果您的问题表述为：\n“请问扣多少分”\n“请问志愿活动”\n“请问犯法扣多少分”\n\n这样不完整或模糊的表述，所得到的回答可能出现问题或错误。\n\n6、如果机器人的回答未使您满意或未能解决您的问题，您可以在机器人的回答下面寻找其余相关问题及答案，如果您依然感到困惑不解，您可以查阅本平台所提供给您的完整文档或更改您的提问方式为更准确具体的问题。\n\n7、如果您不清楚想要了解的内容，可以输入“开始引导”来进行对话引导\n\n'
    });
  },
})