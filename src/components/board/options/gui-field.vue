<template>
  <div class="gui-field">
    <div class="gui-field-name">{{label}}</div>
    <div class="gui-field-container">
      <slot></slot>
    </div>
  </div>
</template>

<script>
  export default {
    props: {
      label: String
    }
  }
</script>
