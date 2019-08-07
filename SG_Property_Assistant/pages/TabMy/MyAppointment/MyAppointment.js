// pages/TabMy/MyAppointment/MyAppointment.js
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
      url: util.configure.pathUrl + 'users/histories',
      data: {
        pageNumber: 1,
        pageSize: 20
      },
      success(res) {
        that.setData({
          content: res.data.data.content
        })
      }
    })
  },

  jumpDetailsTap: function() {
    // this.jumpa();
  },
  jumpa: function() {
    wx.navigateTo({
      url: '../appointmentDetails/appointmentDetails',
    })
  },
  jumpRoleDetailsTap: function(event) {
    wx.navigateTo({
      url: '../roleDetails/roleDetails',
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