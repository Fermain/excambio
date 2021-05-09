
import { createStore } from 'vuex'
import VuexPersistence from 'vuex-persist'
import * as actions from './actions'
import * as getters from './getters'
import * as mutations from './mutations'
import { state, State } from './state'

export * from './state'

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
