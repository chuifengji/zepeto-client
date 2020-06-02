/**
 * 对所有网络请求的封装。
 */

import request from './request.js'
class netHandlers {
  constructor() {
    this._baseUrl = 'http://123.56.241.180'
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
 * 
 * 获取朋友列表
 */
  getFriendsList(USER_ID) {
    let data = {USER_ID:USER_ID }
    return this._request.getRequest(this._baseUrl + 'api', data).then(res => res.data)
  }
  searchFriend(keyword){
    let data = {content:keyword}
    return this._request.getRequest(this._baseUrl + '/personal/get-search-list', data).then(res => res.data)
  }

}
export default netHandlers
