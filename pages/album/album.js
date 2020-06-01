// pages/album/album.js
Page({
  /**
   * 页面的初始数据
   */
  data: {
    editActive:false,//处于编辑态
    sortTypeTime:true,//以时间排序
    list:[{
      id:0,
      src:"../../images/photo.png" ,
      local:"校大门" ,
      date:"2020/5/24",
      selected:false
    },
    {
      id:1,
      src:"../../images/photo.png" ,
      local:"校大门" ,
      date:"2020/5/24",
      selected:false
    }],

    delbtn:false
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

  },
  del:function(e){
    let newList = [];
    console.log(e)
    for (let i = 0; i < this.data.list.length; i++) {
      if (parseInt(e.currentTarget.id) != this.data.list[i].id) {
        newList.push(this.data.list[i])
      }
    }
    this.setData({
      list: newList
    })
  },
  btnComplete:function(e){
    this.setData({
      editActive:false
    })
    let list = this.data.list.map(item=>{item.selected =  false;return item;})
    this.setData({
     list:list
   })
  },
  btnEdit:function(e){
    this.setData({
      editActive:true
    })
  },
  changeSortTypeToName:function(e){
    this.setData({
      sortTypeTime:false
    })
    //排序方式以名称
  },
  changeSortTypeToTime:function(e){
    this.setData({
      sortTypeTime:true
    })
    //排序方式以时间
  },
  changeSelected:function(e){
    let list = this.data.list;
    list[e.currentTarget.id].selected=!list[e.currentTarget.id].selected
    this.setData({
      list:list
    })
  },
  //全选
  btnSelectAll:function(e){
    let list = this.data.list.map(item=>{item.selected =  !item.selected;return item;})
     this.setData({
      list:list
    })
  }
})