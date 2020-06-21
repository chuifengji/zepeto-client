// pages/friends/friends.js
const app = getApp()
const {
  throttle,
} = require("../../utils/handlers")
Page({

  /**
   * 页面的初始数据
   */
  data: {
    currentTab:0,
    peopleList:[]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  goTo_tab_class:throttle(function(){
    this.setData({
      currentTab:1,
      peopleList:app.globalData.classmateList
    })
  },500),
  goTo_tab_friend:throttle(function(){
    this.setData({
      currentTab:0,
      peopleList:app.globalData.friendList
    })
  },500),
  goToSearch:throttle(function(){
    wx.navigateTo({
      url: '../search/search',
    })
  },500),
  gotofriendinfo_page:throttle(function(e){
    console.log(e.currentTarget.dataset)
    var model = JSON.stringify(e.currentTarget.dataset);
      wx.navigateTo({
        url: '../friendInfo/friendInfo?model=' + model,
      })
  },500),
  onLoad: function (options) {

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
    if(this.data.currentTab == 0){
      this.setData({
        peopleList:app.globalData.friendList
      })
    }else{
      this.setData({
        peopleList:app.globalData.classmateList
      })
    }
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