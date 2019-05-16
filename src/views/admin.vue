<template>
  <div class="dv-admin">
    <board>
      <template v-slot:control>
        <drag-list :drag-list="navigate"></drag-list>
      </template>
    </board>
  </div>
</template>

<script>
  import Board from '../components/board/index'
  import navigateList from '../config/navigate'
  import DragList from '../components/drag/drag-list/index'

  export default {
    name: 'Admin',
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
