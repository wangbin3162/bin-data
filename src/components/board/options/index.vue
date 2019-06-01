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
            <div class="gui-inline">
              <b-input-number v-model="globalSettings.width" size="small"
                              @on-change="setPageSetting"></b-input-number>
              <div class="label">宽度</div>
            </div>
            <div class="gui-inline">
              <b-input-number v-model="globalSettings.height" size="small"
                              @on-change="setPageSetting"></b-input-number>
              <div class="label">高度</div>
            </div>
          </gui-field>
          <gui-field label="背景颜色">
            <el-color-picker v-model="globalSettings.backgroundColor" show-alpha
                             @change="setPageSetting"></el-color-picker>
          </gui-field>
          <gui-field label="栅格间距">
            <div class="gui-inline">
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
                <gui-inline label="宽度">
                  <b-input-number v-model="baseProperty.width" size="small"
                                  @on-change="setBaseProperty"></b-input-number>
                </gui-inline>
                <gui-inline label="高度">
                  <b-input-number v-model="baseProperty.height" size="small"
                                  @on-change="setBaseProperty"></b-input-number>
                </gui-inline>
              </gui-field>
              <gui-field label="图表位置">
                <gui-inline label="横坐标">
                  <b-input-number v-model="baseProperty.x" size="small"
                                  @on-change="setBaseProperty"></b-input-number>
                </gui-inline>
                <gui-inline label="纵坐标">
                  <b-input-number v-model="baseProperty.y" size="small"
                                  @on-change="setBaseProperty"></b-input-number>
                </gui-inline>
              </gui-field>
            </gui-group>
            <b-collapse v-model="collapseActive" simple accordion>
              <!--grid-->
              <template v-if="selfConfig.grid">
                <b-collapse-panel title="全局样式" name="grid">
                  <gui-field label="上下边距">
                    <gui-inline label="顶部">
                      <b-input-number v-model="selfConfig.grid.top" size="small"
                                      :min="0" :max="60" @on-change="setSelfProperty"></b-input-number>
                    </gui-inline>
                    <gui-inline label="底部">
                      <b-input-number v-model="selfConfig.grid.bottom" size="small"
                                      :min="0" :max="60" @on-change="setSelfProperty"></b-input-number>
                    </gui-inline>
                  </gui-field>
                  <gui-field label="左右边距">
                    <gui-inline label="左侧">
                      <b-input-number v-model="selfConfig.grid.left" size="small"
                                      :min="0" :max="60" @on-change="setSelfProperty"></b-input-number>
                    </gui-inline>
                    <gui-inline label="右侧">
                      <b-input-number v-model="selfConfig.grid.right" size="small"
                                      :min="0" :max="60" @on-change="setSelfProperty"></b-input-number>
                    </gui-inline>
                  </gui-field>
                  <gui-field label="平滑曲线">
                    <b-switch v-model="selfConfig.series.smooth" size="small" @on-change="setSelfProperty"></b-switch>
                  </gui-field>
                </b-collapse-panel>
              </template>
              <!--标题-->
              <template v-if="selfConfig.title">
                <b-collapse-panel title="标题" name="title">
                  <gui-field label="标题名">
                    <b-input v-model="selfConfig.title.content" size="mini" @on-change="setSelfProperty"></b-input>
                  </gui-field>
                  <gui-field label="文本">
                    <gui-inline label="字号">
                      <b-input-number v-model="selfConfig.title.textStyle.fontSize" size="small"
                                      :min="12" :max="40" @on-change="setSelfProperty"></b-input-number>
                    </gui-inline>
                    <gui-inline label="颜色">
                      <el-color-picker v-model="selfConfig.title.textStyle.color"
                                       show-alpha @change="setSelfProperty"></el-color-picker>
                    </gui-inline>
                  </gui-field>
                </b-collapse-panel>
              </template>
              <!--图例-->
              <template v-if="selfConfig.legend">
                <b-collapse-panel title="图例" name="legend">
                  <gui-field label="是否显示">
                    <b-switch v-model="selfConfig.legend.show" size="small" @on-change="setSelfProperty"></b-switch>
                  </gui-field>
                  <gui-field label="文本">
                    <gui-inline label="字号">
                      <b-input-number v-model="selfConfig.legend.textStyle.fontSize" size="small"
                                      :min="12" :max="40" @on-change="setSelfProperty"></b-input-number>
                    </gui-inline>
                    <gui-inline label="颜色">
                      <el-color-picker v-model="selfConfig.legend.textStyle.color"
                                       show-alpha @change="setSelfProperty"></el-color-picker>
                    </gui-inline>
                  </gui-field>
                  <gui-field label="间距">
                    <b-input-number v-model="selfConfig.legend.itemGap" size="small"
                                    :min="0" :max="50" @on-change="setSelfProperty"></b-input-number>
                  </gui-field>
                  <gui-field label="图例">
                    <gui-inline label="位置">
                      <el-select v-model="selfConfig.legend.position" size="mini"
                                 @change="legendPosChange" :value="selfConfig.legend.position">
                        <el-option
                          v-for="item in legendPosOptions"
                          :key="item.value"
                          :label="item.label"
                          :value="item.value">
                        </el-option>
                      </el-select>
                    </gui-inline>
                    <gui-inline label="样式">
                      <el-select v-model="selfConfig.legend.icon" size="mini"
                                 @change="setSelfProperty" :value="selfConfig.legend.icon">
                        <el-option
                          v-for="item in legendIconOptions"
                          :key="item.value"
                          :label="item.label"
                          :value="item.value">
                        </el-option>
                      </el-select>
                    </gui-inline>
                  </gui-field>
                </b-collapse-panel>
              </template>
              <!--x轴-->
              <template v-if="selfConfig.xAxis">
                <b-collapse-panel title="x轴" name="xAxis">
                  <gui-field label="是否显示">
                    <b-switch v-model="selfConfig.xAxis.show" size="small" @on-change="setSelfProperty"></b-switch>
                  </gui-field>
                  <gui-field label="文本">
                    <gui-inline label="字号">
                      <b-input-number v-model="selfConfig.xAxis.axisLabel.fontSize" size="small"
                                      :min="12" :max="40" @on-change="setSelfProperty"></b-input-number>
                    </gui-inline>
                    <gui-inline label="颜色">
                      <el-color-picker v-model="selfConfig.xAxis.axisLabel.color"
                                       show-alpha @change="setSelfProperty"></el-color-picker>
                    </gui-inline>
                  </gui-field>
                  <gui-field label="轴线">
                    <b-switch v-model="selfConfig.xAxis.axisLine.show" size="small"
                              @on-change="setSelfProperty"></b-switch>
                  </gui-field>
                  <gui-field label="轴线颜色" v-if="selfConfig.xAxis.axisLine.show">
                    <el-color-picker v-model="selfConfig.xAxis.axisLine.lineStyle.color"
                                     show-alpha @change="setSelfProperty"></el-color-picker>
                  </gui-field>
                  <gui-field label="网格线">
                    <b-switch v-model="selfConfig.xAxis.splitLine.show" size="small"
                              @on-change="setSelfProperty"></b-switch>
                  </gui-field>
                  <gui-field label="网格线颜色" v-if="selfConfig.xAxis.splitLine.show">
                    <el-color-picker v-model="selfConfig.xAxis.splitLine.lineStyle.color"
                                     show-alpha @change="setSelfProperty"></el-color-picker>
                  </gui-field>
                </b-collapse-panel>
              </template>
              <!--y轴-->
              <template v-if="selfConfig.yAxis">
                <b-collapse-panel title="y轴" name="yAxis">
                  <gui-field label="是否显示">
                    <b-switch v-model="selfConfig.xAxis.show" size="small" @on-change="setSelfProperty"></b-switch>
                  </gui-field>
                  <gui-field label="文本">
                    <gui-inline label="字号">
                      <b-input-number v-model="selfConfig.xAxis.axisLabel.fontSize" size="small"
                                      :min="12" :max="40" @on-change="setSelfProperty"></b-input-number>
                    </gui-inline>
                    <gui-inline label="颜色">
                      <el-color-picker v-model="selfConfig.xAxis.axisLabel.color"
                                       show-alpha @change="setSelfProperty"></el-color-picker>
                    </gui-inline>
                  </gui-field>
                  <gui-field label="轴线">
                    <b-switch v-model="selfConfig.yAxis.axisLine.show" size="small"
                              @on-change="setSelfProperty"></b-switch>
                  </gui-field>
                  <gui-field label="轴线颜色" v-if="selfConfig.yAxis.axisLine.show">
                    <el-color-picker v-model="selfConfig.yAxis.axisLine.lineStyle.color"
                                     show-alpha @change="setSelfProperty"></el-color-picker>
                  </gui-field>
                  <gui-field label="网格线">
                    <b-switch v-model="selfConfig.yAxis.splitLine.show" size="small"
                              @on-change="setSelfProperty"></b-switch>
                  </gui-field>
                  <gui-field label="网格线颜色" v-if="selfConfig.yAxis.splitLine.show">
                    <el-color-picker v-model="selfConfig.yAxis.splitLine.lineStyle.color"
                                     show-alpha @change="setSelfProperty"></el-color-picker>
                  </gui-field>
                </b-collapse-panel>
              </template>
              <!--数据系列-->
              <template v-if="selfConfig.series">
                <b-collapse-panel title="数据系列" name="series">
                  系列1
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
  import GuiInline from './gui-inline'

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
        selfConfig: {},
        legendPosOptions: [
          { value: 'top-center', label: 'top' },
          { value: 'bottom-center', label: 'bottom' }
        ],
        legendIconOptions: [
          { value: '', label: '默认' },
          { value: 'circle', label: '圆形' },
          { value: 'rect', label: '矩形' },
          { value: 'roundRect', label: '圆角矩形' },
          { value: 'diamond', label: '菱形' }
        ]
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
      },
      legendPosChange (val) {
        this.selfConfig.legend.top = 'auto'
        this.selfConfig.legend.bottom = 'auto'
        switch (val) {
          case 'top-center':
            this.selfConfig.legend.top = 0
            break
          case 'bottom-center':
            this.selfConfig.legend.bottom = 0
            break
        }
        this.setSelfProperty()
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
    components: { GuiGroup, GuiField, GuiInline }
  }
</script>
