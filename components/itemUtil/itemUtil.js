// components/itemUtil/itemUtil.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    id: {
      type: String,
      value: ''
    },
    type: {
      type: String,
      value: ''
    },
    url: {
      type: String,
      value: ''
    },
    thumbnail: {
      type: String,
      value: ''
    },
    selected: {
      type: Boolean,
      value: false
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
    activeitem:function(){
      this.triggerEvent('selected_util_item');
    },
  }
})
