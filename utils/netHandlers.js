/**
 * 对所有网络请求的封装。
 */

import request from './request.js'
class netHandlers {
  constructor() {
    this._baseUrl = 'https://api/'
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
 return this._request.getRequest(this._baseUrl + 'api', data).then(res => res.data)
}
/**
 * 
 * 获取朋友列表
 */
  getFriendsList(USER_ID) {
    let data = {USER_ID:USER_ID }
    return this._request.getRequest(this._baseUrl + 'api', data).then(res => res.data)
  }

}
export default netHandlers
