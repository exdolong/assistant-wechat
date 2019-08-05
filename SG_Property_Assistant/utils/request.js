//
//     The Code By DayiTech FrontEnd
//     Author:Han
//     Created At 2018/09/13 16:26:36
//
/**
 * 封装小程序wx.request，带自定义token，返回一个promise对象
 * @param {Object} url:接口
 * @param {Object} type:请求类型
 * @param {Object} data:参数，json类型
 * @param {function} success:成功的回调函数
 * @param {fcuntion} fail:失败的回调函数
 * @return {Primise}
 */
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
      method: param.type,
      dataType: 'json',
      success: res => {
        // if (res.header.Authorization) {
        //   this.$store.commit('REFRESHTOKEN', res.header.Authorization)
        // }
        param.success(res)
        resolve(res)
      },
      fail: res => {
        reject(res)
      },
    });
  })
}