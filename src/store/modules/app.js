import NodeInfo from '../nodeInfo'

const testMap = new NodeInfo({
  id: 'node-test', // 唯一标识
  type: 'transform-block', // 类型
  innerHTML: '拖拽区块' // 描述
})

const app = {
  state: {
    canvasRange: 0, // 画布缩放
    canvasMap: [testMap], // 画布中的组件，默认插入一个用于调试可动态添加，暂时写死，后期用lowdb缓存
    optionsExpand: true // 参数面板打开关闭
  },
  mutations: {
    SET_CANVAS_RANGE: (state, val) => {
      state.canvasRange = val
    },
    SET_OPTIONS_EXPAND: (state) => {
      state.optionsExpand = !state.optionsExpand
    },
    ADD_CANVAS_MAP: (state, nodeInfo) => {
      state.canvasMap.push(nodeInfo)
    }
  },
  actions: {
    SetCanvasRange: ({ commit }, val) => {
      commit('SET_CANVAS_RANGE', val)
    },
    ToggleOptionsExpand: ({ commit }) => {
      commit('SET_OPTIONS_EXPAND')
    },
    AddCanvasMap: ({ commit }, nodeInfo) => {
      commit('ADD_CANVAS_MAP', nodeInfo)
    }
  }
}
export default app
