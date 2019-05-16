<template>
  <div class="board-control" :style="config.style">
    <div flex="dir:top" style="height: 100%;">
      <div class="header-title" v-if="config.title.enable">{{ config.title.text }}</div>
      <div class="control-body" flex-box="1">
        <div class="body-wrap">
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
    name: 'BoardControl',
    props: {
      config: {
        type: Object,
        required: true
      }
    }
  }
</script>
