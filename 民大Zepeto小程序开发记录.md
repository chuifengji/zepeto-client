# 民大Zepeto小程序开发记录

## 前端部分

### 登录

#### STEP_ONE:


头像信息直接用open-data组件展示就好了。(要用户性别，头像这些信息干嘛呢？卖钱吗？)

先检查localStorage中是否存在User_Id。

```
存在：检查localStorage中是否存在用户相关数据（缓存可能被清除）存在就不用管了。不存在的话就携带User_Id向服务器发起请求，服务器返回个人信息并保存到localStorage中。
```

```
不存在：调用使用 wx.login()，返回的res.code 加上appid和secret在后台获取用户唯一信息标识OpenID，并用来生成自定义标识User_Id,服务器判断是否存在该用户。并进入TYPE_TWO判断。
```

#### STEP_TWO:

```
不存在：将生成的User_Id保存返回到小程序客户端保存在globalData，localstorage中。
```

```
存在：返回用户个人信息（用户名，nickName,头像地址，其他信息如User_Id），并将信息返回到客户端存储。
```

### 网络请求

对网络请求进行了简单封装，位于util文件夹中。这样用起来会爽一点（正常一点）。


## 后台部分

### 登录

### 七牛云SDK—golang端的使用

