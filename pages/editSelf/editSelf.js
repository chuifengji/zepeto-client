// pages/editSelf/editSelf.js
const app = getApp()
const ctx = wx.createCanvasContext('maskCanvas');
const qiniuUploader = require("../../qiniu/qiniuUploader.js");
import {
  getFileNameSelfImg
} from "../../utils/handlers.js"
Page({

  /**
   * 页面的初始数据
   */
  data: {
    currentStyle: 'feature',
    current_item_expression: null,
    current_item_overcoat: null,
    current_item_shirt: null,
    current_item_trousers: null,
    current_item_shoes: null,
    current_item_others: null,
    current_item_glasses: null,
    current_item_hair: null,
    current_item_feature: null,
    nakedStyle: "https://zepeto.nt-geek.club/naked.png",
    hairAStyle: "",
    hairBStyle: "",
    overcoatStyle: "https://zepeto.nt-geek.club/overcoat_01.png",
    trouserStyle: "",
    shoesStyle: "",
    glassesStyle: "",
    othersStyle: "",
    shirtStyle: "",
    expressionStyle: "",
    featureStyle: "",



    //数据库返回的所有列表
    appearanceList: null,
    //当前渲染出来的列表
    currentItemList: [],
    //贴图这里，第一次仅仅展现id为1的list,之后每次切换贴图种类
    toolitemList: [],



  },
  otherData: {
    uptoken: '', //上传凭证
    fileName: '' //key
  },


  /**
   * 生命周期函数--监听页面加载
   */
  btn_goto_shoot: function () {
    wx.navigateTo({
      url: '../shoot/shoot',
    })
  },
  changeItemList: function (e) {
    this.setData({
      currentStyle: e.currentTarget.dataset.type,
      toolitemList: app.globalData.appearanceList[e.currentTarget.dataset.type]
    })
  },
  selected_expression_item: function (e) {
    if (this.data.current_item_overcoat === e.currentTarget.dataset.id) {
      this.setData({
        current_item_expression: null,
        expressionStyle: ''
      })
    } else {
      this.setData({
        current_item_expression: e.currentTarget.dataset.id,
        expressionStyle: e.currentTarget.dataset.url
      })
    }
  },
  selected_overcoat_item: function (e) {
    if (this.data.current_item_overcoat === e.currentTarget.dataset.id) {
      this.setData({
        current_item_overcoat: null,
        overcoatStyle: ''
      })
    } else {
      this.setData({
        current_item_overcoat: e.currentTarget.dataset.id,
        overcoatStyle: e.currentTarget.dataset.url
      })
    }
  },
  selected_shirt_item: function (e) {
    if (this.data.current_item_shirt === e.currentTarget.dataset.id) {
      this.setData({
        current_item_shirt: null,
        shirtStyle: ''
      })
    } else {
      this.setData({
        current_item_shirt: e.currentTarget.dataset.id,
        shirtStyle: e.currentTarget.dataset.url
      })
    }
  },
  selected_trousers_item: function (e) {
    if (this.data.current_item_trousers === e.currentTarget.dataset.id) {
      this.setData({
        current_item_trousers: null,
        trouserStyle: ''
      })
    } else {
      this.setData({
        current_item_trousers: e.currentTarget.dataset.id,
        trouserStyle: e.currentTarget.dataset.url
      })
    }

  },
  selected_shoes_item: function (e) {
    if (this.data.current_item_shoes === e.currentTarget.dataset.id) {
      this.setData({
        current_item_shoes: null,
        shoesStyle: ''
      })
    } else {
      this.setData({
        current_item_shoes: e.currentTarget.dataset.id,
        shoesStyle: e.currentTarget.dataset.url
      })
    }
  },
  selected_glasses_item: function (e) {
    if (this.data.current_item_glasses === e.currentTarget.dataset.id) {
      this.setData({
        current_item_glasses: null,
        glassesStyle: ''
      })
    } else {
      this.setData({
        current_item_glasses: e.currentTarget.dataset.id,
        glassesStyle: e.currentTarget.dataset.url
      })
    }
  },
  selected_others_item: function (e) {
    if (this.data.current_item_others === e.currentTarget.dataset.id) {
      this.setData({
        current_item_others: null,
        othersStyle: ''
      })
    } else {
      this.setData({
        current_item_others: e.currentTarget.dataset.id,
        othersStyle: e.currentTarget.dataset.url
      })
    }
  },
  selected_hair_item: function (e) {
    if (this.data.current_item_hair === e.currentTarget.dataset.id) {
      this.setData({
        current_item_hair: e.currentTarget.dataset.id,
        hairAStyle: '',
        hairBStyle: ""
      })
    } else {
      if (e.currentTarget.dataset.type === 'hair') {
        this.setData({
          current_item_hair: e.currentTarget.dataset.id,
          hairAStyle: e.currentTarget.dataset.hairAStyle,
          hairBStyle: "",
        })
      } else {
        this.setData({
          current_item_hair: e.currentTarget.dataset.id,
          hairAStyle: e.currentTarget.dataset.hairAStyle,
          hairBStyle: e.currentTarget.dataset.hairBStyle,
        })
      }
    }
  },
  selected_feature_item: function (e) {
    if (this.data.current_item_feature === e.currentTarget.dataset.id) {
      this.setData({
        current_item_feature: null,
        featureStyle: ''
      })
    } else {
      this.setData({
        current_item_feature: e.currentTarget.dataset.id,
        featureStyle: e.currentTarget.dataset.url
      })
    }
  },
  onLoad: function (options) {
    this.setData({
      appearanceList: app.globalData.appearanceList,
      toolitemList: app.globalData.appearanceList['FeatureList']
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    let uptoken = this.getUptoken()
    console.log(uptoken)
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    // this.getUptoken()
  },

  goshoot() {
    wx.navigateTo({
      url: '../shoot/shoot',
    })
  },
  getImg: function (src) {
    return new Promise((resolve, reject) => {
      wx.getImageInfo({
        src,
        success(res) {
          resolve(res.path)
        }
      })
    })
  },
  async saveStyle() {
    let that = this;
    var styleArray = [this.data.nakedStyle, this.data.overcoatStyle]
    var imgArray = []
    for (var item in styleArray) {
      var newimg = await this.getImg(styleArray[item])
      imgArray.push(newimg)
    }
    //console.log(imgArray)
    for (var item in imgArray) {
      ctx.drawImage(imgArray[item], 6, -20, 308, 524)
    }
    ctx.draw(setTimeout(function () {
      wx.canvasToTempFilePath({
        x: 95,
        y: 60,
        width: 123,
        height: 258,
        canvasId: 'maskCanvas',
        success: function (res) {
          that.uploadImgToCloud(res.tempFilePath) //上传到七牛云
        }
      })
    }, 100))
  },

  uploadImgToCloud(filePath) {
    let that = this
    qiniuUploader.upload(filePath, (res) => {
      console.log(app.globalData.userInfo.user_id,res.fileURL)
      app.netHandlers.updatePersonalImage(app.globalData.userInfo.user_id,res.fileURL).then(res=>{
        let Data = res.Data
        let userInfo={
          id:Data.ID,
          user_id:Data.USERID,
          name:Data.NAME,
          college:Data.COLLEGE,
          major:Data.MAJOR,
          class:Data.CLASS,
          my_img:Data.MYIMG,
          canSearchMe:Data.CanSearchMe
        }
        that.globalData.userInfo = userInfo
        wx.setStorage({
          key:"USERINFO",
          data:userInfo
        })
      })
      }, (error) => {
        console.error('error: ' + JSON.stringify(error))
      }, {
        region: 'ECN',
        key: this.otherData.fileName,
        uptoken: this.otherData.uptoken,
        domain: 'https://zepeto.nt-geek.club',
        shouldUseQiniuFileName: false
      },
      (progress) => {

      }, cancelTask => {

      }
    )
  },
  getUptoken() {
    let id = app.globalData.userInfo.id
    let fileName = getFileNameSelfImg(id)
    app.netHandlers.getUptoken(fileName).then(res => {
      this.otherData = {
        uptoken: res.Data,
        fileName
      }
    })
  }
})
// wx.getImageInfo({
//   src: this.data.nakedStyle,
//   success (res) {
//     console.log(res)
//     const ctx = wx.createCanvasContext('maskCanvas');
//     ctx.drawImage(res.path,6,-20,308,524)
//     ctx.draw(setTimeout(function () {
//       wx.canvasToTempFilePath({
//         x: 95,
//         y: 60,
//         width: 123,
//         height: 258,
//         canvasId: 'maskCanvas',
//         success: function (res) {
//           console.log(res)
//           wx.saveImageToPhotosAlbum({
//             filePath: res.tempFilePath,          //save face picture
//           })
//         }
//       })
//     },100))
//   }
// })

