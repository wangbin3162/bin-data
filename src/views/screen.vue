<template>
  <div class="dv-screen">
    <b-scrollbar style="height:100%;">
      <div class="canvas-panel" :style="canvasPanelStyle">
        <template v-for="transform in canvasMap">
          <preview-box :key="transform.id" :item="transform">
            <v-line :config="transform.packageJson.config"
                    :api-data="transform.packageJson.api_data"
                    :apis="transform.packageJson.apis"></v-line>
          </preview-box>
        </template></div>
    </b-scrollbar>
  </div>
</template>

<script>
  import { mapGetters } from 'vuex'
  import { getPageSettings } from '../api/app/app-request'
  import { getCanvasMaps } from '../api/canvasMaps/canvas-maps-request'
  import VLine from '../components/charts/VLine'
  import PreviewBox from '../components/preview/preview-box'

  export default {
    name: 'screen',
    components: { VLine, PreviewBox },
    data () {
      return {}
    },
    computed: {
      ...mapGetters(['canvasMap', 'pageSettings']),
      // 画布面板的样式
      canvasPanelStyle () {
        return {
          width: `${this.pageSettings.width}px`,
          height: `${this.pageSettings.height}px`,
          backgroundColor: this.pageSettings.backgroundColor
        }
      }
    },
    created () {
      // 拉取页面配置信息
      getPageSettings().then(res => {
        this.$store.dispatch('SetPageSettings', res.data)
        console.log(res.data)
      })
      // 拉取页面canvasMaps
      getCanvasMaps().then(res => {
        this.$store.dispatch('InitCanvasMaps', res.data)
      })
    }
  }
</script>
