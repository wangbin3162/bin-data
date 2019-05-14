<template>
  <div :class="{'board-options': true, 'is-expand': isExpand}"
       :style="config.style">
    <div class="options-header">参数设置</div>
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

<style scoped lang="stylus">
  .board-options {
    position: absolute;
    top: 38px;
    right: 0;
    bottom: 30px;
    box-sizing: border-box;
    border-left: 1px solid #dddddd;
    z-index: 2000;
    background: #ffffff;
    box-shadow: -2px 0 2px 0 rgba(0, 0, 0, 0.1);
    transition: all .3s;
    transform: translate3d(100%, 0, 0)
    .options-header {
      height: 28px;
      line-height: 28px;
      text-align: center;
      border-bottom: 1px solid #dddddd;
    }
    .options-body {
      height: calc(100% - 28px);
      padding: 10px;
      text-align: center;
    }

    .expand-hover {
      position: absolute;
      top: 50%;
      left: 0;
      width: 16px;
      height: 160px;
      margin-top: -80px;
      margin-left: -16px;
      cursor: pointer;
      .inner {
        position: relative;
        width: 100%;
        height: 100%;
        background: #ededed;
        opacity: 0;
        transition: all .2s;
        i {
          position: absolute;
          width: 18px;
          height: 18px;
          font-size: 18px;
          top: 50%;
          margin-top: -9px;
          &:hover {
            color: #2d8cf0;
          }
        }
        &:before, &:after {
          content: ''
          position: absolute
          left: 0;
        }
        &:before {
          top: 0;
          margin-top: -16px;
          border-top: 16px solid transparent;
          border-right: 16px solid #ededed;
        }
        &:after {
          bottom: 0;
          margin-bottom: -16px;
          border-left: 16px solid transparent;
          border-top: 16px solid #ededed;
        }
      }
      &:hover .inner {
        opacity: 1;
      }
    }
    &.is-expand {
      transform: translate3d(0, 0, 0)
    }
  }
</style>
