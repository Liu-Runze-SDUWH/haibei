//app.js
var plugin = requirePlugin("chatbot");
App({
  onLaunch: function () {
    var that = this;
    if (wx.cloud) {
      wx.cloud.init({
        traceUser: true
      })
    }
    wx.cloud.callFunction({
      name: "getOpenid", // 云函数的名字
      success: res => {
        console.log("[云函数] 获取 openid 成功:", res.result.openid)
        that.globalData.openid = res.result.openid;
      },
      fail: err => {
        console.log("[云函数] 获取 openid 失败:", err)
      }
    })
    wx.cloud.downloadFile({
      fileID: 'cloud://waimai-t0mfg.7761-waimai-t0mfg-1301103474/进企业.pdf',
      success: res => {
        that.globalData.doc[0]['path'] = res.tempFilePath
        console.log('00')
      },
      fail: console.error
    })
    wx.cloud.downloadFile({
      fileID: 'cloud://waimai-t0mfg.7761-waimai-t0mfg-1301103474/进校园.pdf',
      success: res => {
        that.globalData.doc[1]['path'] = res.tempFilePath
        console.log('01')
      },
      fail: console.error
    })
    wx.cloud.downloadFile({
      fileID: 'cloud://waimai-t0mfg.7761-waimai-t0mfg-1301103474/进机关.pdf',
      success: res => {
        that.globalData.doc[2]['path'] = res.tempFilePath
        console.log('02')
      },
      fail: console.error
    })
    wx.cloud.downloadFile({
      fileID: 'cloud://waimai-t0mfg.7761-waimai-t0mfg-1301103474/进农村.pdf',
      success: res => {
        that.globalData.doc[3]['path'] = res.tempFilePath
        console.log('03')
      },
      fail: console.error
    })
    wx.cloud.downloadFile({
      fileID: 'cloud://waimai-t0mfg.7761-waimai-t0mfg-1301103474/进社区.pdf',
      success: res => {
        that.globalData.doc[4]['path'] = res.tempFilePath
        console.log('04')
      },
      fail: console.error
    })
  },
  globalData: {
    ColorList: [{
        title: '嫣红',
        name: 'red',
        color: '#e54d42'
      },
      {
        title: '桔橙',
        name: 'orange',
        color: '#f37b1d'
      },
      {
        title: '明黄',
        name: 'yellow',
        color: '#fbbd08'
      },
      {
        title: '橄榄',
        name: 'olive',
        color: '#8dc63f'
      },
      {
        title: '森绿',
        name: 'green',
        color: '#39b54a'
      },
      {
        title: '天青',
        name: 'cyan',
        color: '#1cbbb4'
      },
      {
        title: '海蓝',
        name: 'blue',
        color: '#0081ff'
      },
      {
        title: '姹紫',
        name: 'purple',
        color: '#6739b6'
      },
      {
        title: '木槿',
        name: 'mauve',
        color: '#9c26b0'
      },
      {
        title: '桃粉',
        name: 'pink',
        color: '#e03997'
      },
      {
        title: '棕褐',
        name: 'brown',
        color: '#a5673f'
      },
      {
        title: '玄灰',
        name: 'grey',
        color: '#8799a3'
      },
      {
        title: '草灰',
        name: 'gray',
        color: '#aaaaaa'
      },
      {
        title: '墨黑',
        name: 'black',
        color: '#333333'
      },
      {
        title: '雅白',
        name: 'white',
        color: '#ffffff'
      },
    ],
    userInfo: null,
    searchContent: "",
    openid: "",
    doc: [{ // 'qiye'
      'downloaded': false,
      'path': ''
    }, { // 'xiaoyuan'
      'downloaded': false,
      'path': ''
    }, { // 'jiguan'
      'downloaded': false,
      'path': ''
    }, { // 'nongcun'
      'downloaded': false,
      'path': ''
    }, { // 'shequ'
      'downloaded': false,
      'path': ''
    }, ]
  }
})