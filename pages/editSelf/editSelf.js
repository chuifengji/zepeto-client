// pages/editSelf/editSelf.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
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

    //贴图这里，第一次仅仅展现id为1的list,之后每次切换贴图种类
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

    ],
    chartletList: [],
    chartletList: [{
        id: 0,
        typeName: "shoe",
        itemsList: [

        ]
      },
      {
        id: 0,
        typeName: "shoe",
        itemsList: [

        ]
      },
      {
        id: 1,
        typeName: "glass",
        itemsList: [
          "https://wenda-data.nt-geek.club/02.png",
          "https://wenda-data.nt-geek.club/03.png",
          "https://wenda-data.nt-geek.club/04.png",
          "https://wenda-data.nt-geek.club/1.png",
          "https://wenda-data.nt-geek.club/06.png",
          "https://wenda-data.nt-geek.club/07.png",
          "https://wenda-data.nt-geek.club/08.png",
          "https://wenda-data.nt-geek.club/09.png",
          "https://wenda-data.nt-geek.club/10.png",
          "https://wenda-data.nt-geek.club/11.png",
          "https://wenda-data.nt-geek.club/12.png",
          "https://wenda-data.nt-geek.club/13.png",
          "https://wenda-data.nt-geek.club/14.png",
          "https://wenda-data.nt-geek.club/15.png",
          "https://wenda-data.nt-geek.club/16.png",
          "https://wenda-data.nt-geek.club/17.png",
          "https://wenda-data.nt-geek.club/18.png",
          "https://wenda-data.nt-geek.club/19.png",
          "https://wenda-data.nt-geek.club/20.png",
          "https://wenda-data.nt-geek.club/21.png",
          "https://wenda-data.nt-geek.club/22.png",
          "https://wenda-data.nt-geek.club/23.png",
          "https://wenda-data.nt-geek.club/24.png",
        ]
      },
    ]

  },

  /**
   * 生命周期函数--监听页面加载
   */
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