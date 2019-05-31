<template>
  <div class="dv-line" style="width: 100%;height:100%;" ref="wrap">
    <div class="titles" ref="titles" v-if="config.title" style="padding: 0 15px;">
      <span :style="titleStyle">{{ config.title.content }}</span>
    </div>
    <ve-line :data="chartData" :width="width" :height="height" ref="chart"
             :legend-visible="legendVisible" log
             :extend="chartExtend" :options="chartOptions" :settings="chartSettings"></ve-line>
  </div>
</template>

<script>
  import { addResizeListener, removeResizeListener } from 'bin-ui/src/utils/resize-event'

  export default {
    name: 'VLine',
    props: {
      config: {
        type: Object
      }
    },
    data () {
      return {
        wrapStyle: {},
        width: '500px',
        height: '400px',
        chartData: {
          columns: ['日期', '访问用户', '下单用户'],
          rows: [
            { '日期': '1/1', '访问用户': 1393, '下单用户': 1093 },
            { '日期': '1/2', '访问用户': 3530, '下单用户': 3230 },
            { '日期': '1/3', '访问用户': 2923, '下单用户': 2623 },
            { '日期': '1/4', '访问用户': 1723, '下单用户': 1423 },
            { '日期': '1/5', '访问用户': 3792, '下单用户': 3492 },
            { '日期': '1/6', '访问用户': 4593, '下单用户': 4293 }
          ]
        },
        tooltipVisible: true,
        legendVisible: true,
        // chart扩展配置项
        chartExtend: {},
        chartOptions: {},
        chartSettings: {}
      }
    },
    watch: {
      config: {
        handler (val) {
          if (val) {
            this.setOptions()
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
      },
      setOptions () {
        // 图例
        // this.legendVisible = false
        // this.$nextTick(() => {
        this.legendVisible = this.config.legend.show
        this.chartExtend = { ...this.config }
        // })
        console.log(this.chartExtend)
        console.log(this.chartOptions)
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
