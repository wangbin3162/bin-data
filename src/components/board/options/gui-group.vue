<template>
  <div class="gui-group">
    <div class="gui-group-name">{{groupName}}</div>
    <div class="gui-group-content">
      <slot></slot>
    </div>
  </div>
</template>

<script>
  export default {
    props: {
      groupName: String
    }
  }
</script>
