Page({
  data:{
  },
  onReady() {
  },
  takePhoto() {
    const ctx = wx.createCameraContext()
    ctx.takePhoto({
      quality: 'high',
      success: (res) => {
        this.save(res.tempImagePath)
      }
    })
  },
save(path){
     var that=this
  const ctx = wx.createCanvasContext('myCanvas')
//   ctx.scale(0.80, 1) // 设置缩放
//   // ctx.beginPath()
//   // ctx.arc(155, 170, 35, 0, 2 * Math.PI) // 绘制圆形
//   ctx.rect(50,50,400,400)
//   ctx.stroke()
//   ctx.scale(1,1) // 缩放回正常倍率s
//   // ctx.closePath()
var x=155,y=170,a=35,b=45
let dt = 1 / Math.max(a, b) // 绘制时的角度增量 Δt
ctx.beginPath()
ctx.moveTo(x + a, y) // 移动到起始点
for (let t = 0; t < Math.PI * 2; t += dt) {
    ctx.lineTo(x + a * Math.cos(t), y + b * Math.sin(t))
    ctx.stroke()
}
  ctx.clip()
  ctx.drawImage(path)
  ctx.draw(setTimeout(function () {
    wx.canvasToTempFilePath({
      canvasId: 'myCanvas',
      success: function (res) {
        // wx.saveImageToPhotosAlbum({
        //   filePath: res.tempFilePath,          //save face picture
        // })
      }
    })
  },100))
 }
})
