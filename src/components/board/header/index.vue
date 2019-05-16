<template>
  <div class="board-header" flex>
    <div class="header-title">
      <b-tooltip content="返回" placement="right">
        <b-icon name="ios-arrow-back" @click.native="$router.push('/home')"></b-icon>
      </b-tooltip>
      <span v-if="config.title.enable">{{ config.title.text }}</span>
    </div>
    <div class="control" flex-box="1">
      <b-icon name="ios-add-circle-outline"></b-icon>
      <b-icon name="ios-apps"></b-icon>
      <b-icon name="ios-cog"></b-icon>
    </div>
    <div class="right-box">
      <b-tooltip content="预览" placement="bottom">
        <b-icon name="ios-eye"></b-icon>
      </b-tooltip>
      <b-tooltip content="发布" placement="bottom">
        <b-icon name="ios-paper-plane"></b-icon>
      </b-tooltip>
      <b-tooltip content="个人中心" placement="bottom">
        <b-icon name="ios-contact"></b-icon>
      </b-tooltip>
      <b-tooltip content="主题" placement="bottom">
        <b-icon name="ios-shirt"></b-icon>
      </b-tooltip>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'BoardHeader',
    props: {
      config: {
        type: Object,
        required: true
      }
    }
  }
</script>
