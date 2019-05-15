<template>
  <div class="edit-slider">
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

<style scoped lang="stylus">
  .edit-slider {
    background: #fff;
    height: 30px;
    border-top: 1px solid #dddddd;
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: flex-end;
    position: absolute;
    right: 0;
    bottom: 0;
    z-index: 99;
    .data-slider {
      display: flex;
      right: 4px;
      align-items: center;
      .input-range {
        cursor: pointer;
        height: 2px;
        -webkit-appearance: none;
        box-sizing: border-box;
        outline: 0;
        margin: 0;
        display: inline-block;
        &::-webkit-slider-thumb {
          -webkit-appearance: none; /*清除系统默认样式*/
          height: 12px; /*拖动块高度*/
          width: 12px; /*拖动块宽度*/
          background: #fff; /*拖动块背景*/
          border: solid 1px #202020; /*设置边框*/
        }
      }
      .iconfont {
        color: #434a54;
        font-size: 18px;
        margin: 0 8px;
        &.zoom-out {
          cursor: zoom-out;
        }
        &.zoom-in {
          cursor: zoom-in;
        }
      }
    }
  }
</style>
