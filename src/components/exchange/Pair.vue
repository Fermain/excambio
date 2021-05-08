<template>
  <div class="exchange-pair">
    <div class="exchange-pair-inner" v-if="selected">
      <div class="exchange-pair-line" v-for="currency in selected" :key="currency.code">
        <span>{{ currency.code }}</span>
        <input type="number" v-model="from">
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Currency } from '@/models'
import { key } from '@/store'
import { Vue } from 'vue-class-component'
import { useStore } from 'vuex'

export default class ExchangePair extends Vue {
  private store = useStore(key);

  public from = 1

  public get to () {
    return 2
  }

  public get selected (): Currency[] {
    return this.store.state.selected
  }
}
</script>

<style scoped lang="scss">
.exchange-pair {
  flex: 1 1 auto;

  &-inner {
    position: sticky;
    top: 4.25rem;
    color: white;
    width: 100%;
  }

  &-line {
    display: flex;
    align-items: center;

    input {
      border: none;
      padding: none;
      background: none;
      width: auto;
    }

    input,
    span {
      color: var(--color-light);
      font-size: 1.8rem;
      font-family: Montserrat, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
    }

    span {
      margin-right: 0.5rem;
    }
  }
}
</style>
