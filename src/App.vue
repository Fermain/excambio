<template>
  <ui-header/>
  <router-view/>
  <ui-footer/>
</template>

<script lang="ts">
import UiHeader from './components/ui/Header.vue'
import UiFooter from './components/ui/Footer.vue'

import { CurrencyNames, LatestRates } from '@/models'
import { Options, Vue } from 'vue-class-component'
import { mapActions, useStore } from 'vuex'
import { key } from './store'

@Options({
  methods: {
    ...mapActions({
      getCurrencyNames: 'getCurrencyNames',
      getCurrencyRates: 'getCurrencyRates',
      updateLoadStatus: 'updateLoadStatus'
    })
  },
  components: {
    UiHeader,
    UiFooter
  }
})
export default class App extends Vue {
  getCurrencyNames!: () => Promise<CurrencyNames>;
  getCurrencyRates!: () => Promise<LatestRates>;
  updateLoadStatus!: (value: boolean) => Promise<boolean>

  private store = useStore(key)

  public get loading () {
    return this.store.state.loading
  }

  async mounted (): Promise<void> {
    await Promise.all([this.getCurrencyNames(), this.getCurrencyRates()])
    this.updateLoadStatus(false)
  }
}
</script>

<style lang="scss">

</style>
