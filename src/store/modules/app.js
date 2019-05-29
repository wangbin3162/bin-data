const app = {
  state: {
    pageSettings: { width: 1920, height: 1080, backgroundColor: '#0d2a42', gridStep: 1 },
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
    SET_PAGE_SETTING: (state, setting) => {
      state.pageSettings = { ...setting }
    }
  },
  actions: {
    SetCanvasRange: ({ commit }, val) => {
      commit('SET_CANVAS_RANGE', val)
    },
    ToggleOptionsExpand: ({ commit }) => {
      commit('SET_OPTIONS_EXPAND')
    },
    SetPageSettings: ({ commit }, setting) => {
      commit('SET_PAGE_SETTING', setting)
    }
  }
}

export default app
