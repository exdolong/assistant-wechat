// pages/TabRecommend/loanResultPage/loanResultPage.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    // P=(Pv*R)/[1-(1+R)^(-n)]
    // loanTerm,// 年限 Math.pow(1+R,-n)
    // interestNuber, 利率
    // totalNumber 总金额
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    const object = JSON.parse(options.obj);
    console.log(object);
    // 5% = 0.05
    const R = (object.interestNuber / 100) / 12; 
    const n = object.loanTerm * 12;
    const p = ((object.totalNumber * 10000 * R) / (1 - Math.pow(1 + R, -n))).toFixed(2)

    this.setData({
      ...object,
      p
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