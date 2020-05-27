// components/NameAndAvatar/NameAndAvatar.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    userName: {
      type: String,
      value: ''
    },
  },

  /**
   * 组件的初始数据
   */
  data: {

  },

  /**
   * 组件的方法列表
   */
  methods: {
    gotofriend_page: function () {
      this.triggerEvent('gotofriend_page');
    },
    gotoselfinfo_page: function () {
      this.triggerEvent('gotoselfinfo_page');
    },
  }
})
