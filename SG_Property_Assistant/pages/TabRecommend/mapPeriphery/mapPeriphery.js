// pages/TabRecommend/mapPeriphery/mapPeriphery.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    latitude: 23.099994,
    longitude: 113.324520,
    markers: [{
      id: 1,
      latitude: 23.099994,
      longitude: 113.324520,
      name: 'T.I.T 创意园',
      iconPath: '/images/fc_map_location.png',
      width: 28,
      height: 36,
    }]
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function(e) {
    this.setData({
      iconWithTxt: [
        { 
          'iocnNormal':'/images/fc_map_bus_normal.png',
          'iconHighlighted':'/images/fc_map_bus_highlighted.png',
          'tiemTxt':'公交'
        },
        {
          'iocnNormal': '/images/fc_map_subway_normal.png',
          'iconHighlighted': '/images/fc_map_subway_highlighted.png',
          'tiemTxt': '地铁'
        },
        {
          'iocnNormal': '/images/fc_map_school_normal.png',
          'iconHighlighted': '/images/fc_map_school_highlighted.png',
          'tiemTxt': '学校'
        },
        {
          'iocnNormal': '/images/fc_map_bank_normal.png',
          'iconHighlighted': '/images/fc_map_bank_highlighted.png',
          'tiemTxt': '银行'
        },
        {
          'iocnNormal': '/images/fc_map_food_normal.png',
          'iconHighlighted': '/images/fc_map_food_highlighted.png',
          'tiemTxt': '餐饮'
        },
        {
          'iocnNormal': '/images/fc_map_hospital_normal.png',
          'iconHighlighted': '/images/fc_map_hospital_highlighted.png',
          'tiemTxt': '医院'
        },
        ],
    });
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
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