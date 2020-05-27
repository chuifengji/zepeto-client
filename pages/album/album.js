// pages/album/album.js
Page({
  /**
   * 页面的初始数据
   */
  data: {
    list:[{
      id:0,
      src:"../../images/photo.png" ,
      local:"校大门" ,
      year:'2020',
       month:'5' ,
       day:'27'
    },
    {
      id:1,
      src:"../../images/photo.png" ,
      local:"校大门" ,
      year:'2020',
       month:'5' ,
       day:'27'
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
  edit:function(){
    var turn=this.data.delbtn?false:true
    console.log(this.data.delbtn)
    this.setData({
      delbtn:turn
    })
    console.log(this.data.delbtn)
  },
  del:function(e){
    let newList = [];
    console.log(e)
    for (let i = 0; i < this.data.list.length; i++) {
      if (parseInt(e.currentTarget.id) != this.data.list[i].id) {
        newList.push(this.data.list[i])
      }
    }
    console.log(newList)
    this.setData({
      list: newList
    })
    console.log(newList)
  }

})