// pages/TabRecommend/productDetails/productDetails.js
const util = require('../../../utils/util.js')

import request from '../../../utils/request.js'

Page({

  /**
   * 页面的初始数据
   */
  data: {
    detailsData: null,
    fixedTop: 0,
    similarProjectArray: [], // 类似项目
    markersMapUrl: '',
    subscribeUrl: '/images/shouc_xingx.png',
    isSubscribe: false // 是否订阅
  },

  jumpLinkTap: function(e) {
    wx.navigateTo({
      url: `../webViewPage/webViewPage?link=${e.currentTarget.dataset.link}`,
    })
  },

  jumpSubscribeTap: function(e) {
    const access_token = wx.getStorageSync('access_token');
    if (this.data.isFollowing) {
      this.followingFunc('unFollow', 'DELETE');
    } else {
      this.followingFunc('follow', 'POST');
    }
  },

  followingFunc: function(path, method) {
    const access_token = wx.getStorageSync('access_token');

    wx.request({
      url: util.configure.pathUrl + `projects/${this.data.id}/${path}`,
      header: {
        Authorization: `Bearer ${access_token}`
      },
      method,
      success: (res) => {
        if (method == 'DELETE') {
          this.setCollection(false, 'shouc_xingx');
        } else {
          this.setCollection(true, 'shouc_ok');
        }
      }
    })
  },

  jumpSendMessageTap: function(e) {
    util.telephone('13408065974');
  },

  // 设置订阅
  setCollection: function(following, imagePath) {
    this.setData({
      subscribeUrl: `/images/${imagePath}.png`,
      isSubscribe: following
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    const that = this;
    const access_token = wx.getStorageSync('access_token');
    let header = null;
    if (access_token) {
      header = {
        Authorization: `Bearer ${access_token}`
      }
    }

    wx.showShareMenu({
      // 要求小程序返回分享目标信息
      withShareTicket: true
    });

    wx.request({
      url: util.configure.pathUrl + 'projects/' + options.id,
      header,
      success(res) {
        
        if (res.data.data.isFollowing) {
          if (method == 'DELETE') {
            this.setCollection(false, 'shouc_xingx');
          } else {
            this.setCollection(true, 'shouc_ok');
          }
        }
        that.setData({
          ...res.data.data,
          markersMapUrl: util.getAndMapLngLat(res.data.data.amenities.mrts)
        })
      }
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

  jumpProjectProfileTap: function(event) {
    let obj = {
      intro: this.data.intro,
      amenities: this.data.amenities,
      lng: this.data.lng,
      lat: this.data.lat
    };
    wx.navigateTo({
      url: `../projectProfilePage/projectProfilePage?obj=${JSON.stringify(obj)}`,
    })
  },

  jumpLayoutHouseTap: function(event) {
    let obj = {
      layouts: this.data.layouts
    };
    wx.navigateTo({
      url: `../layoutHouseList/layoutHouseListPage?obj=${JSON.stringify(obj)}`,
    })
  },

  jumpPropertiesNewsListTap: function(event) {
    wx.navigateTo({
      url: `../propertiesNewsList/propertiesNewsList?obj=${JSON.stringify(this.data.news)}`,
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