// pages/album/album.js
const app = getApp()
Page({
  /**
   * 页面的初始数据
   */
  data: {
    editActive: false, //处于编辑态
    sortTypeTime: false, //以时间排序
    selectAllActive: false,
    PhotoList: [],

    delbtn: false
  },
  otherData: {
    deleteList: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },
  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    console.log(app.globalData.photoList)
    this.setData({
      PhotoList: app.globalData.photoList.map(item => {
        item.selected = false;
        return item;
      })
    })
  },
  del: function (e) {
    let newList = [],
      that = this,
      oldList = this.data.PhotoList;
    for (let i = 0; i < oldList.length; i++) {
      if (oldList[i].selected === true) {
        this.otherData.deleteList.push(oldList[i])
      } else {
        newList.push(oldList[i])
      }
    }
    //批量删除这里的方法临时使用，后面记得修改。
    for (let i = 0; i < this.otherData.deleteList.length - 1; i++) {
      app.netHandlers.deleteGroupPhoto(app.globalData.userInfo.id, app.globalData.userInfo.user_id, this.otherData.deleteList[i].ID)
    }
    app.netHandlers.deleteGroupPhoto(app.globalData.userInfo.id, app.globalData.userInfo.user_id, this.otherData.deleteList[this.otherData.deleteList.length - 1].ID).then(res => {
      app.globalData.photoList = res.Data
      wx.setStorage({
        key: "PHOTOLIST",
        data: res.Data
      })
    })
    this.setData({
      PhotoList: newList
    })

  },
  btnComplete: function (e) {
    this.setData({
      editActive: false
    })
    let list = this.data.list.map(item => {
      item.selected = false;
      return item;
    })
    this.setData({
      list: list
    })
  },
  btnEdit: function (e) {
    this.setData({
      editActive: true
    })
  },
  changeSortTypeToName: function (e) {
    this.setData({
      sortTypeTime: true
    })
    let newList = this.data.PhotoList;
    newList.sort(function(obj1,obj2){
       return obj1.LOCATION.localeCompare(obj2.LOCATION)
    })
    this.setData({
      PhotoList:newList
    })
    //排序方式以名称
  },
  changeSortTypeToTime: function (e) {
    this.setData({
      sortTypeTime: false
    })
    let newList = this.data.PhotoList;
    newList.sort(function(obj1,obj2){
      return obj1['TIME'] <= obj2['TIME'] ? 1 : -1 
    })
    this.setData({
      PhotoList:newList
    })
    //排序方式以时间
  },
 
  changeSelected: function (e) {
    if (this.data.editActive) {
      //这里的函数并不正确，后面需要修改。
      let list = this.data.PhotoList;
      let getPosition = () => {
        for (let i = 0; i < list.length; i++) {
          if (list[i].ID === e.currentTarget.dataset.id) {
            return i
          }
        }
      }
      let position = getPosition()
      if (!list[position].selected) {

      }
      list[position].selected = !list[position].selected
      this.setData({
        PhotoList: list
      })
    } else {
      var model = JSON.stringify(e.currentTarget.dataset);
      wx.navigateTo({
        url: '../imageDetail/imageDetail?model=' + model,
      })
    }
  },
  //全选
  btnSelectAll: function (e) {
    let list = this.data.PhotoList.map(item => {
      item.selected = true;
      return item;
    })
    this.setData({
      PhotoList: list,
      selectAllActive: true
    })
  },
  btnSelectCancel: function (e) {
    let list = this.data.PhotoList.map(item => {
      item.selected = false;
      return item;
    })
    this.setData({
      PhotoList: list,
      selectAllActive: false
    })
  }
})