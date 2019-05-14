<template>
  <div class="board-control" :style="config.style">
    左侧控制栏
  </div>
</template>

<script>
  export default {
    name: 'BoardControl',
    props: {
      config: {
        type: Object,
        required: true
      }
    }
  }
</script>

<style scoped lang="stylus">
  .board-control {
    border-right: 1px solid #dddddd;
  }
</style>
