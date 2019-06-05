<template>
  <transition name="fade-in">
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
  import { mapGetters } from 'vuex'

  export default {
    name: 'ContextMenu',
    data () {
      return {
        menuList: [
          { icon: 'ios-share', text: '置顶', order: 'top' },
          { icon: 'ios-download', text: '置底', order: 'bottom' },
          { icon: 'md-arrow-round-up', text: '上移一层', order: 'up' },
          { icon: 'md-arrow-round-down', text: '下移一层', order: 'down' },
          { icon: 'ios-copy', text: '复制', order: 'copy' },
          { icon: 'ios-trash', text: '删除', order: 'remove' }
        ]
      }
    },
    computed: {
      ...mapGetters(['contextMenuInfo']),
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
    methods: {
      //  执行菜单命令
      handleCommand (order) {
        if (order === 'remove') { // 如果是删除操作则弹出一个对话框来确认
          this.$store.dispatch('HideContextMenu')
          this.$EventBus.$emit('context/menu/delete')
        } else {
          this.$store.dispatch('ContextMenuCommand', order)
        }
      }
    }
  }
</script>
