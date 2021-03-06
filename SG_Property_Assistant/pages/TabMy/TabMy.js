// pages/TabMy/TabMy.js
const util = require('../../utils/util.js')

Page({

  /**
   * 页面的初始数据
   */
  data: {
    isSignin: false,
    listOperation: [
      ['/images/fc_focus_public.png', '/images/fc_service_telephone.png', '/images/fc_about_us.png'],
      ['关注公众号', '客服电话', '关于我们'],
      ['focusPublicNumberPage/focusPublicNumberPage', 'telephone', '../TabRecommend/webViewPage/webViewPage?link=https://mp.weixin.qq.com/s/3MXQEiWrQmz1kCEJWwM89Q'],
      ['', '02885593498', '']
    ],
    common_operation_Array: [{
        common: ['/images/fc_mepage_focus.png', '订阅', 'myAttention/myAttention']
      },
      // {
      //   common: ['/images/fc_mepage_trading.png', '交易', 'myDeal/myDeal']
      // },
      // {
      //   common: ['/images/fc_mepage_loan.png', '贷款', 'myLoan/myLoan']
      // },
      {
        common: ['/images/fc_mepage_history.png', '历史', 'MyAppointment/MyAppointment']
      }
    ],
  },

  myModifyTap: function(event) {
    // wx.navigateTo({
    //   url: 'myInfoUpdate/myInfoUpdate',
    // })
  },

  /**
   * 页面常用功能跳转
   */
  myJumpTap: function(event) {
    const page = event.currentTarget.dataset.page;
    const access_token = wx.getStorageSync('access_token');

    if (page == 'telephone') {
      util.telephone('02885593498');
    } else {
      if (util.isLogin()) {
        wx.navigateTo({
          url: page,
        })
      } else {
        util.gotoLoginIfAnonymous();
      }
    }
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {

  },

  onShow: function() {
    this.init();
  },

  // 设置页面初始化
  init: function() {
    var userInfo = wx.getStorageSync('userInfo');

    if (userInfo.nickName) {
      this.setData({
        ...userInfo,
        isSignin: true,
      });
    } else {
      this.setData({
        isSignin: false,
      });
    }
  },

  signInTap: function(event) {
    wx.navigateTo({
      url: 'signInPage/signInPage',
    })
  },
  //退出登录事件 
  outLogonTap: function(event) {
    var userInfo = wx.getStorageSync('userInfo');
    var that = this;
    if (userInfo) {
      wx.showModal({
        title: '退出提示',
        content: '你确定退出登录吗？',
        success: function(res) {
          if (res.confirm) {
            console.log('用户点击确定')
            wx.clearStorage();
            that.setData({
              isSignin: false
            });
          }
        }
      })
    }
  },

})