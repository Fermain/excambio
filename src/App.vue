<template>
  <ui-header/>
  <div class="view">
    <router-view/>
  </div>
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
    this.store.dispatch('applyQueryState')
  }
}
</script>

<style lang="scss">
@use './styles/reset';
@use './styles/font';

#app {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  --color-dark: rgb(18, 22, 24);
  --color-light: rgb(255, 255, 255);
  color: var(--color-dark);
}

.view {
  flex: 1 0 auto;
  background: var(--color-light);;
  z-index: 9;
  display: flex;
  flex-direction: column;
}

.logo {
  margin: 0;
  max-width: 3rem;
}

.page {
  padding: 0.5rem;
}
</style>
