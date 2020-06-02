//index.js
//获取应用实例
const app = getApp()

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
  onShow:function(){
    this.setData({
      userinfo: app.globalData.userInfo
   })
  }

})
