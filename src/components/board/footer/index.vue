<template>
  <div class="board-footer">
    底部控制栏
  </div>
</template>

<script>
  export default {
    name: 'BoardFooter',
    props: {
      config: {
        type: Object,
        required: true
      }
    }
  }
</script>

<style scoped lang="stylus">
  .board-footer {
    position: absolute;
    bottom: 0;
    right: 0;
    left: 0;
    height: 30px;
    line-height: 30px;
    padding: 0 20px;
    border-top: 1px solid #dddddd;
    z-index: 2500;
    background: #ffffff;
    box-shadow: 0 -2px 2px 0 rgba(0, 0, 0, 0.1);
    transition: all .3s;
    text-align: right;
    box-sizing: border-box;
  }
</style>
