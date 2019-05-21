const app = {
  state: {
    // 需要进行db的数据
    canvasPanel: { width: 1920, height: 1080 }, // 全局面包的宽高
    backgroundColor: '#0d2a42', // 背景颜色
    gridStep: 8, // 栅格间距
    // 状态数据
    canvasRange: 0, // 画布缩放
    optionsExpand: true // 参数面板打开关闭
  },
  mutations: {
    SET_CANVAS_RANGE: (state, val) => {
      state.canvasRange = val
    },
    SET_OPTIONS_EXPAND: (state) => {
      state.optionsExpand = !state.optionsExpand
    },
    SET_GRID_STEP: (state, val) => {
      state.gridStep = val
    }
  },
  actions: {
    SetCanvasRange: ({ commit }, val) => {
      commit('SET_CANVAS_RANGE', val)
    },
    ToggleOptionsExpand: ({ commit }) => {
      commit('SET_OPTIONS_EXPAND')
    },
    SetGridStep: ({ commit }, val) => {
      commit('SET_GRID_STEP', val)
    }
  }
}
export default app
