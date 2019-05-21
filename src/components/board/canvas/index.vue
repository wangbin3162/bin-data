<template>
  <div class="canvas-main" ref="canvasMain">
    <div class="canvas-panel-wrap" :style="wrapStyle">
      <b-scrollbar style="height:100%;">
        <div class="screen-shot" :style="screenStyle" ref="screenInner">
          <div class="canvas-panel" :style="canvasPanelStyle"
               :data-spm-anchor-id="$route.params.id">
            <drop-panel>
              <slot></slot>
            </drop-panel>
          </div>
        </div>
      </b-scrollbar>
    </div>
    <edit-slider v-model="range"></edit-slider>
  </div>
</template>

<script>
  import { addResizeListener, removeResizeListener } from 'bin-ui/src/utils/resize-event'
  import EditSlider from './components/edit-slider'
  import DropPanel from '../../drop/drop-panel'
  import { mapActions, mapGetters } from 'vuex'

  export default {
    name: 'CanvasMain',
    props: {
      config: {
        type: Object,
        required: true
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
      ...mapActions(['SetCanvasRange']),
      _calcStyle () {
        const wrap = this.$refs.canvasMain
        if (!wrap) return
        // 计算wrap样式
        this.wrapStyle = {
          width: wrap.clientWidth + 'px',
          height: (wrap.clientHeight - 30) + 'px'
        }
        // 计算缩放比例
        let range = ((wrap.clientWidth - 120) / this.config.width)
        range = Math.round(range * 100) / 100
        if (range < 0.3) {
          range = 0.3
        }
        this.range = range
      }
    },
    watch: {
      range (val) {
        this.screenStyle = {
          width: `${this.config.width * val + 120}px`,
          height: `${this.config.height * val + 120}px`
        }
        this.SetCanvasRange(this.range)
      }
    },
    computed: {
      ...mapGetters(['optionsExpand']),
      canvasPanelStyle () {
        return Object.assign({
          width: this.config.width + 'px',
          height: this.config.height + 'px',
          top: this.optionsExpand ? '60px' : '30px',
          transform: `scale(${this.range}) translate3d(0px, 0px, 0)`
        }, this.config.style)
      }
    },
    components: { DropPanel, EditSlider }
  }
</script>
