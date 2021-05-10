<template>
  <history-chart/>
</template>

<script lang="ts">
import { Options, Vue } from 'vue-class-component'
import HistoryChart from '@/components/chart/HistoryChart.vue'

@Options({
  components: {
    HistoryChart
  }
})
export default class History extends Vue {}
</script>
