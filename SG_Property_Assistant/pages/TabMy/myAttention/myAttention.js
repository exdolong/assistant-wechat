// pages/TabMy/myAttention/myAttention.js
const util = require('../../../utils/util.js')
import request from '../../../utils/request.js'

Page({

  /**
   * 页面的初始数据
   */
  data: {

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    const that = this;
    request({
      url: util.configure.pathUrl + 'users/following',
      data: {
        pageNumber: 1,
        pageSize: 20
      },
      success(res) {
        that.setData({
          projects: res.data.data.projects.content
        })
      }
    })
  },

  // 跳转到产品详情
  jumpDetailsTap: function(event) {
    const id = event.currentTarget.dataset.postid;
    wx.navigateTo({
      url: `../../TabRecommend/productDetails/productDetails?id=${id}`,
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