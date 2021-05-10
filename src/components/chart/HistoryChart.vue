<template>
  <apexchart
    type="line"
    v-if="ready"
    :options="chartOptions"
    :series="series"
  ></apexchart>
</template>

<script lang="ts">
import { key } from '@/store'
import { Vue } from 'vue-class-component'
import { useStore } from 'vuex'
import Moment from 'moment'
import { extendMoment } from 'moment-range'

const moment = extendMoment(Moment as any)
// https://github.com/rotaready/moment-range/issues/263

export default class HistoryChart extends Vue {
  public ready = false;

  private store = useStore(key);

  public startDate = moment(new Date()).subtract(1, 'day').format('YYYY-MM-DD');

  private get unit (): Moment.unitOfTime.Diff {
    if (this.$route.query.units && this.$route.query.unit) {
      return this.$route.query.unit as Moment.unitOfTime.Diff
    }

    return 'day'
  }

  private get units (): number {
    if (this.$route.query.units && this.$route.query.unit) {
      return Number(this.$route.query.units)
    }

    return 5
  }

  public get history () {
    return this.store.state.history
  }

  private get daysInRange (): Moment.Moment[] {
    const date = moment(this.startDate)
    const range = moment.rangeFromInterval(this.unit, -this.units, date)
    return Array.from(range.by('days'))
  }

  private async getRangeData () {
    this.daysInRange.forEach(async (day) => {
      this.store.dispatch('getHistoricalRate', day.toDate())
    })
  }

  public get historyFiltered () {
    const factor = 86400
    return this.daysInRange.map((day) => {
      return this.history.find((entry) => {
        return (
          Math.round(entry.timestamp / factor) ===
          Math.round(day.unix() / factor)
        )
      })
    })
  }

  public get historyTransposed () {
    return this.store.state.selected.map((currency) => {
      return {
        ...currency,
        data: this.historyFiltered.map((entry) => entry?.rates[currency.code])
      }
    })
  }

  public get series () {
    return this.store.state.selected.map((currency) => {
      return {
        name: currency.name,
        data: this.historyTransposed.find(
          (entry) => entry.code === currency.code
        )?.data
      }
    })
  }

  public get chartOptions () {
    return {
      chart: {
        id: 'history'
      },
      xaxis: {
        categories: this.daysInRange.map((moment) => moment.format('DD/MM/YY'))
      },
      theme: {
        mode: 'dark',
        palette: 'palette3',
        monochrome: {
          enabled: false,
          color: '#121618'
        }
      }
    }
  }

  mounted () {
    this.getRangeData()
    this.ready = true
  }
}
</script>
