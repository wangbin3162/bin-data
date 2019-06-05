<template>
  <div class="preview-box" :style="contentStyles">
    <div class="preview-wrap" :style="dvWrapperStyles">
      <slot></slot>
    </div>
  </div>
</template>

<script>
  export default {
    props: {
      item: {
        type: Object,
        required: true
      }
    },
    created () {
      this.transformData = { ...this.item.packageJson.view }
    },
    watch: {
      item: {
        handler (val) {
          if (val) {
            this.transformData = { ...val.packageJson.view }
          }
        },
        deep: true
      }
    },
    computed: {
      contentStyles () {
        return {
          width: this.transformData.width + 'px',
          height: this.transformData.height + 'px',
          transform: `translate3d(${this.transformData.x}px,${this.transformData.y}px,0)`
        }
      },
      dvWrapperStyles () {
        return {
          transform: 'translateZ(0)',
          width: this.transformData.width + 'px',
          height: this.transformData.height + 'px',
          padding: '10px 0'
        }
      }
    }
  }
</script>
