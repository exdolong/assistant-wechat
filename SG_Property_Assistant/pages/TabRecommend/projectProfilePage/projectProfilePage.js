// pages/TabRecommend/projectProfilePage/projectProfilePage.js
const util = require('../../../utils/util.js')

Page({

  /**
   * 页面的初始数据
   */
  data: {
    html: ``,
    isfixed: 0,
    notic: 0,
    projectMapUrl: '',
    trafficMapUrl: '',
    schoolMapUrl: '',
    medicalMapUrl: '',
    shoppingMapUrl: '',
    scrollTop: 0, //滚动的值
    winHeight: '100%'
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    const object = JSON.parse(options.obj);
    // 获取屏幕的高度
    var sysInfo = wx.getSystemInfoSync();
    this.setData({
      winHeight: sysInfo.windowHeight - (sysInfo.windowWidth * 90 / 750) + 'px',
      winWidth: sysInfo.windowWidth,
      ...object,
      projectMapUrl: util.getMapLngLat(object.lng, object.lat),
      trafficMapUrl: util.getAndMapLngLat(object.amenities.mrts),
      schoolMapUrl: util.getAndMapLngLat(object.amenities.schools),
      medicalMapUrl: util.getAndMapLngLat(object.amenities.hospitals),
      shoppingMapUrl: util.getAndMapLngLat(object.amenities.malls),
      bigArray: [
        util.getMapLngLat(object.lng, object.lat, true),
        'http://haiwaiyou.com/img/upload/10371.jpg',
        util.getAndMapLngLat(object.amenities.mrts, true),
        util.getAndMapLngLat(object.amenities.schools, true),
        util.getAndMapLngLat(object.amenities.hospitals, true),
        util.getAndMapLngLat(object.amenities.malls, true)
      ]
    })
    this.data.bigArray = this.data.bigArray.filter(function(e) {
      return e.replace(/(\r\n|\n|\r)/gm, "");
    });
  },

  toViewClick: function(e) {
    let str = e.target.dataset.hash;

    this.setData({
      scrollTop: this.data[str] - 40,
      nowstatus: str
    })
  },

  showBigPictureTap: function(event) {
    let src = event.currentTarget.dataset.src
    if (!this.data.bigArray[src]) {
      return
    }
    wx.previewImage({
      current: this.data.bigArray[src], // 当前显示图片的http链接
      urls: [
        ...this.data.bigArray
      ]
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {
    let that = this;
    const query = wx.createSelectorQuery();
    const array = ['notic', 'schoolBox', 'medicalBox', 'shoppingBox'];
    for (let index in array) {
      //获取元素距离页面顶部高度
      query.select(`#${array[index]}`).boundingClientRect().exec(res => {
        that.setData({
          [array[index]]: res[index].top
        })
      })
    }
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

  onPageScroll: function(e) {
    let isfixed = 0;
    if (parseInt(e.detail.scrollTop) > this.data.notic) {
      isfixed = 1;
    } else {
      console.log(isfixed);
      isfixed = 0;
    }

    if (e.detail.scrollTop <= this.data.notic - 40) {
      this.setData({
        nowstatus: 'notic'
      })
    }
    if (e.detail.scrollTop > this.data.schoolBox - 40) {
      this.setData({
        nowstatus: 'schoolBox'
      })
    }
    if (e.detail.scrollTop > this.data.medicalBox - 40) {
      this.setData({
        nowstatus: 'medicalBox'
      })
    }

    if (e.detail.scrollTop > this.data.shoppingBox - 40) {
      this.setData({
        nowstatus: 'shoppingBox'
      })
    }

    this.setData({
      isfixed
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
  onShareAppMessage: function() {

  }
})