<template>
  <div class="dv-admin">
    <board>
      <!--头部嵌套可拖拽物品-->
      <template v-slot:headerBox>
        <drag-list :drag-list="navigate"></drag-list>
      </template>
      <template v-slot:coverage>
        <template v-for="transform in canvasMap">
          <div class="list-item" :key="transform.id">
            <b-icon v-if="transform.icon" :name="transform.icon"></b-icon>
            <span> {{ transform.innerHTML }}</span>
          </div>
        </template>
      </template>
      <template v-slot:canvas>
        <!--动态组件-->
        <template v-for="transform in canvasMap">
          <drag-item :key="transform.id" :item="transform"
                     :com-hover="comHover"
                     @mouseenter.native="handleHover" @mouseleave.native="handleNoHover">
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

  export default {
    name: 'Admin',
    data () {
      return {
        navigate: navigateList,
        comHover: null
      }
    },
    computed: {
      ...mapGetters(['canvasMap'])
    },
    methods: {
      // 悬停事件
      handleHover () {
        this.comHover = true
        console.log('hovered')
      },
      handleNoHover () {
        this.comHover = false
        console.log('no-hovered')
      }
    },
    components: { DragItem, DragList, Board }
  }
</script>
