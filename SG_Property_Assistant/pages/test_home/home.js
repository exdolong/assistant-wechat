// pages/home/home.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    canShow: false,
    user: {},
    songs: [],
    tempFilePath:'',
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    console.log(options.username);
    wx.getStorage({
      key: options.username,
      success: function (res) {
        var userName = res.data.username;
        that.setData({ canShow: true, user: { username: userName, cover: 'http://img02.tooopen.com/images/20150928/tooopen_sy_143912755726.jpg' } });
      },
    });
    console.log('onLoad');
    if (wx.canIUse('getRecorderManager')){

      console.log('getRecorderManager 可用');
      wx.getRecorderManager().onStart(() => {
        console.log('recorder start')
      });
      wx.getRecorderManager().onPause(() => {
        console.log('recorder pause')
      });
      wx.getRecorderManager().onStop((res) => {
        console.log('recorder stop', res);
        that.setData({ tempFilePath: res.tempFilePath });
      });
    }
    else{
      console.log('getRecorderManager 不可用');
    }

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
    this.uiScan('');
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    console.log('触底');
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  },

  itemClick: function (event) {
    console.log(event);
    wx.showModal({
      title: '提示',
      content: '您点击了' + event.currentTarget.dataset.item.artist_name + '的' + event.currentTarget.dataset.item.name
    })
  },

//开始录音
recordStart:function(){
  wx.getRecorderManager().start({
    format: 'mp3'
  });

  // var that = this;
  // wx.startRecord({
  //   success: function (res) {
  //     var tempFilePath = res.tempFilePath
  //     that.setData({
  //       tempFilePath: tempFilePath
  //     })
  //     console.log("录音完成")
  //   },
  //   fail: function (res) {
  //     //录音失败
  //     console.log("录音失败！")
  //   }
  // })
},

//停止录音
recordStop: function () {
  wx.getRecorderManager().stop();
  // wx.stopRecord();
},

//录音上传
recordUpload:function(res){
  console.log(res);
  var path = res.currentTarget.dataset.path;
  console.log(path);

  // wx.playVoice({
  //   filePath: path,
  //   success: function(){
  //     console.log("播放录音chenggong！")
  //   },
  //   fail: function (res) {
  //     console.log("播放录音失败！")
  //   }
  // });

  const innerAudioContext = wx.createInnerAudioContext();
  // innerAudioContext.autoplay = true;
  innerAudioContext.src = path;
  
  innerAudioContext.onPlay(() => {
    console.log('开始播放')
  });
  innerAudioContext.onError((res) => {
    console.log(res.errMsg)
    console.log(res.errCode)
  });
  innerAudioContext.play();

  // this.uiScan(path);
},

//讯飞语音上传识别
  uiScan:function(path){
    console.log(path);
    var that = this;
    var base64 = require("./myBase64.js");
    var md5 = require("./MD5.js");

    var appId = '5af8f84e';
    var apiKey = '1ba7d26d956a44b8a5d5e6788b47e50e';
    var timestamp = Date.parse(new Date());
    timestamp = timestamp / 1000;
    // timestamp = '1526278124';
    console.log("当前时间戳为：" + timestamp);

    var param = base64.base64.encoder('{"scene":"main", "userid":"user_0001"}');

    console.log(param);

    var text = '今天星期几';
    text = base64.base64.encoder(text);
    console.log(text);

    var checkSum = apiKey + timestamp + param + 'text=' + text;
    console.log(checkSum);
    checkSum = md5.hexMD5(checkSum);
    console.log(checkSum);

    wx.showNavigationBarLoading();
    wx.request({
      url: 'http://api.xfyun.cn/v1/aiui/v1/text_semantic',
      method: 'POST',
      header: {
        'content-type': 'application/x-www-form-urlencoded; charset=utf-8',
        'X-Appid': appId,
        'X-CurTime': timestamp,
        'X-Param': param,
        'X-CheckSum': checkSum,
      },
      data: { 'text': text },
      success: (res) => {
        wx.stopPullDownRefresh();
        wx.hideNavigationBarLoading();
        console.log(res);
        wx.showModal({
          title: '提示',
          content: '成功',
        });
      },
      fail: function (error) {
        wx.stopPullDownRefresh();
        wx.hideNavigationBarLoading();
        console.log(error);
        wx.showModal({
          title: '提示',
          content: '失败',
        });
      }
    })
  }
})