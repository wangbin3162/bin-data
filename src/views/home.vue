<template>
  <div class="dv-home">
    <!--预留60像素备用导航栏或者放置数据图表之类的东西-->
    <header><span class="head-title">bin-data</span></header>
    <div class="dv-container">
      <div class="dv-ctrl">
        <router-link :to="{ name: 'admin', params: { id: 'dv1e443967LZP2Dj' }}" class="btn">进入ADMIN</router-link>
        <router-link to="/screen" class="btn">预览页面</router-link>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'home'
  }
</script>
