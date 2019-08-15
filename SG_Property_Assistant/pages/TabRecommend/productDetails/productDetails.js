// pages/TabRecommend/productDetails/productDetails.js
const util = require('../../../utils/util.js')
import request from '../../../utils/request.js'

Page({

  /**
   * 页面的初始数据
   */
  data: {
    currentIndex: 1,
    detailsData: null,
    projectId: null,
    fixedTop: 0,
    similarProjectArray: [], // 类似项目
    markersMapUrl: '',
    subscribeUrl: '/images/shouc_xingx.png',
    isSubscribe: false // 是否订阅
  },

  jumpLinkTap: function(e) {
    console.log(e.currentTarget.dataset);
    if (e.currentTarget.dataset.link) {
      wx.navigateTo({
        url: `../webViewPage/webViewPage?link=${e.currentTarget.dataset.link}`,
      })
    }
  },

  currentBindchange: function(e) {
    this.setData({
      currentIndex: e.detail.current + 1
    })
  },

  jumpSubscribeTap: function(e) {
    const access_token = wx.getStorageSync('access_token');
    if (access_token) {
      if (this.data.isSubscribe) {
        this.followingFunc('unFollow', 'DELETE');
      } else {
        this.followingFunc('follow', 'POST');
      }
    } else {
      wx.showModal({
        title: '提示',
        content: '你还没有登录,赶快去登录吧~~',
        success(res) {
          if (res.confirm) {
            console.log('用户点击确定')
            util.gotoLoginIfAnonymous()
          } else if (res.cancel) {
            console.log('用户点击取消')
          }
        }
      })
    }
  },

  // 订阅设置
  followingFunc: function(path, method) {
    request({
      url: util.configure.pathUrl + `projects/${this.data.id}/${path}`,
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
    util.telephone('02885593498');
  },

  // 跳转到产品详情
  jumpDetailsTap: function(event) {
    const id = event.currentTarget.dataset.postid;
    wx.navigateTo({
      url: `productDetails?id=${id}`,
    })
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
    wx.showShareMenu({
      // 要求小程序返回分享目标信息
      withShareTicket: true
    });
    wx.showLoading({
      title: '加载中...',
    })
    request({
      url: util.configure.pathUrl + 'projects/' + options.id,
      success(res) {
        if (res.data.data.isFollowing) {
          that.setCollection(true, 'shouc_ok');
        } else {
          that.setCollection(false, 'shouc_xingx');
        }
        that.data.projectId = res.data.data.id
        that.setData({
          ...res.data.data,
          markersMapUrl: util.getAndMapLngLat(res.data.data.amenities.mrts)
        })
      },
      complete() {
        wx.hideLoading()
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
        districtIds: [this.data.districtId],
        excludeProjectId: this.data.projectId
      });
    }
  },

  loadData: function(param) {
    wx.showLoading({
      title: '加载中',
    })
    const that = this;
    request({
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
    let temppath = null
    if (res.target) {
      temppath = `/pages/program/index?id=${res.target.dataset.id}`;
    }
    return {
      title: this.data.title,
      path: temppath,
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