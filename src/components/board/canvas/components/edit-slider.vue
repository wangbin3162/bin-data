<template>
  <div class="board-edit-slider">
    <div class="data-slider">
      <b-icon name="ios-remove-circle-outline" class="zoom-out" @click.native="changeRange(-1)"></b-icon>
      <input type="range" :min="min" :max="max" class="input-range" step="0.05"
             v-model="range" :style="rangeStyle">
      <b-icon name="ios-add-circle-outline" class="zoom-in" @click.native="changeRange(1)"></b-icon>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'edit-slider',
    props: {
      value: Number
    },
    data () {
      return {
        min: 0.3,
        max: 1.3,
        range: this.value
      }
    },
    computed: {
      rangeStyle () {
        let percent = (this.range - 0.3) * 100
        return `background: linear-gradient(to right, rgb(0, 251, 255), rgb(0, 176, 255) ${percent}%, rgb(38, 42, 53) ${percent}%, rgb(38, 42, 53));`
      }
    },
    methods: {
      changeRange (val) {
        this.range += val * 0.05
        if (this.range > this.max) {
          this.range = this.max
        }
        if (this.range < this.min) {
          this.range = this.min
        }
        console.log(this.range)
      }
    },
    watch: {
      value (val) {
        this.range = val
      },
      range () {
        this.$emit('input', Number(this.range))
      }
    }
  }
</script>
