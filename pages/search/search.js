// pages/search/search.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    keyword: "",
    peopleList: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  change_keyword: function (e) {
    this.setData({
      keyword: e.detail.value
    })
  },
  search: function () {
    let keyword = this.data.keyword;
    if (keyword == '') {
      wx.showToast({
        title: '搜索不能为空',
        icon: 'none'
      })
    } else {
      app.netHandlers.searchFriend(keyword).then(res => {
        let data = res.Data.map(item => {
          return {
            id: item.ID,
            name: item.NAME,
            major: item.MAJOR,
            src: item.MYIMG
          }
        })
        console.log(data)
        this.setData({
          peopleList: data
        })
      })
    }
  },
  gotofriendinfo_page: function (e) {
    console.log(e.currentTarget.dataset)
    var model = JSON.stringify(e.currentTarget.dataset);
    wx.navigateTo({
      url: '../friendInfo/friendInfo?model=' + model,
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