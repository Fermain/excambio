export interface CurrencyList {
  [key: string]: string;
}

export class OpenExchangeRatesService {
  private baseUrl: URL;

  constructor (
    private appId: string,
    private apiPath = 'https://openexchangerates.org/'
  ) {
    this.baseUrl = new URL(apiPath)
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
  private async getSupportedCurrencies (): Promise<CurrencyList> {
    const url = new URL('api/currencies.json', this.baseUrl)

    return await this.fetch<CurrencyList>(url, {
      method: 'GET'
    })
  }

  public get request () {
    return {
      currencies: () => this.getSupportedCurrencies()
    }
  }
}
