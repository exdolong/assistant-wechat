export default function(param) {
  const access_token = wx.getStorageSync('access_token');

  let header = {
    'content-type': 'application/json'
  }
  if (access_token) {
    header['Authorization'] = `Bearer ${ access_token }`
  }
  return new Promise((resolve, reject) => {
    wx.request({
      header: header,
      url: param.url,
      data: param.data,
      method: param.method,
      dataType: 'json',
      success: res => {
        // if (res.header.Authorization) {
        //   this.$store.commit('REFRESHTOKEN', res.header.Authorization)
        // }
        if (param.success) {
          param.success(res)
        }
        resolve(res)
      },
      fail: res => {
        if (param.fail) {
          param.fail(res)
        }
        reject(res)
      },
      complete: res => {
        if (param.complete) {
          param.complete(res)
        }
        if (res.statusCode == 401) {
          wx.clearStorage()
          wx.navigateTo({
            url: '../../TabMy/signInPage/signInPage',
          })
          resolve(res)
          return;
        }
        resolve(res)
      }
    });
  })
}