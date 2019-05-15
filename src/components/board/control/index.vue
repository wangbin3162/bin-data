<template>
  <div class="board-control" :style="config.style">
    <div flex="dir:top" style="height: 100%;">
      <div class="header-title" v-if="config.title.enable">{{ config.title.text }}</div>
      <div class="control-body" flex-box="1">
        <div class="body-wrap">
          <b-scrollbar style="height: 100%;">
            <slot></slot>
          </b-scrollbar>
        </div>
      </div>
    </div>
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
    box-shadow: 2px 0 2px 0 rgba(0, 0, 0, 0.1);
    .header-title {
      height: 28px;
      line-height: 28px;
      padding-left: 30px;
      border-bottom: 1px solid #dddddd;
    }
    .control-body {
      width: 100%;
      height: 100%;
      overflow: hidden;
      .body-wrap {
        width: 100%;
        height: 100%;
      }
    }
  }
</style>

<style>
  .body-wrap .bin-scrollbar__wrap {
    overflow-x: hidden;
  }
</style>
