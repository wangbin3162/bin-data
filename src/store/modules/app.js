import { getPageSettings } from '../../api/app/appRequest'

let debug = process.env.NODE_ENV !== 'production'

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
    SET_PAGE_SETTING: (state, setting) => {
      state.canvasPanel = setting.canvasPanel
      state.backgroundColor = setting.backgroundColor
      state.gridStep = setting.gridStep
    }
  },
  actions: {
    SetCanvasRange: ({ commit }, val) => {
      commit('SET_CANVAS_RANGE', val)
    },
    ToggleOptionsExpand: ({ commit }) => {
      commit('SET_OPTIONS_EXPAND')
    },
    GetPageSettings: ({ commit, dispatch }) => {
      return new Promise((resolve, reject) => {
        dispatch('dataStore/get', { key: 'app' }).then(response => {
          commit('SET_PAGE_SETTING', response.data)
          resolve(response)
        }).catch(error => reject(error))
        // 请求页面参数设置暂时跳过
        if (debug) return
        getPageSettings().then(response => {
          resolve(response)
        }).catch(error => reject(error))
      })
    },
    SetPageSettings: ({ commit, dispatch }, setting) => {
      return new Promise((resolve, reject) => {
        dispatch('dataStore/set', { key: 'app', value: setting }).then(response => {
          commit('SET_PAGE_SETTING', response.data)
          resolve(response)
        }).catch(error => reject(error))
        // 请求页面参数设置暂时跳过
      })
    },
    ResetDataBase: ({ commit, dispatch }) => {
      return new Promise((resolve, reject) => {
        dispatch('dataStore/resetDataBase', { key: 'app' }).then(response => {
          commit('SET_PAGE_SETTING', response.data)
          resolve(response)
        }).catch(error => reject(error))
        // 请求页面参数设置暂时跳过
      })
    }
  }
}

export default app
