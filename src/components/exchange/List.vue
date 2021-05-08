<template>
  <table>
    <thead>
      <tr>
        <th v-for="column in columns" :key="column">{{ column }}</th>
      </tr>
      <tr v-for="currency in selected" :key="currency.code" class="selection" @click="onRemove(currency)">
        <td>
          <b>{{ currency.code }}</b>
        </td>
        <td>
          {{ currency.name }}
        </td>
        <td>
          <code v-if="currency.rate">{{ currency.rate }}</code>
        </td>
      </tr>
    </thead>
    <tbody>
      <tr v-for="currency in currencies" :key="currency.code" @click="onSelect(currency)">
        <td>
          <b>{{ currency.code }}</b>
        </td>
        <td>
          {{ currency.name }}
        </td>
        <td>
          <code v-if="currency.rate">{{ currency.rate }}</code>
        </td>
      </tr>
    </tbody>
  </table>
</template>

<script lang="ts">
import { key } from '@/store'
import { Vue } from 'vue-class-component'
import { useStore } from 'vuex'
import { Currency } from '@/models'

export default class ExchangeList extends Vue {
  private store = useStore(key);

  public get selected (): Currency[] {
    return this.store.state.selected
  }

  public get currencies (): Currency[] {
    return this.store.getters.currencyList.filter((currency: Currency) => {
      return !this.selected.find(selection => selection.code === currency.code)
    })
  }

  public get columns () {
    if (this.currencies.length) {
      return Object.keys(this.currencies[0])
    }

    return []
  }

  public onSelect (currency: Currency) {
    this.store.dispatch('pushSelected', currency)
  }

  public onRemove (currency: Currency) {
    this.store.dispatch('removeSelected', currency)
  }
}
</script>

<style scoped lang="scss">
table {
  border-spacing: 0;

  thead {
    th {
      text-transform: capitalize;
      text-align: left;
      position: sticky;
      top: 4.25rem;
      background: var(--color-dark);
      color: var(--color-light);
    }
  }

  td,
  th {
    padding: 0.25rem;
  }

  tr {
    &.selection,
    &:hover {
      td {
        background: var(--color-dark);
        color: var(--color-light);
      }
    }

    &.selection {
      td {
        position: sticky;
        top: 4.25rem;
      }
    }
  }
}
</style>
