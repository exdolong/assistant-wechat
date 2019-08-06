// pages/TabRecommend/TabRecommend.js

const util = require('../../utils/util.js');

var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    carousel: [],
    projects: [] // 项目列表
  },
  onPullDownRefresh() {
    wx.stopPullDownRefresh()
  },
  // 跳转到产品详情
  jumpDetailsTap: function(event) {
    const id = event.currentTarget.dataset.postid;
    wx.navigateTo({
      url: `productDetails/productDetails?id=${id}`,
    })
  },

  jumpCalculatorToolTap: function(e) {
    const page = e.currentTarget.dataset.page;
    wx.navigateTo({
      url: page,
    })
  },

  jumpLinkTap: function(e) {
    wx.navigateTo({
      url: `webViewPage/webViewPage?link=${e.currentTarget.dataset.link}`,
    })
  },

  jumpSearchPageTap: function(event) {
    app.globalData.isTabActiveIndex = false;
    wx.navigateTo({
      url: '../TabSearch/TabSearch',
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    const that = this;
    const url = util.configure.pathUrl + 'home';
    wx.request({
      url: url,
      success(res) {
        that.setData({
          carousel: res.data.data.carousel,
          projects: res.data.data.projects
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
    wx.showTabBar({
      aniamtion: true,
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