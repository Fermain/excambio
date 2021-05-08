<template>
  <div class="home">
    <exchange-list />
    <exchange-pair />
  </div>
</template>

<script lang="ts">
import { Options, Vue } from 'vue-class-component'
import ExchangeList from '@/components/exchange/List.vue'
import ExchangePair from '@/components/exchange/Pair.vue'

@Options({
  components: {
    ExchangeList,
    ExchangePair
  }
})
export default class Home extends Vue {}
</script>
