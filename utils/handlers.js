let getFileNameSelfImg = function (userid) {
  return "self-img-" + userid + ".png"
}
let getFileNameSelfFace = function(userid){
  return "self-img-face" + userid + ".png"
}
let getFileNameGroupPhotos = function (userid) {
  let now = new Date(),
  month = now.getMonth(),
  date = now.getDate(),
  second = now.getSeconds();
  return "groupphoto_" + userid + "_" + Math.floor(Math.random() * 10) + month.toString() + date.toString() + second.toString() + Math.floor(Math.random() * 10) + ".png";
}
let getDate = function () {
  let now = new Date(),
  year = now.getFullYear(),
  month = now.getMonth() + 1,
  date = now.getDate();
  return year + "/" + month + "/" + date;
}
let setSortPoint = function (array) {
  var len = array.length;
  for (var i = 0; i < len - 1; i++) {
      for (var j = 0; j < len - 1 - i; j++) {
          if (setSortRule(array[j], array[j + 1])) {
              var tmp = array[j];
              array[j] = array[j + 1];
              array[j + 1] = tmp;
          }
      }
  }
  return array;
}

//两个坐标比较大小
let setSortRule = function (p1, p2) {
  if (p1.top > p2.top) {
      return true;
  }
  else if (p1.top == p2.top) {
      return (p1.left > p2.left);
  }
  else {
      return false;
  }
}
//函数节流
let throttle = function (fn, gapTime) {
  if (gapTime == null || gapTime == undefined) {
    gapTime = 1500
  }
  let _lastTime = null
  // 返回新的函数
  return function () {
    let _nowTime = + new Date()
    if (_nowTime - _lastTime > gapTime || !_lastTime) {
      fn.apply(this, arguments)   //将this和参数传给原函数
      _lastTime = _nowTime
    }
  }
}

module.exports = {
  getFileNameSelfImg,
  getFileNameSelfFace,
  getFileNameGroupPhotos,
  getDate,
  setSortPoint,
  setSortRule,
  throttle
}










