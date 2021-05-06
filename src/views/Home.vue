<template>
  <div class="home">
    <h1>Excambio</h1>
    <ul>
      <li v-for="(value, key) in currencies" :key="key">
        <b>{{ key }}:</b> {{value}}
      </li>
    </ul>
  </div>
</template>

<script lang="ts">
import { CurrencyNames, OpenExchangeRatesService } from '@/services/open-exchange-rates.service'
import { Vue } from 'vue-class-component'

export default class Home extends Vue {
  private service = new OpenExchangeRatesService('')

  private currencies: CurrencyNames = {}

  async mounted (): Promise<void> {
    this.currencies = await this.service.request.currencies()
  }
}
</script>
