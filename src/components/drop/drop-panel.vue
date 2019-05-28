<template>
  <!--这里默认组织画布的右键点击事件 后期加在拖拽区块上-->
  <div class="drop-panel"
       @drop.stop.prevent="handleDropOnCanvas($event)"
       @dragover.stop.prevent>
    <slot>
    </slot>
  </div>
</template>

<script>
  import { addCanvasMap } from '../../api/canvasMaps/canvas-maps-request'

  export default {
    name: 'DropPanel',
    methods: {
      // 元素drop
      handleDropOnCanvas: function (event) {
        // 获取节点数据
        let nodeInfo = JSON.parse(event.dataTransfer.getData('node'))
        nodeInfo = {
          id: '',
          innerHTML: '',
          ...nodeInfo
        }
        console.log(nodeInfo)
        // 获取drop事件
        // let offsetX = event.offsetX
        // let offsetY = event.offsetY
        // let style = {
        //   position: 'absolute',
        //   left: offsetX + 'px',
        //   top: offsetY + 'px'
        // }
        this.$store.dispatch('AddCanvasMap', nodeInfo)
      }
    }
  }
</script>
