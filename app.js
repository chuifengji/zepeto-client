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
        this.getBackgroundList()
        this.getAppearanceList()
        let userInfo = wx.getStorageSync('USERINFO')
        let friendList = wx.getStorageSync('FRIENDLIST')
        let photoList = wx.getStorageSync('PHOTOLIST')
        this.getMyClassMateList(userInfo.college,userInfo.major,userInfo.class)
        that.globalData.userInfo = userInfo
        that.globalData.friendList = friendList
        that.globalData.photoList = photoList
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
            id:Data.ID,
            user_id:Data.USERID,
            name:Data.NAME,
            college:Data.COLLEGE,
            major:Data.MAJOR,
            class:Data.CLASS,
            my_img:Data.MYIMG,
            canSearchMe:Data.CanSearchMe
          }
          this.globalData.userInfo = userInfo
          if (that.userInfoReadyCallback) {
            that.userInfoReadyCallback(userInfo)
          }
          this.getFriendList(res.Data.ID)
          this.getMyPhotoList(Data.ID,Data.USERID)
          this.getMyClassMateList(Data.COLLEGE,Data.MAJOR,Data.CLASS)
          this.getBackgroundList()
          this.getAppearanceList()
          wx.setStorage({
            key:"USERINFO",
            data:userInfo
          })
          wx.setStorage({
            key:"DECORATIONLIST",
            data:this.globalData.decorationList
          })

        })
      }
    })
    },
    //下面的三个请求对每个用户来说都是一样的，属于公共数据其实也完全可以放在云存储上，没必要浪费带宽。
    getBackgroundList:function(){
      this.netHandlers.getBackgroundList().then(res=>{
        this.globalData.backgroundList = res.Data;
        wx.setStorage({
          key:"BACKGROUNDLIST",
          data:this.globalData.backgroundList
        })
    })
    },
    getAppearanceList:function(){
        this.netHandlers.getAppearanceList().then(res=>{
          console.log(res)
          this.globalData.appearanceList = res.Data;
          wx.setStorage({
            key:"APPEARANCELIST",
            data:res.Data
          })
      })
    },
    getDecorationList:function(){

    },
    //用户初次登录要获得的私人数据是下面这三个。
    getFriendList:function(myid){
      this.netHandlers.getFriendsList(myid).then(res=>{
        console.log(res)
        this.globalData.friendList = res.Data
        wx.setStorage({
          key:"FRIENDLIST",
          data:res.Data
        })
      })
    },
    getMyPhotoList:function(iduser,userid){
      this.netHandlers.getGroupPhotos(iduser,userid).then(res=>{
        this.globalData.photoList = res.Data
        wx.setStorage({
          key:"PHOTOLIST",
          data:res.Data
        })
      })
    },
    getMyClassMateList:function(college,major,classNum){
      if(college!=''&&major!=''&&classNum!=''){
        this.netHandlers.getClassMateList(college,major,classNum).then(res=>{
          this.globalData.classmateList = res.Data;
          wx.setStorage({
            key:"CLASSMATELIST",
            data:res.Data
          })
        })
      }
    },
  globalData: {
    userInfo: null,
    backgroundList:null,
    appearanceList:null,
    decorationList:null,
    friendList:null,
    classmateList:null,
    photoList:null
  }
})



