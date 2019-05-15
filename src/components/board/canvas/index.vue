<template>
  <div class="canvas-main" ref="canvasMain">
    <div class="canvas-panel-wrap" :style="wrapStyle">
      <b-scrollbar style="height:100%;">
        <div class="screen-shot" :style="screenStyle" ref="screenInner">
          <div class="canvas-panel" :style="canvasPanelStyle">{{range}}</div>
        </div>
      </b-scrollbar>
    </div>
    <edit-slider v-model="range"></edit-slider>
  </div>
</template>

<script>
  import EditSlider from './components/edit-slider'
  import { addResizeListener, removeResizeListener } from 'bin-ui/src/utils/resize-event'

  export default {
    name: 'CanvasMain',
    props: {
      config: {
        type: Object,
        required: true
      },
      optionsExpand: {
        type: Boolean,
        default: true
      }
    },
    data () {
      return {
        wrapStyle: {},
        screenStyle: {},
        range: 0
      }
    },
    mounted () {
      this.$nextTick(this._calcStyle)
      addResizeListener(this.$refs.canvasMain, this._calcStyle)
    },
    beforeDestroy () {
      removeResizeListener(this.$refs.canvasMain, this._calcStyle)
    },
    methods: {
      _calcStyle () {
        const wrap = this.$refs.canvasMain
        if (!wrap) return
        // 计算wrap样式
        this.wrapStyle = {
          width: wrap.clientWidth + 'px',
          height: (wrap.clientHeight - 30) + 'px'
        }
        // 计算缩放比例
        this.range = ((wrap.clientWidth - 120) / this.config.width)
      }
    },
    watch: {
      range (val) {
        this.screenStyle = {
          width: `${this.config.width * val + 120}px`,
          height: `${this.config.height * val + 120}px`
        }
      }
    },
    computed: {
      canvasPanelStyle () {
        return Object.assign({
          width: this.config.width + 'px',
          height: this.config.height + 'px',
          transform: `scale(${this.range}) translate(0px, 0px)`
        }, this.config.style)
      }
    },
    components: { EditSlider }
  }
</script>

<style scoped lang="stylus">
  .canvas-main {
    position: relative;
    width: 100%;
    height: 100%;
    overflow: hidden;
    user-select: none;
    background-image: linear-gradient(45deg, #f5f5f5 25%, transparent 0, transparent 75%, #f5f5f5 0),
      linear-gradient(45deg, #f5f5f5 25%, transparent 0, transparent 75%, #f5f5f5 0);
    background-position: 0 0, 10px 10px;
    background-size: 20px 20px;
    .canvas-panel-wrap {
      width: 100%;
      height: calc(100% - 30px);
      overflow: hidden;
      position: relative;
      .screen-shot {
        position: relative;
        .canvas-panel {
          position: absolute;
          transform-origin: 0 0;
          top: 60px;
          left: 60px;
          transition: .2s all ease-in-out;
          background-size: cover, contain;
          background-position: center, right bottom;
          background-repeat: no-repeat, no-repeat;
          box-shadow: rgba(0, 0, 0, .5) 0 0 30px 0;
        }
      }
    }
  }
</style>

<style>
  .canvas-panel-wrap .bin-scrollbar__wrap {
    overflow-x: hidden;
  }
</style>
