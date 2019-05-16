<template>
  <div :class="{'board-options': true, 'is-expand': isExpand}"
       :style="config.style">
    <div class="header-title" v-if="config.title&&config.title.enable">
      {{ config.title.text }}
    </div>
    <div class="options-body">
      参数内容-预留
    </div>
    <div class="expand-hover" @click="$emit('on-toggle')">
      <div class="inner">
        <b-icon :name="isExpand?'ios-arrow-forward':'ios-arrow-back'"></b-icon>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'BoardOptions',
    props: {
      config: {
        type: Object,
        required: true
      },
      isExpand: {
        type: Boolean,
        required: true
      }
    }
  }
</script>
