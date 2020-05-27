//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
   
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
  
  onLoad: function () {

  },

})
