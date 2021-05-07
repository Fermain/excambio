<template>
  <div id="nav">
    <router-link to="/">Home</router-link>
  </div>
  <router-view/>
</template>

<script lang="ts">
import { CurrencyNames, LatestRates } from '@/models'
import { Options, Vue } from 'vue-class-component'
import { mapActions } from 'vuex'

@Options({
  methods: {
    ...mapActions({
      getCurrencyNames: 'getCurrencyNames',
      resetCurrencyNames: 'resetCurrencyNames',
      getCurrencyRates: 'getCurrencyRates',
      resetCurrencyRates: 'resetCurrencyRates'
    })
  }
})
export default class App extends Vue {
  getCurrencyNames!: () => Promise<CurrencyNames>;
  resetCurrencyNames!: () => Promise<CurrencyNames>;
  getCurrencyRates!: () => Promise<LatestRates>;
  resetCurrencyRates!: () => Promise<Record<string, unknown>>;

  async mounted (): Promise<void> {
    await Promise.all([this.getCurrencyNames(), this.getCurrencyRates()])
  }
}
</script>

<style lang="scss">

</style>
