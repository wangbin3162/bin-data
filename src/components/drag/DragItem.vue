<template>
  <div class="dv-transform" :class="{'selected':selected}" :style="contentStyles" ref="dvTransform"
       @click.stop.prevent="handleSelected"
       @mousedown="handleMoveStart">
    <div class="navigator-line" v-show="selected">
      <div class="navigator-line-left" :style="lineLeft"></div>
      <div class="navigator-line-top" :style="lineTop"></div>
      <div class="navigator-line-account" :style="lineAccountStyle">
        {{ dragData.x + ',' + dragData.y }}
      </div>
    </div>
    <div class="dv-scale">
      <div class="dv-com" :class="{'hovered':comHover}" style="transform: rotate(0deg);"
           @mouseenter="comHover=true" @mouseleave="comHover=false">
        <div class="transform-handler" :class="{'hide':!comHover&&!selected}">
          <div class="dv-wrapper" :style="dvWrapperStyles">
            <div style="font-size: 22px;padding: 0 20px;">
              <slot>我是块的标题</slot>
            </div>
          </div>
          <!--缩放辅助条-->
          <i class="top-handler">
            <span class="control-point" :style="controlPointStyleBottom"></span>
          </i>
          <i class="bottom-handler">
            <span class="control-point" :style="controlPointStyleBottom"
                  @mousedown.stop.prevent="handleResizeMoveStart"></span>
          </i>
          <i class="left-handler">
            <span class="control-point" :style="controlPointStyleRight"></span>
          </i>
          <i class="right-handler">
            <span class="control-point" :style="controlPointStyleRight"
                  @mousedown.stop.prevent="handleResizeMoveStart"></span>
          </i>
          <i class="bottom-right-handler">
            <span class="control-point" :style="controlPointStyleBottomRight"
                  @mousedown.stop.prevent="handleResizeMoveStart"></span>
          </i>
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
        transformStyle: { width: 800, height: 592, top: 0, left: 0 },
        selected: true,
        comHover: false,
        dragData: {
          x: 500,
          y: 200,
          dragX: 0,
          dragY: 0,
          startX: 0,
          startY: 0,
          dragging: false
        },
        cursorMapPos: {
          'nwse-resize': 'bottomRight',
          'ew-resize': 'right',
          'ns-resize': 'bottom'
        },
        resizeType: 'normal'
      }
    },
    computed: {
      ...mapGetters(['canvasRange']),
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
        return {
          width: this.transformStyle.width + 'px',
          height: this.transformStyle.height + 'px',
          top: this.transformStyle.top + 'px',
          left: this.transformStyle.left + 'px',
          transform: `translate3d(${this.dragData.x}px,${this.dragData.y}px,0)`
        }
      },
      dvWrapperStyles () {
        return {
          transform: 'translateZ(0)',
          width: this.transformStyle.width + 'px',
          height: this.transformStyle.height + 'px',
          opacity: 1,
          padding: '10px 0'
        }
      },
      controlPointStyleBottom () {
        return `cursor: ns-resize; transform: scale(${1 / this.canvasRange});`
      },
      controlPointStyleRight () {
        return `cursor: ew-resize; transform: scale(${1 / this.canvasRange});`
      },
      controlPointStyleBottomRight () {
        return `cursor: nwse-resize; transform: scale(${1 / this.canvasRange});`
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
        // 记录开始的xy
        this.dragData.startX = this.dragData.x
        this.dragData.startY = this.dragData.y

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
        // 鼠标走的像素数需要换算成缩放画布的实际移动数
        const diffDistance = {
          x: (distance.x - this.dragData.dragX),
          y: (distance.y - this.dragData.dragY)
        }
        // console.log(diffDistance)
        // 计算间距需要除以缩放比例否则移动像素对不齐
        this.dragData.x = this.dragData.startX + Math.floor(diffDistance.x / this.canvasRange)
        this.dragData.y = this.dragData.startY + Math.floor(diffDistance.y / this.canvasRange)
      },
      handleMoveEnd () {
        this.dragData.dragging = false
        off(window, 'mousemove', this.handleMoveMove)
        off(window, 'mouseup', this.handleMoveEnd)
      },
      // 鼠标拖动缩放事件函数
      handleResizeMoveStart (event) {
        this.resizeType = this.cursorMapPos[event.target.style.cursor]
        console.log(this.resizeType)
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
        on(window, 'mousemove', this.handleResizeMoveMove)
        on(window, 'mouseup', this.handleResizeMoveEnd)
      },
      handleResizeMoveMove (event) {
        if (!this.dragData.dragging) return false
        const distance = {
          x: event.clientX,
          y: event.clientY
        }
        const diffDistance = {
          x: distance.x - this.dragData.dragX,
          y: distance.y - this.dragData.dragY
        }
        this.dragData.dragX = distance.x
        this.dragData.dragY = distance.y
        // 计算间距需要除以缩放比例否则移动像素对不齐
        // 缩放不需要移动位置只是改变原本的宽高
        // this.dragData.x += diffDistance.x / this.canvasRange | 0
        // this.dragData.y += diffDistance.y / this.canvasRange | 0
        // this.transformStyle.width += (diffDistance.x / this.canvasRange)
        // this.transformStyle.height += (diffDistance.y / this.canvasRange)
        this.resizeWidth(this.resizeType, (diffDistance.x / this.canvasRange), (diffDistance.y / this.canvasRange))
      },
      handleResizeMoveEnd () {
        this.dragData.dragging = false
        this.resizeType = 'normal'
        const box = {
          w: this.transformStyle.width | 0,
          h: this.transformStyle.height | 0
        }
        this.transformStyle.width = box.w
        this.transformStyle.height = box.h

        off(window, 'mousemove', this.handleResizeMoveMove)
        off(window, 'mouseup', this.handleResizeMoveEnd)
      },
      // 根据缩放类型来调节宽高
      resizeWidth (type, w, h) {
        switch (type) {
          case 'right':
            this.transformStyle.width += w
            break
          case 'bottom':
            this.transformStyle.height += h
            break
          default:
            this.transformStyle.width += w
            this.transformStyle.height += h
            break
        }
      }
    },
    beforeDestroy () {
      off(document.body, 'click', this.handleWindowClick)
    }
  }
</script>
