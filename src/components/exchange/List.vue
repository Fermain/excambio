<template>
  <table>
    <thead>
      <tr>
        <th v-for="column in columns" :key="column">{{ column }}</th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="currency in currencies" :key="currency.code">
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

  public get currencies (): Currency[] {
    return this.store.getters.currencyList
  }

  public get columns () {
    if (this.currencies.length) {
      return Object.keys(this.currencies[0])
    }

    return []
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
    &:hover {
      td {
        background: var(--color-dark);
        color: var(--color-light);
      }
    }
  }
}
</style>
