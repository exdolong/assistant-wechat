// pages/home/home.js
Page({

  formSubmit: function (data) {

    this.userLogin(data.detail.value);
  },

  userLogin: function (userData) {
    var userName = userData.username;
    var password = userData.password;
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
    console.log(userData);
    wx.showLoading({
      title: 'Loading'
    });

    wx.getStorage({
      key: userName,
      success: function (res) {
        console.log(res);
        wx.hideLoading();
        var pas = res.data.password;
        if (password != pas) {
          wx.showModal({
            title: '提示',
            content: '密码错误'
          });
          return;
        }

        wx.navigateTo({
          url: '../home/home?username=' + userName
        });
      },
      fail: function (error) {
        wx.hideLoading();
        wx.showModal({
          title: '提示',
          content: '该用户不存在'
        });
      }
    });
  },

  register: function () {
    wx.navigateTo({
      url: '../register/register'
    })
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

    wx.login({
      success: function (res) {
        if (res.code) {
          //发起网络请求
          console.log(res);
        } else {
          console.log('登录失败！' + res.errMsg);
        }
      }
    });
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    var context = wx.createCanvasContext('firstCanvas')

    context.setStrokeStyle("#00ff00")
    context.setLineWidth(5)
    context.rect(0, 0, 200, 200)
    context.stroke()
    context.setStrokeStyle("#ff0000")
    context.setLineWidth(2)
    context.moveTo(160, 100)
    context.arc(100, 100, 60, 0, 2 * Math.PI, true)
    context.moveTo(140, 100)
    context.arc(100, 100, 40, 0, Math.PI, false)
    context.moveTo(85, 80)
    context.arc(80, 80, 5, 0, 2 * Math.PI, true)
    context.moveTo(125, 80)
    context.arc(120, 80, 5, 0, 2 * Math.PI, true)
    context.stroke()
    context.draw()
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
    console.log('login触底');
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  },

})