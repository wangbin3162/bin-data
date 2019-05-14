<template>
  <div class="board-header" flex>
    <div class="header-title" v-if="config.title.enable">{{ config.title.text }}</div>
    <div class="control" flex-box="1">
      <span class="btn"><b-icon name="ios-add-circle-outline"></b-icon></span>
      <span class="btn"><b-icon name="ios-apps"></b-icon></span>
      <span class="btn"><b-icon name="ios-cog"></b-icon></span>
    </div>
    <div class="right-box">right-box</div>
  </div>
</template>

<script>
  export default {
    name: 'BoardHeader',
    props: {
      config: {
        type: Object,
        required: true
      }
    }
  }
</script>

<style scoped lang="stylus">
  .board-header {
    position: absolute;
    top: 0;
    right: 0;
    left: 0;
    width: 100%;
    height: 38px;
    line-height: 38px;
    box-sizing: border-box;
    border-bottom: 1px solid #dddddd;
    z-index: 2500;
    background: #ffffff;
    box-shadow: 0 2px 2px 0 rgba(0, 0, 0, 0.1);
    transition: all .5s ease-in .1s;
    .header-title {
      width: 200px;
      height: 38px;
      line-height: 38px;
      font-size: 16px;
      font-weight: bold;
      display: inline-block;
      padding: 0 30px;
      text-shadow: 2px 0 10px rgba(0, 0, 0, 0.3);
    }
    .control {
      text-align: right;
      .btn {
        display: inline-block
        height: 18px;
        width: 18px;
        cursor: pointer;
        margin-right: 15px;
        i {
          font-size: 18px;
          transition: .3s;
        }
        &:hover i {
          color: #2d8cf0;
        }
      }
    }
    .right-box {
      width: 300px;
      height: 38px;
      line-height: 38px;
      display: inline-block;
      text-align: center;
    }
  }
</style>
