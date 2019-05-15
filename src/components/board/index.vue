<template>
  <div :class="[prefixCls+'-layout']">
    <!--顶部操作栏-->
    <board-header :config="config.header" v-if="config.header.enable"></board-header>
    <!--中间工作区-->
    <div class="center-box" flex>
      <!--左侧控制栏-->
      <board-control :config="config.control" v-if="config.control.enable">
        <slot name="control"></slot>
      </board-control>
      <!--中间画板区域-->
      <div class="board-center" :style="centerStyle">
        <canvas-main :config="config.canvas"></canvas-main>
      </div>
      <!--右侧的参数配置页面-->
      <board-options v-if="config.options.enable"
                     :config="config.options" :is-expand="optionsExpand"
                     @on-toggle="handleOptionsExpand"
      ></board-options>
    </div>
  </div>
</template>

<script>
  // 默认配置信息
  import config from '../../config/board'
  import BoardHeader from './header/index'
  import BoardControl from './control/index'
  import BoardOptions from './options/index'
  import CanvasMain from './canvas'

  const prefixCls = 'board'
  export default {
    name: 'Board',
    data () {
      return {
        prefixCls: prefixCls,
        config: config,
        optionsExpand: true
      }
    },
    computed: {
      centerStyle () {
        return {
          right: this.optionsExpand ? this.config.options.style.width : '0'
        }
      }
    },
    methods: {
      handleOptionsExpand () {
        this.optionsExpand = !this.optionsExpand
      }
    },
    components: { CanvasMain, BoardControl, BoardHeader, BoardOptions }
  }
</script>

<style scoped lang="stylus">
  .board-layout {
    position: relative;
    width: 100%;
    height: 100%;
    display: inline-block;
    background: #ffffff;
    overflow: hidden;
    cursor: default;
    user-select: none;
    font-family: "Helvetica Neue", Helvetica, "PingFang SC", "Hiragino Sans GB", "Microsoft YaHei", "微软雅黑", Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    box-sizing: border-box;
    .center-box {
      position: relative;
      height: 100%;
      padding-top: 38px;
      .board-center {
        position: absolute;
        top: 38px;
        left: 200px;
        right: 300px;
        bottom: 0;
        transition: right .3s;
      }
    }
  }
</style>
