
import { CurrencyNames, LatestRates } from '@/models'
import OpenExchangeRatesService from '@/services/open-exchange-rates.service'

import { createStore } from 'vuex'

const service = new OpenExchangeRatesService(process.env.VUE_APP_OPENAPI_API_ID)

export default createStore({
  state: {
    names: {},
    rates: {}
  },
  mutations: {
    updateCurrencyNames (state, names: CurrencyNames) {
      state.names = names
    },
    updateCurrencyRates (state, rates: LatestRates) {
      state.rates = rates
    }
  },
  actions: {
    async getCurrencyNames (context) {
      const names = await service.request.names()
      context.commit('updateCurrencyNames', names)
    },
    updateCurrencyNames (context, names: CurrencyNames) {
      context.commit('updateCurrencyNames', names)
    },
    resetCurrencyNames (context) {
      context.commit('updateCurrencyNames', {})
    },
    async getCurrencyRates (context) {
      const rates = await service.request.rates()
      context.commit('updateCurrencyRates', rates)
    },
    updateCurrencyRates (context, rates: LatestRates) {
      context.commit('updateCurrencyRates', rates)
    },
    resetCurrencyRates (context) {
      context.commit('updateCurrencyRates', {})
    }
  }
})
