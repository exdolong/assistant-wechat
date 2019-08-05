// pages/TabRecommend/mapFindRoom/mapFindRoom.js
var regionDisplayFlae = [false, false, false, false];
Page({

  /**
   * 页面的初始数据
   */
  data: {
    screeningsArray: ['区域', '售价', '房型', '更多'], //筛选条件数组
    latitude: 1.349057, // 103.839106,1.349057
    longitude: 103.839106,
    markers: [{
      id: 1,
      latitude: 1.349057,
      longitude: 103.839106,
      name: 'T.I.T 创意园',
      iconPath: '/images/fc_map_location.png',
      width: 28,
      height: 36,
    }]
  },

  /**
   * 排序点击事件
   */
  btnSort: function(event) {
    wx.showActionSheet({
      itemList: ['默认', '最新发布', '总价从低到高', '总价从高到低', '单价从低到高', '面积从大到小'],
      itemColor: "#333",
      success: function(res) {},
      fail: function(res) {}
    });
  },

  screenRegionTap: function(event) {
    var curr_index = event.currentTarget.dataset.index;
    var iscurrentMode = false;
    for (var i = 0; i < regionDisplayFlae.length; i++) {
      if (i == curr_index) {
        regionDisplayFlae[curr_index] = !regionDisplayFlae[curr_index];
      } else {
        regionDisplayFlae[i] = false;
      }
      // 判断当前是否有展开
      if (regionDisplayFlae[i].toString() == "true") {
        iscurrentMode = true;
      }
    }

    this.setData({
      "isRegionDisplay": regionDisplayFlae,
      "iscurrentIdex": curr_index,
      "iscurrentShow": iscurrentMode,
    });
  },

  cancelWindowTap: function(event) {
    console.log("event");
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    this.isRegionDisplay = false;
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