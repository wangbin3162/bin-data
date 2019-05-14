<template>
  <div class="board-panel">
    <div class="block-body">
      <!--<b-canvas></b-canvas>-->
    </div>
    <!--标尺线-->
    <slot name="scale" v-if="config.scale.enable">
      <b-scale></b-scale>
    </slot>
  </div>
</template>

<script>
  // import BCanvas from './components/canvas'
  import BScale from './components/scale'

  export default {
    name: 'BoardPanel',
    props: {
      config: {
        type: Object,
        required: true
      }
    },
    components: {
      BScale
    }
  }
</script>

<style scoped lang="stylus">
  .board-panel {
    position: relative;
    width: 100%;
    height: 100%;
    overflow: hidden;
    background-image: linear-gradient(45deg, #f5f5f5 25%, transparent 0, transparent 75%, #f5f5f5 0),
      linear-gradient(45deg, #f5f5f5 25%, transparent 0, transparent 75%, #f5f5f5 0);
    background-position: 0 0, 10px 10px;
    background-size: 20px 20px;
    .block-body {
      position: absolute;
      top: 0;
      right: 0;
      left: 0;
      bottom: 0;
      z-index: 1000;
    }
  }
</style>
