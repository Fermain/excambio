import { Currency } from '@/models'
import { State } from '../state'

export function currencyList (state: State): Currency[] {
  return Object.entries(state.names).map(keyvalue => {
    return {
      code: keyvalue[0],
      name: keyvalue[1],
      rate: state.latest.rates[keyvalue[0]]
    } as Currency
  })
}

export function currencyListSearchFilter (state: State, getters: Record<string, any>): Currency[] {
  return getters.currencyList.filter((currency: Currency) => {
    const fields = [currency.name, currency.code]
    return Boolean(fields.filter(field => field.toLowerCase().search(state.search.toLowerCase()) !== -1).length)
  })
}

export function searchParams (state: State): {
    v?: string
    c?: string
    q?: string
  } {
  let params = {}

  const codes = state.selected.map((currency: Currency) => currency.code).filter(Boolean)

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
