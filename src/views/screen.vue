<template>
  <div class="dv-screen">
    我是展示页
    <b-button @click="$router.push('/home')">点我返回首页</b-button>
  </div>
</template>

<script>
  export default {
    name: 'screen'
  }
</script>
