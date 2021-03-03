var jsonList = require('../../assets/dataset/json.js')

Page({
  data: {
    collection: null,
    collectionList: null,
    bookmark: "",
    showFolder: false,
    foldStatus1: null,
    foldStatus2: null,
    searchContent: "",
    searchInput: "",
    searchResult: "",
    searching: false,
    searched: false,
    searchResultInfo: "",
  },
  unfold1: function (e) {
    var type = e.currentTarget.dataset.type
    var index = e.currentTarget.dataset.index
    var that = this
    if (type == 1) {
      var flag = !that.data.foldStatus1[index].flag
      var c = "foldStatus1[" + index + "]"
      that.setData({
        [c]: {
          flag: flag
        }
      })
    } else {
      var flag = !that.data.foldStatus2[index].flag
      var c = "foldStatus2[" + index + "]"
      that.setData({
        [c]: {
          flag: flag
        }
      })
    }
    // console.log(that.data.foldStatus1)
    // console.log(that.data.foldStatus2)
  },
  showFolder: function (event) {
    var that = this
    that.setData({
      showFolder: !that.data.showFolder
    })
  },
  innerRedirect: function (e) {
    var that = this
    var newId = e.currentTarget.dataset.id
    // console.log(e)
    // console.log(newId)
    that.setData({
      bookmark: newId,
      showFolder: false,
      searched: false
    })
  },
  onLoad: function () {
    var that = this
    var list = jsonList.jsonList
    var id = 0
    var subId = 0
    var temp = {
      flag: false
    }
    var fold1 = []
    var fold2 = []
    var cnt = 0
    for (var i in list) {
      list[i].id = i
      fold1[i] = temp
      for (var j in list[i].content) {
        list[i].content[j].id = id
        id += 1
        fold2[cnt] = temp
        cnt += 1
        for (var k in list[i].content[j].subcontent) {
          list[i].content[j].subcontent[k].id = subId
          subId += 1
        }
      }
    }
    that.setData({
      collection: jsonList.jsonList,
      foldStatus1: fold1,
      foldStatus2: fold2
    })
    // console.log(that.data.collection)
    // console.log(that.data.foldStatus1)
    // console.log(that.data.foldStatus2)
    that.listing()
  },
  listing: function () {
    var that = this
    var collection = that.data.collection
    var cnt = 0
    var list = []
    for (var i in collection) {
      var currentTitle = collection[i].title
      var currentTitleId = collection[i].id
      for (var j in collection[i].content) {
        var currentSubTitle = collection[i].content[j].subtitle
        var currentSubTitleId = collection[i].content[j].id
        for (var k in collection[i].content[j].subcontent) {
          var currentSubsubTitle = collection[i].content[j].subcontent[k].subsubtitle
          var currentSubsubTitleId = collection[i].content[j].subcontent[k].id
          var currentContent = collection[i].content[j].subcontent[k].subsubcontent
          list[cnt] = {
            title: currentTitle,
            titleId: currentTitleId,
            subtitle: currentSubTitle,
            subtitleId: currentSubTitleId,
            subsubtitle: currentSubsubTitle,
            subsubtitleId: currentSubsubTitleId,
            content: currentContent
          }
          cnt += 1
        }
      }
    }
    that.setData({
      collectionList: list
    })
    // console.log(that.data.collectionList)
  },

  onFocus() {
    var that = this
    that.setData({
      searching: true
    })
  },
  onBlur() {
    var that = this
    that.setData({
      searching: false
    })
  },
  onSearch() {
    if (this.data.value) {
      wx.showToast({
        title: '搜索：' + this.data.searchInput,
        icon: 'none'
      });
    }
  },

  onClick() {
    if (this.data.searchInput) {
      wx.showToast({
        title: '搜索：' + this.data.searchInput,
        icon: 'none'
      });
    }
    this.search_database()
  },

  onCancel() {
    this.setData({
      searching: false
    })
  },

  search_database: function () {
    var that = this;
    let hilight_word = function (key, word) {
      let idx = word.indexOf(key);
      let t = [];
      if (idx > -1) {
        if (idx == 0) {
          t = hilight_word(key, word.substr(key.length));
          t.unshift({
            key: true,
            str: key
          });
          return t;
        }
        if (idx > 0) {
          t = hilight_word(key, word.substr(idx));
          t.unshift({
            key: false,
            str: word.substring(0, idx)
          });
          return t;
        }
      }
      return [{
        key: false,
        str: word,
      }];
    };
    let database = that.data.collectionList;
    let searchResult = [];
    let searchInput = that.data.searchInput;
    let flag = "";
    if (searchInput == "undefined" || searchInput == null || searchInput == "") {
      wx.showToast({
        title: '输入为空！',
        icon: 'none'
      })
    } else {
      for (let i = 0; i < database.length; i++) {
        var current_word = database[i].content;
        if (current_word.indexOf(searchInput) > -1) {
          searchResult.push({
            "content": hilight_word(searchInput, current_word),
            "title": database[i].title,
            "subtitle": database[i].subtitle,
            "subsubtitle": database[i].subsubtitle,
            "key": i
          })
          flag = 1;
        }
      }
      if (flag) {
        console.log(searchResult);
        that.data.searchResult = searchResult;
        // that.data.searching = false;
        that.data.searched = true;
        // console.log('this data', this.data);
        this.setData(this.data);
      } else {
        wx.showToast({
          title: '未搜索到该关键词',
          icon: 'none'
        })
      }

    }
  },
})