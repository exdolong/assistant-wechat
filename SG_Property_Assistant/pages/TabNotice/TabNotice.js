// pages/TabNotice/TabNotice.js
const util = require('../../utils/util.js');
import request from '../../utils/request.js'


Page({

  /**
   * 页面的初始数据
   */
  data: {
    content: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    const that = this;
    wx.showLoading({
      title: '加载中...',
    })
    request({
      url: util.configure.pathUrl + 'notifications',
      data: {
        pageNumber: 1,
        pageSize: 20
      },
      success(res) {
        that.setData({
          content: res.data.data.content,
        })
      },
      complete() {
        wx.hideLoading()
      },
    })
  },

  toNottiDetailsTap: function(event) {
    let id = event.currentTarget.dataset.poid;
    let obj = null;
    for (let index in this.data.content) {
      if (id == this.data.content[index].id) {
        obj = this.data.content[index];
      }
    }
    wx.navigateTo({
      url: `noticeDetails/noticeDetails?title=${JSON.stringify(obj)}`,
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
    if (!util.isLogin()) {
      wx.showModal({
        title: '提示',
        content: '你还没有登录,赶快去登录吧~~',
        success(res) {
          if (res.confirm) {
            util.gotoLoginIfAnonymous()
          } else if (res.cancel) {
            wx.switchTab({
              url: '/pages/TabRecommend/TabRecommend'
            })
          }
        }
      })

      return
    }
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