<template>
  <div class="dv-screen">
    <div>
      <template v-for="transform in canvasMap">
        <drag-item :key="transform.id" :item="transform">
          {{transform.innerHTML}}
        </drag-item>
      </template>
    </div>
  </div>
</template>

<script>
  import DragItem from '../components/drag/DragItem'
  import { mapGetters } from 'vuex'
  import { getPageSettings } from '../api/app/app-request'
  import { getCanvasMaps } from '../api/canvasMaps/canvas-maps-request'

  export default {
    name: 'screen',
    components: { DragItem },
    computed: {
      ...mapGetters(['canvasMap'])
    },
    created () {
      // 拉取页面配置信息
      getPageSettings().then(res => {
        this.$store.dispatch('SetPageSettings', res.data)
      })
      // 拉取页面canvasMaps
      getCanvasMaps().then(res => {
        this.$store.dispatch('InitCanvasMaps', res.data)
      })
    }
  }
</script>
