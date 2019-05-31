<template>
  <div class="gui-inline">
    <slot></slot>
    <div class="label">{{label}}</div>
  </div>
</template>

<script>
  export default {
    props: {
      label: String
    }
  }
</script>
