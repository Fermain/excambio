export interface CurrencyList {
    [key: string]: string
}

export class OpenExchangeRatesService {
    constructor(private appId: string, private baseUrl = 'https://openexchangerates.org/api') {}

    /**
     * ## Prototype Fetch
     * _A lightweight wrapper around browser fetch API._
     * 
     * Allows for casting to user defined models, 
     * and provides surface area for notification and error handlers.
     *
     */
    private async fetch<T>(url: URL) {
        try {
            const response = await fetch(url.href)
            return await response.json() as T
        } catch(error) {
            // Error reporting service - There was a network error
            return {}
        }
    }

    /**
     * ## Get all supported currencies
     * _Retrieve all currencies supported by the API._
     * 
     * Returns a keyvalue indexed object of currencies that can be queried.
     *
     */
    private async getSupportedCurrencies(): Promise<CurrencyList> {
        const url = new URL(`${this.baseUrl}/currencies.json`)

        return await this.fetch<CurrencyList>(url);
    }

    
}