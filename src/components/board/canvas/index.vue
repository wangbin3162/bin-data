<template>
  <div class="canvas-main" ref="canvasMain">
    <div style="position: absolute;">{{range}}</div>
    <div class="canvas-panel-wrap" :style="wrapStyle">
      <b-scrollbar style="height:100%;">
        <div class="screen-shot" :style="screenStyle" ref="screenInner">
          <div class="canvas-panel" :style="canvasPanelStyle">
            <drop-panel></drop-panel>
          </div>
        </div>
      </b-scrollbar>
    </div>
    <edit-slider v-model="range"></edit-slider>
  </div>
</template>

<script>
  import EditSlider from './components/edit-slider'
  import { addResizeListener, removeResizeListener } from 'bin-ui/src/utils/resize-event'
  import DropPanel from '../../drop/drop-panel'

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
          top: this.optionsExpand ? '60px' : '30px',
          transform: `scale(${this.range}) translate(0px, 0px)`
        }, this.config.style)
      }
    },
    components: { DropPanel, EditSlider }
  }
</script>
