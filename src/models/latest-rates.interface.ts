import { CurrencyRates } from './currency-rates.interface'

export interface LatestRates {
  disclaimer: string;
  license: string;
  timestamp: number;
  base: string;
  rates: CurrencyRates;
}
