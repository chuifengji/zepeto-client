//index.js
//获取应用实例
const app = getApp()
Page({
  data: {
   userinfo:[],
   origin_img:'https://wenda-data.nt-geek.club/self-img-origin.png',
   hasimg:true
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
       if(res.my_img==''){
         this.setData({
          hasimg:false
         })
       }
      }
    }
  },
  getSomeList:function(){},
  onShow:function(){
    let userinfo = app.globalData.userInfo
    if(userinfo.my_img==''){
      this.setData({
       hasimg:false
      })
    }else if(userinfo.my_img!=''){
      this.setData({
        hasimg:true
       })
    }
    this.setData({
      userinfo,
   })
  },
  onReady: function () {
   //可以在这里请求装饰列表，背景列表。

  },
})
