<template>
  <div class="dv-charts" style="width: 100%;height:100%;" ref="wrap">
    <div class="titles" ref="titles" v-if="config.title" :style="titleStyle">
      <span>{{ config.title.content }}</span>
    </div>
    <component v-bind:is="typeName"
               :data="chartData" :width="width" :height="height" ref="chart"
               :legend-visible="legendVisible"
               :after-config="afterConfig"
               :extend="chartExtend" :options="chartOptions" :settings="chartSettings"></component>
  </div>
</template>

<script>
  import { addResizeListener, removeResizeListener } from 'bin-ui/src/utils/resize-event'
  import { formatData, convertData } from '../../utils/formatData'

  export default {
    name: 'ChartsFactory',
    props: {
      typeName: {
        type: String,
        required: true
      },
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
            // this.colors = [...val.colors]
            // this.$log.primary('========>chartExtend')
            // this.$print(this.chartExtend)
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
              // this.$log.primary('========>chartData')
              // this.$print(this.chartData)
            }
          }
        },
        deep: true,
        immediate: true
      },
      apis: {
        handler (val) {
          if (val && val.labelMap) {
            this.chartSettings = { ...val }
            // this.$log.primary('========>chartSettings')
            // this.$print(this.chartSettings)
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
      afterConfig (options) {
        if (this.typeName === 've-map') {
          let data = [...options.series[0].data]
          options.series[0].data = convertData(data)
        }
        return options
      },
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
          padding: '0 10px',
          color: this.config.title.textStyle.color,
          fontSize: this.config.title.textStyle.fontSize + 'px',
          textAlign: this.config.title.textAlign
        }
      }
    }
  }
</script>
