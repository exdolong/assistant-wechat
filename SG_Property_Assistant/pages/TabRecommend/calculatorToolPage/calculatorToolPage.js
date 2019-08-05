// pages/TabRecommend/calculatorToolPage/calculatorToolPage.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    loanTermArray: [],
    loanTerm: 0, // 贷款年限
    interestArray: [5.39, 5.145, 4.9, 4.655],
    interestIndex: 0,
    totalNumber: '请输入',
    lendingRate: 1.98 //贷款利率
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
    console.log("年：" + e.detail.value);
    this.setData({
      loanTerm: e.detail.value
    })
  },

  bindInterestChange: function(e) {
    console.log("利率：" + e.detail.value);
    this.setData({
      interestIndex: e.detail.value
    })
  },

  jumapDiest: function(e) {
    console.log(e.currentTarget.dataset.lending);
    this.setData({
      lendingRate: e.currentTarget.dataset.lending
    })
  },

  changeInput: function(e) {
    this.setData({
      totalNumber: e.detail.value
    })
  },

  changeLendInput: function(e) {
    this.setData({
      lendingRate: e.detail.value
    })
  },

  focusInput: function() {
    this.setData({
      totalNumber: ''
    })
  },

  focusInput02: function () {
    this.setData({
      lendingRate: ''
    })
  },

  submitAction: function(e) {
    let totalNumber = parseInt(this.data.totalNumber);
    let obj = {
      loanTerm: this.data.loanTermArray[this.data.loanTerm],
      interestNuber: this.data.lendingRate,
      totalNumber
    }
    if (totalNumber) {
      wx.navigateTo({
        url: `../loanResultPage/loanResultPage?obj=${JSON.stringify(obj)}`,
      })
    } else {
      wx.showModal({
        title: '提示',
        content: '请输入贷款金额'
      })

    }
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    let tempArray = [];
    for (let i = 30; i > 0; i--) {
      tempArray.push(i);
    }
    this.setData({
      loanTermArray: tempArray
    })
  },
})