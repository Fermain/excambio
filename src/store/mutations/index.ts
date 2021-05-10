import { CurrencyNames, LatestRates, Currency } from '@/models'
import { State } from '@/store'

export function updateCurrencyNames (state: State, names: CurrencyNames): void {
  state.names = names
}

export function updateCurrencyRates (state: State, latest: LatestRates): void {
  state.latest = latest
}

export function updateLoadStatus (state: State, value: boolean): void {
  state.loading = value
}

export function updateSelected (state: State, currencies: Currency[]): void {
  state.selected = currencies
}

export function setSearchTerm (state: State, term: string): void {
  state.search = term
}

export function setConversionValue (state: State, value: number): void {
  state.value = value
}

export function setHistoricalRate (state: State, value: LatestRates): void {
  const factor = 86400
  const match = state.history.find(entry => Math.round(entry.timestamp / factor) === Math.round(value.timestamp / factor))
  if (!match) {
    state.history = [
      ...state.history,
      value
    ]
  }
}

export function resetHistoricalRates (state: State): void {
  state.history = []
}
