// pages/TabRecommend/projectProfilePage/projectProfilePage.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    html: `<p>Juniper Hill位于新加坡第10区的武吉知马区(BukitTimah)，友文路41号(41 Ewe Boon Road)，属于新加坡的核心中央区。武吉知马属于新加坡其中一个高档住宅区，环境幽静。</p>
    <p>Juniper Hil的地理位置非常优越，享有便捷的交通优势。距离史蒂芬地铁转换站(Stevens )约600米。该地铁站运行的是滨海市区线(DowntownLine)，可以直通位于金融区的市中心站(Downtown)，只需乘搭该地铁往市中心地铁站的方向一站就可以到达新加坡植物园。即将在2021年通车的汤申-东海岸地铁线(Thomson-EastCoastMRT) 到时候也会经过这里。</p>
    <p>住宅区一旁的主要道路可以连接到泛岛高速公路(PIE)和中央高速公路(CTE)，想要驾车出行的人可就方便了。此外，前往繁华的乌节路仅需5分钟车程、距离中央商业区（CBD)也只要15分钟车程。</p>
    <p>周边设施齐全，在项目不远处就有加冕购物中心( Coronation Shopping Plaza)和士林中心( Serene Centre)，周边还有许多知名的公立学校。</p>
    <p>Juniper Hil所在的地段是由新加坡上市开发商长春产业(Allgreen Properties Limited )在2017年集体出售时收购而来。总占地面积约为5，619平方米，容积率为1.6，属于永久产权，拥有115个私宅单位，户型由2至5卧室+客房不等。</p>`,
    isfixed: 0,
    fixedTop: 0,
    markers: [{
      iconPath: "/images/fc_map_location.png",
      id: 0,
      latitude: 23.099994,
      longitude: 113.324520,
      width: 30,
      height: 40
    }],
    polyline: [{
      points: [{
        longitude: 113.3245211,
        latitude: 23.10229
      }, {
        longitude: 113.324520,
        latitude: 23.21229
      }],
      color: "#FF0000DD",
      width: 2,
      dottedLine: true
    }],
    controls: [{
      id: 1,
      iconPath: '/images/fc_map_location.png',
      position: {
        left: 0,
        top: 300 - 50,
        width: 30,
        height: 40
      },
      clickable: true
    }]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {

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

  },
  onPageScroll: function(e) {
    let isfixed = 0;
    if (parseInt(e.scrollTop) > this.data.fixedTop) {
      isfixed = 1;
    } else {
      isfixed = 0;
    }

    this.setData({
      isfixed
    });
  }
})