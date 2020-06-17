//index.js
//获取应用实例
const app = getApp()
import util from "../../utils/handlers"
Page({
  data: {
   userinfo:[]
  },
  //事件处理函数

  goToEdit:function(){
    wx.navigateTo({
      url: '../editSelf/editSelf',
    })
  },
  gotofriend_page:function(){
    wx.navigateTo({
      url: '../friends/friends',
    })
  },
  gotoselfinfo_page:function(){
    wx.navigateTo({
      url: '../selfInfo/selfInfo',
    })
  },
  gotomail_page:function(){
    wx.navigateTo({
      url: '../mailBox/mailBox',
    })
  },
  
  onLoad: function () {
    if(!app.globalData.userInfo){
      app.userInfoReadyCallback = res => {
        this.setData({
          userinfo: res
       })
      }
    }else{

    }
  },
  getSomeList:function(){},
  onShow:function(){
    this.setData({
      userinfo: app.globalData.userInfo
   })
  },
  onReady: function () {
   //可以在这里请求装饰列表，背景列表。

  },
})
