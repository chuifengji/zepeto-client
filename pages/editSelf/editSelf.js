// pages/editSelf/editSelf.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    currentStyle:'feature',
    personalImage: {
      hairStyle: "",
      eyeStyle: "",
      overcoatStyle: "",
      blouseStyle: "",
      trouserStyle: "",
      shoesStyle: "",
      glassesStyle: "",
      ringStyle: "",
      maskStyle: ""
    },
     //数据库返回的所有列表
    appearanceList:[],
     //当前渲染出来的列表
    currentItemList:[],


    //贴图这里，第一次仅仅展现id为1的list,之后每次切换贴图种类
    toolitemList: [{
        url: "https://wenda-data.nt-geek.club/02.png",
        name: '1'
      },
      {
        url: "https://wenda-data.nt-geek.club/03.png"
      },
    ],
   
      

  },

  /**
   * 生命周期函数--监听页面加载
   */
  btn_goto_shoot:function(){
    wx.navigateTo({
      url: '../shoot/shoot',
    })
  },
  changeItemList:function(e){
   console.log(e.currentTarget.dataset.type)
   this.setData({
     currentStyle:e.currentTarget.dataset.type
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

  },
  goshoot(){
    wx.navigateTo({
      url: '../shoot/shoot',
    })
  }
})