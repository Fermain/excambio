import { EMPTY_CURRENCY_NAMES, EMPTY_LATEST_RATES } from '@/data'
import { CurrencyNames, LatestRates, Currency } from '@/models'
import { InjectionKey } from 'vue'
import { Store } from 'vuex'

export interface State {
  value: number;
  search: string;
  names: CurrencyNames;
  latest: LatestRates;
  selected: Currency[];
  loading: boolean;
  history: LatestRates[];
}

export const key: InjectionKey<Store<State>> = Symbol('Excambio')

export const state = {
  value: 1,
  search: '',
  names: EMPTY_CURRENCY_NAMES,
  latest: EMPTY_LATEST_RATES,
  selected: new Array<Currency>(),
  loading: true,
  history: new Array<LatestRates>()
}
