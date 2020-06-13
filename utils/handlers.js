let getFileNameSelfImg = function (userid) {
  return "self-img-" + userid + ".png"
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
module.exports = {
  getFileNameSelfImg,
  getFileNameGroupPhotos,
  getDate
}










