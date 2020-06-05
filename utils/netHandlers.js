/**
 * 对所有网络请求的封装。
 */

import request from './request.js'
class netHandlers {
  constructor() {
    this._baseUrl = 'https://mindazepeto.nt-geek.club'
    this._defaultHeaderGet = { 'data-type': 'application/json' }
    this._defaultHeaderOthers = { 'data-type': 'application/x-www-form-urlencoded' }
    this._request = new request(this._defaultHeaderGet,this._defaultHeaderOthers)
    this._request.setErrorHandler(this.errorHander)
  }

  /**
   * 统一的异常处理方法
   */
  errorHander(res) {
    console.error(res)
  }
/**
 * 
 * 登录
 */
login(code) {
 let data = {code:code}
 return this._request.getRequest(this._baseUrl + '/personal/login', data).then(res => res.data)
}
//后台之后会限制修改次数
updateSelfInfo(user_id,name,college,major,classNum,canSearchMe){
  let data = {
    user_id,
    name,
    college,
    major,
    class:classNum,
    canSearchMe:canSearchMe
  }
  console.log(data)
  return this._request.getRequest(this._baseUrl + '/personal/insert-personal-info', data).then(res => res.data)
}
updateSelfImg(){

}
//获取装饰列表:暂时未作分类处理
getDecorationList(){
  return this._request.getRequest(this._baseUrl + '/decoration/get-list').then(res => res.data)
}
/**
 * 获取外表列表
 */
getAppearanceList(){
  return this._request.getRequest(this._baseUrl+'/appearance/get-list').then(res=>res.data)
}
/**
 * 获取背景列表
 */
getBackgroundList(){
  return this._request.getRequest(this._baseUrl+'/background/get-list').then(res=>res.data)
}
/**
 * 
 * 获取朋友列表
 */
  getFriendsList(USER_ID) {
    let data = {USER_ID:USER_ID }
    return this._request.getRequest(this._baseUrl + 'api', data).then(res => res.data)
  }
  /*
 * 搜索好友
 */
  searchFriend(keyword){
    let data = {content:keyword}
    return this._request.getRequest(this._baseUrl + '/personal/get-search-list', data).then(res => res.data)
  }
  /*
 * 结交好友
 */
makeFriend(myid,friendid){
  let data = {
    myid,
    friendid
  }
  return this._request.getRequest(this._baseUrl + '/personal/makeFriends', data).then(res => res.data)
}
  /*
 * 上传个人图片
 */
updatePersonalImage(user_id,url){
  let data = {
    user_id,
    url
  }
  return this._request.getRequest(this._baseUrl + '/personal/update-personal-image', data).then(res => res.data)
}
  /*
 * 上传合照
 */
addGroupPhoto(iduser,userid,location,url,thumbnail){
  let data = {
    iduser,
    userid,
    location,
    url,
    thumbnail
  }
  return this._request.getRequest(this._baseUrl + '/personal/addGroupPhoto', data).then(res => res.data)
}
   /*
 * 删除合照
 */
deleteGroupPhoto(){
  let data = {
    iduser,
    userid,
    idimg
  }
  return this._request.getRequest(this._baseUrl + '/personal/deleteGroupPhoto', data).then(res => res.data)
  
}

    /*
 * 获取合照列表
 */
getGroupPhotos(){
  let data = {
    iduser,
    userid,
  }
  return this._request.getRequest(this._baseUrl + '/personal/getMyPhotos', data).then(res => res.data)
}
}
export default netHandlers
