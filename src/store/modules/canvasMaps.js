import { addCanvasMap, copyCanvasMap, removeCanvasMap } from '../../api/canvasMaps/canvas-maps-request'

const canvasMaps = {
  state: {
    canvasMap: [], // 画布中的组件，默认插入一个用于调试可动态添加，暂时写死，后期用lowdb缓存
    singleSelected: null, // 单选选中的可拖拽组件
    contextMenuInfo: { x: 0, y: 0, isShow: false }
  },
  mutations: {
    SET_CANVAS_MAPS (state, maps) {
      state.canvasMap = [...maps]
    },
    ADD_CANVAS_MAP (state, nodeInfo) {
      state.canvasMap.push(nodeInfo)
    },
    // 单选组件
    SINGLE_SELECT (state, item) {
      if (state.singleSelected === item) return
      state.singleSelected = item
      if (state.singleSelected) {
        console.warn('===single select===' + item.id)
      }
    },
    // 设置右键菜单信息
    SET_CONTEXT_MENU_INFO (state, info) {
      state.contextMenuInfo = info
    },
    // 设置当前选中的基本属性
    SET_CURRENT_BASE_PROPERTY (state, transformData) {
      state.singleSelected.packageJson.view = { ...transformData }
      let current = state.canvasMap.find(item => {
        return item.id === state.singleSelected.id
      })
      if (current) {
        current.packageJson.view = { ...transformData }
      }
    },
    // 设置当前选中的自有属性
    SET_CURRENT_SELF (state, { data, property }) {
      state.singleSelected.packageJson[property] = { ...data }
      let current = state.canvasMap.find(item => {
        return item.id === state.singleSelected.id
      })
      if (current) {
        current.packageJson[property] = { ...data }
      }
    }
  },
  actions: {
    InitCanvasMaps ({ commit }, maps) {
      commit('SET_CANVAS_MAPS', maps)
    },
    AddCanvasMap ({ commit }, nodeInfo) {
      addCanvasMap(nodeInfo).then(() => {
        commit('ADD_CANVAS_MAP', nodeInfo)
      })
    },
    SingleSelected ({ commit }, selectItem) {
      commit('SINGLE_SELECT', selectItem)
    },
    ToggleContextMenu ({ commit }, info) {
      let menuInfo = info ? Object.assign({}, info, { isShow: true }) : { x: 0, y: 0, isShow: false }
      commit('SET_CONTEXT_MENU_INFO', menuInfo)
    },
    HideContextMenu ({ commit }) {
      commit('SET_CONTEXT_MENU_INFO', { x: 0, y: 0, isShow: false })
    },
    ContextMenuCommand ({ commit, state }, order) {
      commit('SET_CONTEXT_MENU_INFO', { x: 0, y: 0, isShow: false })
      console.log(order)
      switch (order) {
        case 'copy':
          // 如果是复制操作，则传入当前选中的值
          copyCanvasMap(state.singleSelected).then(res => {
            let last = res.data[res.data.length - 1]
            commit('SET_CANVAS_MAPS', res.data)
            commit('SINGLE_SELECT', last)
          })
          break
        case 'remove':
          // 如果是删除操作，则需要删除并更新当前的canvasMaps，并默认设置当前选中为空
          removeCanvasMap(state.singleSelected).then(res => {
            commit('SET_CANVAS_MAPS', res.data)
            commit('SINGLE_SELECT', null)
          })
          break
      }
    },
    SetBaseProperty ({ commit, state }, transformData) {
      if (state.singleSelected) {
        commit('SET_CURRENT_BASE_PROPERTY', transformData)
      }
    },
    SetSelfProperty ({ commit, state }, config) {
      if (state.singleSelected) {
        commit('SET_CURRENT_SELF', { data: config, property: 'config' })
      }
    },
    SetApis ({ commit, state }, apis) {
      if (state.singleSelected) {
        commit('SET_CURRENT_SELF', { data: apis, property: 'apis' })
      }
    },
    SetSelfDataSource ({ commit, state }, source) {
      if (state.singleSelected) {
        commit('SET_CURRENT_SELF', { data: source, property: 'api_data' })
      }
    }
  }
}
export default canvasMaps
