<template>
  <div class="dv-home">
    <!--预留60像素备用导航栏或者放置数据图表之类的东西-->
    <header><span class="head-title">bin-data</span></header>
    <div class="dv-container">
      <div class="dv-ctrl">
        <a href="" class="btn" @click.stop.prevent="openAdmin">进入ADMIN</a>
        <a href="" class="btn" @click.stop.prevent="openScreen">预览页面</a>
        <a href="" class="btn" @click.stop.prevent="resetLocalData">初始化本地数据</a>
      </div>
    </div>
  </div>
</template>

<script>
  import { initLocalData } from '../api/app/app-request'

  export default {
    name: 'home',
    data () {
      return {
        userId: ''
      }
    },
    created () {
      this.userId = 'dv1e443967LZP2Dj'
    },
    methods: {
      openAdmin () {
        let url = `${this.$base}/admin/${this.userId}`
        this.$util.open(url)
      },
      openScreen () {
        let url = `${this.$base}/screen/${this.userId}`
        this.$util.open(url)
      },
      resetLocalData () {
        initLocalData().then(res => {
          this.$message({ type: 'success', content: res.message })
        })
      }
    }
  }
</script>
