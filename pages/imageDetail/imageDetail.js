// pages/imageDetail/imageDetail.js
import {
  throttle,
} from "../../utils/handlers.js"
Page({

  /**
   * 页面的初始数据
   */
  data: {
    openSettingBtnHidden: true,//是否授权
    imgUrl: ''
  },
// 保存图片
saveImg:throttle(function(e){
  let that = this;
  //获取相册授权
  wx.getSetting({
    success(res) {
      if (!res.authSetting['scope.writePhotosAlbum']) {
        wx.authorize({
          scope: 'scope.writePhotosAlbum',
          success() {
            //这里是用户同意授权后的回调
            that.saveImgToLocal();
          },
          fail() {//这里是用户拒绝授权后的回调
            that.setData({
              openSettingBtnHidden: false
            })
          }
        })
      } else {//用户已经授权过了
        that.saveImgToLocal();
      }
    }
  })
},400),
saveImgToLocal: function (e) {
  let that = this;
  let imgSrc = that.data.imgUrl;
  wx.downloadFile({
    url: imgSrc,
    success: function (res) {
      console.log(res);
      //图片保存到本地
      wx.saveImageToPhotosAlbum({
        filePath: res.tempFilePath,
        success: function (data) {
          wx.showToast({
            title: '保存成功',
            icon: 'success',
            duration: 2000
          })
        },
      })
    }
  })

},

// 授权
handleSetting: function (e) {
  let that = this;
  // 对用户的设置进行判断，如果没有授权，即使用户返回到保存页面，显示的也是“去授权”按钮；同意授权之后才显示保存按钮

  if (!e.detail.authSetting['scope.writePhotosAlbum']) {
    // wx.showModal({
    //   title: '警告',
    //   content: '若不打开授权，则无法将图片保存在相册中！',
    //   showCancel: false
    // })
    that.setData({
      openSettingBtnHidden: false
    })
  } else {
    // wx.showModal({
    //   title: '提示',
    //   content: '您已授权，赶紧将图片保存在相册中吧！',
    //   showCancel: false
    // })
    that.setData({
      openSettingBtnHidden: true
    })
  }
},
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let model = JSON.parse(options.model)
    this.setData({
      imgUrl:model.src
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