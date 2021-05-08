import { EMPTY_CURRENCY_NAMES, EMPTY_LATEST_RATES } from '@/data'
import { CurrencyNames, LatestRates } from '@/models'

export class OpenExchangeRatesService {
  private baseUrl: URL;

  constructor (
    private appId: string = process.env.VUE_APP_OPENAPI_API_ID,
    private apiHost = 'https://openexchangerates.org/'
  ) {
    this.baseUrl = new URL(apiHost)
  }

  /**
   * ## Prototype Fetch
   * _A lightweight wrapper around browser fetch API._
   *
   * Allows for casting to user defined models,
   * and provides surface area for notification and error handlers.
   *
   */
  private async fetch<T> (url: URL, options?: RequestInit, fallback?: any) {
    try {
      const response = await fetch(url.href, options)
      return (await response.json()) as T
    } catch (error) {
      // Error reporting service - There was a network error
      return fallback
    }
  }

  /**
   * ## GET all supported currencies
   * _Retrieve all currencies supported by the API._
   *
   * Returns a keyvalue indexed object of currencies that can be queried.
   *
   */
  private async getSupportedCurrencies (): Promise<CurrencyNames> {
    const url = new URL('api/currencies.json', this.baseUrl)

    return await this.fetch<CurrencyNames>(
      url,
      {
        method: 'GET'
      },
      EMPTY_CURRENCY_NAMES
    )
  }

  /**
   * ## GET conversion rates for all pairs in base currency
   * _Returns a list of all supported currencies, and their spot rates relative to the base currency for this App ID (USD)._
   *
   */
  private async getLatestRates (): Promise<LatestRates> {
    const url = new URL('api/latest.json', this.baseUrl)
    url.searchParams.append('app_id', process.env.VUE_APP_OPENAPI_API_ID)

    return await this.fetch<LatestRates>(
      url,
      {
        method: 'GET'
      },
      EMPTY_LATEST_RATES
    )
  }

  /**
   * ## Public Proxy Interface for this service
   *
   */
  public get request (): {
    latest: () => Promise<LatestRates>;
    names: () => Promise<CurrencyNames>;
    } {
    return {
      latest: () => this.getLatestRates(),
      names: () => this.getSupportedCurrencies()
    }
  }
}
