<template>
  <div class="board-layout">
    <!--顶部操作栏-->
    <board-header :config="config.header" v-if="config.header">
      <slot name="headerBox"></slot>
    </board-header>
    <!--中间工作区-->
    <div class="center-box" flex>
      <!--左侧图层列表-->
      <board-coverage :config="config.coverage" v-if="config.coverage">
        <slot name="coverage"></slot>
      </board-coverage>
      <!--中间画板区域-->
      <div class="board-center" :style="centerStyle">
        <canvas-main>
          <slot name="canvas"></slot>
        </canvas-main>
      </div>
      <!--右侧的参数配置页面-->
      <board-options v-if="config.options"
                     :config="config.options"
                     @on-toggle="ToggleOptionsExpand"
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
  import BoardCoverage from './coverage/index'
  import BoardOptions from './options/index'
  import CanvasMain from './canvas'
  import ContextMenu from './context-menu/index'
  import { mapGetters, mapActions } from 'vuex'

  const prefixCls = 'board'
  export default {
    name: 'Board',
    data () {
      return {
        prefixCls: prefixCls,
        config: config
      }
    },
    computed: {
      ...mapGetters(['optionsExpand']),
      centerStyle () {
        return {
          left: this.config.coverage.style.width,
          right: this.optionsExpand ? this.config.options.style.width : '0'
        }
      }
    },
    methods: {
      ...mapActions(['ToggleOptionsExpand'])
    },
    components: { ContextMenu, CanvasMain, BoardCoverage, BoardHeader, BoardOptions }
  }
</script>
