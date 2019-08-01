// pages/TabRecommend/productDetails/productDetails.js
const util = require('../../../utils/util.js')

Page({

  /**
   * 页面的初始数据
   */
  data: {
    detailsData: null,
    fixedTop: 0,
    similarProjectArray: [], // 类似项目
    markersMapUrl: ''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    const that = this;
    wx.showShareMenu({
      // 要求小程序返回分享目标信息
      withShareTicket: true
    });

    wx.request({
      url: util.configure.pathUrl + 'projects/' + options.id,
      success(res) {
        let mrts = res.data.data.amenities.mrts;
        let strMarkers = '';
        for (let index in mrts) {
          strMarkers += mrts[index].lng + ',' + mrts[index].lat + '|'
        }
        strMarkers = strMarkers.substr(0, strMarkers.length - 1);

        let string = `http://api.map.baidu.com/staticimage/v2?ak=A9ce773e870aba291288131e5dd1f500&mcode=666666&center=${mrts[0].lng},${mrts[0].lat}&markers=${strMarkers}&width=800&height=380&zoom=15&markerStyles=-1,http://api.map.baidu.com/images/marker_red.png,-1,2156,2156`
        that.setData({
          ...res.data.data,
          markersMapUrl: string
        })
      }
    })
  },

  showShareTap: function() {
    console.log('eeeeeeeeee');
    wx.showToast({
      title: '1111',
    })
  },

  markertap(e) {
    console.log(e.markerId)
  },
  controltap(e) {
    console.log(e.controlId)
  },

  jumpMapTap: function(event) {
    wx.navigateTo({
      url: '../mapPeriphery/mapPeriphery',
    })
  },

  jumpProjectProfileTap: () => {
    wx.navigateTo({
      url: '../projectProfilePage/projectProfilePage',
    })
  },

  jumpLayoutHouseTap: (e) => {
    wx.navigateTo({
      url: '../layoutHouseList/layoutHouseListPage',
    })
  },

  jumpPropertiesNewsListTap: () => {
    wx.navigateTo({
      url: '../propertiesNewsList/propertiesNewsList',
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

  onPageScroll: function(e) {
    if (parseInt(e.scrollTop) > this.data.fixedTop && !this.data.similarProjectArray.length) {
      this.loadData({
        districtIds: [this.data.districtId]
      });
    }
  },

  loadData: function(param) {
    wx.showLoading({
      title: '加载中',
    })
    const that = this;
    wx.request({
      url: util.configure.pathUrl + 'projects',
      method: "POST",
      data: param,
      success(res) {
        console.log(res.data.data.content);
        that.setData({
          similarProjectArray: res.data.data.content
        })
      },
      complete() {
        wx.hideLoading()
      }
    });
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
  onShareAppMessage: function(res) {
    // 通过按钮触发
    const data = res.target.dataset
    return {
      title: this.data.title,
      path: '/pages/program/index?id=' + data.id,
      imageUrl: this.data.photos[0].path,
      success: function(res) {
        // 转发成功
        console.log('转发成功')
      },
      fail: function(res) {
        // 转发失败
        console.log('转发失败')
      }
    }
  },
})