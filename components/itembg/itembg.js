// components/itembg/itembg.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    name: {
      type: String,
      value: ''
    },
    src: {
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
      this.triggerEvent('selected_bg_item');
    },
  }
})
