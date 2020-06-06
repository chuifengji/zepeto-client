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
    console.log(myid,friendid)
    app.netHandlers.makeFriend(myid,friendid).then(res=>{
      console.log(res)
    })
  },
  //通过该用户的ID判断是否是我的好友
  isMyFriend(){

  },
  onLoad: function (options) {
    let model = JSON.parse(options.model)
    console.log(model)
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