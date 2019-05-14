<template>
  <div id="app">
    <!--预留60像素备用导航栏或者放置数据图表之类的东西-->
    <header><span class="head-title">bin-data</span></header>
    <panel-container>
      <router-view/>
    </panel-container>
  </div>
</template>
<script>
  import PanelContainer from './components/panel-container/panel-container'

  export default {
    name: 'home',
    components: {
      PanelContainer
    }
  }
</script>
<style lang="stylus">
  #app {
    color: #2c3e50;
    header {
      height: 60px;
      line-height: 60px;
      border-bottom: 1px solid #dddddd;
      box-sizing: border-box;
      padding: 0 30px;
      .head-title {
        font-size: 24px;
        font-weight: 500;
      }
    }
  }
</style>
