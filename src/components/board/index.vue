<template>
  <div :class="[prefixCls+'-layout']">
    <!--顶部操作栏-->
    <slot name="header" v-if="config.UI.header.enable">
      <board-header :config="config.UI.header"></board-header>
    </slot>
    <!--中间工作区-->
    <div class="center-box" flex>
      <!--左侧控制栏-->
      <board-control :config="config.UI.control" v-if="config.UI.control.enable"></board-control>
      <!--中间画板区域-->
      <div class="board-center" :style="centerStyle">
        <board-panel :config="config.UI.board" v-if="config.UI.board.enable"></board-panel>
      </div>
      <!--右侧的参数配置页面-->
      <board-options v-if="config.UI.options.enable"
                     :config="config.UI.options" :is-expand="optionsExpand"
                     @on-toggle="handleOptionsExpand"
      ></board-options>
    </div>
    <!--底部的操作栏-->
    <slot name="footer" v-if="config.UI.footer.enable">
      <board-footer :config="config.UI.footer" :style="centerStyle"></board-footer>
    </slot>
  </div>
</template>

<script>
  // 默认配置信息
  import config from './config'
  import BoardHeader from './header/index'
  import BoardFooter from './footer/index'
  import BoardControl from './control/index'
  import BoardOptions from './options/index'
  import BoardPanel from './panel/index'

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
          marginRight: this.optionsExpand ? this.config.UI.options.style.width : '0'
        }
      }
    },
    methods: {
      handleOptionsExpand () {
        this.optionsExpand = !this.optionsExpand
      }
    },
    components: { BoardPanel, BoardFooter, BoardControl, BoardHeader, BoardOptions }
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
      padding: 38px 0 30px 0;
      .board-center {
        width: 100%;
        transition: margin-right .3s;
        text-align: right;
      }
    }
  }
</style>
