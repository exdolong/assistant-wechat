// pages/TabRecommend/projectProfilePage/projectProfilePage.js
const util = require('../../../utils/util.js')

Page({

  /**
   * 页面的初始数据
   */
  data: {
    html: ``,
    isfixed: 0,
    fixedTop: 0,
    projectMapUrl: '',
    trafficMapUrl: '',
    schoolMapUrl: '',
    medicalMapUrl: '',
    shoppingMapUrl: ''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    const object = JSON.parse(options.obj);
    const projectMapUrl = `http://api.map.baidu.com/staticimage/v2?ak=A9ce773e870aba291288131e5dd1f500&mcode=666666&center=${object.lng},${object.lat}&markers=${object.lng},${object.lat}&width=800&height=380&zoom=15&markerStyles=-1,http://api.map.baidu.com/images/marker_red.png,-1,2156,2156`;

    this.setData({
      ...object,
      projectMapUrl,
      trafficMapUrl: util.getAndMapLngLat(object.amenities.mrts),
      schoolMapUrl: util.getAndMapLngLat(object.amenities.schools),
      medicalMapUrl: util.getAndMapLngLat(object.amenities.hospitals),
      shoppingMapUrl: util.getAndMapLngLat(object.amenities.malls),
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {
    const query = wx.createSelectorQuery();
    query.select('#notic').boundingClientRect().exec(res => { //获取元素距离页面顶部高度
      this.setData({
        fixedTop: res[0].top
      })
    })

  },

  showDetailsTap: function(e) {
    const remark = e.currentTarget.dataset.remark;

    if (remark) {
      wx.showModal({
        title: '详细内容',
        content: remark,
        success(res) {
          if (res.confirm) {
            console.log('用户点击确定')
          } else if (res.cancel) {
            console.log('用户点击取消')
          }
        }
      })
    }

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

  },
  onPageScroll: function(e) {
    let isfixed = 0;
    if (parseInt(e.scrollTop) > this.data.fixedTop) {
      isfixed = 1;
    } else {
      isfixed = 0;
    }

    this.setData({
      isfixed
    });
  }
})