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
          <gui-field label="屏幕大小">
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
          </gui-field>
          <gui-field label="背景颜色">
            <el-color-picker v-model="globalSettings.backgroundColor" size="mini" show-alpha
                             @change="setPageSetting"></el-color-picker>
          </gui-field>
          <gui-field label="栅格间距">
            <div class="gui-field-number">
              <b-input-number v-model="globalSettings.gridStep" size="small" :min="2" :max="20"
                              @on-change="setPageSetting"></b-input-number>
            </div>
          </gui-field>
          <gui-field label="重置">
            <b-button type="primary" size="mini" v-waves @click="resetSetting">恢复默认配置</b-button>
          </gui-field>
        </div>
        <div class="block-config" v-else>
          <div v-if="tabsType===0">
            <gui-group group-name="基础属性">
              <gui-field label="图表尺寸">
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
              </gui-field>
              <gui-field label="图表位置">
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
              </gui-field>
            </gui-group>
            <b-collapse v-model="collapseActive" simple accordion>
              <template v-if="selfConfig.title">
                <b-collapse-panel title="标题" name="1">
                  <gui-field label="标题名">
                    <div class="gui-field-input">
                      <b-input v-model="selfConfig.title.content" size="mini" @on-change="setSelfProperty"></b-input>
                    </div>
                  </gui-field>
                  <b-tag color="#1b1f25" size="small" style="margin-left: 10px;">字体属性</b-tag>
                  <gui-field label="字号">
                    <div class="gui-field-number">
                      <b-input-number v-model="selfConfig.title.textStyle.fontSize" size="small"
                                      :min="12" :max="40" @on-change="setSelfProperty"></b-input-number>
                    </div>
                  </gui-field>
                  <gui-field label="字体颜色">
                    <el-color-picker v-model="selfConfig.title.textStyle.color"
                                     size="mini" show-alpha @change="setSelfProperty"></el-color-picker>
                  </gui-field>
                </b-collapse-panel>
              </template>
            </b-collapse>
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
  import GuiGroup from './gui-group'
  import GuiField from './gui-field'

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
        baseProperty: { width: 0, height: 0, x: 0, y: 0 }, // 配置-基础属性,
        collapseActive: '',
        selfConfig: {}
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
      // 设置自有属性
      setSelfProperty () {
        this.$store.dispatch('SetSelfProperty', this.selfConfig)
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
          if (val && val.packageJson) {
            this.baseProperty = { ...val.packageJson.view }
            this.selfConfig = Object.assign(this.selfConfig, val.packageJson.config)
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
    },
    components: { GuiGroup, GuiField }
  }
</script>
