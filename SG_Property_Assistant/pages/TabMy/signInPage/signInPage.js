// pages/TabMy/signInPage/signInPage.js
// header:{
//   Authorization: `Bearer ${ access_token }`
// },
const util = require('../../../utils/util.js')

Page({

  /**
   * 页面的初始数据
   */
  data: {

  },

  onGotUserInfo: function(e) {
    wx.showModal({
      title: '提示',
      content: '确认登录吗?',
      success(res) {
        if (res.confirm) {
          wx.showLoading({
            title: '登录中...',
          })
          wx.login({
            success(res) {
              if (res.code) {
                //发起网络请求
                wx.request({
                  url: util.configure.pathUrl + 'users/login',
                  data: {
                    code: res.code
                  },
                  method: "POST",
                  success(res) {
                    const sessionKey = res.data.data.sessionKey;
                    const access_token = res.data.data.auth.access_token;
                    wx.setStorageSync('access_token', res.data.data.auth.access_token);
                    wx.setStorageSync('refresh_token', res.data.data.auth.refresh_token);

                    wx.getUserInfo({
                      success: function(res) {
                        wx.setStorageSync('userInfo', res.userInfo);

                        wx.request({
                          url: util.configure.pathUrl + 'users/info',
                          header: {
                            Authorization: `Bearer ${ access_token }`
                          },
                          data: {
                            ...res,
                            sessionKey
                          },
                          method: "POST",
                          success(res) {
                            console.log(res);
                            wx.navigateBack();
                          },
                          complete(){
                            wx.hideLoading();
                          }
                        })
                      }
                    })
                  }
                })
              } else {
                console.log('登录失败！' + res.errMsg);
                wx.hideLoading();
              }
            }
          })
        }
      }
    })

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {

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