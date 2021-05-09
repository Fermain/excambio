import { EMPTY_CURRENCY_NAMES, EMPTY_LATEST_RATES } from '@/data'
import { Currency, CurrencyNames, LatestRates } from '@/models'
import { OpenExchangeRatesService } from '@/services'
import { InjectionKey } from 'vue'
import VuexPersistence from 'vuex-persist'

import { createStore, Store } from 'vuex'
import router from '@/router'

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
    },
    searchParams (state): {
      v?: string
      c?: string
      q?: string
    } {
      let params = {}

      const codes = state.selected.map(currency => currency.code).filter(Boolean)

      if (codes.length) {
        if (state.value >= 1) {
          params = {
            ...params,
            v: state.value.toFixed(0)
          }
        }

        params = {
          ...params,
          c: codes.toString()
        }
      }

      if (state.search) {
        params = {
          ...params,
          q: state.search
        }
      }

      return params
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
        context.dispatch('updateSearchParams')
      }
    },
    async removeSelected (context, value: Currency) {
      context.commit('updateSelected', context.state.selected.filter(currency => currency.code !== value.code))
      context.dispatch('updateSearchParams')
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
      context.dispatch('updateSearchParams')
    },
    async setConversionValue (context, value = 1) {
      context.commit('setConversionValue', value)
      context.dispatch('updateSearchParams')
    },
    async updateSearchParams (context) {
      if (router.currentRoute.value.name) {
        await router.push({
          name: router.currentRoute.value.name,
          query: context.getters.searchParams
        })
      }
    },
    async applyQueryState (context) {
      const codes = (router.currentRoute.value.query.c as string)?.split(',')
      const value = Number(router.currentRoute.value.query.v)
      const term = router.currentRoute.value.query.q as string

      if (codes && codes.length) {
        codes.map(code => {
          return context.getters.currencyList.find((currency: Currency) => currency.code === code)
        }).filter(Boolean).forEach(currency => {
          context.dispatch('pushSelected', currency)
        })
      }

      if (value) {
        context.dispatch('setConversionValue', value)
      }

      context.dispatch('setSearchTerm', term)
    }
  },
  plugins: [vuexLocal.plugin]
})
