<template>
  <transition name="zoom-in-top">
    <div class="dv-context-menu"
         v-if="contextMenuInfo.isShow"
         @mousedown.stop.prevent
         :style="contextMenuStyle"
         @click.stop.prevent>
      <div class="context-menu-item"
           v-for="item in menuList" :key="item.order"
           @click="handleCommand(item.order)">
        <b-icon :name="item.icon"></b-icon>
        {{ item.text }}
      </div>
    </div>
  </transition>
</template>

<script>
  export default {
    name: 'ContextMenu',
    data () {
      return {
        contextMenuInfo: {
          x: 0,
          y: 0,
          isShow: false
        },
        menuList: [
          { icon: 'ios-share', text: '置顶', order: 'top' },
          { icon: 'ios-download', text: '置底', order: 'bottom' },
          { icon: 'md-arrow-round-up', text: '上移一层', order: 'up' },
          { icon: 'md-arrow-round-down', text: '下移一层', order: 'down' },
          { icon: 'ios-copy', text: '复制', order: 'copy' },
          { icon: 'ios-remove-circle', text: '删除', order: 'remove' }
        ]
      }
    },
    computed: {
      contextMenuStyle () {
        let x = this.contextMenuInfo.x !== undefined ? (parseInt(this.contextMenuInfo.x) > 0 ? parseInt(this.contextMenuInfo.x) : 0) : 0
        let y = this.contextMenuInfo.y !== undefined ? (parseInt(this.contextMenuInfo.y) > 0 ? parseInt(this.contextMenuInfo.y) : 0) : 0
        let tmpObj = {}
        // 判断是否超出边界
        if (document.documentElement && document.documentElement.clientHeight && document.documentElement.clientWidth) {
          let winHeight = document.documentElement.clientHeight
          let winWidth = document.documentElement.clientWidth
          if (x + 200 > winWidth) {
            tmpObj['right'] = '10px'
          } else {
            tmpObj['left'] = x + 'px'
          }
          if (y + 100 > winHeight) {
            tmpObj['bottom'] = '42px'
          } else {
            tmpObj['top'] = y + 'px'
          }
        }
        return tmpObj
      }
    },
    created () {
      this.$EventBus.$on('on-toggle-context-menu', (val) => {
        if (val) {
          this.contextMenuInfo = val
        }
      })
    },
    methods: {
      //  执行菜单命令
      handleCommand (order) {
        this.contextMenuInfo = {
          x: 0,
          y: 0,
          isShow: false
        }
        this.$message(`执行${order}命令`)
      }
    },
    beforeDestroy () {
      this.$EventBus.$off('on-toggle-context-menu')
    }
  }
</script>
