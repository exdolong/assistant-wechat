// pages/TabMy/focusPublicNumberPage/focusPublicNumberPage.js
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

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {

  },

  /**
   * 保存图片到本地
   */
  setSaveImage: function(e) {
    var that = this;
    wx.showLoading({
      title: '图片生成中...',
    })
    var res = '';
    //调用画图方法
    that.drawImages();

  },

  /**
   * 画图方法
   */
  drawImages: function() {
    let that = this;
    // console.log(that.data);
    that.canvasHidden = false;
    //轮播图图片
    // var banner_image = that.data.imgUrls[0];

    //网络图片地址无法用画布截取到，故使用微信获取图片信息的接口，来设置网络图片地址
    that.getImageInfo(that.data.imgUrls[0]);

    //二维码图片
    var qrcode_image = that.data.imagePath;
    //标题
    var title = that.data.goodsInfo.title;

    let context = wx.createCanvasContext('testCanvas', that);
    context.setFillStyle('#fff');
    //绘制矩形的宽高
    context.fillRect(0, 0, 375, 356);

    //绘制轮播图
    context.drawImage(that.data.banner_image_url, 0, 0, 375, 180);

    //绘制标题
    context.setFontSize(14);
    context.setFillStyle("#000")
    context.fillText(title, 26, 228) //绘制描述

    //绘制二维码图 x y width height  
    context.drawImage(qrcode_image, 228, 200, 130, 130);
    // context.draw();
    context.draw(false, that.drawCallBack);

  },

  /**
   * 绘制画布回调函数
   */
  drawCallBack: function() {
    var that = this
    wx.canvasToTempFilePath({
      canvasId: 'imageCanvas',
      fileType: 'jpg',
      success: function(res) {
        var shareImg = res.tempFilePath;
        wx.saveImageToPhotosAlbum({
          filePath: res.tempFilePath,
          success(res) {
            wx.hideLoading();
            wx.showToast({
              title: '保存成功',
              icon: 'success',
              duration: 2000
            });
          }
        })

      },
      fail: function(res) {
        cosole.log(res, '<-fail res')
      }
    })
  },

  /**
   * 设置画布宽高
   */
  setCanvasSize: function() {
    var that = this;
    wx.getSystemInfo({
      success: function(res) {
        console.log(res);
        var myCanvasWidth = res.windowWidth;
        var myCanvasHeight = res.windowHeight;
        that.setData({
          canvasWidth: myCanvasWidth,
          canvasHeight: myCanvasHeight
        });
      },
    })

  },

  /**
   * 根据url获取图片信息
   */
  getImageInfo(ewmbgurl) {
    if (typeof ewmbgurl === 'string') {
      var that = this;
      wx.getImageInfo({ //  小程序获取图片信息API
        src: ewmbgurl,
        success: function(res) {
          that.setData({
            banner_image_url: res.path
          })
        },
        fail(err) {
          console.log(err)
        }
      })
    }
  },

  erWeiMaTap: function() {
    this.setSaveImage()
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