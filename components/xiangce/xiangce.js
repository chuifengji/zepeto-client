// components/xiangce/xiangce.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    src: {
      type: String,
      value: ""
    },
    local: {
      type: String,
      value: ""
    },
    year: {
      type: Number,
      value: null
    },
    month: {
      type: Number,
      value: null
    },
    day: {
      type: Number,
      value: null
    },
    delbtn: {
      type: Boolean,
      value: false
    },
    id: {
      type: Number,
      value: null
    }
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
    del() {
      this.triggerEvent("delete", this.properties.id)
    }
  }
})