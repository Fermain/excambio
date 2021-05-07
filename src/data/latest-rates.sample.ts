import { LatestRates } from '@/models'
import { EMPTY_CURRENCY_RATES } from './currency-rates.sample'

export const EMPTY_LATEST_RATES: LatestRates = {
  license: '',
  disclaimer: '',
  timestamp: Date.now(),
  base: '',
  rates: EMPTY_CURRENCY_RATES
}
