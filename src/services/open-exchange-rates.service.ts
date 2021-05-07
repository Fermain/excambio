import { Conversion, CurrencyNames, LatestRates } from '@/models'

export default class OpenExchangeRatesService {
  private baseUrl: URL;

  constructor (
    private appId: string,
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
  private async fetch<T> (url: URL, options?: RequestInit) {
    try {
      const response = await fetch(url.href, options)
      return (await response.json()) as T
    } catch (error) {
      // Error reporting service - There was a network error
      return {}
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

    return await this.fetch<CurrencyNames>(url, {
      method: 'GET'
    })
  }

  /**
   * ## GET conversion rate for a given pair
   * _Calculate exchange value of a given sum converting out of "from" currency and into "to" currency_
   *
   */
  private async getConversionRateForPair (
    value: number,
    from: string,
    to: string
  ): Promise<Conversion | Record<string, unknown>> {
    const url = new URL(`api/convert/${value}/${from}/${to}`, this.baseUrl)
    url.searchParams.append('app_id', process.env.VUE_APP_OPENAPI_API_ID)

    return await this.fetch<Conversion>(url, {
      method: 'GET'
    })
  }

  /**
   * ## GET conversion rates for all pairs in base currency
   * _Returns a list of all supported currencies, and their spot rates relative to the base currency for this App ID (USD)._
   *
   */
  private async getLatestRates (): Promise<LatestRates | Record<string, unknown>> {
    const url = new URL('api/latest.json', this.baseUrl)
    url.searchParams.append('app_id', process.env.VUE_APP_OPENAPI_API_ID)

    return await this.fetch<LatestRates>(url, {
      method: 'GET'
    })
  }

  /**
   * ## Public Interface for this service
   *
   */
  public get request () {
    return {
      rates: () => this.getLatestRates(),
      names: () => this.getSupportedCurrencies(),
      conversion: (value: number, from: string, to: string) =>
        this.getConversionRateForPair(value, from, to)
    }
  }
}
