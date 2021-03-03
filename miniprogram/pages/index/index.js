const app = getApp()

Page({
  data: {
    active6: 0,
    motto: 'Hello World',
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    cardCur: 0,
    swiperList: [{
      id: 0,
      type: 'image',
      url: '../../assets/images/nongcun.jpg'
    }, {
      id: 1,
      type: 'image',
      url: '../../assets/images/qiye.png',
    }, {
      id: 2,
      type: 'image',
      url: '../../assets/images/jiguan.png'
    }, {
      id: 3,
      type: 'image',
      url: '../../assets/images/shequ.png'
    }, {
      id: 4,
      type: 'image',
      url: '../../assets/images/xiaoyuan.png'
    }],
    news: "",
    grids: [{
      'id': 0,
      'title': '信用进企业',
      'path': '../../assets/images/qiye.png'
    }, {
      'id': 1,
      'title': '信用进校园',
      'path': '../../assets/images/xiaoyuan.png'
    }, {
      'id': 2,
      'title': '信用进机关',
      'path': '../../assets/images/jiguan.png'
    }, {
      'id': 3,
      'title': '信用进农村',
      'path': '../../assets/images/nongcun.png'
    }, {
      'id': 4,
      'title': '信用进社区',
      'path': '../../assets/images/shequ.png'
    }, {
      'id': 5,
      'title': '信用惠民政策',
      'path': '../../assets/images/file.png'
    }],
  },
  onLoad() {
    var that = this;
    if (app.globalData.userInfo) {
      this.setData({
        userInfo: app.globalData.userInfo,
        hasUserInfo: true
      })
    } else if (this.data.canIUse) {
      // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
      // 所以此处加入 callback 以防止这种情况
      app.userInfoReadyCallback = res => {
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true
        })
      }
    } else {
      // 在没有 open-type=getUserInfo 版本的兼容处理
      wx.getUserInfo({
        success: res => {
          app.globalData.userInfo = res.userInfo
          this.setData({
            userInfo: res.userInfo,
            hasUserInfo: true
          })
        }
      })
    }
    this.towerSwiper('swiperList');
  },
  nav(e) {
    var id = e.currentTarget.dataset.id
    if (id == 5) {
      wx.navigateTo({
        url: '../huimin/huimin',
      })
    } else {
      wx.openDocument({
        filePath: app.globalData.doc[id]['path'],
        fileType: 'pdf',
        showMenu: true,
        success: function (res) {
          console.log('打开文档成功', res)
        }
      })
    }
  },
  onShow() {
    // console.log(app.globalData.userInfo)
  },
  getUserInfo(e) {
    console.log(e)
    app.globalData.userInfo = e.detail.userInfo
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })
  },
  toRobot() {
    wx.navigateTo({
      url: '../robot/robot',
    })
  },
  toDocument() {
    wx.navigateTo({
      url: '../document/document',
    })
  },
  authorizeClick: function (event) {
    wx.showTabBar({})
    let that = this;
    let userInfo = event.detail.rawData;
    let nickName = JSON.parse(event.detail.rawData).nickName;
    let avatarUrl = JSON.parse(event.detail.rawData).avatarUrl;
    if (userInfo) {
      // 1.授权成功将数据存到data中
      that.setData({
        userInfo: userInfo,
        nickName: nickName,
        avatarUrl: avatarUrl,
      })
      // 2.将数据存到app.js中（其他页面也要用）
      app.globalData.userInfo = userInfo;
      app.globalData.nickName = nickName;
      app.globalData.avatarUrl = avatarUrl;
    }
    // 查询数据库用户记录
    db.collection('users').where({
      _openid: that.data.openid
    }).get({
      success: res => {
        if (res.data[0]) {
          that.setData({
            name: res.data[0].name,
            tel: res.data[0].tel,
            stunumber: res.data[0].stunumber,
            faculty: res.data[0].faculty,
            msgCounterId: res.data[0]._id,
          })
          app.globalData.msgCounterId = res.data[0]._id
          app.globalData.faculty = res.data[0].faculty
          console.log('数据库已有该用户信息')
        }
        if (!res.data[0]) {
          console.log('数据库无该用户信息')
          db.collection('users').add({
            data: {},
            success: res => {
              that.setData({
                msgCounterId: res._id,
              })
              app.globalData.msgCounterId = res._id
              console.log('[数据库] [新增空记录] 成功，记录 _id: ', res._id)
            },
            fail: err => {
              console.error('[数据库] [新增空记录] 失败：', err)
            }
          })
        }
        console.log('[数据库] [查询我的信息] 成功: ', res)
      },
      fail: err => {
        console.error('[数据库] [查询我的信息] 失败：', err)
      }
    })
  },
  // cardSwiper
  cardSwiper(e) {
    this.setData({
      cardCur: e.detail.current
    })
  },
  // towerSwiper
  // 初始化towerSwiper
  towerSwiper(name) {
    let list = this.data[name];
    for (let i = 0; i < list.length; i++) {
      list[i].zIndex = parseInt(list.length / 2) + 1 - Math.abs(i - parseInt(list.length / 2))
      list[i].mLeft = i - parseInt(list.length / 2)
    }
    this.setData({
      swiperList: list
    })
  },
  // towerSwiper触摸开始
  towerStart(e) {
    this.setData({
      towerStart: e.touches[0].pageX
    })
  },
  // towerSwiper计算方向
  towerMove(e) {
    this.setData({
      direction: e.touches[0].pageX - this.data.towerStart > 0 ? 'right' : 'left'
    })
  },
  // towerSwiper计算滚动
  towerEnd(e) {
    let direction = this.data.direction;
    let list = this.data.swiperList;
    if (direction == 'right') {
      let mLeft = list[0].mLeft;
      let zIndex = list[0].zIndex;
      for (let i = 1; i < list.length; i++) {
        list[i - 1].mLeft = list[i].mLeft
        list[i - 1].zIndex = list[i].zIndex
      }
      list[list.length - 1].mLeft = mLeft;
      list[list.length - 1].zIndex = zIndex;
      this.setData({
        swiperList: list
      })
    } else {
      let mLeft = list[list.length - 1].mLeft;
      let zIndex = list[list.length - 1].zIndex;
      for (let i = list.length - 1; i > 0; i--) {
        list[i].mLeft = list[i - 1].mLeft
        list[i].zIndex = list[i - 1].zIndex
      }
      list[0].mLeft = mLeft;
      list[0].zIndex = zIndex;
      this.setData({
        swiperList: list
      })
    }
  }
})