// pages/TabSearch/searchResult.js
const util = require('../../../utils/util.js')

var regionDisplayFlae = [false, false, false, false];
let pageNumber = 1; // 页码
let pageSize = 20; // 请求的条数
const districts = 'dataDicts/districts' // 所有邮区
const layouts = 'dataDicts/layouts' // 所有户型
const saleStatuses = 'dataDicts/saleStatuses' // 销售状态
const tags = 'dataDicts/tags' // 房产tags
const tenures = 'dataDicts/tenures' // 所有产权
const types = 'dataDicts/types' // 房屋类型
const unitPriceArr = [{value: '', label: '不限'}, { value: '0-10000', label: '1万/sqft以下'}, {value: '10000-20000', label: '1.0~2.0万/sqft'}, {value: '20000-30000', label: '2.0~3.0万/sqft'}, {value: '30000-40000', label: '3.0~4.0万/sqft'}, {value: '40000-50000', label: '4.0~5.0万/sqft'}, {value: '50000-9999999999999999999', label: '5.0万/sqft以上'}] // 单价 
const totalPriceArr = [{ value: '', label: '不限' }, { value: '0-1000000', label: '100万新币以下' }, { value: '1000000-1250000', label: '100~125万新币' }, { value: '1250000-1500000', label: '125~150万新币' }, { value: '1500000-2000000', label: '150~200万新币' }, { value: '2000000-2500000', label: '200~250万新币'}] // 总价 
const historyKey = 'historyKey' // 历史关键字

// var regionDisplayFlae = false;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    screeningsArray: ['邮区', '户型', '价格', '更多'], //筛选条件数组,
    keyword: '', // 关键字
    moreArray: [{
      name: '产权',
      tagName: tenures,
      dataArray: [],
    }, {
      name: '类型',
      tagName: types,
      dataArray: [],
    }, {
      name: '标签',
      tagName: tags,
      dataArray: [],
    }, {
      name: '销售状态',
      tagName: saleStatuses,
      dataArray: [],
    }, {
      name: '交房时间',
      tagName: 'time',
      dataArray: [],
    }], // 更多筛选
    dataArray: [], // 数据列表
    districtsArray: [], // 邮区数据
    layoutsArray: [], // 户型数据
    priceArray: [],
    isUnitPrice: true,
    isTotalPrice: false,
    unitPriceGroup: [],
    totalPriceGroup: [],
    paramDistricts: [], // 邮区参数
    paramLayout: [], // 户型参数
    paramPrice: [], // 价格参数
    paramMore: [],
    historyArray: [],
    sortDirection: 'DESC',
    sortBy: 'id'
  },

  /**
   * 排序点击事件
   */
  btnSort: function(event) {
    const self = this
    wx.showActionSheet({
      itemList: ['最新发布', '总价从低到高', '总价从高到低', '单价从低到高', '单价从高到低'],
      itemColor: "#333",
      success: function(res) {
        if (res.errMsg === 'showActionSheet:ok') {
          if (res.tapIndex === 0) {
            self.setData({
              sortDirection: 'DESC',
              sortBy: 'id'
            })
          } else if (res.tapIndex === 1) {
            self.setData({
              sortDirection: 'ASC',
              sortBy: 'maxAmount'
            })
          } else if (res.tapIndex === 2) {
            self.setData({
              sortDirection: 'DESC',
              sortBy: 'maxAmount'
            })
          } else if (res.tapIndex === 3) {
            self.setData({
              sortDirection: 'ASC',
              sortBy: 'avgPsf'
            })
          } else if (res.tapIndex === 4) {
            self.setData({
              sortDirection: 'DESC',
              sortBy: 'avgPsf'
            })
          }

          self.confirmSubm()
        }
      },
      fail: function(res) {}
    });
  },

  bindconfirmTap: function (e) {
    this.jumpSearchResultAndKaywrod(e.detail.value);
  },

  jumpSearchResultAndKaywrod: function (keyWrod) {
    this.data.historyArray.push(keyWrod);
    let tempArray = util.unique4(this.data.historyArray);

    wx.setStorage({
      key: historyKey,
      data: tempArray
    })
    this.setData({
      keyword: keyWrod
    })

    this.confirmSubm()
  },

  // 跳转到产品详情
  jumpDetailsTap: function(event) {
    const id = event.currentTarget.dataset.postid;
    wx.navigateTo({
      url: `../../TabRecommend/productDetails/productDetails?id=${id}`,
    })
  },

  screenRegionTap: function(event) {
    var curr_index = event.currentTarget.dataset.index;
    var that = this;
    util.conditionScreening(curr_index, regionDisplayFlae, function(ret) {
      that.setData({
        "isRegionDisplay": ret.regionDisplayFlae,
        "iscurrentIdex": curr_index,
        "iscurrentShow": ret.iscurrentMode,
      });
    });

    if (this.data.moreArray[0].dataArray.length && this.data.districtsArray.length && this.data.layoutsArray.length) {
      return;
    }
    switch (curr_index) {
      case 0:
        this.getMoreAndurl(districts, 'districtsArray');
        break;
      case 1:
        this.getMoreAndurl(layouts, 'layoutsArray');
        break;
      case 2:
        if (this.data.priceArray.length) {
          return;
        }
        this.setData({
          priceArray: this.data.unitPriceGroup
        });
        break;
      case 3:
        {
          // 产权
          this.getMoreAndurl(tenures, 'moreArray[0].dataArray');

          // 类型
          this.getMoreAndurl(types, 'moreArray[1].dataArray');

          // 房产tags
          this.getMoreAndurl(tags, 'moreArray[2].dataArray');

          // 销售状态
          this.getMoreAndurl(saleStatuses, 'moreArray[3].dataArray');

          const myDate = new Date();
          let tYear = parseInt(myDate.getFullYear());
          let tiemArray = [];
          for (let index = 1; index < 4; index++) {
            tiemArray.push({
              'name': tYear + index,
              'isSelection': false,
              'id': 1000 + index
            })
          }
          this.setData({
            'moreArray[4].dataArray': tiemArray
          })
        }
        break;
    }
  },

  // 更多条件选择
  select: function(e) {
    let tag = e.target.dataset.tag;
    let name = e.target.dataset.name;
    let id = e.target.dataset.id;
    let select_index = e.target.dataset.index;
    let obj_temp = `moreArray[${select_index}].dataArray`;
    let tempData = this.setSelectionAndArray(id, this.data.moreArray[select_index].dataArray);

    this.setData({
      [obj_temp]: tempData[0]
    })
  },

  // 户型选择
  layoutSelect: function(event) {
    let id = event.target.dataset.id;
    let tempData = this.setSelectionAndArray(id, this.data.layoutsArray);
    this.setData({
      layoutsArray: tempData[0],
      paramLayout: tempData[1]
    })
  },

  // 价格选择
  priceSelect: function(event) {
    let id = event.target.dataset.id;
    let tempArray = this.setSelectionAndArray(id, this.data.priceArray);
    if (this.data.isUnitPrice) {
      this.setData({
        unitPriceGroup: tempArray[0],
        priceArray: tempArray[0],
        paramPrice: tempArray[1]
      })
    } else {
      this.setData({
        totalPriceGroup: tempArray[0],
        priceArray: tempArray[0],
        paramPrice: tempArray[1]
      })
    }

  },

  // 邮区选择
  districtSelect: function(event) {
    let id = event.target.dataset.id;
    let tempData = this.setSelectionAndArray(id, this.data.districtsArray);
    this.setData({
      districtsArray: tempData[0],
      paramDistricts: tempData[1]
    })
  },

  // 添加基础数据
  addObjectAndArray: function(array, type) {
    let tempArray = [];
    for (let index = 1; index < array.length; index++) {
      const row = array[index]
      tempArray.push({
        'name': row.label,
        'isSelection': false,
        'id': row.value,
        'type': type
      })
    }
    return tempArray;
  },

  // 点击确认按钮的方法
  confirmSubm: function() {
    this.cancelWindowTap()
    let temp = this.data.moreArray;
    let tenureId = this.getIdFunc(this.data.moreArray[0].dataArray)[0];
    let propertyTypeId = this.getIdFunc(this.data.moreArray[1].dataArray)[0];
    let tagId = this.getIdFunc(this.data.moreArray[2].dataArray)[0];
    let saleStatusId = this.getIdFunc(this.data.moreArray[3].dataArray)[0];
    let topYear = this.getIdFunc(this.data.moreArray[4].dataArray, 'name')[0];

    let minAmount, maxAmount, minAvgPsf, maxAvgPsf
    if (this.data.paramPrice.length > 0 && this.data.paramPrice[0].id.split('-').length === 2) {
      let minVal, maxVal
      [minVal, maxVal] = this.data.paramPrice[0].id.split('-')
      if (this.data.isTotalPrice) {
        minAmount = minVal
        maxAmount = maxVal 
      }
      
      if (this.data.isUnitPrice) {
        minAvgPsf = minVal
        maxAvgPsf = maxVal
      }
    }
    
    this.loadData({
      pageNumber: pageNumber,
      keyword: this.data.keyword,
      pageSize: pageSize,
      minAmount: minAmount,
      maxAmount: maxAmount,
      minAvgPsf: minAvgPsf,
      maxAvgPsf: maxAvgPsf,
      sortDirection: this.data.sortDirection,
      sortBy: this.data.sortBy,
      districtIds: this.getIdFunc(this.data.paramDistricts), // 邮区
      layoutId: this.getIdFunc(this.data.paramLayout)[0], // 户型
      saleStatusId, // 销售状态
      tagId, // 标签
      topYear, // 交房时间
      tenureId, // 产权
      propertyTypeId // 房屋类型
    })

    this.setData({
      sortDirection: 'DESC',
      sortBy: 'id'
    })
  },

  getIdFunc: function(array, name) {
    let pName = name || 'id';
    let tempArrayId = [];
    for (let index in array) {
      if (array[index].isSelection) {
        tempArrayId.push(array[index][pName]);
      }
    }
    return tempArrayId;
  },

  // 设置选中状态
  setSelectionAndArray: function(idx, tempArray) {
    let tempParam = []; // 选择的数据
    for (let index in tempArray) {
      if (idx == tempArray[index].id) {
        tempArray[index].isSelection = !tempArray[index].isSelection;
        if (tempArray[index].isSelection) {
          tempParam.push(tempArray[index]);
        }
      } else {
        tempArray[index].isSelection = false;
      }
    }
    return [tempArray, tempParam];
  },

  // 清空条件
  clearCondition: function() {
    let temp = this.data.moreArray;
    for (let i = 0; i < temp.length; i++) {
      for (let j = 0; j < temp[i].dataArray.length; j++) {
        temp[i].dataArray[j].isSelection = false;
      }
    }
    this.setData({
      moreArray: temp
    })
  },

  cancelWindowTap: function(event) {
    for (var i = 0; i < regionDisplayFlae.length; i++) {
      // 判断当前是否有展开
      if (regionDisplayFlae[i].toString() == "true") {
        regionDisplayFlae[i] = false;
      }
    }
    this.setData({
      "isRegionDisplay": regionDisplayFlae,
      "iscurrentShow": false,
    });

  },

  qiehuanTap: function(event) {
    if (event.currentTarget.dataset.name === '单价') {
      this.setData({
        priceArray: this.data.unitPriceGroup
      });
      if (this.data.isUnitPrice) {
        return;
      }
    } else {
      this.setData({
        priceArray: this.data.totalPriceGroup
      });
      if (this.data.isTotalPrice) {
        return;
      }
    }

    this.setData({
      isUnitPrice: !this.data.isUnitPrice,
      isTotalPrice: !this.data.isTotalPrice
    });
  },

  preventTap: function() {
    // 只为阻止冒泡事件
  },

  // 获取数据
  getMoreAndurl: function(url, temp_array) {
    const basicsUrl = util.configure.pathUrl;
    const that = this;
    wx.request({
      url: basicsUrl + url,
      success(res) {
        for (let index in res.data.data) {
          res.data.data[index].isSelection = false;
        }
        that.setData({
          [temp_array]: res.data.data
        })
      }
    })
  },

  loadData: function(param) {
    wx.showLoading({
      title: '加载中',
    })
    const that = this;
    const url = util.configure.pathUrl + 'projects';
    wx.request({
      url: url,
      method: "POST",
      data: param,
      success(res) {
        that.setData({
          dataArray: res.data.data.content
        })
      },
      complete() {
        wx.hideLoading()
      }
    });
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    const keyword = options.keyWord || ''; // 获取关键字

    const url = util.configure.pathUrl + 'projects';
    const tempArray = this.addObjectAndArray(unitPriceArr, 'unit');

    this.setData({
      keyword: keyword,
      unitPriceGroup: tempArray,
      totalPriceGroup: this.addObjectAndArray(totalPriceArr, 'total'),
      priceArray: tempArray
    })
    this.loadData({
      pageNumber: pageNumber,
      pageSize: pageSize,
      keyword: keyword
    })
    this.isRegionDisplay = false;
    // console.log(JSON.stringify(options));
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
    console.log('==============onReachBottom');
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  }
})