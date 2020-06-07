// pages/editSelf/editSelf.js
const app = getApp()
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
    current_item_hair:null,
    current_item_feature:null,

      nakedStyle: "https://zepeto.nt-geek.club/naked.png",
      hairAStyle: "",
      hairBStyle: "",
      overcoatStyle: "",
      trouserStyle: "",
      shoesStyle: "",
      glassesStyle: "",
      othersStyle:"",
      shirtStyle:"",
      expressionStyle:"",
      featureStyle:"",

 
     //数据库返回的所有列表
    appearanceList:null,
     //当前渲染出来的列表
    currentItemList:[],
    //贴图这里，第一次仅仅展现id为1的list,之后每次切换贴图种类
    toolitemList: [],
   
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
   this.setData({
     currentStyle:e.currentTarget.dataset.type,
     toolitemList:app.globalData.appearanceList[e.currentTarget.dataset.type]
   })
  },
  selected_expression_item:function(e){
    if(this.data.current_item_overcoat===e.currentTarget.dataset.id){
      this.setData({
        current_item_expression:null,
        expressionStyle:''
       })
    }else{
      this.setData({
        current_item_expression:e.currentTarget.dataset.id,
        expressionStyle:e.currentTarget.dataset.url
       })
    }
  },
  selected_overcoat_item:function(e){
    if(this.data.current_item_overcoat===e.currentTarget.dataset.id){
      this.setData({
        current_item_overcoat:null,
        overcoatStyle:''
       })
    }else{
      this.setData({
        current_item_overcoat:e.currentTarget.dataset.id,
        overcoatStyle:e.currentTarget.dataset.url
       })
    }
  },
  selected_shirt_item:function(e){
    if(this.data.current_item_shirt===e.currentTarget.dataset.id){
      this.setData({
        current_item_shirt:null,
        shirtStyle:''
       })
    }else{
      this.setData({
        current_item_shirt:e.currentTarget.dataset.id,
        shirtStyle:e.currentTarget.dataset.url
       })
    }
  },
  selected_trousers_item:function(e){
    if(this.data.current_item_trousers===e.currentTarget.dataset.id){
      this.setData({
        current_item_trousers:null,
        trouserStyle:''
       })
    }else{
      this.setData({
        current_item_trousers:e.currentTarget.dataset.id,
        trouserStyle:e.currentTarget.dataset.url
       })
    }

  },
  selected_shoes_item:function(e){
    if(this.data.current_item_shoes===e.currentTarget.dataset.id){
      this.setData({
        current_item_shoes:null,
        shoesStyle:''
       })
    }else{
      this.setData({
        current_item_shoes:e.currentTarget.dataset.id,
        shoesStyle:e.currentTarget.dataset.url
       })
    }
  },
  selected_glasses_item:function(e){
    if(this.data.current_item_glasses===e.currentTarget.dataset.id){
      this.setData({
        current_item_glasses:null,
        glassesStyle:''
       })
    }else{
      this.setData({
        current_item_glasses:e.currentTarget.dataset.id,
        glassesStyle:e.currentTarget.dataset.url
       })
    }
  },
  selected_others_item:function(e){
    if(this.data.current_item_others===e.currentTarget.dataset.id){
      this.setData({
        current_item_others:null,
        othersStyle:''
       })
    }else{
      this.setData({
        current_item_others:e.currentTarget.dataset.id,
        othersStyle:e.currentTarget.dataset.url
       })
    }
  },
  selected_hair_item:function(e){
    if(this.data.current_item_hair===e.currentTarget.dataset.id){
      this.setData({
        current_item_hair:e.currentTarget.dataset.id,
        hairAStyle:'',
        hairBStyle:""
       })
    }else{
      if(e.currentTarget.dataset.type==='hair'){
        this.setData({
          current_item_hair:e.currentTarget.dataset.id,
          hairAStyle:e.currentTarget.dataset.hairAStyle,
          hairBStyle:"",
         })
      }else{
        this.setData({
          current_item_hair:e.currentTarget.dataset.id,
          hairAStyle:e.currentTarget.dataset.hairAStyle,
          hairBStyle:e.currentTarget.dataset.hairBStyle,
         })
      }
    }
  },
  selected_feature_item:function(e){
    if(this.data.current_item_feature===e.currentTarget.dataset.id){
      this.setData({
        current_item_feature:null,
        featureStyle:''
       })
    }else{
      this.setData({
        current_item_feature:e.currentTarget.dataset.id,
        featureStyle:e.currentTarget.dataset.url
       })
    }
  },
  onLoad: function (options) {
    this.setData({
      appearanceList:app.globalData.appearanceList,
      toolitemList:app.globalData.appearanceList['FeatureList']
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

  },
  goshoot(){
    wx.navigateTo({
      url: '../shoot/shoot',
    })
  },
  
  saveStyle:function(){
    wx.getImageInfo({
      src: this.data.nakedStyle,
      success (res) {
        console.log(res)
        const ctx = wx.createCanvasContext('maskCanvas');
        ctx.drawImage(res.path,6,-20,308,524)
        ctx.draw(setTimeout(function () {
          wx.canvasToTempFilePath({
            x: 95,
            y: 60,
            width: 123,
            height: 258,
            canvasId: 'maskCanvas',
            success: function (res) {
              console.log(res)
              wx.saveImageToPhotosAlbum({
                filePath: res.tempFilePath,          //save face picture
              })
            }
          })
        },100))
      }
    })
    
  }
})