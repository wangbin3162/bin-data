<template>
  <div class="board-layout">
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
        <canvas-main :config="config.canvas" :options-expand="optionsExpand"></canvas-main>
      </div>
      <!--右侧的参数配置页面-->
      <board-options v-if="config.options.enable"
                     :config="config.options" :is-expand="optionsExpand"
                     @on-toggle="handleOptionsExpand"
      ></board-options>
    </div>
    <!--右键菜单-->
    <context-menu></context-menu>
  </div>
</template>

<script>
  // 默认配置信息
  import config from '../../config/board'
  import BoardHeader from './header/index'
  import BoardControl from './control/index'
  import BoardOptions from './options/index'
  import CanvasMain from './canvas'
  import ContextMenu from './context-menu/index'

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
          left: this.config.control.style.width,
          right: this.optionsExpand ? this.config.options.style.width : '0'
        }
      }
    },
    methods: {
      handleOptionsExpand () {
        this.optionsExpand = !this.optionsExpand
      }
    },
    components: { ContextMenu, CanvasMain, BoardControl, BoardHeader, BoardOptions }
  }
</script>
