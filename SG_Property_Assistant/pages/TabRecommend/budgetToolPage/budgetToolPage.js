// pages/TabRecommend/budgetToolPage/budgetToolPage.js

const nationaArray = ['持冰岛、列支敦士登、挪威、瑞士绿卡或者护照;持美国护照', '新加坡绿卡', '中国及其他']
const fangwuArray = ['首套', '2套', '3套及以上']
const lawyerfees = 3000 // 律师费用
const BSD = 0.04 // 4%印花税
const FirstABSD = [0, 12, 15] // 附加税 第一种情况
const TwoABSD = [5, 15, 15] // 附加税 第2种情况
const ThreeABSD = [20, 20, 20] // 附加税 第3种情况

const FirstLoan = [75, 55, 55] // 最大贷款比例
const ThreeLoan = [55, 45, 45]

Page({

  /**
   * 页面的初始数据
   */
  data: {
    nationality: nationaArray[0],
    paymentPropor: 12,
    fangwuNumber: fangwuArray[0],
    surchargeTax: FirstABSD[0], // 附加税{ABSD}
    ratioloans: FirstLoan[0], // 贷款比列
    totalNumber: '请输入',
    resultNubmer: 0,
    firstPayment: 0 // 首付款
  },
  // 国籍选择
  waysLoan: function(event) {
    wx.showActionSheet({
      itemList: nationaArray,
      success: res => {
        let temp = 0;
        let tempratioloans = 0;
        let index = 0;
        if (this.data.fangwuNumber == fangwuArray[0]) {
          index = 0;
        } else if (this.data.fangwuNumber == fangwuArray[1]) {
          index = 1;
        } else {
          index = 2
        }
        switch (res.tapIndex) {
          case 0:
            {
              temp = FirstABSD[res.tapIndex]
              tempratioloans = FirstLoan[index]
            }
            break;
          case 1:
            {
              temp = TwoABSD[res.tapIndex]
              tempratioloans = FirstLoan[index]
            }

            break;
          case 2:
            {
              temp = ThreeABSD[res.tapIndex]
              tempratioloans = ThreeLoan[index]
            }

            break;
        }

        this.setData({
          surchargeTax: temp,
          ratioloans: tempratioloans,
          nationality: nationaArray[res.tapIndex]
        })
      }
    })
  },

  // 选择房屋数量
  setNumber: function(event) {
    wx.showActionSheet({
      itemList: fangwuArray,
      success: res => {
        let temp = 0;
        let array = [];
        let tempMaxLoans = [];
        let loans = 0;
        if (this.data.nationality == nationaArray[0]) {
          array = FirstABSD
          tempMaxLoans = FirstLoan
        } else if (this.data.nationality == nationaArray[1]) {
          array = TwoABSD
          tempMaxLoans = FirstLoan
        } else {
          array = ThreeABSD
          tempMaxLoans = ThreeLoan
        }

        this.setData({
          surchargeTax: array[res.tapIndex],
          ratioloans: tempMaxLoans[res.tapIndex],
          fangwuNumber: fangwuArray[res.tapIndex]
        })
      }
    })
  },

  changeInput: function(e) {
    let keyong = e.detail.value * 10000 - lawyerfees + 15400
    let feimu = 1 - this.data.ratioloans / 100 + (0.04 + this.data.surchargeTax / 100)
    // 总价
    let totalPrice = keyong / feimu;
    let payablePrice = e.detail.value * 10000 - 3000 - totalPrice * (0.04 + this.data.surchargeTax / 100) + 15400
    this.setData({
      totalNumber: e.detail.value,
      resultNubmer: (totalPrice / 10000).toFixed(2),
      firstPayment: (payablePrice / 10000).toFixed(2)
    })

    // console.log("贷款比例:" + this.data.ratioloans);
    // console.log("附加税:" + this.data.surchargeTax);
    // console.log("你的金额:" + this.data.totalNumber);
    // console.log("总额:" + totalPrice);
  },

  focusInput: function() {
    this.setData({
      totalNumber: ''
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {

  },
})