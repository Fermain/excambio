import { EMPTY_CURRENCY_NAMES, EMPTY_LATEST_RATES } from '@/data'
import { CurrencyNames, LatestRates } from '@/models'
import { OpenExchangeRatesService } from '@/services'
import { InjectionKey } from 'vue'

import { createStore, Store } from 'vuex'

const service = new OpenExchangeRatesService()

export interface State {
  names: CurrencyNames;
  rates: LatestRates;
  loading: boolean;
}

export const key: InjectionKey<Store<State>> = Symbol('App')

export const store = createStore<State>({
  state: {
    names: EMPTY_CURRENCY_NAMES,
    rates: EMPTY_LATEST_RATES,
    loading: true
  },
  mutations: {
    updateCurrencyNames (state, names: CurrencyNames) {
      state.names = names
    },
    updateCurrencyRates (state, rates: LatestRates) {
      state.rates = rates
    },
    updateLoadStatus (state, value: boolean) {
      state.loading = value
    }
  },
  actions: {
    async getCurrencyNames (context) {
      const names = await service.request.names()
      context.commit('updateCurrencyNames', names)
      return names
    },
    async updateCurrencyNames (context, names: CurrencyNames) {
      context.commit('updateCurrencyNames', names)
      return names
    },
    async resetCurrencyNames (context) {
      context.commit('updateCurrencyNames', {})
      return {}
    },
    async getCurrencyRates (context) {
      const rates = await service.request.rates()
      context.commit('updateCurrencyRates', rates)
      return rates
    },
    async updateCurrencyRates (context, rates: LatestRates) {
      context.commit('updateCurrencyRates', rates)
      return rates
    },
    async resetCurrencyRates (context) {
      context.commit('updateCurrencyRates', {})
      return {}
    },
    async updateLoadStatus (context, value: boolean) {
      context.commit('updateLoadStatus', value)
      return value
    }
  }
})
