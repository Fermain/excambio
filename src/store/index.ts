import { EMPTY_CURRENCY_NAMES, EMPTY_LATEST_RATES } from '@/data'
import { Currency, CurrencyNames, LatestRates } from '@/models'
import { OpenExchangeRatesService } from '@/services'
import { InjectionKey } from 'vue'
import VuexPersistence from 'vuex-persist'

import { createStore, Store } from 'vuex'

const service = new OpenExchangeRatesService()

export interface State {
  value: number;
  search: string;
  names: CurrencyNames;
  latest: LatestRates;
  selected: Currency[];
  loading: boolean;
}

const vuexLocal = new VuexPersistence<State>({
  storage: window.localStorage
})

export const key: InjectionKey<Store<State>> = Symbol('App')

export const store = createStore<State>({
  state: {
    value: 1,
    search: '',
    names: EMPTY_CURRENCY_NAMES,
    latest: EMPTY_LATEST_RATES,
    selected: [],
    loading: true
  },
  mutations: {
    updateCurrencyNames (state, names: CurrencyNames) {
      state.names = names
    },
    updateCurrencyRates (state, latest: LatestRates) {
      state.latest = latest
    },
    updateLoadStatus (state, value: boolean) {
      state.loading = value
    },
    updateSelected (state, currencies: Currency[]) {
      state.selected = currencies
    },
    setSearchTerm (state, term: string) {
      state.search = term
    },
    setConversionValue (state, value: number) {
      state.value = value
    }
  },
  getters: {
    currencyList (state): Currency[] {
      return Object.entries(state.names).map(keyvalue => {
        return {
          code: keyvalue[0],
          name: keyvalue[1],
          rate: state.latest.rates[keyvalue[0]]
        } as Currency
      })
    },
    currencyListSearchFilter (state, getters): Currency[] {
      return getters.currencyList.filter((currency: Currency) => {
        const fields = [currency.name, currency.code]
        return Boolean(fields.filter(field => field.toLowerCase().search(state.search.toLowerCase()) !== -1).length)
      })
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
      const latest = await service.request.latest()
      context.commit('updateCurrencyRates', latest)
      return latest
    },
    async updateCurrencyRates (context, latest: LatestRates) {
      context.commit('updateCurrencyRates', latest)
      return latest
    },
    async resetCurrencyRates (context) {
      context.commit('updateCurrencyRates', {})
      return {}
    },
    async updateLoadStatus (context, value: boolean) {
      context.commit('updateLoadStatus', value)
      return value
    },
    async pushSelected (context, value: Currency) {
      const match = context.state.selected.find(currency => currency.code === value.code)
      if (!match) {
        context.commit('updateSelected', [
          ...context.state.selected,
          value
        ])
      }
    },
    async removeSelected (context, value: Currency) {
      context.commit('updateSelected', context.state.selected.filter(currency => currency.code !== value.code))
    },
    async toggleSelected (context, value: Currency) {
      const match = context.state.selected.find(currency => currency.code === value.code)

      if (match) {
        context.dispatch('removeSelected', value)
      } else {
        context.dispatch('pushSelected', value)
      }
    },
    async setSearchTerm (context, term = '') {
      context.commit('setSearchTerm', term)
    },
    async setConversionValue (context, value = 1) {
      context.commit('setConversionValue', value)
    }
  },
  plugins: [vuexLocal.plugin]
})
