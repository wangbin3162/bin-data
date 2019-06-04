<template>
  <div class="gui-wrap" :class="{'disable':!visible && !simple}">
    <div class="wrap-name">
       <span class="wrap-arrow" @click="simpleToggle" :class="[{'show':visible},{'simple':simple}]">
          <b-icon name="ios-arrow-forward" size="14"></b-icon>
       </span>
      <span class="wrap-label">{{label}}</span>
      <span class="wrap-toggle" @click="toggleVisible" v-if="!simple">
        <b-icon :name="visible?'ios-eye':'ios-eye-off'" size="14"></b-icon>
      </span>
    </div>
    <collapse-transition>
      <div v-if="visible">
        <slot></slot>
      </div>
    </collapse-transition>
  </div>
</template>

<script>
  import CollapseTransition from 'bin-ui/src/components/base/collapse-transition'

  export default {
    props: {
      label: String,
      value: Boolean,
      simple: Boolean
    },
    components: { CollapseTransition },
    data () {
      return {
        visible: false
      }
    },
    created () {
      this.visible = this.value
    },
    methods: {
      toggleVisible () {
        this.visible = !this.visible
      },
      simpleToggle () {
        if (this.simple) {
          this.visible = !this.visible
        }
      }
    },
    watch: {
      visible () {
        this.$emit('input', this.visible)
        this.$emit('on-change', this.visible)
      }
    }
  }
</script>
