// pages/friendInfo/friendInfo.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    hadbeenmyfriend:false,
    model:null,
    navigateTitle: "",
    model:null
  },

  /**
   * 生命周期函数--监听页面加载
   */
  addFriend:function(){
    let myid =app.globalData.userInfo.id;
    let friendid = this.data.model.id
    if(myid===friendid){
      wx.showToast({
        title: '你也太孤单了吧',
        icon:"none"
      })
    }else{
      app.netHandlers.makeFriend(myid,friendid).then(res=>{
        if(res.Msg==="SUCCESS"){
          app.globalData.friendList = res.Data;
          wx.setStorage({
            key:"FRIENDLIST",
            data:res.Data
          })
          wx.showToast({
            title: '添加成功',
          })
        }
      })
    }
  },
  //通过该用户的ID判断是否是我的好友
  isMyFriend(id){
    let friendList = app.globalData.friendList;
    let count = 0;
    if(friendList==null){
     return false
    }else{
      friendList.map(item=>{
        if(item.ID===id){
          count++;
        }
      })
      if(count>0){
        return true
      }else{
        return false
      }
    }
  },
  deleteFriend(){
    let myid =app.globalData.userInfo.id;
    let friendid = this.data.model.id
    app.netHandlers.deleteFriend(myid,friendid).then(res=>{
      if(res.Msg==="SUCCESS"){
        app.globalData.friendList = res.Data;
        wx.setStorage({
          key:"FRIENDLIST",
          data:res.Data
        })
        wx.showToast({
          title: '删除成功',
        })
      }
    })
  },
  onLoad: function (options) {
    let model = JSON.parse(options.model)
    if(this.isMyFriend(model.id)){
      this.setData({
        hadbeenmyfriend:true
      })
    }
    wx.setNavigationBarTitle({
      title: model.name
    })
    this.setData({
      model:model
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

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})