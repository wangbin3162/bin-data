<template>
  <div class="dv-transform" :style="contentStyles"
       @mousedown="handleMoveStart">
    <!--<div class="navigator-line">-->
    <!--<div class="navigator-line-left" style="width: 125.714px;"></div>-->
    <!--<div class="navigator-line-top" style="height: 125.714px;"></div>-->
    <!--<div class="navigator-line-account" style="font-size: 17.1429px; left: -8.57143px; top: -8.57143px;">40, 40-->
    <!--</div>-->
    <!--</div>-->
    <div class="dv-scale">
      <div class="dv-com" :class="{'hovered':comHover}"
           @mouseenter="comHover=true" @mouseleave="comHover=false">
        <div class="transform-handler">
          <div class="dv-wrapper" style="font-size: 20px;">
            <slot>我是一个块</slot>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  // 引入两个注册和取消注册的事件
  import { on, off } from 'bin-ui/src/utils/dom'

  export default {
    name: 'DragItem',
    data () {
      return {
        transformStyle: {
          width: '800px', height: '592px', top: 0, left: 0, transform: 'translate3d(40px,40px,0)'
        },
        moveStep: 5, // 拖拽间距
        dragData: {
          x: 0,
          y: 0,
          dragX: 0,
          dragY: 0,
          dragging: false
        },
        comHover: false
      }
    },
    computed: {
      contentStyles () {
        return Object.assign({}, this.transformStyle, {
          transform: `translate3d(${this.dragData.x}px,${this.dragData.y}px,0)`
        })
      }
    },
    methods: {
      handleMoveStart (event) {
        // 计算鼠标的相对位置
        const distance = {
          x: event.clientX,
          y: event.clientY
        }
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
        console.log(diffDistance)

        this.dragData.x += diffDistance.x
        this.dragData.y += diffDistance.y

        this.dragData.dragX = distance.x
        this.dragData.dragY = distance.y
      },
      handleMoveEnd () {
        this.dragData.dragging = false
        off(window, 'mousemove', this.handleMoveMove)
        off(window, 'mouseup', this.handleMoveEnd)
      }
    }
  }
</script>
