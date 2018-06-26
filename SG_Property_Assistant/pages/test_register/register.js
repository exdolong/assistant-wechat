// pages/register/register.js
Page({

  formSubmit: function (data) {
    console.log(data.detail.value);
    var userName = data.detail.value.username;
    var password = data.detail.value.password;
    var passwordConfirm = data.detail.value.passwordConfirm;
    if (userName === "") {
      wx.showModal({
        title: '提示',
        content: '用户名不能为空'
      });
      return;
    }
    if (password === "") {
      wx.showModal({
        title: '提示',
        content: '密码不能为空'
      });
      return;
    }
    if (passwordConfirm === "") {
      wx.showModal({
        title: '提示',
        content: '重复密码不能为空'
      });
      return;
    }
    if (password != passwordConfirm) {
      wx.showModal({
        title: '提示',
        content: '两次密码不一致'
      });
      return;
    }

    wx.showLoading({
      title: 'Loading'
    });

    wx.getStorage({
      key: userName,
      success: function(res) {
        console.log(res);
        wx.hideLoading();
        wx.showModal({
          title: '提示',
          content: '该用户已注册'
        });
        
      },
      fail: function(error){
        console.log(error);

        wx.request({
          url: 'http://www.163.com',
          data: { username: userName, password: password },
          header: {
            'content-type': 'application/json' // 默认值
          },
          success: function (res) {
            console.log(res);

            var data = {
              key: userName,
              data: {
                username: userName,
                password: password
              }
            };
            try {
              wx.setStorage(data);
            } catch (e) {
            }

            wx.hideLoading();
          },
          fail: function (error) {
            console.log(error);
            wx.hideLoading();
          }
        });
      }
    });
 
  },

  /**
   * 页面的初始数据
   */
  data: {

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})