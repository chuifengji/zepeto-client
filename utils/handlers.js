let getFileNameSelfImg = function(userid){ 
return "self-img-"+userid+".png"
}
let getFileNameGroupPhotos = function(userid){
  let now = new Date();
  let month = now.getMonth()
  let date = now.getDate();
  let second = now.getSeconds();
  return "groupphoto_"+userid+"_"+month.toString()+date.toString()+second.toString()+Math.floor(Math.random()*10);
}

module.exports = {
  getFileNameSelfImg,
  getFileNameGroupPhotos
}