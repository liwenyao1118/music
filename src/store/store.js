import Vue from 'vue'
import Vuex from 'vuex'
import state from './states.js'
import * as getters from './getters.js'
import * as actions from './actions'
import mutations from './mutations.js'
Vue.use(Vuex)

export default new Vuex.Store({
  state,
  getters,
  mutations,
  actions
})
