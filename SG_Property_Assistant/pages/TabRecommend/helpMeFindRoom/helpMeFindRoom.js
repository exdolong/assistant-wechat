// pages/TabRecommend/helpMeFindRoom/helpMeFindRoom.js
const util = require('../../../utils/util.js')
import request from '../../../utils/request.js'
const tags = 'dataDicts/tags' // 房产tags
const districts = 'dataDicts/districts' // 所有邮区
const layouts = 'dataDicts/layouts' // 所有户型

const preferenceTempArray = [{
  id: 99991,
  name: '新房',
  isSelection: false
}, {
  id: 99992,
  name: '二手房',
  isSelection: false
}, {
  id: 99993,
  name: '不限',
  isSelection: false
}]

Page({

  /**
   * 页面的初始数据
   */
  data: {
    minPrice: 20,
    maxPrice: 120,
    index: 0,
    array: [],
    districtsArray: ['不限'], // 邮区
    tagsArray: ['不限'], // 户型类型
    preferenceArray: preferenceTempArray, // 偏好
    layoutsArray: [], // 户型数据
    startPoint: {
      x: 0,
      y: 0
    },
    endPointX: 0,
    sliderPointX: 0,
    telephone: '',
    huadongLeft: 'horizontal',
    huadongRight: 'horizontal',
    sliderWidth: 120,
    strPoing: ''
  },

  jumpRegionToolTap: function(e) {

  },

  // 更多条件选择
  select: function(e) {
    let tag = e.target.dataset.tag;
    let id = e.target.dataset.id;
    let tempData = null;
    if (tag == 'preferenceArray') {
      tempData = this.setSelectionAndArray(id, this.data[tag]);
    } else {
      tempData = this.setSelectionAndArray(id, this.data[tag], 'multiple');
    }
    this.setData({
      [tag]: tempData
    })
  },

  movableBindChange: function(e) {
    let actualWitdh = this.data.width - (60 / 750 * this.data.width);
    let number = parseInt(e.detail.x * (550 / actualWitdh));

    if (e.currentTarget.dataset.datanumber == 'left') {
      // if (this.data.minPrice > this.data.maxPrice) {
      //   console.log(e.detail.x);
      //   this.setData({
      //     huadongLeft: 'none'
      //   })
      // } else {
      //   this.setData({
      //     huadongLeft: 'horizontal',
      //     minPrice: e.detail.x + 20
      //   })
      // }
      console.log("X:" + e.detail.x);
      this.setData({
        sliderPointX: e.detail.x,
        // e.detail.x + (120 / 750 * this.data.width),
        minPrice: e.detail.x + 20,
        sliderWidth: this.data.endPointX - e.detail.x
      })
      console.log("sliderWidth:" + this.data.sliderWidth);
      console.log("sliderPointX:" + this.data.sliderPointX);
    } else {
      if (e.detail.x < 20) {
        return;
      }
      this.setData({
        sliderWidth: e.detail.x - this.data.sliderPointX,
        maxPrice: number,
        endPointX: e.detail.x
      })
    }
  },

  // 设置选中状态
  setSelectionAndArray: function(idx, tempArray, multiple) {
    if (multiple == 'multiple') {
      for (let index in tempArray) {
        if (idx == tempArray[index].id) {
          tempArray[index].isSelection = !tempArray[index].isSelection;
        }
      }
    } else {
      for (let index in tempArray) {
        if (idx == tempArray[index].id) {
          tempArray[index].isSelection = !tempArray[index].isSelection;
        } else {
          tempArray[index].isSelection = false;
        }
      }
    }
    return tempArray;
  },

  tabSelect: function(event) {
    const tabName = event.currentTarget.dataset.tabName;
    if (tabName == '我要买房') {

    }
  },
  validatePhoneNumber: function(str) {
    const reg = /^[1][3,4,5,6,7,8,9][0-9]{9}$/
    return reg.test(str)
  },

  submitAction: function() {
    if (util.isEmpty(this.data.telephone)) {
      wx.showToast({
        image: '/images/gantaohao.png',
        title: '手机号不能为空~',
      })
      return;
    }

    if (!this.validatePhoneNumber(this.data.telephone)) {
      wx.showToast({
        image:'/images/gantaohao.png',
        title: '手机号码错误',
      })
      return;
    }

    const obj = [{
      name: '您的首付预算',
      string: `${this.data.minPrice}~${this.data.maxPrice}万`
    }, {
      name: '您购买的偏好',
      string: this.getSelectionAndArray(this.data.preferenceArray)
    }, {
      name: '您想买什么户型',
      string: this.getSelectionAndArray(this.data.layoutsArray)
    }, {
      name: '您想购买的区域是',
      string: this.data.array[this.data.index]
    }, {
      name: '特殊要求',
      string: this.getSelectionAndArray(this.data.tagsArray)
    }, {
      name: '您的联系方式',
      string: this.data.telephone
    }]

    let text = '';
    obj.forEach((e) => {
      text += `<b>${e.name}:</b> ${ (e.string instanceof Array) ? e.string.join(', ') : e.string}<br/>`
    });

    wx.showModal({
      title: '提示',
      content: '确认提交吗？',
      success(res) {
        if (res.confirm) {
          request({
            url: util.configure.pathUrl + 'mail',
            method: 'post',
            data: {
              subject: '我要买房',
              text: text
            },
            success: (res) => {
              wx.showToast({
                title: '提交成功',
                icon: 'success',
                duration: 1000,
                complete: () => {
                  setTimeout(() => {
                    wx.navigateBack({
                      delta: 2
                    })
                  }, 1200)
                }
              })
            }
          })
        }
      }
    })
  },

  getSelectionAndArray: function(tempArray) {
    let tempParam = []; // 选择的数据
    for (let index in tempArray) {
      if (tempArray[index].isSelection) {
        tempParam.push(tempArray[index].name);
      }
    }
    return tempParam;
  },

  bindinputValue: function(e) {
    this.setData({
      telephone: e.detail.value
    })
  },

  bindPickerChange: function(e) {
    this.setData({
      index: e.detail.value
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    this.getMoreAndurl(districts, 'districtsArray');
    this.getMoreAndurl(tags, 'tagsArray');
    this.getMoreAndurl(layouts, 'layoutsArray');
    var systemInfo = wx.getSystemInfoSync();
    let width = systemInfo.windowWidth;
    let actualWitdh = width - (60 / 750 * width);
    let number = parseInt(80 * (500 / actualWitdh));

    this.setData({
      endPointX: number,
      height: systemInfo.windowHeight,
      width,
    })
  },

  // 获取数据
  getMoreAndurl: function(url, temp_array) {
    request({
      url: util.configure.pathUrl + url,
      success: (res) => {
        for (let index in res.data.data) {
          res.data.data[index].isSelection = false;
        }
        if (temp_array == 'districtsArray') {
          let temp = ['不限'];
          for (let index in res.data.data) {
            temp.push(res.data.data[index].name);
          }
          this.setData({
            array: temp
          })
        }
        this.setData({
          [temp_array]: res.data.data
        })
      }
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
  onShow: function() {},

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