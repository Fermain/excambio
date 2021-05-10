import { EMPTY_CURRENCY_NAMES, EMPTY_LATEST_RATES } from '@/data'
import { CurrencyNames, LatestRates } from '@/models'
import { OpenExchangeRatesService } from '@/services'
import { State } from '@/store'
import { ActionContext } from 'vuex'

const service = new OpenExchangeRatesService()

export async function getCurrencyNames (
  context: ActionContext<State, State>
): Promise<CurrencyNames> {
  const names = await service.request.names()
  context.commit('updateCurrencyNames', names)
  return names
}

export async function updateCurrencyNames (
  context: ActionContext<State, State>,
  names: CurrencyNames
): Promise<CurrencyNames> {
  context.commit('updateCurrencyNames', names)
  return names
}

export async function resetCurrencyNames (
  context: ActionContext<State, State>
): Promise<CurrencyNames> {
  context.commit('updateCurrencyNames', EMPTY_CURRENCY_NAMES)
  return EMPTY_CURRENCY_NAMES
}

export async function getCurrencyRates (
  context: ActionContext<State, State>
): Promise<LatestRates> {
  const latest = await service.request.latest()
  context.commit('updateCurrencyRates', latest)
  return latest
}

export async function updateCurrencyRates (
  context: ActionContext<State, State>,
  latest: LatestRates
): Promise<LatestRates> {
  context.commit('updateCurrencyRates', latest)
  return latest
}

export async function resetCurrencyRates (
  context: ActionContext<State, State>
): Promise<LatestRates> {
  context.commit('updateCurrencyRates', EMPTY_LATEST_RATES)
  return EMPTY_LATEST_RATES
}

export async function getHistoricalRate (
  context: ActionContext<State, State>,
  date: Date
): Promise<LatestRates> {
  const factor = 86400
  const match = context.state.history.find(entry => Math.round(entry.timestamp / factor) === Math.round(date.getTime() / 1000 / factor))
  if (!match) {
    const rates = await service.request.history(date)
    context.commit('setHistoricalRate', rates)
    return rates
  } else {
    return EMPTY_LATEST_RATES
  }
}

export async function resetHistoricalRates (
  context: ActionContext<State, State>,
  date: Date
): Promise<void> {
  context.commit('resetHistoricalRates')
}
