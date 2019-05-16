<template>
  <!--这里默认组织画布的右键点击事件 后期加在拖拽区块上-->
  <div class="drop-panel"
       @click.self.prevent="handleClickCanvas"
       @contextmenu.stop.prevent
       @drop.stop.prevent="handleDropOnCanvas($event)"
       @dragover.stop.prevent>
    <!--区块样式编辑回头注释掉-->
    <drag-item></drag-item>
    <!--动态组件-->
    <template v-for="block in canvasMap">
      <drag-item :key="block.id">
        dv-transform
      </drag-item>
    </template>
  </div>
</template>

<script>
  import DragItem from '../drag/drag-item/DragItem'

  export default {
    name: 'DropPanel',
    components: { DragItem },
    data () {
      return {
        canvasMap: []
      }
    },
    methods: {
      // 画布单机事件
      handleClickCanvas () {
        this.$EventBus.$emit('on-toggle-context-menu', { x: 0, y: 0, isShow: false })
      },
      // 画布右键点击
      handleRightClickOnCanvas (event) {
        // 广播事件
        let contextMenuInfo = {
          x: event.pageX + 20,
          y: event.pageY + 20,
          isShow: true
        }
        this.$EventBus.$emit('on-toggle-context-menu', contextMenuInfo)
      },
      // 元素drop
      handleDropOnCanvas: function (event) {
        // 获取节点数据
        let nodeInfo = JSON.parse(event.dataTransfer.getData('node'))
        nodeInfo = {
          id: '',
          components: {},
          props: {},
          slots: {},
          innerHTML: '',
          ...nodeInfo
        }
        console.log(nodeInfo)
        // 获取drop事件
        let offsetX = event.offsetX
        let offsetY = event.offsetY
        let style = {
          position: 'absolute',
          left: offsetX + 'px',
          top: offsetY + 'px'
        }
        console.log('style', style)
        this.canvasMap.push(nodeInfo)
      }
    }
  }
</script>
