// pages/editSelf/editSelf.js
const app = getApp()
const ctx = wx.createCanvasContext('maskCanvas');
const qiniuUploader = require("../../qiniu/qiniuUploader.js");
import {
  throttle,
  getFileNameSelfImg
} from "../../utils/handlers.js"
Page({

  /**
   * 页面的初始数据
   */
  data: {
    currentStyle: 'FeatureList',
    current_item_expression: 1,
    current_item_overcoat: null,
    current_item_shirt: 11,
    current_item_trousers: 9,
    current_item_shoes: 8,
    current_item_others: null,
    current_item_glasses: null,
    current_item_hair: 1,
    current_item_feature: 1,
    current_item_special: null,
    selface: '',
    nakedStyle: "https://wenda-data.nt-geek.club/body1.png",
    hairAStyle: "",
    hairBStyle: "https://wenda-data.nt-geek.club/hair_01.png",
    overcoatStyle: "",
    trouserStyle: "https://wenda-data.nt-geek.club/trousers_09.png",
    shoesStyle: "https://wenda-data.nt-geek.club/shoes_08.png",
    glassesStyle: "",
    othersStyle: "",
    shirtStyle: "https://wenda-data.nt-geek.club/shirt_11.png",
    expressionStyle: "https://wenda-data.nt-geek.club/expression_01.png",
    featureStyle: "https://wenda-data.nt-geek.club/head_01.png",
    specialStyle: '',

    selface_item: '',
    selface_selected: false, //是否选中自拍照片
    //数据库返回的所有列表
    appearanceList: null,
    //当前渲染出来的列表
    currentItemList: [],
    //贴图这里，第一次仅仅展现id为1的list,之后每次切换贴图种类
    toolitemList: [],
    currentSkinStyle: 0,



  },
  otherData: {
    uptoken: '', //上传凭证
    fileName: '' //key
  },


  /**
   * 生命周期函数--监听页面加载
   */
  selected_self: function () {
    if (!this.data.selface_selected) {
      this.setData({
        selface_selected: true,
        selface: this.data.selface_item,
        current_item_expression: null,
        expressionStyle: '',
        current_item_feature: null,
        featureStyle: '',
        current_item_hair: null,
        hairAStyle: '',
        hairBStyle: ""
      })
    } else {
      this.setData({
        selface_selected: false,
        selface: '',
        current_item_feature: 1,
        featureStyle: "https://wenda-data.nt-geek.club/head_01.png",
        current_item_expression: 1,
        expressionStyle: "https://wenda-data.nt-geek.club/expression_01.png",
      })
    }
  },
  btn_goto_shoot: function () {
    wx.navigateTo({
      url: '../shoot/shoot',
    })
  },
  changeSkinStyle: function (e) {
    if (e.currentTarget.dataset.skinstyle === 'a') {
      this.setData({
        currentSkinStyle: 0,
      })
    } else if (e.currentTarget.dataset.skinstyle === 'b') {
      this.setData({
        currentSkinStyle: 1,
      })
    } else {
      this.setData({
        currentSkinStyle: 2,
      })
    }
  },
  changeItemList: function (e) {
    console.log(e.currentTarget.dataset)
    this.setData({
      currentStyle: e.currentTarget.dataset.type,
      toolitemList: app.globalData.appearanceList[e.currentTarget.dataset.type]
    })
  },
  selected_expression_item: function (e) {
    this.setData({
      current_item_expression: e.currentTarget.dataset.id,
      expressionStyle: e.currentTarget.dataset.url
    })
  },
  selected_special_item: function (e) {
    console.log(e.currentTarget.dataset.url)
    if (e.currentTarget.dataset.type === 'xsf') { //选中的是学士服
      if (this.data.current_item_special === e.currentTarget.dataset.id) {
        this.setData({
          current_item_special: null,
          specialStyle: '',
          shirtStyle: "https://wenda-data.nt-geek.club/shirt_11.png",
          current_item_shirt: 11,
          trouserStyle: "https://wenda-data.nt-geek.club/trousers_09.png",
          current_item_trousers: 9,
        })
      } else {
        this.setData({
          current_item_special: e.currentTarget.dataset.id,
          specialStyle: e.currentTarget.dataset.url,
          overcoatStyle: '',
          current_item_overcoat: null,
          current_item_shirt: null,
          shirtStyle: '',
          current_item_trousers: null,
          trouserStyle: ''
        })
      }
    } else {
      if (this.data.current_item_special === e.currentTarget.dataset.id) {
        this.setData({
          current_item_special: null,
          specialStyle: '',
          shirtStyle: "https://wenda-data.nt-geek.club/shirt_11.png",
          current_item_shirt: 11,
          trouserStyle: "https://wenda-data.nt-geek.club/trousers_09.png",
          current_item_trousers: 9,
        })
      } else {
        this.setData({
          current_item_special: e.currentTarget.dataset.id,
          specialStyle: e.currentTarget.dataset.url,
          current_item_shirt: null,
          shirtStyle: '',

        })
      }
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
        overcoatStyle: e.currentTarget.dataset.url,
        current_item_special: null,
        specialStyle: ''
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
        shirtStyle: e.currentTarget.dataset.url,
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
        current_item_hair: null,
        hairAStyle: '',
        hairBStyle: ""
      })
    } else {
      this.setData({
        current_item_hair: e.currentTarget.dataset.id,
        hairAStyle: e.currentTarget.dataset.urla,
        hairBStyle: e.currentTarget.dataset.urlb,
      })
    }
  },
  selected_feature_item: function (e) {
    if (this.data.expressionStyle == '') {
      this.setData({
        current_item_feature: e.currentTarget.dataset.id,
        featureStyle: e.currentTarget.dataset.urla,
        selface: '',
        selface_selected: false,
        current_item_expression: 1,
        expressionStyle: "https://wenda-data.nt-geek.club/expression_01.png",
      })
    } else {
      this.setData({
        current_item_feature: e.currentTarget.dataset.id,
        featureStyle: e.currentTarget.dataset.urla,
        selface: '',
        selface_selected: false,
      })
    }
  },
  onLoad: function (options) {

    this.setData({
      appearanceList: app.globalData.appearanceList,
      toolitemList: app.globalData.appearanceList['FeatureList'],

    })
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
    let face = wx.getStorageSync('faceimg')
    console.log(face)
    this.setData({
      selface_item: face
    })
    this.getUptoken()
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
   saveStyle:throttle(async function() {
    wx.showLoading({
      title: '合成中...',
    })
    let that = this;
    if (that.data.selface === '') {
      var styleArray = [that.data.hairAStyle, that.data.nakedStyle, that.data.featureStyle, that.data.expressionStyle, that.data.hairBStyle, that.data.shoesStyle, that.data.trouserStyle, that.data.glassesStyle, that.data.othersStyle, that.data.shirtStyle, that.data.overcoatStyle, that.data.specialStyle]
      var imgArray = []
      for (var item in styleArray) {
        if (styleArray[item] != "") {
          console.log(item)
          imgArray.push(await this.getImg(styleArray[item]))
        }
      }
      for (var item in imgArray) {
        ctx.save();
        ctx.beginPath();
        ctx.drawImage(imgArray[item], 12, -44, 616, 1056)
        ctx.restore();
      }
    } else {
      //面部为自拍时
      let naked = await this.getImg(that.data.nakedStyle)
      let face = await this.getImg(that.data.selface)
      let hairback = '';
      if (that.data.hairAStyle != '') {
        hairback = await this.getImg(that.data.hairAStyle)
        //绘制头发（背部-女性）
        ctx.save();
        ctx.drawImage(hairback, 12, -44, 616, 1056)
        ctx.restore();
      }
      //绘制身体
      ctx.save();
      ctx.drawImage(naked, 12, -44, 616, 1056)
      ctx.restore();
      //绘制脸部
      ctx.save();
      ctx.translate(275, 95)
      ctx.drawImage(face, 0, 0, 80, 100);
      ctx.restore();

      var styleArray = [that.data.hairBStyle, that.data.shoesStyle, that.data.trouserStyle, that.data.glassesStyle, that.data.othersStyle, that.data.shirtStyle, that.data.overcoatStyle, that.data.specialStyle]
      var imgArray = []
      for (var item in styleArray) {
        if (styleArray[item] != "") {
          console.log(item)
          imgArray.push(await this.getImg(styleArray[item]))
        }
      }

      for (var item in imgArray) {
        ctx.save();
        ctx.beginPath();
        ctx.drawImage(imgArray[item], 12, -44, 616, 1056)
        ctx.restore();
      }

    }
    ctx.draw(setTimeout(function () {
      wx.canvasToTempFilePath({
        x: 180,
        y: 10,
        width: 265,
        height: 650,
        destHeight: 650,
        destWidth: 265,
        canvasId: 'maskCanvas',
        success: function (res) {
          that.uploadImgToCloud(res.tempFilePath) //上传到七牛云
        }
      })
    }, 300))
  },2000),

  uploadImgToCloud(filePath) {
    let that = this
    qiniuUploader.upload(filePath, (res) => {
        if (app.globalData.userInfo.my_img == '') { //已经有了相关信息就没必要重复添加
          app.netHandlers.updatePersonalImage(app.globalData.userInfo.user_id, res.fileURL).then(res => {
            let Data = res.Data
            let userInfo = {
              id: Data.ID,
              user_id: Data.USERID,
              name: Data.NAME,
              college: Data.COLLEGE,
              major: Data.MAJOR,
              class: Data.CLASS,
              my_img: Data.MYIMG,
              canSearchMe: Data.CanSearchMe
            }
            app.globalData.userInfo = userInfo
            wx.hideLoading(),
              wx.showToast({
                title: '保存成功'
              })
            wx.setStorage({
              key: "USERINFO",
              data: userInfo
            })
          })
        }else{
          let userInfo = app.globalData.userInfo,
          number = Math.floor(Math.random() * 1000),
          id = userInfo.id,
          fileName = getFileNameSelfImg(id);
        userInfo.my_img = 'https://zepeto.nt-geek.club/'+fileName + '?v=' + number;
        app.globalData.userInfo = userInfo;
        wx.setStorage({
          key: "USERINFO",
          data: userInfo
        })
        wx.showToast({
          title: '保存成功',
        })
      }
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