<template>
  <div class="dv-admin">
    <board>
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
            <drag-item :key="transform.id">
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
        navigate: navigateList
      }
    },
    computed: {
      ...mapGetters(['canvasMap'])
    },
    components: { DragItem, DragList, Board }
  }
</script>
