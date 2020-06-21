const ctx = wx.createCanvasContext('myCanvas')
const app = getApp()
const qiniuUploader = require("../../qiniu/qiniuUploader.js");
import {
  getFileNameSelfFace
} from "../../utils/handlers.js"
Page({
  data: {
    tmpimg: "",
    left: '',
    src: '',
    openSettingBtnHidden: true,
  },
  otherData: {
      sysData: null,
      uptoken: '', //上传凭证
      fileName: '' //key
  },


  // 授权
  handleSetting: function (e) {
    let that = this;
    // 对用户的设置进行判断，如果没有授权，即使用户返回到保存页面，显示的也是“去授权”按钮；同意授权之后才显示保存按钮

    if (!e.detail.authSetting['scope.camera']) {
      // wx.showModal({
      //   title: '警告',
      //   content: '若不打开授权，则无法将图片保存在相册中！',
      //   showCancel: false
      // })
      that.setData({
        openSettingBtnHidden: false
      })
    } else {
      // wx.showModal({
      //   title: '提示',
      //   content: '您已授权，赶紧将图片保存在相册中吧！',
      //   showCancel: false
      // })
      that.setData({
        openSettingBtnHidden: true
      })
    }
  },
  onLoad() {
    let that = this;
    wx.getSystemInfo({
      success: sysData => {
        that.otherData.sysData = sysData
        this.setData({
          canvasWidth: sysData.windowWidth,
          canvasHeight: sysData.windowHeight,
          left: (sysData.windowWidth - 200) / 2
        })
      }
    })
  },
  onReady() {

  },
  onShow(){
    this.getUptoken()
  },
  takePhoto() {
    let that = this;
    wx.getSetting({
      success(res) {
        if (!res.authSetting['scope.camera']) {
          wx.authorize({
            scope: 'scope.camera',
            success() {
              //这里是用户同意授权后的回调
              const ctx = wx.createCameraContext()
              ctx.takePhoto({
                quality: 'nomal',
                success: (res) => {
                  console.log(res)
                  that.save(res.tempImagePath)
                }
              })
            },
            fail() { //这里是用户拒绝授权后的回调
              that.setData({
                openSettingBtnHidden: false
              })
            }
          })
        } else { //用户已经授权过了
          const ctx = wx.createCameraContext()
          ctx.takePhoto({
            quality: 'nomal',
            success: (res) => {
              console.log(res)
              that.save(res.tempImagePath)
            }
          })
        }
      }
    })

  },
  save(path) {
    var that = this
    console.log(that.otherData.sysData,that.otherData)
    var x = (that.otherData.sysData.windowWidth - 200) / 2 + 100,
      y = 227,
      a = 100,
      b = 127
    let dt = 1 / Math.max(a, b) // 绘制时的角度增量 Δt
    ctx.moveTo(x + a, y) // 移动到起始点
    for (let t = 0; t < Math.PI * 2; t += dt) {
      ctx.lineTo(x + a * Math.cos(t), y + b * Math.sin(t))
    }
    ctx.clip()
    ctx.drawImage(path, 0, 0, that.otherData.sysData.windowWidth, that.otherData.sysData.windowHeight - 100)
    ctx.draw(true, () => {
      wx.canvasToTempFilePath({
        x: (that.otherData.sysData.windowWidth - 200) / 2,
        y: 100,
        width: 200,
        height: 254,
        destWidth: 200,
        destHeight: 254,
        canvasId: 'myCanvas',
        success: function (res) {
          that.uploadImgToCloud(res.tempFilePath)
        }
      })
    })
  },
  uploadImgToCloud(filePath) {
    let that = this
    qiniuUploader.upload(filePath, (res) => {
      app.globalData.faceimg = res.imageURL;
      wx.setStorageSync('faceimg', res.imageURL)
      wx.showToast({
        title: '保存成功'
      })
      wx.navigateBack({
        complete: (res) => {},
      })
      }, (error) => {
        console.error('error: ' + JSON.stringify(error))
      }, {
        region: 'ECN',
        key: that.otherData.fileName,
        uptoken: that.otherData.uptoken,
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
    let fileName = getFileNameSelfFace(id)
    app.netHandlers.getUptoken(fileName).then(res => {
      this.otherData.uptoken = res.Data;
      this.otherData.fileName=fileName
    })
  }
})

