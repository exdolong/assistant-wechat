// pages/TabNotice/TabNotice.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    noticeDataList: [{
        iocn: "/images/fc_message_loanremind.png",
        title: "贷款提醒",
        content: "你需要在1天内申请贷款，否则可能导致您购房违约。",
        status: "已处理"
      },
      {
        iocn: "/images/fc_message_loanremind.png",
        title: "贷款提醒",
        content: "你需要在1天内申请贷款，否则可能导致您购房违约。",
        status: "立即申请"
      },
      {
        iocn: "/images/fc_message_contract.png",
        title: "合同接收提醒",
        content: "你需要在1天内申请贷款，否则可能导致您购房违约。",
        status: "已接收"
      },
      {
        iocn: "/images/fc_message_data.png",
        title: "资料提交提醒",
        content: "你需要在1天内申请贷款，否则可能导致您购房违约。",
        status: "已处理"
      }
    ]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    // 判断按钮状态
    this.isButtonStatus();
  },

  isButtonStatus: function() {
    let obj = {},newArray = [];
    for (let i = 0; i < this.data.noticeDataList.length; i++) {
      obj = this.data.noticeDataList[i]
      if (obj.status === "已处理") {
        obj.className = "butt_already";
      } else if (obj.status === "立即申请") {
        obj.className = "not_immediate";
      } else {
        obj.className = "not_accepted";
      }
      newArray.push(obj);
    }
    this.setData({
      noticeDataList: newArray,
    });
  },

  toNottiDetailsTap:function(event){
    console.log(event.currentTarget.dataset.title);
    wx.navigateTo({
      url: `noticeDetails/noticeDetails?title=${event.currentTarget.dataset.title}`,
    })
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