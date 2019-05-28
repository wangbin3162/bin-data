<template>
  <div :class="{'board-options': true, 'is-expand': optionsExpand}"
       :style="config.style">
    <div class="header-title" v-if="config.title&&config.title.enable">
      <span v-if="!currentSelected">{{ config.title.text }}</span>
      <div class="tabs" v-else>
        <div class="tab-item" :class="{'active':tabsType===0}" @click="tabsType=0">
          <b-tooltip content="配置">
            <b-icon name="ios-options"></b-icon>
          </b-tooltip>
        </div>
        <div class="tab-item" :class="{'active':tabsType===1}" @click="tabsType=1">
          <b-tooltip content="数据">
            <b-icon name="ios-code-working"></b-icon>
          </b-tooltip>
        </div>
        <div class="tab-item" :class="{'active':tabsType===2}" @click="tabsType=2">
          <b-tooltip content="交互">
            <b-icon name="ios-crop"></b-icon>
          </b-tooltip>
        </div>
      </div>
    </div>
    <div class="options-body">
      <b-scrollbar style="height: 100%;">
        <div class="page-config" v-if="!currentSelected">
          <div class="gui-field">
            <div class="gui-field-name">屏幕大小</div>
            <div class="gui-field-container">
              <div class="gui-field-number">
                <b-input-number v-model="globalSettings.width" size="small"
                                @on-change="setPageSetting"></b-input-number>
                <div class="label">宽度</div>
              </div>
              <div class="gui-field-number">
                <b-input-number v-model="globalSettings.height" size="small"
                                @on-change="setPageSetting"></b-input-number>
                <div class="label">高度</div>
              </div>
            </div>
          </div>
          <div class="gui-field">
            <div class="gui-field-name">背景颜色</div>
            <div class="gui-field-container">
              <el-color-picker v-model="globalSettings.backgroundColor" size="mini" show-alpha
                               @change="setPageSetting"></el-color-picker>
            </div>
          </div>
          <div class="gui-field">
            <div class="gui-field-name">栅格间距</div>
            <div class="gui-field-container">
              <div class="gui-field-number">
                <b-input-number v-model="globalSettings.gridStep" size="small" :min="2" :max="20"
                                @on-change="setPageSetting"></b-input-number>
              </div>
            </div>
          </div>
          <div class="gui-field">
            <div class="gui-field-name">重置</div>
            <div class="gui-field-container">
              <b-button type="primary" size="mini" v-waves @click="resetSetting">恢复默认配置</b-button>
            </div>
          </div>
        </div>
        <div class="block-config" v-else>
          <div v-if="tabsType===0">
            <div class="gui-group">
              <div class="gui-group-name">基础属性</div>
              <div class="gui-group-content">
                <div class="gui-field">
                  <div class="gui-field-name">图表尺寸</div>
                  <div class="gui-field-container">
                    <div class="gui-field-number">
                      <b-input-number v-model="baseProperty.width" size="small"
                                      @on-change="setBaseProperty"></b-input-number>
                      <div class="label">宽度</div>
                    </div>
                    <div class="gui-field-number">
                      <b-input-number v-model="baseProperty.height" size="small"
                                      @on-change="setBaseProperty"></b-input-number>
                      <div class="label">高度</div>
                    </div>
                  </div>
                </div>
                <div class="gui-field">
                  <div class="gui-field-name">图表位置</div>
                  <div class="gui-field-container">
                    <div class="gui-field-number">
                      <b-input-number v-model="baseProperty.x" size="small"
                                      @on-change="setBaseProperty"></b-input-number>
                      <div class="label">横坐标</div>
                    </div>
                    <div class="gui-field-number">
                      <b-input-number v-model="baseProperty.y" size="small"
                                      @on-change="setBaseProperty"></b-input-number>
                      <div class="label">纵坐标</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {{ currentSelected }}
          </div>
          <div v-else-if="tabsType===1">数据</div>
          <div v-else>交互</div>
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
  import { setBaseProperty } from '../../../api/canvasMaps/canvas-maps-request'
  import { resetPageSettings, setPageSettings } from '../../../api/app/app-request'

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
        tabsType: 0, // 0：配置，1：数据，2：交互
        globalSettings: { width: 0, height: 0, backgroundColor: '', gridStep: 1 },
        baseProperty: { width: 0, height: 0, x: 0, y: 0 }// 配置-基础属性
      }
    },
    methods: {
      // 设置全局配置
      setPageSetting () {
        setPageSettings(this.globalSettings).then(res => {
          this.$store.dispatch('SetPageSettings', res.data)
        })
      },
      // 设置基本属性
      setBaseProperty () {
        this.$store.dispatch('SetBaseProperty', this.baseProperty)
        // 发送请求来保存数据
        setBaseProperty(this.currentSelected)
      },
      // 重置全局配置
      resetSetting () {
        this.$loading.start()
        resetPageSettings().then(res => {
          this.$store.dispatch('SetPageSettings', res.data)
          this.$loading.done()
        })
      }
    },
    watch: {
      currentSelected: {
        handler (val) {
          if (val) {
            this.baseProperty = { ...val.baseProperty }
          }
        },
        deep: true
      },
      pageSettings: {
        handler (val) {
          if (val) {
            this.globalSettings = { ...val }
          }
        },
        deep: true
      }
    },
    computed: {
      ...mapGetters(['pageSettings', 'canvasRange', 'optionsExpand', 'currentSelected'])
    }
  }
</script>
