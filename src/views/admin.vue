<template>
  <div class="dv-admin"
       @click.stop.prevent="hideContextMenu">
    <board>
      <!--头部嵌套可拖拽物品-->
      <template v-slot:headerBox>
        <drag-list :drag-list="navigate"></drag-list>
      </template>
      <template v-slot:coverage>
        <div class="list-item" :key="transform.id" v-for="transform in canvasMap"
             :class="[{'hovered':hoverItem===transform.id},{'selected':currentSelected&&currentSelected.id===transform.id},]"
             :selected="currentSelected&&currentSelected.id===transform.id"
             @click.stop.prevent="handleSelected(transform)"
             @mouseenter="handleHover(transform)"
             @mouseleave="handleNoHover()">
          <b-icon v-if="transform.icon" :name="transform.icon"></b-icon>
          <span> {{ transform.innerHTML }}</span>
        </div>
      </template>
      <template v-slot:canvas>
        <!--动态组件-->
        <template v-for="transform in canvasMap">
          <drag-item :key="transform.id" :item="transform"
                     :com-hover="hoverItem===transform.id"
                     :selected="currentSelected&&currentSelected.id===transform.id"
                     @click.native.stop.prevent="handleSelected(transform)"
                     @contextmenu.native.stop.prevent="handleRightClickOnCanvas(transform,$event)"
                     @mouseenter.native="handleHover(transform)"
                     @mouseleave.native="handleNoHover()">
            {{transform.innerHTML}}
          </drag-item>
        </template>
      </template>
    </board>
  </div>
</template>

<script>
  import Board from '../components/board/index'
  import navigateList from '../config/navigate'
  import DragList from '../components/drag/DragList'
  import DragItem from '../components/drag/DragItem'
  import { mapGetters } from 'vuex'
  import eventMap from '../utils/eventBusMap'

  export default {
    name: 'Admin',
    data () {
      return {
        navigate: navigateList,
        hoverItem: null
      }
    },
    computed: {
      ...mapGetters(['canvasMap', 'currentSelected'])
    },
    methods: {
      // 悬停事件
      handleHover (item) {
        this.hoverItem = item.id
      },
      handleNoHover () {
        this.hoverItem = null
      },
      // transform点击事件
      handleSelected (item) {
        this.$store.dispatch('SingleSelected', item)
      },
      // transform点击事件右键点击
      handleRightClickOnCanvas (item, event) {
        let info = { x: event.pageX + 10, y: event.pageY + 10 }
        this.$store.dispatch('ToggleContextMenu', info)
        this.$store.dispatch('SingleSelected', item)
      },
      // 外层区域关闭右键菜单
      hideContextMenu () {
        this.$store.dispatch('ToggleContextMenu')
      }
    },
    components: { DragItem, DragList, Board }
  }
</script>
