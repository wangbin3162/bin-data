<template>
  <div class="dv-transform" :class="{'selected':selected}" :style="contentStyles"
       @click="handleSelected"
       @keyup.delete="$print('删除键')"
       @mousedown="handleMoveStart">
    <div class="navigator-line" v-show="selected">
      <div class="navigator-line-left" :style="lineLeft"></div>
      <div class="navigator-line-top" :style="lineTop"></div>
      <div class="navigator-line-account" :style="lineAccountStyle">
        {{ dragData.x + ',' + dragData.y }}
      </div>
    </div>
    <div class="dv-scale">
      <div class="dv-com" :class="{'hovered':comHover}"
           @mouseenter="comHover=true" @mouseleave="comHover=false">
        <div class="transform-handler">
          <div class="dv-wrapper" style="font-size: 20px;">
            <slot>我是块的内容</slot>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  // 引入两个注册和取消注册的事件
  import { on, off, hasClass } from 'bin-ui/src/utils/dom'
  import { mapGetters } from 'vuex'

  export default {
    name: 'DragItem',
    data () {
      return {
        transformStyle: {
          width: '800px', height: '592px', top: 0, left: 0, transform: 'translate3d(0,0,0)'
        },
        selected: false,
        dragData: {
          x: 40,
          y: 40,
          dragX: 0,
          dragY: 0,
          dragging: false
        },
        comHover: false
      }
    },
    computed: {
      ...mapGetters([
        'canvasRange'
      ]),
      lineLeft () {
        return {
          width: this.dragData.x + 60 / this.canvasRange + 'px'
        }
      },
      lineTop () {
        return {
          height: this.dragData.y + 60 / this.canvasRange + 'px'
        }
      },
      lineAccountStyle () {
        let fontSize = 16 / this.canvasRange

        return {
          fontSize: fontSize > 24 ? '24px' : fontSize + 'px',
          left: -10 + 'px',
          top: -10 + 'px'
        }
      },
      contentStyles () {
        return Object.assign({}, this.transformStyle, {
          transform: `translate3d(${this.dragData.x}px,${this.dragData.y}px,0)`
        })
      }
    },
    mounted () {
      on(document.body, 'click', this.handleWindowClick)
    },
    methods: {
      // transform点击事件
      handleSelected () {
        this.selected = true
      },
      // 其他区域点击事件
      handleWindowClick (event) {
        // 暂时监听body的点击事件用于取消选中后期追加到nodeinfo中用于联动控制
        this.selected = hasClass(event.target, 'transform-handler')
      },
      // 鼠标拖动事件函数
      handleMoveStart (event) {
        if (!this.selected) return
        // 计算鼠标的相对位置
        const distance = {
          x: event.clientX,
          y: event.clientY
        }
        // 缓存鼠标点击位置，会事实更新
        this.dragData.dragX = distance.x
        this.dragData.dragY = distance.y
        this.dragData.dragging = true
        on(window, 'mousemove', this.handleMoveMove)
        on(window, 'mouseup', this.handleMoveEnd)
      },
      handleMoveMove (event) {
        if (!this.dragData.dragging) return false
        const distance = {
          x: event.clientX,
          y: event.clientY
        }
        const diffDistance = {
          x: distance.x - this.dragData.dragX,
          y: distance.y - this.dragData.dragY
        }
        // 计算间距需要除以缩放比例否则移动像素对不齐
        this.dragData.x += diffDistance.x / this.canvasRange | 0
        this.dragData.y += diffDistance.y / this.canvasRange | 0

        this.dragData.dragX = distance.x
        this.dragData.dragY = distance.y
      },
      handleMoveEnd () {
        this.dragData.dragging = false
        off(window, 'mousemove', this.handleMoveMove)
        off(window, 'mouseup', this.handleMoveEnd)
      }
    },
    beforeDestroy () {
      off(document.body, 'click', this.handleWindowClick)
    }
  }
</script>
