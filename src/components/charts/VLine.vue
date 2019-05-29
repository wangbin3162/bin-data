<template>
  <div class="dv-line" :style="wrapStyle" ref="wrap">
    <ve-line :data="chartData" :height="height"></ve-line>
  </div>
</template>

<script>
  import { addResizeListener, removeResizeListener } from 'bin-ui/src/utils/resize-event'

  export default {
    name: 'VLine',
    data () {
      return {
        wrapStyle: {},
        height: '400px',
        chartData: {
          columns: ['日期', '访问用户', '下单用户', '下单率'],
          rows: [
            { '日期': '1/1', '访问用户': 1393, '下单用户': 1093, '下单率': 0.32 },
            { '日期': '1/2', '访问用户': 3530, '下单用户': 3230, '下单率': 0.26 },
            { '日期': '1/3', '访问用户': 2923, '下单用户': 2623, '下单率': 0.76 },
            { '日期': '1/4', '访问用户': 1723, '下单用户': 1423, '下单率': 0.49 },
            { '日期': '1/5', '访问用户': 3792, '下单用户': 3492, '下单率': 0.323 },
            { '日期': '1/6', '访问用户': 4593, '下单用户': 4293, '下单率': 0.78 }
          ]
        }
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
        if (!wrap) return

        this.height = (this.$parent.$el.clientHeight - 20) + 'px'
        // 计算wrap样式
        this.wrapStyle = {
          width: '100%',
          height: this.height
        }
      }
    }
  }
</script>
