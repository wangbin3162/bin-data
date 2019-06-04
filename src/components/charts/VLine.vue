<template>
  <div class="dv-line" style="width: 100%;height:100%;" ref="wrap">
    <div class="titles" ref="titles" v-if="config.title" style="padding: 0 15px;">
      <span :style="titleStyle">{{ config.title.content }}</span>
    </div>
    <ve-line :data="chartData" :width="width" :height="height" ref="chart"
             :legend-visible="legendVisible" :colors="colors"
             :extend="chartExtend" :options="chartOptions" :settings="chartSettings"></ve-line>
  </div>
</template>

<script>
  import { addResizeListener, removeResizeListener } from 'bin-ui/src/utils/resize-event'
  import { formatData } from '../../utils/formatData'

  export default {
    name: 'VLine',
    props: {
      apiData: {
        type: Object,
        required: true
      },
      apis: {
        type: Object,
        required: true
      },
      config: {
        type: Object,
        required: true
      }
    },
    data () {
      return {
        wrapStyle: {},
        width: '500px',
        height: '400px',
        chartData: {
          columns: ['x', 'y'],
          rows: [{ x: 'x', y: 100 }]
        },
        tooltipVisible: true,
        legendVisible: true,
        // chart扩展配置项
        chartExtend: {},
        chartOptions: {},
        chartSettings: {},
        colors: []
      }
    },
    watch: {
      config: {
        handler (val) {
          if (val) {
            // 图例
            this.legendVisible = val.legend.show
            this.chartExtend = { ...val }
            this.colors = [...val.colors]
            this.$log.primary('========>chartExtend')
            this.$print(this.chartExtend)
          }
        },
        deep: true,
        immediate: true
      },
      apiData: {
        handler (val) {
          if (val) {
            if (val.source) {
              let data = formatData(val.source)
              this.chartData.columns = [...data.columns]
              this.chartData.rows = [...data.rows]
              this.$log.primary('========>chartData')
              this.$print(this.chartData)
            }
          }
        },
        deep: true,
        immediate: true
      },
      apis: {
        handler (val) {
          if (val && val.labelMap) {
            this.chartSettings = { labelMap: val.labelMap }
            this.$log.primary('========>chartSettings')
            this.$print(this.chartSettings)
          }
        },
        deep: true,
        immediate: true
      }
    },
    mounted () {
      this._calcStyle()
      addResizeListener(this.$refs.wrap, this._calcStyle)
    },
    beforeDestroy () {
      removeResizeListener(this.$refs.wrap, this._calcStyle)
    },
    methods: {
      _calcStyle () {
        const wrap = this.$refs.wrap
        const title = this.$refs.titles
        if (!wrap) return
        let width = wrap.clientWidth
        let height = wrap.clientHeight
        if (this.config.title) {
          height -= title.clientHeight
        }
        this.width = width + 'px'
        this.height = height + 'px'
      }
    },
    computed: {
      titleStyle () {
        return {
          color: this.config.title.textStyle.color,
          fontSize: this.config.title.textStyle.fontSize + 'px'
        }
      }
    }
  }
</script>
