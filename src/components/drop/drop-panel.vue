<template>
  <!--这里默认组织画布的右键点击事件 后期加在拖拽区块上-->
  <div class="drop-panel"
       @click.self.prevent="handleClickCanvas"
       @contextmenu.stop.prevent>
    drop-panel
  </div>
</template>

<script>
  export default {
    name: 'DropPanel',
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
      }
    }
  }
</script>
