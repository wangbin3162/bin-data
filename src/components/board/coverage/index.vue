<template>
  <div class="board-coverage" :style="config.style">
    <div flex="dir:top" style="height: 100%;">
      <div class="header-title" v-if="config.title.enable">{{ config.title.text }}</div>
      <div class="control-body" flex-box="1">
        <div class="body-wrap" @click="cancelSelected">
          <b-scrollbar style="height: 100%;">
            <slot></slot>
          </b-scrollbar>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'BoardCoverage',
    props: {
      config: {
        type: Object,
        required: true
      }
    },
    methods: {
      // transform点击事件
      cancelSelected () {
        this.$store.dispatch('SingleSelected', null)
      }
    }
  }
</script>
