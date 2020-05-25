//app.js

import netHandlers from "./utils/netHandlers"
App({
  onLaunch: function () {
    try {
      const res = wx.getStorageInfoSync() //获取缓存信息
      const keys = res.keys
      if (keys.indexOf("USER_ID") === -1) {
        //缓存中不包含USER_ID，未注册/登录过。
        this.login()
      } else {
        wx.getStorage({
          key: 'userInfo',
          success(res) {
            this.globalData.userInfo = res.data//这里是异步的，所以需要加入callback函数，页面图没出来暂时先不管。
          },
        })
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
    wx.login({
      success: res => {
        // 发送 res.code 到后台换取 openId生成USER_ID，并对userInfo进行初始化。
        this.netHandlers.login(res.code).then(res=>{
          //接下来服务器会判断该用户是否存在
  
        })
      }
    })
    },

  globalData: {
    userInfo: null //合照的本地地址，朋友列表，个人形象等
  }
})

