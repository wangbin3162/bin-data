<template>
  <div class="bin-scale">
    <div class="scale_x">
    </div>
    <div class="scale_y">
    </div>
  </div>
</template>

<script>
  export default {
    name: 'BScale'
  }
</script>

<style scoped lang="stylus">
  .bin-scale {
    display: inline-block;
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    /*overflow: hidden;*/
    transition: all .5s ease-in .1s;
    .scale_x {
      position: absolute;
      left: 0;
      width: 100%;
      height: 8px;
      background: url('../../../../assets/scale_x.png') repeat-x 0 -10px;
    }
    .scale_y {
      position: absolute;
      top: 0;
      width: 8px;
      height: 100%;
      background: url('../../../../assets/scale_y.png') repeat-y -10px 0;
    }
  }
</style>
