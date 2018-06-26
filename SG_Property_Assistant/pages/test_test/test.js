var OBJ_PAGE_DATA = {};
OBJ_PAGE_DATA.data = {};
var STR_VOICE_TEMPFILEPATH = "";
OBJ_PAGE_DATA['startRecord'] = function () {
  //开始录音
  wx.startRecord({
    success: function (cb) {
      STR_VOICE_TEMPFILEPATH = cb.tempFilePath
    }
  })
}
OBJ_PAGE_DATA['stopRecord'] = function () {
  //结束录音
  wx.stopRecord();
}
OBJ_PAGE_DATA['playVoice'] = function () {
  //播放声音文件
  wx.playVoice({
    filePath: STR_VOICE_TEMPFILEPATH
  })
}
Page(OBJ_PAGE_DATA);