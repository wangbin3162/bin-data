<template>
  <div class="dv-transform" :class="{'selected':selected}" :style="contentStyles" ref="dvTransform"
       @click.stop.prevent="handleSelected"
       @mousedown="handleMoveStart">
    <div class="navigator-line" v-show="selected">
      <div class="navigator-line-left" :style="lineLeft"></div>
      <div class="navigator-line-top" :style="lineTop"></div>
      <div class="navigator-line-account" :style="lineAccountStyle">
        {{ transformData.x + ',' + transformData.y }}
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
            <span class="control-point" :style="controlPointStyleBottom"
                  @mousedown.stop.prevent="handleResizeMoveStart"></span></i>
          <i class="left-handler">
            <span class="control-point" :style="controlPointStyleRight"
                  @mousedown.stop.prevent="handleResizeMoveStart"></span>
          </i>
          <i class="bottom-handler">
            <span class="control-point" :style="controlPointStyleBottom"
                  @mousedown.stop.prevent="handleResizeMoveStart"></span>
          </i>
          <i class="right-handler">
            <span class="control-point" :style="controlPointStyleRight"
                  @mousedown.stop.prevent="handleResizeMoveStart"></span>
          </i>
          <i class="top-left-handler">
            <span class="control-point" :style="controlPointStyleTopLeft"
                  @mousedown.stop.prevent="handleResizeMoveStart"></span>
          </i>
          <i class="top-right-handler">
            <span class="control-point" :style="controlPointStyleTopRight"
                  @mousedown.stop.prevent="handleResizeMoveStart"></span>
          </i>
          <i class="bottom-left-handler">
            <span class="control-point" :style="controlPointStyleBottomLeft"
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
  import { on, off } from 'bin-ui/src/utils/dom'
  import { mapGetters } from 'vuex'

  export default {
    name: 'DragItem',
    data () {
      return {
        transformData: { width: 800, height: 500, x: 560, y: 290 },
        selected: true,
        comHover: false,
        dragData: {
          dragX: 0, // 缓存鼠标单次滑动的x
          dragY: 0, // 缓存鼠标单次滑动的y
          startX: 0, // 记录开始位置x
          startY: 0, // 记录开始位置y
          startWidth: 0, // 记录开始缩放的宽度
          startHeight: 0, // 记录开始缩放的高度
          dragging: false
        },
        resizeType: 'none'
      }
    },
    computed: {
      ...mapGetters(['canvasRange', 'mouseMoveStep']),
      lineLeft () {
        return {
          width: this.transformData.x + 60 / this.canvasRange + 'px'
        }
      },
      lineTop () {
        return {
          height: this.transformData.y + 60 / this.canvasRange + 'px'
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
          width: this.transformData.width + 'px',
          height: this.transformData.height + 'px',
          top: this.transformData.top + 'px',
          left: this.transformData.left + 'px',
          transform: `translate3d(${this.transformData.x}px,${this.transformData.y}px,0)`
        }
      },
      dvWrapperStyles () {
        return {
          transform: 'translateZ(0)',
          width: this.transformData.width + 'px',
          height: this.transformData.height + 'px',
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
      controlPointStyleTopLeft () {
        return `cursor: nwse-resize; transform: scale(${1 / this.canvasRange});`
      },
      controlPointStyleTopRight () {
        return `cursor: nesw-resize; transform: scale(${1 / this.canvasRange});`
      },
      controlPointStyleBottomLeft () {
        return `cursor: nesw-resize; transform: scale(${1 / this.canvasRange});`
      },
      controlPointStyleBottomRight () {
        return `cursor: nwse-resize; transform: scale(${1 / this.canvasRange});`
      }
    },
    methods: {
      // transform点击事件
      handleSelected () {
        this.selected = true
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
        this.dragData.startX = this.transformData.x
        this.dragData.startY = this.transformData.y

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
          x: Math.floor((distance.x - this.dragData.dragX) / this.mouseMoveStep) * this.mouseMoveStep,
          y: Math.floor((distance.y - this.dragData.dragY) / this.mouseMoveStep) * this.mouseMoveStep
        }
        // 计算间距需要除以缩放比例否则移动像素对不齐
        this.transformData.x = this.dragData.startX + Math.floor(diffDistance.x / this.canvasRange)
        this.transformData.y = this.dragData.startY + Math.floor(diffDistance.y / this.canvasRange)
      },
      handleMoveEnd () {
        this.dragData.dragging = false
        off(window, 'mousemove', this.handleMoveMove)
        off(window, 'mouseup', this.handleMoveEnd)
      },
      // 鼠标拖动缩放事件函数
      handleResizeMoveStart (event) {
        this.resizeType = event.target.parentElement.className
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
        this.dragData.startX = this.transformData.x
        this.dragData.startY = this.transformData.y
        // 记录开始的width height
        this.dragData.startWidth = this.transformData.width
        this.dragData.startHeight = this.transformData.height
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
        // 鼠标走的像素数需要换算成缩放画布的实际移动数
        const diffDistance = {
          x: Math.floor((distance.x - this.dragData.dragX) / this.mouseMoveStep) * this.mouseMoveStep,
          y: Math.floor((distance.y - this.dragData.dragY) / this.mouseMoveStep) * this.mouseMoveStep
        }
        // 换算实际transform宽高
        const transform = {
          w: Math.floor(diffDistance.x / this.canvasRange),
          h: Math.floor(diffDistance.y / this.canvasRange)
        }
        this.resizeWidth(this.resizeType, transform.w, transform.h)
      },
      handleResizeMoveEnd () {
        this.dragData.dragging = false
        this.resizeType = 'none'
        off(window, 'mousemove', this.handleResizeMoveMove)
        off(window, 'mouseup', this.handleResizeMoveEnd)
      },
      // 根据缩放类型来调节宽高
      resizeWidth (type, w, h) {
        switch (type) {
          case 'top-handler': // 上面需要更新位置pos
            this.transformData.height = this.dragData.startHeight - h
            this.transformData.y = this.dragData.startY + h
            break
          case 'left-handler': // 左边也需要更新位置pos
            this.transformData.width = this.dragData.startWidth - w
            this.transformData.x = this.dragData.startX + w
            break
          case 'bottom-handler': // 下面
            this.transformData.height = this.dragData.startHeight + h
            break
          case 'right-handler': // 右边
            this.transformData.width = this.dragData.startWidth + w
            break
          case 'top-left-handler': // 左上角也需要更新位置pos
            this.transformData.width = this.dragData.startWidth - w
            this.transformData.x = this.dragData.startX + w
            this.transformData.height = this.dragData.startHeight - h
            this.transformData.y = this.dragData.startY + h
            break
          case 'top-right-handler': // 右上角也需要更新位置pos
            this.transformData.width = this.dragData.startWidth + w
            this.transformData.height = this.dragData.startHeight - h
            this.transformData.y = this.dragData.startY + h
            break
          case 'bottom-left-handler': // 左下角
            this.transformData.x = this.dragData.startX + w
            this.transformData.width = this.dragData.startWidth - w
            this.transformData.height = this.dragData.startHeight + h
            break
          case 'bottom-right-handler': // 右下角
            this.transformData.width = this.dragData.startWidth + w
            this.transformData.height = this.dragData.startHeight + h
            break
        }
      }
    }
  }
</script>
