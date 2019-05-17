import Vue from 'vue'
import Vuex from 'vuex'
import app from './modules/app'

Vue.use(Vuex)

const getters = {
  canvasRange: state => state.app.canvasRange,
  canvasMap: state => state.app.canvasMap,
  optionsExpand: state => state.app.optionsExpand
}

export default new Vuex.Store({
  modules: {
    app
  },
  getters
})
