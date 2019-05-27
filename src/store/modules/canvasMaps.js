const testMap = {
  id: 'node-test', // 唯一标识
  type: 'transform-block', // 类型
  innerHTML: '拖拽区块' // 描述
}
const _array = require('lodash/array')
const canvasMaps = {
  state: {
    canvasMap: [testMap], // 画布中的组件，默认插入一个用于调试可动态添加，暂时写死，后期用lowdb缓存
    singleSelected: null, // 单选选中的可拖拽组件
    contextMenuInfo: { x: 0, y: 0, isShow: false }
  },
  mutations: {
    ADD_CANVAS_MAP (state, nodeInfo) {
      state.canvasMap.push(nodeInfo)
    },
    // 删除当前选中的
    REMOVE_CANVAS_MAP (state) {
      const index = state.canvasMap.indexOf(state.singleSelected)
      if (index !== -1) {
        state.canvasMap.splice(index, 1)
        state.singleSelected = null
      }
    },
    SINGLE_SELECT (state, item) {
      state.singleSelected = item
      if (state.singleSelected) {
        console.warn('===single select===' + item.id)
      }
    },
    SET_CONTEXT_MENU_INFO (state, info) {
      state.contextMenuInfo = info
    }
  },
  actions: {
    AddCanvasMap ({ commit }, nodeInfo) {
      commit('ADD_CANVAS_MAP', nodeInfo)
    },
    SingleSelected ({ commit }, selectItem) {
      commit('SINGLE_SELECT', selectItem)
    },
    ToggleContextMenu ({ commit }, info) {
      let menuInfo = info ? Object.assign({}, info, { isShow: true }) : { x: 0, y: 0, isShow: false }
      commit('SET_CONTEXT_MENU_INFO', menuInfo)
    },
    ContextMenuCommand ({ commit, state }, order) {
      console.log(`执行${order}命令删除${state.singleSelected.id}`)
      commit('SET_CONTEXT_MENU_INFO', { x: 0, y: 0, isShow: false })
      // 如果是删除
      if (order === 'remove') {
        commit('REMOVE_CANVAS_MAP')
      }
    }
  }
}
export default canvasMaps
