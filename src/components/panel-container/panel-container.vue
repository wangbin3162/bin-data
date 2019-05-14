<template>
  <div class="panel-container">
    <slot></slot>
  </div>
</template>

<script>
  export default {
    name: 'PanelContainer'
  }
</script>

<style scoped lang="stylus">
  .panel-container {
    width: 100%;
    height: calc(100vh - 60px);
    overflow: hidden;
  }
</style>
