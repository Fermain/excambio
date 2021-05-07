<template>
  <div class="home">
    <h1>Excambio</h1>
  </div>
</template>

<script lang="ts">
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
export default class Home extends Vue {
  getCurrencyNames!: () => any;
  resetCurrencyNames!: () => any;
  getCurrencyRates!: () => any;
  resetCurrencyRates!: () => any;

  async mounted (): Promise<void> {
    this.getCurrencyNames()
    this.getCurrencyRates()
    console.log(this)
  }
}
</script>
