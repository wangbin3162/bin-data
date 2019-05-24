<template>
  <div :class="{'board-options': true, 'is-expand': optionsExpand}"
       :style="config.style">
    <div class="header-title" v-if="config.title&&config.title.enable">
      {{ config.title.text }}
    </div>
    <div class="options-body">
      <b-scrollbar style="height: 100%;">
        <div class="page-config">
          <div class="gui-field">
            <div class="gui-field-name">屏幕大小</div>
            <div class="gui-field-container">
              <div class="gui-field-number">
                <b-input-number v-model="canvasWidth" size="small" @on-change="setPageSetting"></b-input-number>
                <div class="label">宽度</div>
              </div>
              <div class="gui-field-number">
                <b-input-number v-model="canvasHeight" size="small" @on-change="setPageSetting"></b-input-number>
                <div class="label">高度</div>
              </div>
            </div>
          </div>
          <div class="gui-field">
            <div class="gui-field-name">背景颜色</div>
            <div class="gui-field-container">
              <el-color-picker v-model="bgColor" size="small" show-alpha @change="setPageSetting"></el-color-picker>
            </div>
          </div>
          <div class="gui-field">
            <div class="gui-field-name">栅格间距</div>
            <div class="gui-field-container">
              <div class="gui-field-number">
                <b-input-number v-model="step" size="small" :min="2" :max="20"
                                @on-change="setPageSetting"></b-input-number>
              </div>
            </div>
          </div>
          <div class="gui-field">
            <div class="gui-field-name">重置</div>
            <div class="gui-field-container">
              <b-button type="primary" size="small" v-waves @click="resetSetting">恢复默认配置</b-button>
            </div>
          </div>
        </div>
      </b-scrollbar>
    </div>
    <div class="expand-hover" @click="$emit('on-toggle')">
      <div class="inner">
        <b-icon :name="optionsExpand?'ios-arrow-forward':'ios-arrow-back'"></b-icon>
      </div>
    </div>
  </div>
</template>

<script>
  import { mapGetters } from 'vuex'

  export default {
    name: 'BoardOptions',
    props: {
      config: {
        type: Object,
        required: true
      }
    },
    data () {
      return {
        canvasWidth: 0,
        canvasHeight: 0,
        bgColor: '',
        step: 1
      }
    },
    mounted () {
      this.updateStoreData()
    },
    methods: {
      setPageSetting () {
        this.$store.dispatch('SetPageSettings', {
          canvasPanel: {
            width: this.canvasWidth,
            height: this.canvasHeight
          },
          backgroundColor: this.bgColor,
          gridStep: this.step
        })
      },
      resetSetting () {
        this.$store.dispatch('ResetDataBase').then(res => {
          this.updateStoreData()
        })
      },
      updateStoreData () {
        this.canvasWidth = this.canvasPanel.width
        this.canvasHeight = this.canvasPanel.height
        this.bgColor = this.backgroundColor
        this.step = this.gridStep
      }
    },
    computed: {
      ...mapGetters(['canvasPanel', 'backgroundColor', 'gridStep', 'canvasRange', 'optionsExpand'])
    }
  }
</script>
