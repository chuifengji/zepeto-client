// pages/groupPhoto/groupPhoto.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    shrink:1,
    currentTab:0,
    tabItems:[{navbar_title:'人物'},{navbar_title:'背景'},{navbar_title:'装饰'}],
    toolitemList: [{
      url: "https://wenda-data.nt-geek.club/02.png",
      name: '1'
    },
    {
      url: "https://wenda-data.nt-geek.club/03.png"
    },
    {
      url: "https://wenda-data.nt-geek.club/04.png"
    },
    {
      url: "https://wenda-data.nt-geek.club/1.png"
    },
    {
      url: "https://wenda-data.nt-geek.club/06.png"
    },
    {
      url: "https://wenda-data.nt-geek.club/07.png"
    },
    {
      url: "https://wenda-data.nt-geek.club/08.png"
    },
    {
      url: "https://wenda-data.nt-geek.club/09.png"
    },
    {
      url: "https://wenda-data.nt-geek.club/10.png"
    },
    {
      url: "https://wenda-data.nt-geek.club/11.png"
    },
    {
      url: "https://wenda-data.nt-geek.club/12.png"
    },
    {
      url: "https://wenda-data.nt-geek.club/13.png"
    },
    {
      url: "https://wenda-data.nt-geek.club/14.png"
    },
    {
      url: "https://wenda-data.nt-geek.club/15.png"
    },
    {
      url: "https://wenda-data.nt-geek.club/16.png"
    },
    {
      url: "https://wenda-data.nt-geek.club/17.png"
    },
    {
      url: "https://wenda-data.nt-geek.club/18.png"
    },
    {
      url: "https://wenda-data.nt-geek.club/19.png"
    },
    {
      url: "https://wenda-data.nt-geek.club/20.png"
    },
    {
      url: "https://wenda-data.nt-geek.club/21.png"
    },
    {
      url: "https://wenda-data.nt-geek.club/22.png"
    },
    {
      url: "https://wenda-data.nt-geek.club/23.png"
    },
  ]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  changeHeight:function(){
    this.setData({
      shrink:!this.data.shrink
  })},
  switchNav:function(e){
    this.setData({
      currentTab: e.target.dataset.current,
    })
  },
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