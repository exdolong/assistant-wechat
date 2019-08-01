// pages/TabRecommend/calculatorToolPage/calculatorToolPage.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    array: ['30年', '29年', '28年', '27年'],
    index: 0,
    interestArray: ['基准利率(4.9%)', '基准利率95折(4.9%)'],
    interestIndex: 0
  },

  waysLoan: function(event) {
    wx.showActionSheet({
      itemList: ['按贷款总额', '按房屋总价'],
      itemColor: "#333",
      success: function(res) {},
      fail: function(res) {}
    });
  },

  bindPickerChange: function(e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      index: e.detail.value
    })
  },

  bindInterestChange: function(e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      interestIndex: e.detail.value
    })
  },

  submitAction: (e) => {
    wx.navigateTo({
      url: '../loanResultPage/loanResultPage',
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