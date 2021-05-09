
import { createStore } from 'vuex'
import VuexPersistence from 'vuex-persist'
import * as actions from './actions'
import * as getters from './getters'
import * as mutations from './mutations'
import { state, State } from './state'

const vuexLocal = new VuexPersistence<State>({
  storage: window.localStorage
})

export const store = createStore<State>({
  state,
  getters,
  mutations,
  actions,
  plugins: [vuexLocal.plugin]
})

export * from './state'
export * as getters from './getters'
export * as mutations from './mutations'
export * as actions from './actions'
