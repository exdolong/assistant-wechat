// pages/TabSearch/TabSearch.js
const util = require('../../utils/util.js');
const historyKey = 'historyKey' // 历史关键字

var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    keyWord: '',
    historyArray: [], // 搜索历史
    hotwords: []
  },

  bindconfirmTap: function(e) {
    this.jumpSearchResultAndKaywrod(e.detail.value);
  },

  jumpSearchResultAndKaywrod: function(keyWrod) {
    this.data.historyArray.push(keyWrod);
    let tempArray = util.unique4(this.data.historyArray);

    wx.setStorage({
      key: historyKey,
      data: tempArray
    })
    wx.navigateTo({
      url: `searchResult/searchResult?keyWord=${keyWrod}`,
    })
  },

  districtSelect: function(e) {
    this.jumpSearchResultAndKaywrod(e.target.dataset.name);
  },

  searchBox: function(e) {
    console.log(e.detail.value.keyWord)
    this.setData({
      historyArray: e.detail.value.keyWord
    })
  },

  searchResultTap: function(event) {
    this.jumpSearchResultAndKaywrod(event.target.dataset.name);
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    const that = this;
    // 获取缓存
    wx.getStorage({
      key: historyKey,
      success(res) {
        that.setData({
          historyArray: res.data
        })
      }
    })

    const url = util.configure.pathUrl + 'search/hotwords';
    wx.request({
      url: url,
      success(res) {
        that.setData({
          hotwords: res.data.data
        })
      }
    })

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {
    var isIndex = app.globalData.isTabActiveIndex;
    if (isIndex) {
      wx.showTabBar({
        aniamtion: true,
      })
    } else {
      wx.hideTabBar({
        aniamtion: true,
      })
    }
    console.log(app.globalData.isTabActiveIndex);
  },

  backHomeTap: function() {
    wx.switchTab({
      url: '../TabRecommend/TabRecommend',
    })
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  }
})