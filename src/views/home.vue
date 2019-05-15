<template>
  <!--画板组件-->
  <board>
    <template v-slot:control>
      <drag-list :drag-list="navigate"></drag-list>
    </template>
  </board>
</template>

<script>
  import Board from '../components/board/index'
  import navigateList from '../config/navigate'
  import DragList from '../components/drag/drag-list/index'

  export default {
    name: 'home',
    data () {
      return {
        navigate: navigateList
      }
    },
    components: {
      DragList,
      Board
    }
  }
</script>
