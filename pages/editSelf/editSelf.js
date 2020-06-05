// pages/editSelf/editSelf.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    currentStyle:'feature',
    current_item_expression:null,
    current_item_overcoat:null,
    current_item_shirt:null,
    current_item_trousers:null,
    current_item_shoes:null,
    current_item_others:null,
    current_item_glasses:null,
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
        id:0,
        url: "https://wenda-data.nt-geek.club/02.png",
        name: '1'
      },
      {
        id:1,
        url: "https://wenda-data.nt-geek.club/03.png"
      },{
        id:2,
        url: "https://wenda-data.nt-geek.club/02.png",
        name: '1'
      },
      {
        id:3,
        url: "https://wenda-data.nt-geek.club/03.png"
      },{
        id:4,
        url: "https://wenda-data.nt-geek.club/02.png",
        name: '1'
      },
      {
        id:5,
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
  selected_expression_item:function(e){
   this.setData({
    current_item_expression:e.currentTarget.dataset.id
   })
  },
  selected_overcoat_item:function(e){
    this.setData({
      current_item_overcoat:e.currentTarget.dataset.id
     })
  },
  selected_shirt_item:function(e){
    this.setData({
      current_item_shirt:e.currentTarget.dataset.id
     })
  },
  selected_trousers_item:function(e){
    this.setData({
      current_item_trousers:e.currentTarget.dataset.id
     })
  },
  selected_shoes_item:function(e){
    this.setData({
      current_item_shoes:e.currentTarget.dataset.id
     })
  },
  selected_glasses_item:function(e){
    this.setData({
      current_item_glasses:e.currentTarget.dataset.id
     })
  },
  selected_others_item:function(e){
    this.setData({
      current_item_others:e.currentTarget.dataset.id
     })
  },
  selected_hair_item:function(e){
    this.setData({
      current_item_hair:e.currentTarget.dataset.id
     })
  },
  selected_feature_item:function(e){
    this.setData({
      current_item_feature:e.currentTarget.dataset.id
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