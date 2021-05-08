<template>
  <table>
    <thead>
      <tr v-if="currencies.length || selected.length">
        <th>Code</th>
        <th>Name</th>
        <th>Amount</th>
      </tr>
      <tr v-for="currency in selected" :key="currency.code" class="selection">
        <td @click="onRemove(currency)">
          <b>{{ currency.code }}</b>
        </td>
        <td @click="onRemove(currency)">
          {{ currency.name }}
        </td>
        <td>
          <input
            type="number"
            v-model="values[currency.code]"
            @change="onValueChange($event, currency)"
          />
        </td>
      </tr>
    </thead>
    <tbody>
      <tr v-for="currency in currencies" :key="currency.code">
        <td @click="onSelect(currency)">
          <b>{{ currency.code }}</b>
        </td>
        <td @click="onSelect(currency)">
          {{ currency.name }}
        </td>
        <td>
          <input
            type="number"
            v-model="values[currency.code]"
            @change="onValueChange($event, currency)"
          />
        </td>
      </tr>
    </tbody>
  </table>
</template>

<script lang="ts">
import { key } from '@/store'
import { Vue } from 'vue-class-component'
import { useStore } from 'vuex'
import { Currency, CurrencyRates } from '@/models'

export default class ExchangeList extends Vue {
  private store = useStore(key);

  public get selected (): Currency[] {
    return this.store.state.selected
  }

  public get currencies (): Currency[] {
    return this.store.getters.currencyListSearchFilter.filter(
      (currency: Currency) => {
        return !this.selected.find(
          (selection) => selection.code === currency.code
        )
      }
    )
  }

  public get columns () {
    if (this.currencies.length) {
      return Object.keys(this.currencies[0])
    }

    return []
  }

  public set valueUSD (value: number) {
    this.store.dispatch('setConversionValue', value)
  }

  public get valueUSD (): number {
    return this.store.state.value
  }

  public get values (): CurrencyRates {
    let values = {}
    for (const code in this.store.state.latest.rates) {
      values = {
        ...values,
        [code]: this.valueUSD * this.store.state.latest.rates[code]
      }
    }
    return values
  }

  public onSelect (currency: Currency) {
    this.store.dispatch('pushSelected', currency)
  }

  public onRemove (currency: Currency) {
    this.store.dispatch('removeSelected', currency)
  }

  public onValueChange ({ target }: Event, currency: Currency) {
    const value = Number((target as HTMLInputElement).value)
    this.valueUSD = value / currency.rate
  }
}
</script>

<style scoped lang="scss">
table {
  border-spacing: 0;
  background: var(--color-light);
  flex: 1;

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

  tbody {
    tr {
      &:nth-child(2n) {
        td {
          background: #c6c7c8;
        }
      }
    }
  }

  td,
  th {
    padding: 0.25rem;

    input {
      border: none;
      background: none;
      width: 100%;
      color: var(--color-dark);
    }
  }

  tr {
    &.selection,
    &:hover {
      td {
        background: var(--color-dark) !important;
        color: var(--color-light) !important;

        input {
          color: var(--color-light);
        }
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
