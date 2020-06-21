// 移植过来的部分
let index = 0,
  items = [],
  flag = true,
  itemId = 1;
const canvasPre = 2; // 展示的canvas占mask的百分比
const maskCanvas = wx.createCanvasContext('maskCanvas');
// 移植过来的部分
const app = getApp()
const {
  upload
} = require("../../qiniu/qiniuUploader.js")
const {
  getFileNameGroupPhotos,
  getDate,
  setSortPoint
} = require("../../utils/handlers")
Page({
  /**
   * 页面的初始数据
   */
  data: {
    shrink: 1,
    currentTab: 0,
    tabItems: [{
      navbar_title: '人物'
    }, {
      navbar_title: '背景'
    }, {
      navbar_title: '装饰'
    }],
    currentTab_screen:0,
    tabItems_screen: [{
      title: '竖屏'
    }, {
      title: '横屏'
    }],
    toolitemList: [],
    current_item_bg: 0,
    bg_container_image: 'https://wenda-data.nt-geek.club/bg-01.png', //当前的背景图片
    itemList: [],
  },
  otherData: {
    personList: null,
    backgroundList:null,
    fileName: '',
    uptoken: '',
    location: '',
    time: '',
    bg_type:'',
    sysData: null
  },
  /**
   * 生命周期函数--监听页面加载
   */
  changeHeight: function () {
    this.setData({
      shrink: !this.data.shrink
    })
  },
  switchNav_screen:function(e){
    console.log(this.otherData.bg_type)
    let current = e.target.dataset.current
    this.setData({
      currentTab_screen: current,
    })
    if(current===1&&this.otherData.bg_type!='landScape'){
      this.setData({
        current_item_bg: this.otherData.backgroundList[0][0].ID,
        bg_container_image: this.otherData.backgroundList[0][0].URL
      })
    }else{
      this.setData({
        current_item_bg: this.otherData.backgroundList[1][0].ID,
        bg_container_image: this.otherData.backgroundList[1][0].URL
      })
    }
    if(this.data.currentTab==1){
      this.setData({
        toolitemList:this.data.currentTab_screen==0?this.otherData.backgroundList[1]:this.otherData.backgroundList[0],
      })
    }
  },
  switchNav: function (e) {
    let current = e.target.dataset.current
    this.setData({
      currentTab: current,
    })
    if (current == 0) {
      this.setData({
        toolitemList: this.otherData.personList,
      })
    } else if (current == 1) {
      this.setData({
        toolitemList:this.data.currentTab_screen==0?this.otherData.backgroundList[1]:this.otherData.backgroundList[0],
      })
    } else {
      this.setData({
        toolitemList: app.globalData.decorationList,
      })
    }
  },
  selected_bg_item: function (e) {
    this.otherData.location = e.currentTarget.dataset.name;
    this.otherData.bg_type = e.currentTarget.dataset.type;
    this.setData({
      current_item_bg: e.currentTarget.dataset.id,
      bg_container_image: e.currentTarget.dataset.src
    })
  },
  onLoad: function (options) {
    this.otherData.personList = this.getPersonList();
    this.otherData.backgroundList = this.getBackgroundList();
    this.otherData.bg_type = 'portrait_screen'
    let that = this;
    this.otherData.location = '火之舞';
    // 移植过来的部分
    items = this.data.itemList;
    this.drawTime = 0
    wx.getSystemInfo({
      success: sysData => {
        this.sysData = sysData
        that.otherData.sysData = sysData
        this.setData({
          canvasWidth: this.sysData.windowWidth * canvasPre, // 如果觉得不清晰的话，可以把所有组件、宽高放大一倍
          canvasHeight: this.sysData.windowHeight * canvasPre,
        })
      }
    })
    this.getUptokenPhotos();
  },
  onHide: function () {
    app.globalData.selectedPerson = []
    this.otherData.personList.forEach((current, index) => {
      if (current.selected === true) {
        app.globalData.selectedPerson.push(current.ID)
      }
    })
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    this.otherData.time = getDate() //获取今天的日期。
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    let newPersonList = this.getPersonList(), //需要记录被选中者的id
      personList = [];
    if (app.globalData.selectedPerson != null) {
      newPersonList.map(item => {
        for (let i = 0; i < app.globalData.selectedPerson.length; i++) {
          if (item.ID === app.globalData.selectedPerson[i]) {
            item.selected = true;
          }
        }
        personList.push(item)
      })
    } else {
      personList = newPersonList
    }
    this.otherData.personList = personList
    if (this.data.currentTab === 0) {
      this.setData({
        toolitemList: personList,
        uptoken: this.otherData.uptoken
      })
    } else if (this.data.currentTab === 1) {
     
      this.setData({
        toolitemList: this.data.currentTab_screen==0?this.otherData.backgroundList[1]:this.otherData.backgroundList[0],
        uptoken: this.otherData.uptoken
      })
    } else {
      this.setData({
        toolitemList: app.globalData.decorationList,
        uptoken: this.otherData.uptoken
      })
    }
  },
  //getLandscapeackground
  getBackgroundList:function(){
    let  backgroundList_L = [],
    backgroundList_P = [];
    app.globalData.backgroundList.map(item=>{
      if(item.TYPE==='landscape'){
        backgroundList_L.push(item)
      }else{
        backgroundList_P.push(item)
      }
    })
    return [backgroundList_L,backgroundList_P]
  },
  //getPersonList 去除人物列表中重复的部分。
  getPersonList: function () {
    let result = [{
      ID: app.globalData.userInfo.id,
      NAME: app.globalData.userInfo.name,
      MYIMG: app.globalData.userInfo.my_img,
      selected: false
    }];
    let friendList = app.globalData.friendList;
    let classmateList = app.globalData.classmateList;
    if (classmateList) {
      classmateList.map(item => {
        item.selected = false;
        result.push(item)
      })
    }
    if (friendList) {
      friendList.map(item => {
        item.selected = false;
        result.push(item)
      })
    }
    let hash = {};
    result = result.reduce(function (arr, current) {
      hash[current.ID] ? '' : hash[current.ID] = true && arr.push(current);
      return arr
    }, []);
    return result;
  },
  selected_person_item: function (e) {
    let list = this.otherData.personList;
    let getPosition = () => {
      for (let i = 0; i < list.length; i++) {
        if (list[i].ID === e.currentTarget.dataset.id) {
          return i
        }
      }
    }
    let position = getPosition()
    if (!list[position].selected) {
      list[position].selected = true
      this.setDropItem({
        url: e.currentTarget.dataset.src,
        type: 'person',
        originalId: e.currentTarget.dataset.id,
        name: e.currentTarget.dataset.name
      });
    } else {
      list[position].selected = false;
      let newList = [];
      for (let i = 0; i < items.length; i++) {
        if ((items[i].originalId != e.currentTarget.dataset.id) || (items[i].type != 'person')) {
          newList.push(items[i])
        }
      }
      items = newList;
      this.setData({
        itemList: items
      })
    }
    this.setData({
      toolitemList: list
    })
    app.globalData.personList = list
  },

  setDropItem(imgData) {
    let that = this;
    let data = {}
    if(that.data.currentTab_screen===0){
      wx.getImageInfo({
        src: imgData.url,
        success: res => {
          // 初始化数据
          data.width = res.width / 2.8; //宽度
          data.height = res.height / 2.8; //高度
          data.image = imgData.url; //地址
          data.id = ++itemId; //id
          data.top = (that.otherData.sysData.windowHeight - res.height / 2.8) / 2; //top定位
          data.left = (that.otherData.sysData.windowWidth - res.width / 2.8) / 2; //left定位
          //圆心坐标
          data.x = data.left + data.width / 2;
          data.y = data.top + data.height / 2;
          data.angle = 0; //初始化角度，否则手机端会出错
          data.scale = 1; //scale缩放
          data.oScale = 1; //方向缩放
          data.rotate = 1; //旋转角度
          data.active = false; //选中状态
          data.type = imgData.type; //person or decoration
          data.originalId = imgData.originalId; //物品在数据库中的id
          data.name = imgData.name
          items[items.length] = data;
          this.setData({
            itemList: items
          })
        }
      })
    }else{
      wx.getImageInfo({
        src: imgData.url,
        success: res => {
          // 初始化数据
          data.width = res.width / 2.8; //宽度
          data.height = res.height / 2.8; //高度
          data.image = imgData.url; //地址
          data.id = ++itemId; //id
          data.top = (that.otherData.sysData.windowHeight - res.height / 2.8) / 2-80; //top定位
          data.left = (that.otherData.sysData.windowWidth - res.width / 2.8) / 2+30; //left定位
          //圆心坐标
          data.x = data.left + data.width / 2;
          data.y = data.top + data.height / 2;
          data.angle = 90; //初始化角度，否则手机端会出错
          data.scale = 1; //scale缩放
          data.oScale = 1; //方向缩放
          data.rotate = 1; //旋转角度
          data.active = false; //选中状态
          data.type = imgData.type; //person or decoration
          data.originalId = imgData.originalId; //物品在数据库中的id
          data.name = imgData.name
          items[items.length] = data;
          this.setData({
            itemList: items
          })
        }
      })
    }
  },
  WraptouchStart: function (e) {
    for (let i = 0; i < items.length; i++) {
      items[i].active = false;
      if (e.currentTarget.dataset.id == items[i].id) {
        index = i;
        items[index].active = true;
      }
    }
    this.setData({
      itemList: items
    })

    items[index].lx = e.touches[0].clientX;
    items[index].ly = e.touches[0].clientY;

  },
  WraptouchMove(e) {
    if (flag) {
      flag = false;
      setTimeout(() => {
        flag = true;
      }, 100)
    }
    items[index]._lx = e.touches[0].clientX;
    items[index]._ly = e.touches[0].clientY;

    items[index].left += items[index]._lx - items[index].lx;
    items[index].top += items[index]._ly - items[index].ly;
    items[index].x += items[index]._lx - items[index].lx;
    items[index].y += items[index]._ly - items[index].ly;

    items[index].lx = e.touches[0].clientX;
    items[index].ly = e.touches[0].clientY;
    this.setData({
      itemList: items
    })
  },
  WraptouchEnd() {
    console.log("touchend")
    this.synthesis()
  },
  oTouchStart(e) {
    //找到点击的那个图片对象，并记录
    for (let i = 0; i < items.length; i++) {
      items[i].active = false;
      if (e.currentTarget.dataset.id == items[i].id) {
        index = i;
        items[index].active = true;
      }
    }
    //获取作为移动前角度的坐标
    items[index].tx = e.touches[0].clientX;
    items[index].ty = e.touches[0].clientY;
    //移动前的角度
    items[index].anglePre = this.countDeg(items[index].x, items[index].y, items[index].tx, items[index].ty)
    //获取图片半径
    items[index].r = this.getDistancs(items[index].x, items[index].y, items[index].left, items[index].top);
  },
  oTouchMove: function (e) {
    if (flag) {
      flag = false;
      setTimeout(() => {
        flag = true;
      }, 100)
    }
    //记录移动后的位置
    items[index]._tx = e.touches[0].clientX;
    items[index]._ty = e.touches[0].clientY;
    //移动的点到圆心的距离
    items[index].disPtoO = this.getDistancs(items[index].x, items[index].y, items[index]._tx, items[index]._ty - 10)

    items[index].scale = items[index].disPtoO / items[index].r;
    items[index].oScale = 1 / items[index].scale;

    //移动后位置的角度
    items[index].angleNext = this.countDeg(items[index].x, items[index].y, items[index]._tx, items[index]._ty)
    //角度差
    items[index].new_rotate = items[index].angleNext - items[index].anglePre;

    //叠加的角度差
    items[index].rotate += items[index].new_rotate;
    items[index].angle = items[index].rotate; //赋值

    //用过移动后的坐标赋值为移动前坐标
    items[index].tx = e.touches[0].clientX;
    items[index].ty = e.touches[0].clientY;
    items[index].anglePre = this.countDeg(items[index].x, items[index].y, items[index].tx, items[index].ty)

    //赋值setData渲染
    this.setData({
      itemList: items
    })

  },
  getDistancs(cx, cy, pointer_x, pointer_y) {
    var ox = pointer_x - cx;
    var oy = pointer_y - cy;
    return Math.sqrt(
      ox * ox + oy * oy
    );
  },
  /*
   *参数1和2为图片圆心坐标
   *参数3和4为手点击的坐标
   *返回值为手点击的坐标到圆心的角度
   */
  countDeg: function (cx, cy, pointer_x, pointer_y) {
    var ox = pointer_x - cx;
    var oy = pointer_y - cy;
    var to = Math.abs(ox / oy);
    var angle = Math.atan(to) / (2 * Math.PI) * 360;
    // console.log("ox.oy:", ox, oy)
    if (ox < 0 && oy < 0) //相对在左上角，第四象限，js中坐标系是从左上角开始的，这里的象限是正常坐标系  
    {
      angle = -angle;
    } else if (ox <= 0 && oy >= 0) //左下角,3象限  
    {
      angle = -(180 - angle)
    } else if (ox > 0 && oy < 0) //右上角，1象限  
    {
      angle = angle;
    } else if (ox > 0 && oy > 0) //右下角，2象限  
    {
      angle = 180 - angle;
    }
    return angle;
  },
  deleteItem: function (e) {
    let newList = [];
    for (let i = 0; i < items.length; i++) {
      if (e.currentTarget.dataset.id != items[i].id) {
        newList.push(items[i])
      }
    }
    if (newList.length > 0) {
      newList[newList.length - 1].active = true;
    }
    items = newList;
    this.setData({
      itemList: items
    })
    //去除选中态
    let list = this.otherData.personList;
    let getPosition = () => {
      for (let i = 0; i < list.length; i++) {
        if (list[i].ID == e.currentTarget.dataset.originalid) {
          return i
        }
      }
    }
    let position = getPosition()
    list[position].selected = false;
    this.setData({
      toolitemList: list
    })
  },
  //passiveAll点击其他区域则所有物体方框消失。
  passiveAll: function () {
    let newList = items.map(item => {
      item.active = false
      return item
    })
    this.setData({
      itemList: newList
    })
  },
  openMask() {
    this.setData({
      shrink: !this.data.shrink
    })
    this.synthesis()
  },
  getImg: function (src) {
    return new Promise((resolve, reject) => {
      wx.getImageInfo({
        src,
        success(res) {
          resolve(res.path)
        },
        fail(res) {
          console.log(res)
        }
      })
    })
  },
  async synthesis() { // 合成图片
    let personList = this.sortPerson(),
      nameList = personList.map(item => {
        return item.name //获取要打印的人名列表
      })
    console.log(nameList)
    wx.showLoading({
      title: '合成中...',
    })
    var local_img = JSON.parse(JSON.stringify(this.data.itemList));
    var bg_img = await this.getImg(this.data.bg_container_image)
    for (var itm in this.data.itemList) {
      local_img[itm].image = await this.getImg(this.data.itemList[itm].image)
    }
    maskCanvas.drawImage(bg_img, 0, 0, this.data.canvasWidth, this.data.canvasHeight)
    const num = 1,
      prop = 2;

    local_img.forEach((currentValue, index) => {
      maskCanvas.save();

      maskCanvas.translate(this.data.canvasWidth * (1 - num) / 2, 0);
      maskCanvas.beginPath();

      maskCanvas.translate(currentValue.x * prop, currentValue.y * prop); //圆心坐标

      maskCanvas.rotate(currentValue.angle * Math.PI / 180);

      maskCanvas.translate(-(currentValue.width * currentValue.scale * prop / 2), -(currentValue.height * currentValue.scale * prop / 2))

      maskCanvas.drawImage(currentValue.image, 0, 0, currentValue.width * currentValue.scale * prop, currentValue.height * currentValue.scale * prop);
      maskCanvas.restore();
    })
    var that = this
    maskCanvas.draw(setTimeout(function () {
      wx.canvasToTempFilePath({
        canvasId: 'maskCanvas',
        success: function (res) {
          that.uploadPhotos(res.tempFilePath) //upload photos tp cloud storage
        }
      })
    }, 100))
  },

  sortPerson: function () {
    let personList = this.data.itemList.map(item => {
      if (item.type === 'person') {
        return item;
      }
    })
    return setSortPoint(personList)
  },
  //getUptokenPhotos 获取上传凭证
  getUptokenPhotos: function () {
    app.netHandlers.getUptokenPhotos().then(res => {
      this.otherData.uptoken = res.Data
    })
  },
  uploadPhotos: function (filePath) {
    let that = this
    let fileName = getFileNameGroupPhotos(app.globalData.userInfo.id)
    upload(filePath, (res) => {
        app.netHandlers.addGroupPhoto(app.globalData.userInfo.id, app.globalData.userInfo.user_id, that.otherData.location, that.otherData.time, res.fileURL).then(res => {
          app.globalData.photoList = res.Data
          wx.setStorage({
            key: "PHOTOLIST",
            data: res.Data
          })
          setTimeout(function () {
            wx.hideLoading(),
              wx.showToast({
                title: '已保存到相册中',
                icon: "none"
              })
          }, 600)
        })
      }, (error) => {
        console.error('error: ' + JSON.stringify(error))
      }, {
        region: 'ECN',
        key: fileName,
        uptoken: this.otherData.uptoken,
        domain: 'https://zepeto.nt-geek.club',
        shouldUseQiniuFileName: false
      },
      (progress) => {

      }, cancelTask => {

      })
  }
})