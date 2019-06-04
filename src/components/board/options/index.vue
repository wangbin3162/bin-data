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
            <b-input-number v-model="globalSettings.gridStep" size="small" :min="2" :max="20"
                            @on-change="setPageSetting"></b-input-number>
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
                  <gui-wrap label="边距" :value="true" simple>
                    <gui-field label="顶部">
                      <b-input-number v-model="selfConfig.grid.top" size="small"
                                      :min="0" :max="60" @on-change="setSelfProperty"></b-input-number>
                    </gui-field>
                    <gui-field label="底部">
                      <b-input-number v-model="selfConfig.grid.bottom" size="small"
                                      :min="0" :max="60" @on-change="setSelfProperty"></b-input-number>
                    </gui-field>
                    <gui-field label="左侧">
                      <b-input-number v-model="selfConfig.grid.left" size="small"
                                      :min="0" :max="60" @on-change="setSelfProperty"></b-input-number>
                    </gui-field>
                    <gui-field label="右侧">
                      <b-input-number v-model="selfConfig.grid.right" size="small"
                                      :min="0" :max="60" @on-change="setSelfProperty"></b-input-number>
                    </gui-field>
                  </gui-wrap>
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
                                       @change="setSelfProperty"></el-color-picker>
                    </gui-inline>
                  </gui-field>
                </b-collapse-panel>
              </template>
              <!--图例-->
              <template v-if="selfConfig.legend">
                <b-collapse-panel title="图例" name="legend">
                  <gui-wrap label="图例" v-model="selfConfig.legend.show" @on-change="setSelfProperty">
                    <gui-field label="文本">
                      <gui-inline label="字号">
                        <b-input-number v-model="selfConfig.legend.textStyle.fontSize" size="small"
                                        :min="12" :max="40" @on-change="setSelfProperty"></b-input-number>
                      </gui-inline>
                      <gui-inline label="颜色">
                        <el-color-picker v-model="selfConfig.legend.textStyle.color" @change="setSelfProperty"></el-color-picker>
                      </gui-inline>
                    </gui-field>
                    <gui-field label="间距">
                      <b-input-number v-model="selfConfig.legend.itemGap" size="small"
                                      :min="0" :max="50" @on-change="setSelfProperty"></b-input-number>
                    </gui-field>
                    <gui-field label="位置">
                      <el-select v-model="selfConfig.legend.position" size="mini"
                                 @change="legendPosChange" :value="selfConfig.legend.position">
                        <el-option
                          v-for="item in legendPosOptions"
                          :key="item.value"
                          :label="item.label"
                          :value="item.value">
                        </el-option>
                      </el-select>
                    </gui-field>
                    <gui-field label="样式">
                      <el-select v-model="selfConfig.legend.icon" size="mini"
                                 @change="setSelfProperty" :value="selfConfig.legend.icon">
                        <el-option
                          v-for="item in legendIconOptions"
                          :key="item.value"
                          :label="item.label"
                          :value="item.value">
                        </el-option>
                      </el-select>
                    </gui-field>
                  </gui-wrap>
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
                                       @change="setSelfProperty"></el-color-picker>
                    </gui-inline>
                  </gui-field>
                  <gui-field label="倾斜角度">
                    <b-input-number v-model="selfConfig.xAxis.axisLabel.rotate" size="small"
                                    :min="0" :max="90" @on-change="setSelfProperty"></b-input-number>
                  </gui-field>
                  <gui-wrap label="轴线" v-model="selfConfig.xAxis.axisLine.show" @on-change="setSelfProperty">
                    <gui-field label="轴线颜色">
                      <el-color-picker v-model="selfConfig.xAxis.axisLine.lineStyle.color"
                                       show-alpha @change="setSelfProperty"></el-color-picker>
                    </gui-field>
                  </gui-wrap>
                  <gui-wrap label="网格线" v-model="selfConfig.xAxis.splitLine.show" @on-change="setSelfProperty">
                    <gui-field label="网格线颜色">
                      <el-color-picker v-model="selfConfig.xAxis.splitLine.lineStyle.color"
                                       show-alpha @change="setSelfProperty"></el-color-picker>
                    </gui-field>
                  </gui-wrap>
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
                                       @change="setSelfProperty"></el-color-picker>
                    </gui-inline>
                  </gui-field>
                  <gui-wrap label="轴线" v-model="selfConfig.yAxis.axisLine.show" @on-change="setSelfProperty">
                    <gui-field label="轴线颜色">
                      <el-color-picker v-model="selfConfig.yAxis.axisLine.lineStyle.color"
                                       show-alpha @change="setSelfProperty"></el-color-picker>
                    </gui-field>
                  </gui-wrap>
                  <gui-wrap label="网格线" v-model="selfConfig.yAxis.splitLine.show" @on-change="setSelfProperty">
                    <gui-field label="网格线颜色">
                      <el-color-picker v-model="selfConfig.yAxis.splitLine.lineStyle.color"
                                       show-alpha @change="setSelfProperty"></el-color-picker>
                    </gui-field>
                  </gui-wrap>
                </b-collapse-panel>
              </template>
              <!--数据系列-->
              <template v-if="selfConfig.series">
                <b-collapse-panel title="数据系列" name="series">
                  <gui-field label="近似曲线">
                    <b-switch v-model="selfConfig.series.smooth" size="small" @on-change="setSelfProperty"></b-switch>
                  </gui-field>
                  <gui-wrap label="指标"
                            v-model="selfConfig.series.label.normal.show" @on-change="setSelfProperty">
                    <gui-field label="指标文本">
                      <gui-inline label="字号">
                        <b-input-number v-model="selfConfig.series.label.normal.fontSize" size="small"
                                        :min="12" :max="40" @on-change="setSelfProperty"></b-input-number>
                      </gui-inline>
                      <gui-inline label="颜色">
                        <el-color-picker v-model="selfConfig.series.label.normal.color"
                                         @change="setSelfProperty"></el-color-picker>
                      </gui-inline>
                    </gui-field>
                  </gui-wrap>
                  <gui-wrap label="区域渐变" :value="true" simple>
                    <gui-field label="区域透明度">
                      <b-input-number v-model="selfConfig.series.areaStyle.opacity" size="small"
                                      :max="1" :step="0.1" @on-change="setSelfProperty"></b-input-number>
                    </gui-field>
                  </gui-wrap>
                </b-collapse-panel>
              </template>
              <template v-if="selfConfig.colors">
                <b-collapse-panel title="颜色数组" name="colors">
                  <div style="padding: 5px 13px;">
                    <gui-colors v-for="(c,index) of selfConfig.colors" :key="index+c">
                      <el-color-picker v-model="selfConfig.colors[index]" :predefine="predefineColors"
                                       @change="setSelfProperty"></el-color-picker>
                    </gui-colors>
                  </div>
                </b-collapse-panel>
              </template>
            </b-collapse>
          </div>
          <div v-else-if="tabsType===1">
            <gui-group group-name="数据映射">
              <gui-field label="x">
                <b-input v-model="apis.labelMap.x" size="mini" @on-change="setApiLabelMap"></b-input>
              </gui-field>
              <gui-field label="y">
                <b-input v-model="apis.labelMap.y" size="mini" @on-change="setApiLabelMap"></b-input>
              </gui-field>
              <gui-field label="s">
                <b-input v-model="apis.labelMap.s" size="mini" @on-change="setApiLabelMap"></b-input>
              </gui-field>
            </gui-group>
            <gui-group group-name="数据源">
              <div style="padding: 6px;">
                <b-input v-model="dataSource" type="textarea" @on-keyup.delete.stop autosize
                         placeholder="enter json data..." @on-change="dataSourceChange"></b-input>
              </div>
            </gui-group>
          </div>
          <div v-else>
            <div flex="main:center">暂无交互事件</div>
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
  import { setBaseProperty } from '../../../api/canvasMaps/canvas-maps-request'
  import { resetPageSettings, setPageSettings } from '../../../api/app/app-request'
  import GuiGroup from './gui-group'
  import GuiWrap from './gui-wrap'
  import GuiField from './gui-field'
  import GuiInline from './gui-inline'
  import GuiColors from './gui-colors'
  import { DEFAULT_COLORS } from '../../../utils/defaultColors'

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
        apiData: {},
        apis: {},
        predefineColors: DEFAULT_COLORS,
        dataSource: '',
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
      // 设置数据映射
      setApiLabelMap () {
        this.$store.dispatch('SetApis', this.apis)
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
      // 图例位置改变事件
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
      },
      // 数据源改变事件
      dataSourceChange () {
        try {
          let source = JSON.parse(this.dataSource)
          this.apiData.source = [...source]
          this.$store.dispatch('SetSelfDataSource', this.apiData)
          // 发送请求来保存数据
          setBaseProperty(this.currentSelected)
        } catch (e) {
          console.warn('source is not a json string')
        }
      }
    },
    watch: {
      currentSelected: {
        handler (val) {
          if (val && val.packageJson) {
            this.baseProperty = { ...val.packageJson.view }
            this.selfConfig = Object.assign(this.selfConfig, val.packageJson.config)
            this.apiData = Object.assign(this.apiData, val.packageJson.api_data)
            this.apis = Object.assign(this.apis, val.packageJson.apis)
            this.dataSource = JSON.stringify(this.apiData.source)
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
    components: { GuiGroup, GuiField, GuiInline, GuiColors, GuiWrap }
  }
</script>
