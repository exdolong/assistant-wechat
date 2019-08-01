// pages/TabMy/TabMy.js

Page({

  /**
   * 页面的初始数据
   */
  data: {
    isSignin: false,
    listOperation: [
      ['/images/fc_feedback_problem.png', '/images/fc_focus_public.png', '/images/fc_service_telephone.png', '/images/fc_about_us.png'],
      ['反馈问题', '关注公众号', '客服电话', '关于我们'],
      ['loanAnswer/loanAnswer', '', 'intermedRecommend/intermedRecommend', 'intermedRecommend/intermedRecommend']
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
    wx.navigateTo({
      url: 'myInfoUpdate/myInfoUpdate',
    })
  },

  /**
   * 页面常用功能跳转
   */
  myJumpTap: function(event) {
    var currentIndex = event.currentTarget.dataset.index;
    wx.navigateTo({
      url: this.data.common_operation_Array[currentIndex].common[2],
    })
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
    // console.log(JSON.stringify(userInfo));
    if (userInfo.nickName) {
      var infoObj = {
        nickName: userInfo.nickName,
        avatarUrl: userInfo.avatarUrl,
        city: userInfo.city,
        province: userInfo.province
      };
      this.setData({
        currentObj: infoObj,
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