//app.js

import netHandlers from "./utils/netHandlers"
App({
  onLaunch: function () {
    try {
      const res = wx.getStorageInfoSync() //获取缓存信息
      const keys = res.keys
      let that = this
      if (keys.indexOf("USERINFO") === -1) {
        //缓存中不包含USER_ID，未注册/登录过。
        this.login()
      } else {
        let userInfo = wx.getStorageSync('USERINFO')
        that.globalData.userInfo = userInfo
        if (that.userInfoReadyCallback) {
          that.userInfoReadyCallback(userInfo)
        }
      }
    } catch (e) {
      wx.showToast({
        title: '获取缓存信息失败',
        icon: 'none',
        duration: 2000
      })
    }
  },
  netHandlers : new netHandlers(),//全局注册/实例化 网络请求类。
  login : function(code){
    let that = this;
    wx.login({
      success: res => {
        this.netHandlers.login(res.code).then(res=>{
          let Data = res.Data
          let userInfo={
            id:res.Data.ID,
            user_id:Data.USERID,
            name:Data.NAME,
            college:Data.COLLEGE,
            major:Data.MAJOR,
            class:Data.CLASS,
            my_img:Data.my_img
          }
          this.globalData.userInfo = userInfo
          if (that.userInfoReadyCallback) {
            that.userInfoReadyCallback(userInfo)
          }
          wx.setStorage({
            key:"USERINFO",
            data:userInfo
          })
        })
      }
    })
    },
  globalData: {
    userInfo: null
  }
})

