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
    currentStyle: 'FeatureList',
    current_item_expression: null,
    current_item_overcoat: null,
    current_item_shirt: null,
    current_item_trousers: null,
    current_item_shoes: null,
    current_item_others: null,
    current_item_glasses: null,
    current_item_hair: null,
    current_item_feature: null,
    selface:'',
    nakedStyle: "https://zepeto.nt-geek.club/naked.png",
    hairAStyle: "",
    hairBStyle: "",
    overcoatStyle: "",
    trouserStyle: "",
    shoesStyle: "",
    glassesStyle: "",
    othersStyle: "",
    shirtStyle: "",
    expressionStyle: "",
    featureStyle: "",

    selface_item:'',
    selface_selected:false,//是否选中自拍照片
    //数据库返回的所有列表
    appearanceList: null,
    //当前渲染出来的列表
    currentItemList: [],
    //贴图这里，第一次仅仅展现id为1的list,之后每次切换贴图种类
    toolitemList: [],
    currentSkinStyle:0,



  },
  otherData: {
    uptoken: '', //上传凭证
    fileName: '' //key
  },


  /**
   * 生命周期函数--监听页面加载
   */
  selected_self:function(){
    if(!this.data.selface_selected){
      this.setData({
        selface_selected:true,
        selface:this.data.selface_item
      })
    }else{
      this.setData({
        selface_selected:false,
        selface:''
      })
    }
  },
  btn_goto_shoot: function () {
    wx.navigateTo({
      url: '../shoot/shoot',
    })
  },
  changeSkinStyle:function(e){
    if(e.currentTarget.dataset.skinstyle==='a'){
    this.setData({
      currentSkinStyle:0,
    })
    }else if(e.currentTarget.dataset.skinstyle==='b'){
      this.setData({
        currentSkinStyle:1,
      })
    }else{
      this.setData({
        currentSkinStyle:2,
      })
    }
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
        overcoatStyle: e.currentTarget.dataset.url,
        shirtStyle: '',
        current_item_shirt:null
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
        overcoatStyle:'',
        current_item_overcoat:null
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
    console.log(e.currentTarget.dataset)
    if (this.data.current_item_feature === e.currentTarget.dataset.id) {
      this.setData({
        current_item_feature: null,
        featureStyle: ''
      })
    } else {
      this.setData({
        current_item_feature: e.currentTarget.dataset.id,
        featureStyle: e.currentTarget.dataset.urla
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
    let face = wx.getStorageSync('face')
    this.setData({
      selface_item:face
    })
    this.getUptoken()
  },

  goshoot() {
    // wx.navigateTo({
    //   url: '../shoot/shoot',
    // })
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
    var styleArray = [that.data.hairAStyle,that.data.hairBStyle,that.data.shoesStyle,that.data.trouserStyle,that.data.glassesStyle,that.data.othersStyle,that.data.shirtStyle,that.data.overcoatStyle,that.data.featureStyle,that.data.expressionStyle]
    var imgArray = []
    for (var item in styleArray) {
      if(styleArray[item]!=""){
        console.log(item)
        var newimg = await this.getImg(styleArray[item])
        imgArray.push(newimg)
      }
    }
    let naked = await this.getImg(that.data.nakedStyle)
    let face = await this.getImg(this.data.selface)
    //绘制身体
    ctx.save();
    ctx.drawImage(naked, 12, -44, 616, 1056)
    ctx.restore();
    //绘制脸部
    ctx.save();
    ctx.translate(275,95)
    ctx.drawImage(face,0,0,80,100);
    ctx.restore();
    for (var item in imgArray) {
      ctx.save();
      ctx.beginPath();
      ctx.drawImage(imgArray[item], 12, -44, 616, 1056)
      ctx.restore();
    }
    ctx.draw(setTimeout(function () {
      wx.canvasToTempFilePath({
        x: 180,
        y: 40,
        width: 275,
        height: 600,
        canvasId: 'maskCanvas',
        success: function (res) {
          that.uploadImgToCloud(res.tempFilePath) //上传到七牛云
          wx.showToast({
            title: '保存成功',
          })
        }
      })
    }, 100))
  },

  uploadImgToCloud(filePath) {
    let that = this
    qiniuUploader.upload(filePath, (res) => {
      if(app.globalData.userInfo.my_img==''){//已经有了相关信息就没必要重复添加
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
        app.globalData.userInfo = userInfo
        wx.setStorage({
          key:"USERINFO",
          data:userInfo
        })
        
      })}
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


